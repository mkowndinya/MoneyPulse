<p align="center">
  <img src="https://img.shields.io/badge/Money-Pulse-00C9A7?style=for-the-badge&labelColor=0f172a&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEM5QTciIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0iTTEyIDFhMyAzIDAgMCAwLTMgM3YxYTMgMyAwIDAgMCA2IDBWNGEzIDMgMCAwIDAtMy0zeiIvPjxwYXRoIGQ9Ik0xOS4xIDQuOWMtLjItLjItLjUtLjItLjcgMGwtNy44IDcuOC03LjgtNy44Yy0uMi0uMi0uNS0uMi0uNyAwLS4yLjItLjIuNSAwIC43bDcuOCA3LjgtNy44IDcuOGMtLjIuMi0uMi41IDAgLjcuMi4yLjUuMi43IDBsNy44LTcuOCA3LjggNy44Yy4yLjIuNS4yLjcgMCAuMi0uMi4yLS41IDAtLjdsLTcuOC03LjggNy44LTcuOGMuMi0uMi4yLS41IDAtLjd6Ii8+PC9zdmc+" alt="MoneyPulse"/>
  <br/>
  <strong style="font-size: 24px;">MoneyPulse by KM</strong>
</p>

<p align="center">
  <em>Intelligent Expense Analytics — Track, Analyze & Optimize Your Finances</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.76-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-SDK_52-000020?style=flat-square&logo=expo&logoColor=white" alt="Expo"/>
  <img src="https://img.shields.io/badge/Platform-Android_|_iOS_|_Web-00C9A7?style=flat-square" alt="Platform"/>
  <img src="https://img.shields.io/badge/License-All_Rights_Reserved-EF476F?style=flat-square" alt="License"/>
  <img src="https://img.shields.io/badge/Status-Active-06D6A0?style=flat-square" alt="Status"/>
</p>

---

## 🎯 Overview

**MoneyPulse** is a cross-platform personal finance tracker built with React Native and Expo. Designed for real-world expense monitoring with category-wise breakdown, multi-bank card tracking, and interactive dashboards — all running natively on Android, iOS, and Web.

> Built by **Kowndinya Mannepalli** — Observability Specialist at Amgen, with 9+ years of enterprise IT experience.

---

## ✨ Key Features

### 📊 Smart Dashboard
- Year-to-date spend overview with KPI cards
- Interactive monthly bar chart with tap-to-drill navigation
- Category-wise YTD breakdown with visual progress indicators
- Real-time percentage share calculations

### 📅 Monthly Expense Management
- 6 categorized expense groups: Essentials, Health & Wellness, Personal/Family, Card Transactions, Home Care, and separate Gowtham's Expenses tracking
- Per-month summary with automatic total calculations
- Quick navigation between months with swipe-style arrows

### ⚡ Quick-Add with Presets
- Pre-configured item names for every category (20+ bank/card names, grocery items, recurring bills)
- Smart autocomplete suggestions while typing
- One-tap preset chips — select name, enter amount, done

### 🎨 5 Premium Themes
| Theme | Style |
|-------|-------|
| 🌙 Midnight | Default dark navy |
| 🌊 Deep Ocean | Rich blue tones |
| 🌿 Emerald Night | Forest green palette |
| ☀️ Clean White | Light mode |
| 👑 Royal Purple | Deep purple aesthetic |

### 💾 Persistent Local Storage
- All data saved locally on device using AsyncStorage
- Theme preference remembered across sessions
- Zero cloud dependency — your data stays on your device

---

## 📸 Screenshots

<!-- Add your screenshots here after building the APK -->
<!-- Recommended: Dashboard | Month View | Category Detail | Settings -->

| Dashboard | Month View | Category Detail | Settings |
|:---------:|:----------:|:---------------:|:--------:|


>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React Native 0.76 |
| **Platform** | Expo SDK 52 |
| **State Management** | React Hooks (useState, useEffect, useCallback, useContext) |
| **Storage** | @react-native-async-storage/async-storage |
| **Theming** | Custom Context API with 5 dynamic themes |
| **Icons** | @expo/vector-icons (Feather) |
| **Build** | EAS Build (Cloud APK generation) |
| **Architecture** | Component-based, single-file modular design |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo Go](https://expo.dev/client) app on your phone (for development)
- VS Code (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/moneypulse-by-km.git

# Navigate to project
cd moneypulse-by-km

# Install dependencies
npm install

# Start development server
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

### Build APK (Android)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build -p android --profile preview
```

---

## 📁 Project Structure

```
moneypulse-by-km/
├── App.js                 # Main application (Dashboard, Month, Detail, Settings screens)
├── src/
│   ├── data.js            # Categories, presets, themes, initial data, app config
│   └── storage.js         # AsyncStorage wrapper (data + theme persistence)
├── assets/
│   ├── icon.png           # App icon
│   └── favicon.png        # Web favicon
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── eas.json               # EAS Build configuration
├── babel.config.js        # Babel setup
└── README.md              # This file
```

---

## 📋 Expense Categories

| Category | Tracked Items |
|----------|--------------|
| 🏠 **Essentials** | Rent, Family support, Bills |
| 💪 **Health & Wellness** | Yoga, Travel, Medicine |
| 👨‍👩‍👧 **Personal/Family** | Gold Loan, Investment plans, Gifts |
| 💳 **Card Transactions** | 20+ bank/card accounts (AXIS, HDFC, ICICI, SBI, RBL, etc.) |
| 🏡 **Home Care** | Groceries, Milk, Meat, Fruits, Vegetables, Power, Internet, Gas |
| 👤 **Other Expenses** | Tracked separately, excluded from main totals |

---

## 🗺️ Roadmap

- [x] Multi-category expense tracking
- [x] Interactive dashboard with KPI cards
- [x] 5 premium themes with persistence
- [x] Preset quick-add for all categories
- [x] Smart autocomplete suggestions
- [ ] Monthly budget limits with alerts
- [ ] Export to CSV/Excel
- [ ] Charts & graphs (pie chart, line trends)
- [ ] Recurring expense auto-fill
- [ ] Cloud sync (optional)
- [ ] Biometric lock (fingerprint/face)

---

## 🧑‍💻 About the Developer

**Kowndinya Mannepalli**
- 🏢 Observability Specialist at Amgen, Hyderabad
- 📜 Certified: Azure AZ-104, AZ-400, Dynatrace Associate
- 🎓 9+ years in Enterprise IT (TCS → Infosys → Amgen)
- 🧠 AIOps Educator — Daily teaching practice for students
- 🔧 Specializing in Dynatrace, Cloud Infrastructure, DevOps

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/kowndinyamv/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/mkowndinya)

---

## 📄 License

© 2026 Kowndinya Mannepalli. All rights reserved.

This project is shared for **viewing and educational purposes only**. No permission is granted to copy, modify, distribute, or use this code in any form without explicit written consent from the author.

---

<p align="center">
  <strong>Money</strong><span style="color: #00C9A7">Pulse</span> by KM<br/>
  <em>Built with ❤️ using React Native + Expo | Cloud-Native Architecture</em>
</p>
