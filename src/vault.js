import AsyncStorage from '@react-native-async-storage/async-storage';

const VAULT_KEY = '@moneypulse_vault';
const ENCODE_SHIFT = 7;

function encode(text) {
  return text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + ENCODE_SHIFT)).join('');
}

function decode(text) {
  return text.split('').map(c => String.fromCharCode(c.charCodeAt(0) - ENCODE_SHIFT)).join('');
}

export async function loadVault() {
  try {
    const raw = await AsyncStorage.getItem(VAULT_KEY);
    if (!raw) return [];
    const items = JSON.parse(raw);
    return items.map(item => ({
      ...item,
      password: decode(item.password),
    }));
  } catch (e) {
    console.log('Vault load error:', e);
    return [];
  }
}

export async function saveVault(items) {
  try {
    const encoded = items.map(item => ({
      ...item,
      password: encode(item.password),
    }));
    await AsyncStorage.setItem(VAULT_KEY, JSON.stringify(encoded));
  } catch (e) {
    console.log('Vault save error:', e);
  }
}

export async function clearVault() {
  try { await AsyncStorage.removeItem(VAULT_KEY); }
  catch (e) { console.log('Vault clear error:', e); }
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}
