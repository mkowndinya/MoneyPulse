<p align="center">
  <img src="screenshots/dashboard.jpeg" width="250" alt="MoneyPulse Dashboard" />
</p>

<h1 align="center">💰 MoneyPulse <sup>by KM</sup></h1>

<p align="center">
  <strong>Intelligent Expense Analytics</strong><br/>
  A full-featured personal finance tracker built with React Native + Expo
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-2.1.0-00C9A7?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/expo-SDK%2052+-white?style=flat-square&logo=expo" alt="Expo" />
  <img src="https://img.shields.io/badge/react--native-0.76+-61DAFB?style=flat-square&logo=react" alt="React Native" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
</p>

<p align="center">
  <a href="https://youtube.com/shorts/gN8Qbq-Vs6k?si=4V4vo8_OaAv67GHh">🎬 Watch Demo</a> •
  <a href="#features">Features</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#installation">Installation</a> •
  <a href="#tech-stack">Tech Stack</a>
</p>

---

## About

MoneyPulse is a comprehensive personal expense analytics app designed for tracking monthly spending across multiple categories. It features biometric authentication, encrypted vaults, rich analytics, and a beautiful dark-mode-first UI with 7 theme options.

Built in under 3 hours using AI-assisted development — demonstrating how modern tools can accelerate the journey from idea to production-grade app.

---

## Features

### 🔐 Authentication
- **Fingerprint-first unlock** — biometric prompt on app launch without auto-opening the keyboard
- **PIN fallback** — 4-digit PIN setup and verification
- **Auto-lock** — re-locks when app goes to background

### 📊 Expense Analytics
- **12-month tracking** — full year overview with monthly breakdowns
- **YTD dashboard** — total spend, monthly average, highest month, active months
- **Category breakdown** — visual progress bars with percentage allocation
- **Monthly trend chart** — bar chart showing spending patterns across months

### 📅 Date Tracking & Filtering
- **Per-item timestamps** — every expense stores a creation date
- **Date range filter** — calendar icon on detail screen to filter by YYYY-MM-DD range
- **Filter badge** — shows active date range with one-tap clear

### ⋮ 3-Dot Overflow Menu
- **Add Item** — quick access from the menu
- **Delete All** — bulk delete all items in a category for the month

### ➕ Custom Categories
- **Create your own** — beyond the 6 default categories
- **Icon picker** — choose from 15 Feather icons
- **Color picker** — 10 color palette options
- **Emoji support** — custom emoji for each category
- **Persistent** — saved across app restarts

### 💳 Credit Card Vault
- **Encrypted storage** — card numbers, expiry, CVV stored securely
- **Tap to reveal** — masked by default, tap to toggle full number
- **Edit & delete** — full CRUD operations

### 🔑 Secret Vault (Password Manager)
- **Encoded passwords** — character-shift encoding for stored credentials
- **Site + username + password** — organized credential storage
- **Show/hide toggle** — eye icon to reveal passwords

### 🎨 Themes & Customization
- **7 themes** — Midnight, Deep Ocean, Emerald Night, Orange Sunset, Warm Beige, Clean White, Royal Purple
- **3 fonts** — System Default, Monospace, Serif
- **Persistent preferences** — theme and font saved locally

### 📤 Export & Sync
- **CSV export** — share to Google Drive, WhatsApp, or any app
- **Google Sheets sync** — direct push to a connected spreadsheet

---

## Screenshots

<table>
  <tr>
    <td align="center"><img src="screenshots/dashboard.jpeg" width="220" /><br/><strong>Dashboard</strong><br/><sub>YTD analytics, monthly trend,<br/>category breakdown</sub></td>
    <td align="center"><img src="screenshots/essentials-detail.jpeg" width="220" /><br/><strong>Category Detail</strong><br/><sub>3-dot menu, calendar filter,<br/>date stamps on items</sub></td>
    <td align="center"><img src="screenshots/homecare-detail.jpeg" width="220" /><br/><strong>Home Care</strong><br/><sub>Quick add chips, per-item<br/>dates, edit/delete actions</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="screenshots/cards-vault.jpeg" width="220" /><br/><strong>Card Vault</strong><br/><sub>Encrypted card storage,<br/>tap to reveal number</sub></td>
    <td align="center"><img src="screenshots/secret-vault.jpeg" width="220" /><br/><strong>Secret Vault</strong><br/><sub>Password manager with<br/>show/hide toggle</sub></td>
    <td align="center"><img src="screenshots/settings.jpeg" width="220" /><br/><strong>Settings</strong><br/><sub>7 themes, 3 fonts,<br/>export & sync options</sub></td>
  </tr>
