import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput,
  StatusBar, Alert, ActivityIndicator, StyleSheet, Dimensions,
  Vibration, BackHandler, AppState, Modal, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { MONTHS, CATEGORIES, INITIAL_DATA, PRESET_ITEMS, THEMES, DEFAULT_THEME, APP_CONFIG, FONTS, CUSTOM_CAT_COLORS, CUSTOM_CAT_ICONS } from './src/data';
import { loadData, saveData, clearData, loadTheme, saveTheme, loadFont, saveFont, loadCards, saveCards, loadCustomCategories, saveCustomCategories } from './src/storage';
import { checkBiometricSupport, authenticateWithBiometric, savePin, hasPin, verifyPin } from './src/auth';
import { loadVault, saveVault, generateId } from './src/vault';
import { exportToCSV, syncToGoogleSheets, SHEETS_CONFIG } from './src/export';

const { width } = Dimensions.get('window');
const ThemeCtx = createContext(THEMES.dark);
const FontCtx = createContext(undefined);
const CatsCtx = createContext(CATEGORIES);
const useTheme = () => useContext(ThemeCtx);
const useFont = () => useContext(FontCtx);
const useCats = () => useContext(CatsCtx);

const fmt = (n) => '₹' + Number(n).toLocaleString('en-IN');
const getCatItems = (d, m, k) => (d[m] && d[m][k]) || [];
const getCatTotal = (d, m, k) => getCatItems(d, m, k).reduce((s, i) => s + (i.amount || 0), 0);
const getMonthTotal = (d, m, exG = true) => {
  if (!d[m]) return 0;
  return Object.entries(d[m]).reduce((s, [k, items]) => {
    if (exG && k === 'gowtham') return s;
    return s + items.reduce((a, i) => a + (i.amount || 0), 0);
  }, 0);
};
const getYTD = (d) => MONTHS.reduce((s, m) => s + getMonthTotal(d, m), 0);
const maskCard = (num) => num ? '•••• ' + num.slice(-4) : '';
const fmtDate = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  const dd = dt.getDate(), mm = dt.getMonth(), yy = dt.getFullYear();
  return `${dd} ${MONTHS[mm]} ${yy}`;
};
const todayStr = () => new Date().toISOString().split('T')[0];

// ═══════════════════════════════════════════════
//  LOCK SCREEN — Fingerprint-first, PIN on demand
// ═══════════════════════════════════════════════
function LockScreen({ onUnlock }) {
  const [mode, setMode] = useState('loading');
  const [pin, setPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [bioAvailable, setBioAvailable] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { compatible, enrolled } = await checkBiometricSupport();
      const pinExists = await hasPin();
      if (compatible && enrolled) {
        setBioAvailable(true);
        setMode('biometric_wait');
        setTimeout(async () => {
          const success = await authenticateWithBiometric();
          if (success) { onUnlock(); return; }
        }, 400);
      } else {
        setMode(pinExists ? 'pin' : 'setup');
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    })();
  }, []);

  useEffect(() => {
    const h = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => h.remove();
  }, []);

  const switchToPin = async () => {
    const pinExists = await hasPin();
    setMode(pinExists ? 'pin' : 'setup');
    setError('');
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const retryBiometric = async () => {
    setError('');
    const success = await authenticateWithBiometric();
    if (success) onUnlock();
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) { setError('Enter 4-digit PIN'); return; }
    const ok = await verifyPin(pin);
    if (ok) onUnlock();
    else { setError('Wrong PIN'); Vibration.vibrate(200); setPin(''); setTimeout(() => inputRef.current?.focus(), 100); }
  };

  const handleSetup = async () => {
    if (step === 1) {
      if (newPin.length !== 4) { setError('Enter 4-digit PIN'); return; }
      setStep(2); setError(''); setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      if (confirmPin !== newPin) { setError('PINs do not match'); setConfirmPin(''); return; }
      await savePin(newPin); onUnlock();
    }
  };

  const currentVal = mode === 'pin' ? pin : step === 1 ? newPin : confirmPin;
  const currentSet = mode === 'pin' ? setPin : step === 1 ? setNewPin : setConfirmPin;

  if (mode === 'loading') return (
    <View style={ls.container}><StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ActivityIndicator size="large" color="#00C9A7" /><Text style={ls.loadingText}>Authenticating...</Text></View>
  );

  if (mode === 'biometric_wait') return (
    <View style={ls.container}><StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={ls.lockIcon}><Feather name="lock" size={40} color="#00C9A7" /></View>
      <Text style={ls.title}>Money<Text style={{ fontWeight: '300', color: '#00C9A7' }}>Pulse</Text></Text>
      <Text style={ls.subtitle}>by KM</Text>
      <View style={ls.form}>
        <TouchableOpacity style={[ls.btn, { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: '#00C9A7' }]} onPress={retryBiometric}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="smartphone" size={18} color="#00C9A7" />
            <Text style={[ls.btnText, { color: '#00C9A7', marginLeft: 8 }]}>Tap to Use Fingerprint</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={ls.linkBtn} onPress={switchToPin}>
          <Feather name="key" size={14} color="#94a3b8" />
          <Text style={[ls.linkText, { color: '#94a3b8' }]}>  Use PIN instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={ls.container}><StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={ls.lockIcon}><Feather name="lock" size={40} color="#00C9A7" /></View>
      <Text style={ls.title}>Money<Text style={{ fontWeight: '300', color: '#00C9A7' }}>Pulse</Text></Text>
      <Text style={ls.subtitle}>by KM</Text>
      <View style={ls.form}>
        <Text style={ls.prompt}>{mode === 'pin' ? 'Enter your 4-digit PIN' : step === 1 ? 'Set a 4-digit PIN' : 'Confirm your PIN'}</Text>
        <View style={ls.pinDots}>
          {[0,1,2,3].map(i => <View key={i} style={[ls.dot, currentVal.length > i && ls.dotFilled]} />)}
        </View>
        <TextInput ref={inputRef} style={ls.hiddenInput} keyboardType="numeric" maxLength={4}
          value={currentVal} onChangeText={currentSet} secureTextEntry
          onSubmitEditing={mode === 'pin' ? handlePinSubmit : handleSetup} />
        {error ? <Text style={ls.error}>{error}</Text> : null}
        <TouchableOpacity style={ls.btn} onPress={mode === 'pin' ? handlePinSubmit : handleSetup}>
          <Text style={ls.btnText}>{mode === 'pin' ? 'Unlock' : step === 1 ? 'Next' : 'Set PIN & Enter'}</Text>
        </TouchableOpacity>
        {mode === 'pin' && bioAvailable && <TouchableOpacity style={ls.linkBtn} onPress={retryBiometric}>
          <Feather name="smartphone" size={16} color="#00C9A7" /><Text style={ls.linkText}> Use Fingerprint</Text>
        </TouchableOpacity>}
      </View>
    </View>
  );
}

