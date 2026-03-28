import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_KEY = '@moneypulse_data';
const THEME_KEY = '@moneypulse_theme';
const FONT_KEY = '@moneypulse_font';
const CARDS_KEY = '@moneypulse_cards';
const CUSTOM_CATS_KEY = '@moneypulse_custom_cats';

export async function loadData() {
  try { const j = await AsyncStorage.getItem(DATA_KEY); return j ? JSON.parse(j) : null; }
  catch (e) { return null; }
}
export async function saveData(data) {
  try { await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data)); } catch (e) {}
}
export async function clearData() {
  try { await AsyncStorage.removeItem(DATA_KEY); } catch (e) {}
}
export async function loadTheme() {
  try { return await AsyncStorage.getItem(THEME_KEY); } catch (e) { return null; }
}
export async function saveTheme(t) {
  try { await AsyncStorage.setItem(THEME_KEY, t); } catch (e) {}
}
export async function loadFont() {
  try { return await AsyncStorage.getItem(FONT_KEY); } catch (e) { return null; }
}
export async function saveFont(f) {
  try { await AsyncStorage.setItem(FONT_KEY, f); } catch (e) {}
}
export async function loadCards() {
  try { const j = await AsyncStorage.getItem(CARDS_KEY); return j ? JSON.parse(j) : []; }
  catch (e) { return []; }
}
export async function saveCards(cards) {
  try { await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards)); } catch (e) {}
}
export async function loadCustomCategories() {
  try { const j = await AsyncStorage.getItem(CUSTOM_CATS_KEY); return j ? JSON.parse(j) : []; }
  catch (e) { return []; }
}
export async function saveCustomCategories(cats) {
  try { await AsyncStorage.setItem(CUSTOM_CATS_KEY, JSON.stringify(cats)); } catch (e) {}
}
