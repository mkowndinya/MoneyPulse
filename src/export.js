// Use legacy API for backward compatibility with Expo SDK 52+
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { MONTHS, CATEGORIES } from './data';

function getCatTotal(data, m, k) {
  return ((data[m] && data[m][k]) || []).reduce((s, i) => s + (i.amount || 0), 0);
}

function getMonthTotal(data, m) {
  if (!data[m]) return 0;
  return Object.entries(data[m]).reduce((s, [k, items]) => {
    if (k === 'gowtham') return s;
    return s + items.reduce((a, i) => a + (i.amount || 0), 0);
  }, 0);
}

export async function exportToCSV(data) {
  try {
    let csv = 'Month,Category,Item,Amount\n';
    MONTHS.forEach(m => {
      if (!data[m]) return;
      Object.entries(data[m]).forEach(([catKey, items]) => {
        const cat = CATEGORIES.find(c => c.key === catKey);
        const label = cat ? cat.label : catKey;
        items.forEach(item => {
          const name = item.name.replace(/,/g, ';');
          csv += `${m},${label},${name},${item.amount}\n`;
        });
      });
    });

    csv += '\n\nMonthly Summary\n';
    csv += 'Month,' + CATEGORIES.filter(c => c.key !== 'gowtham').map(c => c.label).join(',') + ',Total\n';
    MONTHS.forEach(m => {
      const totals = CATEGORIES.filter(c => c.key !== 'gowtham').map(c => getCatTotal(data, m, c.key));
      csv += `${m},${totals.join(',')},${getMonthTotal(data, m)}\n`;
    });

    const filename = `MoneyPulse_Export_${new Date().toISOString().split('T')[0]}.csv`;
    const filepath = FileSystem.cacheDirectory + filename;
    await FileSystem.writeAsStringAsync(filepath, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(filepath, {
        mimeType: 'text/csv',
        dialogTitle: 'Export MoneyPulse Data',
        UTI: 'public.comma-separated-values-text',
      });
      return { success: true, message: 'Exported successfully!' };
    }
    return { success: false, message: 'Sharing not available on this device' };
  } catch (e) {
    console.log('Export error:', e);
    return { success: false, message: 'Export failed: ' + e.message };
  }
}

export const SHEETS_CONFIG = {
  enabled: true,
  spreadsheetId: '',
  apiKey: '',
  instructions: [
    '1. Go to console.cloud.google.com',
    '2. Create a new project',
    '3. Enable Google Sheets API',
    '4. Create API key (restrict to Sheets API)',
    '5. Create a Google Sheet and copy its ID from the URL',
    '6. Make the sheet publicly editable (or use OAuth)',
    '7. Update SHEETS_CONFIG in src/export.js with your Sheet ID and API key',
  ],
};

export async function syncToGoogleSheets(data) {
  if (!SHEETS_CONFIG.enabled || !SHEETS_CONFIG.spreadsheetId || !SHEETS_CONFIG.apiKey) {
    return { success: false, message: 'Google Sheets not configured. See Settings → Google Sheets Setup.', needsSetup: true };
  }

  try {
    const values = [];
    values.push(['Month', 'Category', 'Item', 'Amount', 'Updated']);
    const timestamp = new Date().toLocaleString('en-IN');

    MONTHS.forEach(m => {
      if (!data[m]) return;
      Object.entries(data[m]).forEach(([catKey, items]) => {
        const cat = CATEGORIES.find(c => c.key === catKey);
        const label = cat ? cat.label : catKey;
        items.forEach(item => {
          values.push([m, label, item.name, item.amount, timestamp]);
        });
      });
    });

    // First clear the sheet
    const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/Sheet1?key=${SHEETS_CONFIG.apiKey}`;
    await fetch(clearUrl + ':clear', { method: 'POST', headers: { 'Content-Type': 'application/json' } });

    // Then write data
    const range = `Sheet1!A1:E${values.length}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_CONFIG.spreadsheetId}/values/${range}?valueInputOption=RAW&key=${SHEETS_CONFIG.apiKey}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ range, majorDimension: 'ROWS', values }),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, message: `Synced ${values.length - 1} items to Google Sheets!` };
    }
    const err = await response.json();
    return { success: false, message: err.error?.message || 'Sync failed. Check API key and Sheet permissions.' };
  } catch (e) {
    return { success: false, message: 'Network error: ' + e.message };
  }
}
