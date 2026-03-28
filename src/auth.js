import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PIN_KEY = '@moneypulse_pin';

export async function checkBiometricSupport() {
  const compatible = await LocalAuthentication.hasHardwareAsync();
  const enrolled = await LocalAuthentication.isEnrolledAsync();
  return { compatible, enrolled };
}

export async function authenticateWithBiometric() {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock MoneyPulse',
      fallbackLabel: 'Use PIN instead',
      disableDeviceFallback: false,
      cancelLabel: 'Cancel',
    });
    return result.success;
  } catch (e) {
    console.log('Biometric error:', e);
    return false;
  }
}

export async function savePin(pin) {
  try { await AsyncStorage.setItem(PIN_KEY, pin); }
  catch (e) { console.log('PIN save error:', e); }
}

export async function getPin() {
  try { return await AsyncStorage.getItem(PIN_KEY); }
  catch (e) { return null; }
}

export async function hasPin() {
  const pin = await getPin();
  return pin !== null;
}

export async function verifyPin(input) {
  const stored = await getPin();
  return stored === input;
}

export async function removePin() {
  try { await AsyncStorage.removeItem(PIN_KEY); }
  catch (e) { console.log('PIN remove error:', e); }
}