</table>

---

## Installation

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS device or emulator

### Quick Start

```bash
# Clone the repository
git clone https://github.com/mkowndinya/MoneyPulse.git
cd MoneyPulse

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the Camera app (iOS) to run on your device.

### Dependencies

```
expo
react-native
react-native-safe-area-context
@expo/vector-icons
expo-local-authentication
@react-native-async-storage/async-storage
expo-file-system
expo-sharing
```

---

## Project Structure

```
MoneyPulse/
├── App.js                    # Main app — all screens & navigation
├── src/
│   ├── data.js               # Categories, themes, fonts, demo data (12 months)
│   ├── storage.js            # AsyncStorage CRUD for data, theme, font, cards, custom categories
│   ├── auth.js               # Biometric + PIN authentication
│   ├── vault.js              # Password vault with character-shift encoding
│   └── export.js             # CSV export + Google Sheets sync
├── screenshots/              # App screenshots for README
├── package.json
├── app.json
└── babel.config.js
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React Native + Expo SDK 52+ |
| State | React Context + useState/useCallback |
| Storage | AsyncStorage (local, encrypted vaults) |
| Auth | expo-local-authentication (biometric) |
| Icons | @expo/vector-icons (Feather) |
| Export | expo-file-system + expo-sharing |
| Architecture | Single-file component design, context-based theming |

---

## Default Categories

| Category | Icon | Color | Description |
|----------|------|-------|-------------|
| Essentials | 🏠 | Teal | Rent, bills, recharges |
| Health & Wellness | 💪 | Green | Yoga, medicine, travel |
| Personal/Family | 👨‍👩‍👧 | Yellow | Loans, investments, gifts |
| Card Transactions | 💳 | Blue | Credit card payments |
| Home Care | 🏡 | Pink | Groceries, utilities, fuel |
| Gowtham's Expenses | 👤 | Purple | Shared/family member expenses |

*Custom categories can be added with your own icon, color, and emoji.*

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| **2.1.0** | Mar 2026 | 3-dot menu, fingerprint-first auth, date tracking with filter, custom categories, 12-month demo data |
| **2.0.0** | Mar 2026 | Multi-theme (7), font selector, credit card vault, password vault, Google Sheets sync |
| **1.0.0** | Feb 2026 | Initial release — basic expense tracking, PIN auth, CSV export |

---

## The Story Behind MoneyPulse

In **2015**, I built my first app — **EDZE** — as a JNTUK University student. It mapped engineering colleges and surrounding industries around Kakinada to help students discover placement opportunities. Built on MIT App Inventor 2 under the guidance of **S. Veerabadraiah sir** and inspired by **Dr. J.V.R. Murthy sir**, EDZE won **first prize at university level**.

**11 years later**, with 9+ years of enterprise IT experience as an Observability Specialist, I built MoneyPulse in under 3 hours using AI-assisted development — a testament to how far the tools have evolved, while the drive to build remains the same.

> [🎬 Watch the EDZE demo (2015)](https://www.youtube.com/watch?v=w17lbsfAkhQ)

---

## Author

**Kowndinya Mannepalli**
*SRE & Observability Specialist*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-kowndinymv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kowndinymv/)
[![GitHub](https://img.shields.io/badge/GitHub-mkowndinya-181717?style=flat-square&logo=github)](https://github.com/mkowndinya)

---

<p align="center">
  <sub>Built with ❤️ using React Native + Expo | Cloud-Native Architecture</sub>
</p>