// ═══════════════════════════════════════════════
//  CREDIT CARDS SCREEN
// ═══════════════════════════════════════════════
function CardsScreen({ onBack }) {
  const t = useTheme(); const ff = useFont();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [showFull, setShowFull] = useState({});

  useEffect(() => { (async () => { setCards(await loadCards()); setLoading(false); })(); }, []);
  const persist = async (c) => { setCards(c); await saveCards(c); };

  const handleSave = async () => {
    if (!cardName.trim() || !cardNumber.trim()) return;
    const entry = { id: editId || generateId(), name: cardName.trim(), number: cardNumber.replace(/\s/g, ''), expiry: expiry.trim(), cvv: cvv.trim(), updatedAt: new Date().toISOString() };
    await persist(editId ? cards.map(c => c.id === editId ? entry : c) : [...cards, entry]);
    resetForm();
  };

  const handleDelete = (card) => {
    Alert.alert('Delete Card', `Remove "${card.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => await persist(cards.filter(c => c.id !== card.id)) },
    ]);
  };

  const resetForm = () => { setAddMode(false); setEditId(null); setCardName(''); setCardNumber(''); setExpiry(''); setCvv(''); };
  const toggleFull = (id) => setShowFull(p => ({ ...p, [id]: !p[id] }));

  const formatCardInput = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})/g, '$1 ').trim();
  };

  if (loading) return <View style={[gs.container, { backgroundColor: t.bg, justifyContent: 'center', alignItems: 'center' }]}><ActivityIndicator size="large" color="#FF6B35" /></View>;

  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <View style={gs.navTop}><TouchableOpacity onPress={onBack}><Text style={{ color: '#00C9A7', fontSize: 15, fontWeight: '600', fontFamily: ff }}><Feather name="arrow-left" size={16} /> Dashboard</Text></TouchableOpacity></View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,107,53,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <Feather name="credit-card" size={28} color="#FF6B35" />
        </View>
        <Text style={{ fontSize: 22, fontWeight: '700', color: t.text, fontFamily: ff }}>My Cards</Text>
        <Text style={{ fontSize: 12, color: t.text4, marginTop: 2, fontFamily: ff }}>{cards.length} saved · Encrypted · Personal only</Text>
      </View>

      {cards.map(card => (
        <View key={card.id} style={{ borderRadius: 16, padding: 18, marginBottom: 12, backgroundColor: 'rgba(255,107,53,0.08)', borderWidth: 1, borderColor: 'rgba(255,107,53,0.2)' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.text, fontFamily: ff }}>{card.name}</Text>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity style={{ padding: 6 }} onPress={() => { setCardName(card.name); setCardNumber(card.number); setExpiry(card.expiry); setCvv(card.cvv); setEditId(card.id); setAddMode(true); }}>
                <Feather name="edit-2" size={14} color={t.text3} />
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 6 }} onPress={() => handleDelete(card)}>
                <Feather name="trash-2" size={14} color="#EF476F" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleFull(card.id)}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: '#FF6B35', letterSpacing: 2, fontFamily: 'monospace' }}>
              {showFull[card.id] ? card.number.replace(/(\d{4})/g, '$1 ').trim() : maskCard(card.number)}
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View><Text style={{ fontSize: 9, color: t.text4, fontFamily: ff }}>EXPIRY</Text><Text style={{ fontSize: 13, color: t.text2, fontFamily: ff }}>{card.expiry || '—'}</Text></View>
            <View><Text style={{ fontSize: 9, color: t.text4, fontFamily: ff }}>CVV</Text><Text style={{ fontSize: 13, color: t.text2, fontFamily: ff }}>{showFull[card.id] ? card.cvv : '•••'}</Text></View>
          </View>
          <Text style={{ fontSize: 9, color: t.text4, marginTop: 6, fontFamily: ff }}>Tap card number to reveal/hide</Text>
        </View>
      ))}

      {cards.length === 0 && !addMode && <Text style={{ textAlign: 'center', padding: 30, color: t.text4, fontSize: 13, fontFamily: ff }}>No cards saved yet. Add your first card securely.</Text>}

      {addMode && (
        <View style={{ backgroundColor: t.card, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,107,53,0.3)' }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.text2, marginBottom: 10, fontFamily: ff }}>{editId ? '✏️ Edit Card' : '💳 Add Card'}</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="Card name (e.g. HDFC Visa)" placeholderTextColor={t.text4} value={cardName} onChangeText={setCardName} autoFocus />
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: 'monospace', letterSpacing: 2 }]} placeholder="Card number" placeholderTextColor={t.text4} value={formatCardInput(cardNumber)} onChangeText={v => setCardNumber(v.replace(/\s/g, ''))} keyboardType="numeric" maxLength={19} />
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <TextInput style={[gs.formInput, { flex: 1, backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff, marginBottom: 0 }]} placeholder="MM/YY" placeholderTextColor={t.text4} value={expiry} onChangeText={setExpiry} maxLength={5} />
            <TextInput style={[gs.formInput, { flex: 1, backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff, marginBottom: 0 }]} placeholder="CVV" placeholderTextColor={t.text4} value={cvv} onChangeText={setCvv} keyboardType="numeric" maxLength={4} secureTextEntry />
          </View>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <TouchableOpacity style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#FF6B35', alignItems: 'center' }} onPress={handleSave}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{editId ? 'Update' : 'Save Card'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: t.border }} onPress={resetForm}>
              <Text style={{ color: t.text3, fontSize: 14 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!addMode && (
        <TouchableOpacity style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(255,107,53,0.4)', alignItems: 'center', marginTop: 8 }}
          onPress={() => { resetForm(); setAddMode(true); }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#FF6B35', fontFamily: ff }}><Feather name="plus-circle" size={16} color="#FF6B35" />  Add Card</Text>
        </TouchableOpacity>
      )}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════
//  SHARED SMALL COMPONENTS
// ═══════════════════════════════════════════════
function BrandHeader({ onSettings, onVault, onCards }) {
  const t = useTheme(); const ff = useFont();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 12, paddingBottom: 8 }}>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        <TouchableOpacity onPress={onVault} style={{ padding: 8, borderRadius: 10, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
          <Feather name="shield" size={16} color="#8B5CF6" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCards} style={{ padding: 8, borderRadius: 10, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
          <Feather name="credit-card" size={16} color="#FF6B35" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 10, color: t.text4, letterSpacing: 4, fontFamily: ff }}>{APP_CONFIG.year}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: t.text, letterSpacing: -1, fontFamily: ff }}>Money</Text>
          <Text style={{ fontSize: 22, fontWeight: '300', color: '#00C9A7', letterSpacing: -1, fontFamily: ff }}>Pulse</Text>
        </View>
        <Text style={{ fontSize: 9, color: t.text4, letterSpacing: 1.5, fontFamily: ff }}>by KM</Text>
      </View>
      <TouchableOpacity onPress={onSettings} style={{ padding: 8, borderRadius: 10, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
        <Feather name="sliders" size={18} color={t.text3} />
      </TouchableOpacity>
    </View>
  );
}

function PresetChips({ catKey, existingItems, onSelect }) {
  const t = useTheme(); const ff = useFont();
  const presets = PRESET_ITEMS[catKey] || [];
  const existing = existingItems.map(i => i.name.toLowerCase());
  const available = presets.filter(p => !existing.includes(p.toLowerCase()));
  if (!available.length) return null;
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontSize: 11, color: t.text4, marginBottom: 6, fontWeight: '600', fontFamily: ff }}>⚡ Quick Add</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}><View style={{ flexDirection: 'row', gap: 6 }}>
        {available.map(n => <TouchableOpacity key={n} onPress={() => onSelect(n)} style={{ paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
          <Text style={{ fontSize: 12, color: t.text2, fontFamily: ff }}>{n}</Text></TouchableOpacity>)}
      </View></ScrollView>
    </View>
  );
}

// ═══════════════════════════════════════════════
//  THREE-DOT MENU
// ═══════════════════════════════════════════════
function ThreeDotMenu({ options, color }) {
  const t = useTheme(); const ff = useFont();
  const [open, setOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setOpen(!open)} style={{ padding: 8, borderRadius: 10, backgroundColor: t.card, borderWidth: 1, borderColor: t.border }}>
        <Feather name="more-vertical" size={18} color={color || t.text3} />
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={{ position: 'absolute', top: 80, right: 24, minWidth: 180,
            backgroundColor: t.cardSolid, borderRadius: 12, borderWidth: 1, borderColor: t.border,
            ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8 }, android: { elevation: 8 } }),
          }}>
            {options.map((opt, i) => (
              <TouchableOpacity key={i} onPress={() => { setOpen(false); setTimeout(opt.onPress, 100); }}
                style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16,
                  borderBottomWidth: i < options.length - 1 ? 1 : 0, borderBottomColor: t.border }}>
                <Feather name={opt.icon} size={16} color={opt.color || t.text2} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 14, fontWeight: '500', color: opt.color || t.text, fontFamily: ff }}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// ═══════════════════════════════════════════════
//  DATE RANGE FILTER MODAL
// ═══════════════════════════════════════════════
function DateFilterModal({ visible, onClose, onApply, onClear }) {
  const t = useTheme(); const ff = useFont();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');

  const validate = (val) => /^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(new Date(val).getTime());

  const apply = () => {
    if (!fromDate && !toDate) { setError('Enter at least one date'); return; }
    if (fromDate && !validate(fromDate)) { setError('Invalid From date (YYYY-MM-DD)'); return; }
    if (toDate && !validate(toDate)) { setError('Invalid To date (YYYY-MM-DD)'); return; }
    if (fromDate && toDate && fromDate > toDate) { setError('From must be before To'); return; }
    onApply(fromDate || null, toDate || null);
    setError('');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={{ width: width - 48, backgroundColor: t.cardSolid, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: t.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: t.text, marginBottom: 4, fontFamily: ff }}>📅 Filter by Date</Text>
          <Text style={{ fontSize: 12, color: t.text4, marginBottom: 16, fontFamily: ff }}>Format: YYYY-MM-DD</Text>
          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 4, fontFamily: ff }}>From</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="2026-01-01" placeholderTextColor={t.text4} value={fromDate} onChangeText={setFromDate} maxLength={10} />
          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 4, fontFamily: ff }}>To</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="2026-12-31" placeholderTextColor={t.text4} value={toDate} onChangeText={setToDate} maxLength={10} />
          {error ? <Text style={{ color: '#EF476F', fontSize: 12, marginBottom: 8 }}>{error}</Text> : null}
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
            <TouchableOpacity style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#00C9A7', alignItems: 'center' }} onPress={apply}>
              <Text style={{ color: '#0f172a', fontWeight: '700' }}>Apply Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 12, borderRadius: 8, borderWidth: 1, borderColor: t.border }} onPress={() => { onClear(); setFromDate(''); setToDate(''); setError(''); }}>
              <Text style={{ color: t.text3, fontWeight: '600' }}>Clear</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// ═══════════════════════════════════════════════
//  ADD CUSTOM CATEGORY MODAL
// ═══════════════════════════════════════════════
function AddCategoryModal({ visible, onClose, onAdd, existingKeys }) {
  const t = useTheme(); const ff = useFont();
  const [label, setLabel] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [selectedColor, setSelectedColor] = useState(CUSTOM_CAT_COLORS[0]);
  const [emoji, setEmoji] = useState('📁');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!label.trim()) { setError('Category name required'); return; }
    const key = label.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
    if (existingKeys.includes(key)) { setError('Category already exists'); return; }
    onAdd({ key, label: label.trim(), icon: selectedIcon, color: selectedColor, emoji: emoji || '📁', isCustom: true });
    setLabel(''); setError(''); setSelectedIcon('folder'); setSelectedColor(CUSTOM_CAT_COLORS[0]); setEmoji('📁');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity activeOpacity={1} style={{ width: width - 48, backgroundColor: t.cardSolid, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: t.border }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: t.text, marginBottom: 16, fontFamily: ff }}>➕ New Category</Text>

          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 4, fontFamily: ff }}>Name</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="e.g. Subscriptions" placeholderTextColor={t.text4} value={label} onChangeText={setLabel} autoFocus />

          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 4, fontFamily: ff }}>Emoji</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff, width: 60 }]} value={emoji} onChangeText={setEmoji} maxLength={2} />

          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 6, fontFamily: ff }}>Icon</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {CUSTOM_CAT_ICONS.map(ic => (
                <TouchableOpacity key={ic} onPress={() => setSelectedIcon(ic)}
                  style={{ padding: 8, borderRadius: 10, borderWidth: 2, borderColor: selectedIcon === ic ? selectedColor : t.border, backgroundColor: selectedIcon === ic ? selectedColor + '20' : 'transparent' }}>
                  <Feather name={ic} size={18} color={selectedIcon === ic ? selectedColor : t.text3} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Text style={{ fontSize: 12, color: t.text3, marginBottom: 6, fontFamily: ff }}>Color</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {CUSTOM_CAT_COLORS.map(c => (
              <TouchableOpacity key={c} onPress={() => setSelectedColor(c)}
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c, borderWidth: 3, borderColor: selectedColor === c ? t.text : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                {selectedColor === c && <Feather name="check" size={14} color="#fff" />}
              </TouchableOpacity>
            ))}
          </View>

          {error ? <Text style={{ color: '#EF476F', fontSize: 12, marginBottom: 8 }}>{error}</Text> : null}

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: selectedColor, alignItems: 'center' }} onPress={handleAdd}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Add Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 12, borderRadius: 8, borderWidth: 1, borderColor: t.border }} onPress={onClose}>
              <Text style={{ color: t.text3 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// ═══════════════════════════════════════════════
//  VAULT SCREEN
// ═══════════════════════════════════════════════
function VaultScreen({ onBack }) {
  const t = useTheme(); const ff = useFont();
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  const [addMode, setAddMode] = useState(false); const [editId, setEditId] = useState(null);
  const [site, setSite] = useState(''); const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState({});
  useEffect(() => { (async () => { setItems(await loadVault()); setLoading(false); })(); }, []);
  const persist = async (ni) => { setItems(ni); await saveVault(ni); };
  const handleSave = async () => {
    if (!site.trim() || !password.trim()) return;
    const e = { id: editId || generateId(), site: site.trim(), username: username.trim(), password: password.trim(), updatedAt: new Date().toISOString() };
    await persist(editId ? items.map(i => i.id === editId ? e : i) : [...items, e]);
    setAddMode(false); setEditId(null); setSite(''); setUsername(''); setPassword('');
  };
  if (loading) return <View style={[gs.container, { backgroundColor: t.bg, justifyContent: 'center', alignItems: 'center' }]}><ActivityIndicator size="large" color="#8B5CF6" /></View>;
  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <View style={gs.navTop}><TouchableOpacity onPress={onBack}><Text style={{ color: '#00C9A7', fontSize: 15, fontWeight: '600', fontFamily: ff }}><Feather name="arrow-left" size={16} /> Dashboard</Text></TouchableOpacity></View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(139,92,246,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}><Feather name="shield" size={28} color="#8B5CF6" /></View>
        <Text style={{ fontSize: 22, fontWeight: '700', color: t.text, fontFamily: ff }}>Secret Vault</Text>
        <Text style={{ fontSize: 12, color: t.text4, marginTop: 2, fontFamily: ff }}>{items.length} saved · Encrypted</Text>
      </View>
      {items.map(item => (
        <View key={item.id} style={{ backgroundColor: t.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: t.border }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: t.text, fontFamily: ff }}>{item.site}</Text>
              {item.username ? <Text style={{ fontSize: 12, color: t.text3, marginTop: 2, fontFamily: ff }}>👤 {item.username}</Text> : null}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ fontSize: 14, color: '#8B5CF6', fontFamily: 'monospace', letterSpacing: 1 }}>{showPw[item.id] ? item.password : '••••••••'}</Text>
                <TouchableOpacity onPress={() => setShowPw(p => ({ ...p, [item.id]: !p[item.id] }))} style={{ marginLeft: 8 }}><Feather name={showPw[item.id] ? 'eye-off' : 'eye'} size={16} color={t.text3} /></TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(100,116,139,0.12)', borderRadius: 8, padding: 8 }} onPress={() => { setSite(item.site); setUsername(item.username); setPassword(item.password); setEditId(item.id); setAddMode(true); }}><Feather name="edit-2" size={15} color={t.text3} /></TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(239,71,111,0.1)', borderRadius: 8, padding: 8 }} onPress={() => Alert.alert('Delete', `Remove "${item.site}"?`, [{ text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: async () => await persist(items.filter(i => i.id !== item.id)) }])}><Feather name="trash-2" size={15} color="#EF476F" /></TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      {items.length === 0 && !addMode && <Text style={{ textAlign: 'center', padding: 30, color: t.text4, fontSize: 13, fontFamily: ff }}>No passwords saved yet.</Text>}
      {addMode && (
        <View style={{ backgroundColor: t.card, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)' }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.text2, marginBottom: 10, fontFamily: ff }}>{editId ? '✏️ Edit' : '🔐 New Entry'}</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border }]} placeholder="Site / App name" placeholderTextColor={t.text4} value={site} onChangeText={setSite} autoFocus />
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border }]} placeholder="Username / Email" placeholderTextColor={t.text4} value={username} onChangeText={setUsername} autoCapitalize="none" />
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border }]} placeholder="Password" placeholderTextColor={t.text4} value={password} onChangeText={setPassword} secureTextEntry />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#8B5CF6', alignItems: 'center' }} onPress={handleSave}><Text style={{ color: '#fff', fontWeight: '700' }}>{editId ? 'Update' : 'Save'}</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: t.border }} onPress={() => { setAddMode(false); setEditId(null); }}><Text style={{ color: t.text3 }}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      )}
      {!addMode && <TouchableOpacity style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(139,92,246,0.4)', alignItems: 'center', marginTop: 8 }} onPress={() => { setAddMode(true); setEditId(null); setSite(''); setUsername(''); setPassword(''); }}><Text style={{ fontSize: 15, fontWeight: '600', color: '#8B5CF6', fontFamily: ff }}><Feather name="plus-circle" size={16} color="#8B5CF6" />  Add Password</Text></TouchableOpacity>}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════
//  SETTINGS SCREEN
// ═══════════════════════════════════════════════
function SettingsScreen({ currentTheme, currentFont, onThemeChange, onFontChange, onBack, onReset, data, skipLock }) {
  const t = useTheme(); const ff = useFont();
  const [exporting, setExporting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleExport = async () => {
    skipLock.current = true; setExporting(true);
    const result = await exportToCSV(data);
    setExporting(false); setTimeout(() => { skipLock.current = false; }, 2000);
    Alert.alert(result.success ? 'Exported!' : 'Error', result.message);
  };

  const handleSync = async () => {
    if (!SHEETS_CONFIG.enabled) { Alert.alert('Google Sheets Setup', SHEETS_CONFIG.instructions.join('\n')); return; }
    setSyncing(true); const r = await syncToGoogleSheets(data); setSyncing(false);
    Alert.alert(r.success ? 'Synced!' : 'Error', r.message);
  };

  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <View style={gs.navTop}><TouchableOpacity onPress={onBack}><Text style={{ color: '#00C9A7', fontSize: 15, fontWeight: '600', fontFamily: ff }}><Feather name="arrow-left" size={16} /> Back</Text></TouchableOpacity></View>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(0,201,167,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}><Feather name="settings" size={28} color="#00C9A7" /></View>
        <Text style={{ fontSize: 22, fontWeight: '700', color: t.text, fontFamily: ff }}>Settings</Text>
      </View>

      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>🎨 Theme</Text>
        {Object.values(THEMES).map(theme => (
          <TouchableOpacity key={theme.key} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 6, borderWidth: 1.5, borderColor: currentTheme === theme.key ? '#00C9A7' : t.border, backgroundColor: currentTheme === theme.key ? 'rgba(0,201,167,0.08)' : 'transparent' }} onPress={() => onThemeChange(theme.key)}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: theme.border }}><Feather name={theme.icon} size={14} color={theme.text} /></View>
            <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: t.text, fontFamily: ff }}>{theme.label}</Text>
            {currentTheme === theme.key && <Feather name="check-circle" size={18} color="#00C9A7" />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>🔤 Font</Text>
        {Object.values(FONTS).map(font => (
          <TouchableOpacity key={font.key} style={{ flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 6, borderWidth: 1.5, borderColor: currentFont === font.key ? '#00C9A7' : t.border, backgroundColor: currentFont === font.key ? 'rgba(0,201,167,0.08)' : 'transparent' }} onPress={() => onFontChange(font.key)}>
            <Text style={{ fontSize: 18, marginRight: 12, fontFamily: font.family, color: t.text }}>Aa</Text>
            <Text style={{ flex: 1, fontSize: 14, fontWeight: '600', color: t.text, fontFamily: font.family }}>{font.label}</Text>
            {currentFont === font.key && <Feather name="check-circle" size={18} color="#00C9A7" />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>📤 Export & Sync</Text>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(6,214,160,0.2)', backgroundColor: 'rgba(6,214,160,0.06)' }} onPress={handleExport} disabled={exporting}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(6,214,160,0.15)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            {exporting ? <ActivityIndicator size="small" color="#06D6A0" /> : <Feather name="download" size={18} color="#06D6A0" />}
          </View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 14, fontWeight: '600', color: t.text, fontFamily: ff }}>{exporting ? 'Exporting...' : 'Export to CSV'}</Text>
          <Text style={{ fontSize: 11, color: t.text4, fontFamily: ff }}>Share to Google Drive, WhatsApp etc.</Text></View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(17,138,178,0.2)', backgroundColor: 'rgba(17,138,178,0.06)' }} onPress={handleSync} disabled={syncing}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(17,138,178,0.15)', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            {syncing ? <ActivityIndicator size="small" color="#118AB2" /> : <Feather name="refresh-cw" size={18} color="#118AB2" />}
          </View>
          <View style={{ flex: 1 }}><Text style={{ fontSize: 14, fontWeight: '600', color: t.text, fontFamily: ff }}>{syncing ? 'Syncing...' : 'Sync to Google Sheets'}</Text>
          <Text style={{ fontSize: 11, color: t.text4, fontFamily: ff }}>{SHEETS_CONFIG.enabled ? 'Connected' : 'Tap for setup guide'}</Text></View>
        </TouchableOpacity>
      </View>

      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>ℹ️ About</Text>
        <View style={{ alignItems: 'center', paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}><Text style={{ fontSize: 18, fontWeight: '800', color: t.text, fontFamily: ff }}>Money</Text><Text style={{ fontSize: 18, fontWeight: '300', color: '#00C9A7', fontFamily: ff }}>Pulse</Text></View>
          <Text style={{ fontSize: 11, color: '#00C9A7', fontFamily: ff }}>by KM · v{APP_CONFIG.version}</Text>
          <View style={{ paddingVertical: 8, paddingHorizontal: 20, borderRadius: 12, backgroundColor: t.bg, borderWidth: 1, borderColor: t.border, marginTop: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: t.text, textAlign: 'center', fontFamily: ff }}>{APP_CONFIG.fullName}</Text>
            <Text style={{ fontSize: 11, color: '#00C9A7', textAlign: 'center', marginTop: 2, fontFamily: ff }}>{APP_CONFIG.title}</Text>
          </View>
        </View>
      </View>

      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <TouchableOpacity style={{ padding: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(239,71,111,0.3)', backgroundColor: 'rgba(239,71,111,0.06)', alignItems: 'center' }} onPress={onReset}>
          <Text style={{ color: '#EF476F', fontWeight: '600', fontSize: 14, fontFamily: ff }}>Reset All Data</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════
//  DASHBOARD + MONTH + DETAIL
// ═══════════════════════════════════════════════
function DashboardScreen({ data, onSelectMonth, onSettings, onVault, onCards }) {
  const t = useTheme(); const ff = useFont(); const allCats = useCats();
  const ytd = getYTD(data); const totals = MONTHS.map(m => getMonthTotal(data, m));
  const active = totals.filter(v => v > 0); const avg = active.length ? Math.round(ytd / active.length) : 0;
  const maxT = Math.max(...totals, 1);
  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <BrandHeader onSettings={onSettings} onVault={onVault} onCards={onCards} />
      <View style={gs.kpiGrid}>
        {[{ l: 'YTD Spend', v: fmt(ytd), c: '#00C9A7' }, { l: 'Monthly Avg', v: fmt(avg), c: '#118AB2' }, { l: 'Highest Month', v: fmt(Math.max(...totals)), c: '#EF476F' }, { l: 'Active Months', v: String(active.length), c: '#FFD166', b: true }].map((k, i) => (
          <View key={i} style={[gs.kpiCard, { backgroundColor: t.card, borderColor: t.border }]}>
            <Text style={[gs.kpiLabel, { color: t.text3, fontFamily: ff }]}>{k.l}</Text>
            <Text style={[gs.kpiValue, { color: k.c, fontSize: k.b ? 30 : 18, fontFamily: ff }]}>{k.v}</Text>
          </View>
        ))}
      </View>
      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>📊 Monthly Trend</Text>
        <View style={gs.barChart}>
          {MONTHS.map((m, i) => (
            <TouchableOpacity key={m} style={gs.barCol} onPress={() => onSelectMonth(m)} activeOpacity={0.7}>
              <View style={[gs.barFill, { height: (totals[i] / maxT) * 80 || 2, backgroundColor: totals[i] > 0 ? t.text3 : t.bg }]} />
              <Text style={[gs.barLabel, { color: totals[i] > 0 ? t.text3 : t.text4, fontWeight: totals[i] > 0 ? '600' : '400', fontFamily: ff }]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={[gs.section, { backgroundColor: t.card, borderColor: t.border }]}>
        <Text style={[gs.sectionTitle, { color: t.text2, fontFamily: ff }]}>📈 YTD by Category</Text>
        {allCats.filter(c => c.key !== 'gowtham').map(cat => {
          const total = MONTHS.reduce((s, m) => s + getCatTotal(data, m, cat.key), 0);
          const pct = ytd > 0 ? (total / ytd) * 100 : 0;
          return (<View key={cat.key} style={{ marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 12, color: t.text2, fontFamily: ff }}><Feather name={cat.icon} size={12} color={cat.color} /> {cat.label}</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: cat.color, fontFamily: ff }}>{fmt(total)}</Text>
            </View>
            <View style={{ height: 6, backgroundColor: t.bg, borderRadius: 3, overflow: 'hidden' }}><View style={{ width: `${pct}%`, height: 6, backgroundColor: cat.color, borderRadius: 3 }} /></View>
          </View>);
        })}
      </View>
      <View style={gs.monthGrid}>{MONTHS.map(m => {
        const v = getMonthTotal(data, m);
        return (<TouchableOpacity key={m} style={[gs.monthBtn, { backgroundColor: t.card, borderColor: t.border }, v > 0 && { borderColor: 'rgba(0,201,167,0.25)', backgroundColor: 'rgba(0,201,167,0.08)' }]} onPress={() => onSelectMonth(m)} activeOpacity={0.7}>
          <Text style={[gs.monthBtnName, { color: v > 0 ? '#00C9A7' : t.text4, fontFamily: ff }]}>{m}</Text>
          <Text style={[gs.monthBtnVal, { color: t.text3, fontFamily: ff }]}>{v > 0 ? fmt(v) : '—'}</Text>
        </TouchableOpacity>);
      })}</View>
      <View style={{ alignItems: 'center', paddingVertical: 16, opacity: 0.5 }}>
        <Text style={{ fontSize: 10, color: t.text4, fontFamily: ff }}>Crafted by {APP_CONFIG.fullName}</Text>
        <Text style={{ fontSize: 9, color: t.text4, marginTop: 2, fontFamily: ff }}>{APP_CONFIG.linkedInNote}</Text>
      </View>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

function MonthScreen({ data, month, onBack, onSelectCat, onSwitchMonth, onDeleteCategory, onAddCategory }) {
  const t = useTheme(); const ff = useFont(); const allCats = useCats();
  const total = getMonthTotal(data, month); const gTotal = getCatTotal(data, month, 'gowtham');
  const [showAddCat, setShowAddCat] = useState(false);
  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <View style={gs.navTop}>
        <TouchableOpacity onPress={onBack}><Text style={{ color: '#00C9A7', fontSize: 15, fontWeight: '600', fontFamily: ff }}><Feather name="arrow-left" size={16} /> Dashboard</Text></TouchableOpacity>
        <View style={gs.navArrows}>
          <TouchableOpacity style={[gs.navArrow, { backgroundColor: t.card, borderColor: t.border }]} onPress={() => onSwitchMonth(-1)}><Feather name="chevron-left" size={18} color={t.text3} /></TouchableOpacity>
          <TouchableOpacity style={[gs.navArrow, { backgroundColor: t.card, borderColor: t.border }]} onPress={() => onSwitchMonth(1)}><Feather name="chevron-right" size={18} color={t.text3} /></TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: t.text, fontFamily: ff }}>📅 {month} {APP_CONFIG.year}</Text>
        <Text style={{ fontSize: 30, fontWeight: '700', color: '#00C9A7', marginTop: 8, fontFamily: ff }}>{fmt(total)}</Text>
        <Text style={{ fontSize: 11, color: t.text4, fontFamily: ff }}>Total (excl. Gowtham)</Text>
      </View>
      {allCats.map(cat => {
        const ct = getCatTotal(data, month, cat.key), items = getCatItems(data, month, cat.key);
        const pct = total > 0 && cat.key !== 'gowtham' ? ((ct / total) * 100).toFixed(1) : null;
        return (
          <TouchableOpacity key={cat.key} style={[gs.catCard, { backgroundColor: t.card, borderColor: t.border }]}
            onPress={() => onSelectCat(cat.key)} activeOpacity={0.7}>
            <View style={[gs.catCardBg, { width: `${pct || 0}%`, backgroundColor: cat.color }]} />
            <View style={gs.catCardInner}>
              <View><Text style={{ fontSize: 14, fontWeight: '600', color: t.text2, fontFamily: ff }}><Feather name={cat.icon} size={14} color={cat.color} />  {cat.label}</Text>
              <Text style={{ fontSize: 11, color: t.text4, marginTop: 2, fontFamily: ff }}>{items.length} items{pct ? ` · ${pct}%` : ''}</Text></View>
              <View style={{ alignItems: 'flex-end' }}><Text style={{ fontSize: 16, fontWeight: '700', color: cat.color, fontFamily: ff }}>{fmt(ct)}</Text>
              <Text style={{ fontSize: 11, color: t.text4, fontFamily: ff }}>tap →</Text></View>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(0,201,167,0.3)', alignItems: 'center', marginTop: 8 }} onPress={() => setShowAddCat(true)}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#00C9A7', fontFamily: ff }}><Feather name="plus-circle" size={16} color="#00C9A7" />  Add Category</Text>
      </TouchableOpacity>
      {gTotal > 0 && (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12, padding: 10, backgroundColor: 'rgba(139,92,246,0.08)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(139,92,246,0.15)' }}>
          <Text style={{ fontSize: 12, color: t.text3, fontFamily: ff }}>👤 Gowtham's Total: </Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#8B5CF6', fontFamily: ff }}>{fmt(gTotal)}</Text>
        </View>
      )}
      <View style={{ height: 40 }} />
      <AddCategoryModal visible={showAddCat} onClose={() => setShowAddCat(false)} onAdd={(c) => { onAddCategory(c); setShowAddCat(false); }} existingKeys={allCats.map(c => c.key)} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════
//  DETAIL SCREEN — 3-dot menu + dates + date filter
// ═══════════════════════════════════════════════
function DetailScreen({ data, month, catKey, onBack, onUpdate, onDeleteCategory }) {
  const t = useTheme(); const ff = useFont(); const allCats = useCats();
  const [addMode, setAddMode] = useState(false); const [editIdx, setEditIdx] = useState(null);
  const [name, setName] = useState(''); const [amount, setAmount] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [filterFrom, setFilterFrom] = useState(null);
  const [filterTo, setFilterTo] = useState(null);

  const cat = allCats.find(c => c.key === catKey) || { key: catKey, label: catKey, icon: 'folder', color: '#94a3b8', emoji: '📁' };
  const allItems = getCatItems(data, month, catKey);
  const ct = getCatTotal(data, month, catKey);

  const items = (filterFrom || filterTo) ? allItems.filter(item => {
    const d = item.created_date;
    if (!d) return false;
    if (filterFrom && d < filterFrom) return false;
    if (filterTo && d > filterTo) return false;
    return true;
  }) : allItems;

  const filteredTotal = items.reduce((s, i) => s + (i.amount || 0), 0);

  const doSave = () => {
    if (!name.trim() || !amount) return;
    const nd = JSON.parse(JSON.stringify(data));
    if (!nd[month]) nd[month] = {}; if (!nd[month][catKey]) nd[month][catKey] = [];
    if (editIdx !== null) {
      nd[month][catKey][editIdx] = { ...nd[month][catKey][editIdx], name: name.trim(), amount: Number(amount) };
    } else {
      nd[month][catKey].push({ name: name.trim(), amount: Number(amount), created_date: todayStr() });
    }
    onUpdate(nd); setName(''); setAmount(''); setEditIdx(null); setAddMode(false);
  };

  const handleDeleteAll = () => {
    if (allItems.length === 0) return;
    Alert.alert(`Delete all ${cat.label}?`, `Remove all ${allItems.length} items (${fmt(ct)}) from ${month}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete All', style: 'destructive', onPress: () => onDeleteCategory(month, catKey) },
    ]);
  };

  const menuOptions = [
    { label: 'Add Item', icon: 'plus-circle', onPress: () => { setAddMode(true); setEditIdx(null); setName(''); setAmount(''); } },
    { label: 'Delete All', icon: 'trash-2', color: '#EF476F', onPress: handleDeleteAll },
  ];

  const isFiltered = filterFrom || filterTo;

  return (
    <ScrollView style={[gs.container, { backgroundColor: t.bg }]} showsVerticalScrollIndicator={false}>
      <View style={gs.navTop}>
        <TouchableOpacity onPress={onBack}><Text style={{ color: '#00C9A7', fontSize: 15, fontWeight: '600', fontFamily: ff }}><Feather name="arrow-left" size={16} /> {month}</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShowDateFilter(true)} style={{ padding: 8, borderRadius: 10, backgroundColor: isFiltered ? 'rgba(0,201,167,0.15)' : t.card, borderWidth: 1, borderColor: isFiltered ? '#00C9A7' : t.border }}>
            <Feather name="calendar" size={18} color={isFiltered ? '#00C9A7' : t.text3} />
          </TouchableOpacity>
          <ThreeDotMenu options={menuOptions} color={cat.color} />
        </View>
      </View>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Feather name={cat.icon} size={36} color={cat.color} />
        <Text style={{ fontSize: 20, fontWeight: '700', color: t.text, marginTop: 6, fontFamily: ff }}>{cat.label}</Text>
        <Text style={{ fontSize: 26, fontWeight: '700', color: cat.color, marginTop: 4, fontFamily: ff }}>{fmt(isFiltered ? filteredTotal : ct)}</Text>
        <Text style={{ fontSize: 11, color: t.text4, fontFamily: ff }}>{month} {APP_CONFIG.year} · {items.length}{isFiltered ? ` of ${allItems.length}` : ''} items</Text>
        {isFiltered && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, backgroundColor: 'rgba(0,201,167,0.1)', borderWidth: 1, borderColor: 'rgba(0,201,167,0.2)' }}>
            <Feather name="filter" size={11} color="#00C9A7" />
            <Text style={{ fontSize: 11, color: '#00C9A7', marginLeft: 4, fontFamily: ff }}>
              {filterFrom || '...'} → {filterTo || '...'}
            </Text>
            <TouchableOpacity onPress={() => { setFilterFrom(null); setFilterTo(null); }} style={{ marginLeft: 6 }}>
              <Feather name="x" size={12} color="#00C9A7" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!addMode && <PresetChips catKey={catKey} existingItems={allItems} onSelect={n => { setName(n); setAmount(''); setAddMode(true); }} />}
      {items.map((item, idx) => {
        const realIdx = allItems.indexOf(item);
        return (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: t.card, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: t.border }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, color: t.text2, fontWeight: '500', fontFamily: ff }}>{item.name}</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: cat.color, marginTop: 2, fontFamily: ff }}>{fmt(item.amount)}</Text>
              {item.created_date && <Text style={{ fontSize: 10, color: t.text4, marginTop: 3, fontFamily: ff }}>📅 {fmtDate(item.created_date)}</Text>}
            </View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity style={{ backgroundColor: 'rgba(100,116,139,0.12)', borderRadius: 8, padding: 8 }} onPress={() => { setName(item.name); setAmount(String(item.amount)); setEditIdx(realIdx); setAddMode(true); }}><Feather name="edit-2" size={15} color={t.text3} /></TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: 'rgba(239,71,111,0.1)', borderRadius: 8, padding: 8 }} onPress={() => Alert.alert('Delete', `Remove "${item.name}"?`, [{ text: 'Cancel' }, { text: 'Delete', style: 'destructive', onPress: () => { const nd = JSON.parse(JSON.stringify(data)); nd[month][catKey].splice(realIdx, 1); onUpdate(nd); } }])}><Feather name="trash-2" size={15} color="#EF476F" /></TouchableOpacity>
            </View>
          </View>
        );
      })}
      {items.length === 0 && !addMode && <Text style={{ textAlign: 'center', padding: 30, color: t.text4, fontSize: 13, fontFamily: ff }}>{isFiltered ? 'No items match this date range.' : 'No items yet.'}</Text>}
      {addMode && (
        <View style={{ backgroundColor: t.card, borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: cat.color + '44' }}>
          <Text style={{ fontSize: 13, fontWeight: '600', color: t.text2, marginBottom: 10, fontFamily: ff }}>{editIdx !== null ? '✏️ Edit' : '➕ New Item'}</Text>
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="Item name" placeholderTextColor={t.text4} value={name} onChangeText={setName} autoFocus />
          <TextInput style={[gs.formInput, { backgroundColor: t.inputBg, color: t.text, borderColor: t.border, fontFamily: ff }]} placeholder="Amount (₹)" placeholderTextColor={t.text4} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={{ flex: 1, padding: 12, borderRadius: 8, backgroundColor: cat.color, alignItems: 'center' }} onPress={doSave}><Text style={{ color: '#0f172a', fontWeight: '700', fontFamily: ff }}>{editIdx !== null ? 'Update' : 'Add'}</Text></TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: t.border }} onPress={() => { setAddMode(false); setEditIdx(null); }}><Text style={{ color: t.text3, fontFamily: ff }}>Cancel</Text></TouchableOpacity>
          </View>
        </View>
      )}
      {!addMode && <TouchableOpacity style={{ padding: 14, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', borderColor: cat.color + '55', alignItems: 'center', marginTop: 8 }} onPress={() => { setAddMode(true); setEditIdx(null); setName(''); setAmount(''); }}><Text style={{ fontSize: 15, fontWeight: '600', color: cat.color, fontFamily: ff }}><Feather name="plus-circle" size={16} color={cat.color} />  Add New Item</Text></TouchableOpacity>}
      <View style={{ height: 40 }} />
      <DateFilterModal visible={showDateFilter} onClose={() => setShowDateFilter(false)}
        onApply={(from, to) => { setFilterFrom(from); setFilterTo(to); setShowDateFilter(false); }}
        onClear={() => { setFilterFrom(null); setFilterTo(null); setShowDateFilter(false); }} />
    </ScrollView>
  );
}

// ═══════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════
export default function App() {
  const [locked, setLocked] = useState(true);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('dashboard');
  const [month, setMonth] = useState(MONTHS[new Date().getMonth()]);
  const [cat, setCat] = useState(null);
  const [themeKey, setThemeKey] = useState(DEFAULT_THEME);
  const [fontKey, setFontKey] = useState('default');
  const [customCats, setCustomCats] = useState([]);
  const theme = THEMES[themeKey] || THEMES.dark;
  const fontFamily = FONTS[fontKey]?.family;
  const appState = useRef(AppState.currentState);
  const skipLockRef = useRef(false);

  const allCategories = [...CATEGORIES, ...customCats];

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/active/) && next === 'background' && !skipLockRef.current) {
        setLocked(true);
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (!locked) {
      (async () => {
        const [saved, savedTheme, savedFont, savedCats] = await Promise.all([loadData(), loadTheme(), loadFont(), loadCustomCategories()]);
        setData(saved || JSON.parse(JSON.stringify(INITIAL_DATA)));
        if (savedTheme && THEMES[savedTheme]) setThemeKey(savedTheme);
        if (savedFont && FONTS[savedFont]) setFontKey(savedFont);
        if (savedCats && savedCats.length) setCustomCats(savedCats);
        if (!saved) await saveData(INITIAL_DATA);
        setLoading(false);
      })();
    }
  }, [locked]);

  useEffect(() => {
    if (locked) return;
    const h = BackHandler.addEventListener('hardwareBackPress', () => {
      if (screen === 'detail' && cat) { setCat(null); setScreen('month'); return true; }
      if (screen === 'month' || screen === 'settings' || screen === 'vault' || screen === 'cards') { setScreen('dashboard'); return true; }
      if (screen === 'dashboard') {
        Alert.alert('Exit MoneyPulse', 'Are you sure you want to exit?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
        ]); return true;
      }
      return false;
    });
    return () => h.remove();
  }, [locked, screen, cat]);

  const updateData = useCallback(async (nd) => { setData(nd); await saveData(nd); }, []);
  const changeTheme = async (k) => { setThemeKey(k); await saveTheme(k); };
  const changeFont = async (k) => { setFontKey(k); await saveFont(k); };
  const switchMonth = (d) => setMonth(MONTHS[(MONTHS.indexOf(month) + d + 12) % 12]);

  const deleteCategory = async (m, catKey) => {
    const nd = JSON.parse(JSON.stringify(data));
    if (nd[m] && nd[m][catKey]) { nd[m][catKey] = []; }
    await updateData(nd);
  };

  const addCustomCategory = async (newCat) => {
    const updated = [...customCats, newCat];
    setCustomCats(updated);
    await saveCustomCategories(updated);
  };

  const handleReset = () => {
    Alert.alert('Reset Data', 'Reset ALL data to original?', [{ text: 'Cancel' },
      { text: 'Reset', style: 'destructive', onPress: async () => {
        const f = JSON.parse(JSON.stringify(INITIAL_DATA));
        setData(f); await clearData(); await saveData(f); setCat(null); setScreen('dashboard');
      }}]);
  };

  if (locked) return <LockScreen onUnlock={() => setLocked(false)} />;
  if (loading || !data) return (
    <View style={{ flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ActivityIndicator size="large" color="#00C9A7" /><Text style={{ color: '#00C9A7', marginTop: 12, fontSize: 15 }}>Loading MoneyPulse...</Text>
    </View>
  );

  return (
    <ThemeCtx.Provider value={theme}><FontCtx.Provider value={fontFamily}><CatsCtx.Provider value={allCategories}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <StatusBar barStyle={theme.statusBar} backgroundColor={theme.bg} />
        {screen === 'dashboard' && <DashboardScreen data={data} onSelectMonth={m => { setMonth(m); setScreen('month'); }} onSettings={() => setScreen('settings')} onVault={() => setScreen('vault')} onCards={() => setScreen('cards')} />}
        {screen === 'vault' && <VaultScreen onBack={() => setScreen('dashboard')} />}
        {screen === 'cards' && <CardsScreen onBack={() => setScreen('dashboard')} />}
        {screen === 'settings' && <SettingsScreen currentTheme={themeKey} currentFont={fontKey} onThemeChange={changeTheme} onFontChange={changeFont} onBack={() => setScreen('dashboard')} onReset={handleReset} data={data} skipLock={skipLockRef} />}
        {screen === 'month' && !cat && <MonthScreen data={data} month={month} onBack={() => setScreen('dashboard')} onSelectCat={k => { setCat(k); setScreen('detail'); }} onSwitchMonth={switchMonth} onDeleteCategory={deleteCategory} onAddCategory={addCustomCategory} />}
        {screen === 'detail' && cat && <DetailScreen data={data} month={month} catKey={cat} onBack={() => { setCat(null); setScreen('month'); }} onUpdate={updateData} onDeleteCategory={deleteCategory} />}
      </SafeAreaView>
    </CatsCtx.Provider></FontCtx.Provider></ThemeCtx.Provider>
  );
}

// ═══════════════════════════════════════════════
const ls = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center', padding: 32 },
  lockIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(0,201,167,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#f8fafc', letterSpacing: -1 },
  subtitle: { fontSize: 12, color: '#64748b', marginBottom: 32, letterSpacing: 1.5 },
  form: { width: '100%', alignItems: 'center' },
  prompt: { fontSize: 14, color: '#94a3b8', marginBottom: 20 },
  pinDots: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  dot: { width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#334155' },
  dotFilled: { backgroundColor: '#00C9A7', borderColor: '#00C9A7' },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  error: { color: '#EF476F', fontSize: 13, marginTop: 8, marginBottom: 8 },
  btn: { width: '100%', padding: 14, borderRadius: 12, backgroundColor: '#00C9A7', alignItems: 'center', marginTop: 16 },
  btnText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  linkBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  linkText: { color: '#00C9A7', fontSize: 14 },
  loadingText: { color: '#00C9A7', marginTop: 12, fontSize: 15 },
});
const gs = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  kpiCard: { flex: 1, minWidth: (width - 42) / 2, borderRadius: 14, padding: 14, borderWidth: 1 },
  kpiLabel: { fontSize: 11, fontWeight: '500', marginBottom: 6 },
  kpiValue: { fontSize: 18, fontWeight: '700', letterSpacing: -0.5 },
  section: { borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1 },
  sectionTitle: { fontSize: 13, fontWeight: '600', marginBottom: 12 },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 90 },
  barCol: { flex: 1, alignItems: 'center' },
  barFill: { width: '100%', borderTopLeftRadius: 4, borderTopRightRadius: 4, minHeight: 2 },
  barLabel: { fontSize: 9, marginTop: 4 },
  monthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  monthBtn: { width: (width - 56) / 4, paddingVertical: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center' },
  monthBtnName: { fontSize: 13, fontWeight: '600' },
  monthBtnVal: { fontSize: 10, marginTop: 2 },
  navTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 8 },
  navArrows: { flexDirection: 'row', gap: 8 },
  navArrow: { borderWidth: 1, borderRadius: 8, padding: 6, paddingHorizontal: 12 },
  catCard: { borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, overflow: 'hidden' },
  catCardBg: { position: 'absolute', top: 0, left: 0, height: '100%', opacity: 0.06 },
  catCardInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  formInput: { width: '100%', padding: 12, borderRadius: 8, borderWidth: 1, fontSize: 14, marginBottom: 8 },
});
