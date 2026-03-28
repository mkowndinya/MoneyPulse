export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const CATEGORIES = [
  { key: "essentials", label: "Essentials", icon: "home", color: "#00C9A7", emoji: "🏠" },
  { key: "health", label: "Health & Wellness", icon: "heart", color: "#06D6A0", emoji: "💪" },
  { key: "personal", label: "Personal/Family", icon: "users", color: "#FFD166", emoji: "👨‍👩‍👧" },
  { key: "cards", label: "Card Transactions", icon: "credit-card", color: "#118AB2", emoji: "💳" },
  { key: "homecare", label: "Home Care", icon: "shopping-bag", color: "#EF476F", emoji: "🏡" },
  { key: "gowtham", label: "Gowtham's Expenses", icon: "user", color: "#8B5CF6", emoji: "👤" },
];

export const CUSTOM_CAT_COLORS = [
  "#E67E22", "#1ABC9C", "#9B59B6", "#3498DB", "#E74C3C",
  "#2ECC71", "#F39C12", "#8E44AD", "#16A085", "#D35400",
];

export const CUSTOM_CAT_ICONS = [
  "folder", "tag", "briefcase", "truck", "gift",
  "book", "headphones", "camera", "globe", "tool",
  "package", "zap", "award", "map-pin", "coffee",
];

export const PRESET_ITEMS = {
  essentials: ["Rent", "Amma", "Electricity", "Water Bill", "Mobile Recharge"],
  health: ["Yoga", "Travel", "Medicine", "Gym", "Health Checkup", "Insurance Premium"],
  personal: ["Gold_Loan", "Inv_plan", "Gifts", "Shopping", "Charity", "Events"],
  cards: [
    "AU", "AXIS - F", "AXIS - A", "AXIS - R", "BOB", "DBS",
    "HDFC", "HDFC-N", "HSBC", "ICICI", "ICICI - R", "Indus",
    "ONE", "RBL - P", "RBL-B", "Canara_Nana", "SBI",
    "A_HDFC", "M_HDFC", "Gold_Loan", "Inv_plan",
  ],
  homecare: [
    "Groceries", "Milk", "Meat", "Fruits", "Vegetables",
    "Power", "Bike", "Internet", "Dishwasher", "Robo", "Gas",
  ],
  gowtham: [
    "Insurance", "Netflix+Paper", "Amazon", "ETV Win",
    "Internet - HSBC", "ICICI", "Groceries",
  ],
};

export const FONTS = {
  default: { key: "default", label: "System Default", family: undefined },
  mono: { key: "mono", label: "Monospace", family: "monospace" },
  serif: { key: "serif", label: "Serif", family: "serif" },
};

export const THEMES = {
  dark: {
    key: "dark", label: "Midnight", icon: "moon",
    bg: "#0f172a", card: "rgba(30,41,59,0.75)", cardSolid: "#1e293b",
    surface: "#1e293b", text: "#f8fafc", text2: "#cbd5e1", text3: "#94a3b8",
    text4: "#64748b", border: "rgba(100,116,139,0.15)", inputBg: "#0f172a",
    statusBar: "light-content",
  },
  ocean: {
    key: "ocean", label: "Deep Ocean", icon: "droplet",
    bg: "#0a1628", card: "rgba(19,39,68,0.8)", cardSolid: "#132744",
    surface: "#132744", text: "#e8f4f8", text2: "#b8d4e3", text3: "#7ba7c2",
    text4: "#4d7a99", border: "rgba(75,130,175,0.15)", inputBg: "#0a1628",
    statusBar: "light-content",
  },
  emerald: {
    key: "emerald", label: "Emerald Night", icon: "feather",
    bg: "#0a1a14", card: "rgba(18,51,42,0.8)", cardSolid: "#12332a",
    surface: "#12332a", text: "#e8f8f2", text2: "#b8e3d1", text3: "#7ac2a7",
    text4: "#4d9980", border: "rgba(75,175,140,0.15)", inputBg: "#0a1a14",
    statusBar: "light-content",
  },
  orange: {
    key: "orange", label: "Orange Sunset", icon: "sunrise",
    bg: "#1a0f08", card: "rgba(51,30,18,0.8)", cardSolid: "#33200e",
    surface: "#33200e", text: "#fef3e8", text2: "#e3c8a8", text3: "#c29460",
    text4: "#996b3a", border: "rgba(175,120,60,0.18)", inputBg: "#1a0f08",
    statusBar: "light-content",
  },
  beige: {
    key: "beige", label: "Warm Beige", icon: "coffee",
    bg: "#f5f0e8", card: "rgba(255,255,255,0.85)", cardSolid: "#ffffff",
    surface: "#ffffff", text: "#2c2418", text2: "#5c4a32", text3: "#8a7556",
    text4: "#b09a78", border: "rgba(90,70,40,0.12)", inputBg: "#ede7db",
    statusBar: "dark-content",
  },
  light: {
    key: "light", label: "Clean White", icon: "sun",
    bg: "#f0f4f8", card: "rgba(255,255,255,0.9)", cardSolid: "#ffffff",
    surface: "#ffffff", text: "#0f172a", text2: "#334155", text3: "#64748b",
    text4: "#94a3b8", border: "rgba(0,0,0,0.08)", inputBg: "#f8fafc",
    statusBar: "dark-content",
  },
  royal: {
    key: "royal", label: "Royal Purple", icon: "star",
    bg: "#120a28", card: "rgba(30,18,68,0.8)", cardSolid: "#1e1244",
    surface: "#1e1244", text: "#f0e8f8", text2: "#d1b8e3", text3: "#a77ac2",
    text4: "#7a4d99", border: "rgba(130,75,175,0.15)", inputBg: "#120a28",
    statusBar: "light-content",
  },
};

export const DEFAULT_THEME = "dark";

export const APP_CONFIG = {
  appName: "MoneyPulse",
  appSuffix: "by KM",
  tagline: "Intelligent Expense Analytics",
  fullName: "Kowndinya Mannepalli",
  title: "SRE & Observability Specialist",
  version: "2.1.0",
  year: 2026,
  linkedInNote: "Built with React Native + Expo | Cloud-Native Architecture",
};

// ═══════════════════════════════════════════════════════
//  DEMO DATA — 12 months with realistic Indian expenses
// ═══════════════════════════════════════════════════════
export const INITIAL_DATA = {
  // ── JANUARY ──
  Jan: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-01-01" },
      { name: "Amma", amount: 20000, created_date: "2026-01-05" },
      { name: "Electricity", amount: 2400, created_date: "2026-01-08" },
      { name: "Water Bill", amount: 350, created_date: "2026-01-10" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-01-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-01-03" },
      { name: "Travel", amount: 5000, created_date: "2026-01-10" },
      { name: "Medicine", amount: 3000, created_date: "2026-01-14" },
      { name: "Health Checkup", amount: 4500, created_date: "2026-01-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-01-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-01-07" },
      { name: "Gifts", amount: 3500, created_date: "2026-01-26" },
    ],
    cards: [
      { name: "AXIS - F", amount: 227, created_date: "2026-01-05" },
      { name: "AXIS - R", amount: 5969, created_date: "2026-01-08" },
      { name: "DBS", amount: 3645, created_date: "2026-01-10" },
      { name: "HDFC-N", amount: 410, created_date: "2026-01-12" },
      { name: "ICICI", amount: 4456, created_date: "2026-01-15" },
      { name: "Indus", amount: 2492, created_date: "2026-01-18" },
      { name: "RBL - P", amount: 7412, created_date: "2026-01-20" },
      { name: "SBI", amount: 103, created_date: "2026-01-22" },
      { name: "M_HDFC", amount: 5407, created_date: "2026-01-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5000, created_date: "2026-01-02" },
      { name: "Milk", amount: 3000, created_date: "2026-01-02" },
      { name: "Meat", amount: 2000, created_date: "2026-01-05" },
      { name: "Fruits", amount: 2400, created_date: "2026-01-06" },
      { name: "Vegetables", amount: 2000, created_date: "2026-01-08" },
      { name: "Power", amount: 2000, created_date: "2026-01-10" },
      { name: "Bike", amount: 1500, created_date: "2026-01-12" },
      { name: "Internet", amount: 1500, created_date: "2026-01-14" },
      { name: "Dishwasher", amount: 800, created_date: "2026-01-16" },
      { name: "Robo", amount: 900, created_date: "2026-01-18" },
      { name: "Gas", amount: 650, created_date: "2026-01-20" },
    ],
    gowtham: [
      { name: "Insurance", amount: 22702, created_date: "2026-01-05" },
      { name: "Fans+Taps", amount: 10344, created_date: "2026-01-08" },
      { name: "GST_Tab", amount: 5172, created_date: "2026-01-12" },
      { name: "Groceries", amount: 1004, created_date: "2026-01-18" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-01-22" },
    ],
  },

  // ── FEBRUARY ──
  Feb: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-02-01" },
      { name: "Amma", amount: 20000, created_date: "2026-02-05" },
      { name: "Electricity", amount: 2200, created_date: "2026-02-09" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-02-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-02-01" },
      { name: "Travel", amount: 5000, created_date: "2026-02-08" },
      { name: "Medicine", amount: 3000, created_date: "2026-02-15" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-02-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-02-07" },
    ],
    cards: [
      { name: "AXIS - F", amount: 15663, created_date: "2026-02-05" },
      { name: "AXIS - A", amount: 5333, created_date: "2026-02-08" },
      { name: "AXIS - R", amount: 17167, created_date: "2026-02-10" },
      { name: "HDFC", amount: 43, created_date: "2026-02-12" },
      { name: "HDFC-N", amount: 4470, created_date: "2026-02-14" },
      { name: "ICICI", amount: 13237, created_date: "2026-02-16" },
      { name: "Indus", amount: 1225, created_date: "2026-02-18" },
      { name: "ONE", amount: 317, created_date: "2026-02-20" },
      { name: "RBL - P", amount: 5334, created_date: "2026-02-22" },
      { name: "SBI", amount: 6656, created_date: "2026-02-24" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-02-26" },
    ],
    homecare: [
      { name: "Groceries", amount: 5000, created_date: "2026-02-02" },
      { name: "Milk", amount: 3000, created_date: "2026-02-02" },
      { name: "Meat", amount: 2000, created_date: "2026-02-05" },
      { name: "Fruits", amount: 2400, created_date: "2026-02-06" },
      { name: "Vegetables", amount: 2000, created_date: "2026-02-08" },
      { name: "Power", amount: 2000, created_date: "2026-02-10" },
      { name: "Bike", amount: 1500, created_date: "2026-02-12" },
      { name: "Internet", amount: 1500, created_date: "2026-02-14" },
      { name: "Dishwasher", amount: 800, created_date: "2026-02-16" },
      { name: "Robo", amount: 900, created_date: "2026-02-18" },
      { name: "Gas", amount: 650, created_date: "2026-02-20" },
    ],
    gowtham: [
      { name: "Internet - HSBC", amount: 1500, created_date: "2026-02-05" },
      { name: "ICICI", amount: 36543, created_date: "2026-02-10" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-02-15" },
      { name: "Amazon", amount: 650, created_date: "2026-02-18" },
      { name: "ETV Win", amount: 300, created_date: "2026-02-22" },
    ],
  },

  // ── MARCH ──
  Mar: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-03-01" },
      { name: "Amma", amount: 20000, created_date: "2026-03-05" },
      { name: "Electricity", amount: 2800, created_date: "2026-03-10" },
      { name: "Water Bill", amount: 400, created_date: "2026-03-12" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-03-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-03-01" },
      { name: "Travel", amount: 5000, created_date: "2026-03-10" },
      { name: "Medicine", amount: 3000, created_date: "2026-03-18" },
      { name: "Gym", amount: 2500, created_date: "2026-03-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-03-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-03-07" },
      { name: "Shopping", amount: 8500, created_date: "2026-03-22" },
    ],
    cards: [
      { name: "AXIS - F", amount: 105, created_date: "2026-03-03" },
      { name: "AXIS - A", amount: 356, created_date: "2026-03-05" },
      { name: "AXIS - R", amount: 5418, created_date: "2026-03-08" },
      { name: "BOB", amount: 7323, created_date: "2026-03-10" },
      { name: "DBS", amount: 67, created_date: "2026-03-12" },
      { name: "HDFC", amount: 4590, created_date: "2026-03-14" },
      { name: "HDFC-N", amount: 3426, created_date: "2026-03-16" },
      { name: "HSBC", amount: 2058, created_date: "2026-03-18" },
      { name: "ICICI", amount: 991, created_date: "2026-03-20" },
      { name: "Indus", amount: 255, created_date: "2026-03-22" },
      { name: "ONE", amount: 1021, created_date: "2026-03-24" },
      { name: "RBL - P", amount: 3183, created_date: "2026-03-25" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-03-26" },
      { name: "HSBC_Gow", amount: 21620, created_date: "2026-03-27" },
      { name: "Gowtham", amount: 3239, created_date: "2026-03-28" },
    ],
    homecare: [
      { name: "Groceries", amount: 5500, created_date: "2026-03-02" },
      { name: "Milk", amount: 3000, created_date: "2026-03-02" },
      { name: "Meat", amount: 2200, created_date: "2026-03-05" },
      { name: "Fruits", amount: 2400, created_date: "2026-03-06" },
      { name: "Vegetables", amount: 2200, created_date: "2026-03-09" },
      { name: "Power", amount: 2000, created_date: "2026-03-11" },
      { name: "Bike", amount: 1500, created_date: "2026-03-13" },
      { name: "Internet", amount: 1500, created_date: "2026-03-15" },
      { name: "Dishwasher", amount: 800, created_date: "2026-03-17" },
      { name: "Robo", amount: 900, created_date: "2026-03-19" },
      { name: "Gas", amount: 650, created_date: "2026-03-22" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-03-05" },
      { name: "Amazon", amount: 650, created_date: "2026-03-12" },
      { name: "ETV Win", amount: 300, created_date: "2026-03-20" },
    ],
  },

  // ── APRIL ──
  Apr: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-04-01" },
      { name: "Amma", amount: 20000, created_date: "2026-04-05" },
      { name: "Electricity", amount: 3200, created_date: "2026-04-08" },
      { name: "Water Bill", amount: 450, created_date: "2026-04-10" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-04-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-04-01" },
      { name: "Travel", amount: 8000, created_date: "2026-04-12" },
      { name: "Medicine", amount: 2500, created_date: "2026-04-18" },
      { name: "Insurance Premium", amount: 15000, created_date: "2026-04-25" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-04-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-04-07" },
      { name: "Events", amount: 12000, created_date: "2026-04-14" },
      { name: "Charity", amount: 5000, created_date: "2026-04-20" },
    ],
    cards: [
      { name: "AXIS - F", amount: 6758, created_date: "2026-04-05" },
      { name: "AXIS - A", amount: 2286, created_date: "2026-04-08" },
      { name: "AXIS - R", amount: 14558, created_date: "2026-04-10" },
      { name: "HDFC", amount: 21433, created_date: "2026-04-12" },
      { name: "ICICI", amount: 220, created_date: "2026-04-15" },
      { name: "Indus", amount: 2063, created_date: "2026-04-18" },
      { name: "RBL - P", amount: 27531, created_date: "2026-04-20" },
      { name: "SBI", amount: 174, created_date: "2026-04-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-04-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5500, created_date: "2026-04-02" },
      { name: "Milk", amount: 3000, created_date: "2026-04-02" },
      { name: "Meat", amount: 2500, created_date: "2026-04-05" },
      { name: "Fruits", amount: 2400, created_date: "2026-04-07" },
      { name: "Vegetables", amount: 2200, created_date: "2026-04-09" },
      { name: "Power", amount: 2500, created_date: "2026-04-11" },
      { name: "Bike", amount: 1500, created_date: "2026-04-13" },
      { name: "Internet", amount: 1500, created_date: "2026-04-15" },
      { name: "Dishwasher", amount: 800, created_date: "2026-04-17" },
      { name: "Robo", amount: 900, created_date: "2026-04-19" },
      { name: "Gas", amount: 650, created_date: "2026-04-22" },
    ],
    gowtham: [
      { name: "Insurance", amount: 22702, created_date: "2026-04-05" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-04-10" },
      { name: "Amazon", amount: 650, created_date: "2026-04-15" },
      { name: "Groceries", amount: 2100, created_date: "2026-04-20" },
    ],
  },

  // ── MAY ──
  May: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-05-01" },
      { name: "Amma", amount: 20000, created_date: "2026-05-05" },
      { name: "Electricity", amount: 3500, created_date: "2026-05-10" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-05-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-05-01" },
      { name: "Travel", amount: 6000, created_date: "2026-05-10" },
      { name: "Medicine", amount: 1800, created_date: "2026-05-18" },
      { name: "Gym", amount: 2500, created_date: "2026-05-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-05-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-05-07" },
      { name: "Gifts", amount: 6000, created_date: "2026-05-12" },
    ],
    cards: [
      { name: "AXIS - F", amount: 3200, created_date: "2026-05-05" },
      { name: "AXIS - R", amount: 8400, created_date: "2026-05-10" },
      { name: "HDFC", amount: 12500, created_date: "2026-05-12" },
      { name: "ICICI", amount: 6800, created_date: "2026-05-15" },
      { name: "RBL - P", amount: 9200, created_date: "2026-05-18" },
      { name: "SBI", amount: 2100, created_date: "2026-05-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-05-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 6000, created_date: "2026-05-02" },
      { name: "Milk", amount: 3200, created_date: "2026-05-02" },
      { name: "Meat", amount: 2500, created_date: "2026-05-06" },
      { name: "Fruits", amount: 2800, created_date: "2026-05-08" },
      { name: "Vegetables", amount: 2500, created_date: "2026-05-10" },
      { name: "Power", amount: 2500, created_date: "2026-05-12" },
      { name: "Bike", amount: 1500, created_date: "2026-05-14" },
      { name: "Internet", amount: 1500, created_date: "2026-05-16" },
      { name: "Gas", amount: 700, created_date: "2026-05-20" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-05-05" },
      { name: "Internet - HSBC", amount: 1500, created_date: "2026-05-10" },
      { name: "ETV Win", amount: 300, created_date: "2026-05-20" },
    ],
  },

  // ── JUNE ──
  Jun: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-06-01" },
      { name: "Amma", amount: 20000, created_date: "2026-06-05" },
      { name: "Electricity", amount: 4200, created_date: "2026-06-10" },
      { name: "Water Bill", amount: 500, created_date: "2026-06-12" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-06-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-06-01" },
      { name: "Travel", amount: 15000, created_date: "2026-06-14" },
      { name: "Medicine", amount: 2200, created_date: "2026-06-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-06-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-06-07" },
      { name: "Shopping", amount: 15000, created_date: "2026-06-18" },
      { name: "Events", amount: 8000, created_date: "2026-06-25" },
    ],
    cards: [
      { name: "AXIS - F", amount: 4500, created_date: "2026-06-05" },
      { name: "AXIS - A", amount: 3200, created_date: "2026-06-08" },
      { name: "AXIS - R", amount: 11000, created_date: "2026-06-10" },
      { name: "BOB", amount: 5600, created_date: "2026-06-12" },
      { name: "HDFC", amount: 8900, created_date: "2026-06-15" },
      { name: "ICICI", amount: 7200, created_date: "2026-06-18" },
      { name: "Indus", amount: 1800, created_date: "2026-06-20" },
      { name: "RBL - P", amount: 14000, created_date: "2026-06-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-06-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5500, created_date: "2026-06-02" },
      { name: "Milk", amount: 3000, created_date: "2026-06-02" },
      { name: "Meat", amount: 2200, created_date: "2026-06-06" },
      { name: "Fruits", amount: 3000, created_date: "2026-06-08" },
      { name: "Vegetables", amount: 2500, created_date: "2026-06-10" },
      { name: "Power", amount: 2000, created_date: "2026-06-12" },
      { name: "Bike", amount: 1500, created_date: "2026-06-14" },
      { name: "Internet", amount: 1500, created_date: "2026-06-16" },
      { name: "Gas", amount: 700, created_date: "2026-06-22" },
    ],
    gowtham: [
      { name: "Insurance", amount: 22702, created_date: "2026-06-05" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-06-10" },
      { name: "ICICI", amount: 8500, created_date: "2026-06-15" },
      { name: "Amazon", amount: 1200, created_date: "2026-06-22" },
    ],
  },

  // ── JULY ──
  Jul: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-07-01" },
      { name: "Amma", amount: 20000, created_date: "2026-07-05" },
      { name: "Electricity", amount: 4500, created_date: "2026-07-09" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-07-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-07-01" },
      { name: "Travel", amount: 4500, created_date: "2026-07-12" },
      { name: "Medicine", amount: 3500, created_date: "2026-07-18" },
      { name: "Health Checkup", amount: 6000, created_date: "2026-07-22" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-07-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-07-07" },
    ],
    cards: [
      { name: "AXIS - R", amount: 9800, created_date: "2026-07-05" },
      { name: "HDFC", amount: 15200, created_date: "2026-07-10" },
      { name: "HSBC", amount: 4300, created_date: "2026-07-14" },
      { name: "ICICI", amount: 3500, created_date: "2026-07-18" },
      { name: "RBL - P", amount: 6700, created_date: "2026-07-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-07-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5800, created_date: "2026-07-02" },
      { name: "Milk", amount: 3200, created_date: "2026-07-02" },
      { name: "Meat", amount: 2200, created_date: "2026-07-06" },
      { name: "Fruits", amount: 2800, created_date: "2026-07-08" },
      { name: "Vegetables", amount: 2400, created_date: "2026-07-10" },
      { name: "Power", amount: 2500, created_date: "2026-07-12" },
      { name: "Bike", amount: 1500, created_date: "2026-07-14" },
      { name: "Internet", amount: 1500, created_date: "2026-07-16" },
      { name: "Gas", amount: 700, created_date: "2026-07-22" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-07-05" },
      { name: "ETV Win", amount: 300, created_date: "2026-07-15" },
      { name: "Groceries", amount: 1800, created_date: "2026-07-20" },
    ],
  },

  // ── AUGUST ──
  Aug: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-08-01" },
      { name: "Amma", amount: 20000, created_date: "2026-08-05" },
      { name: "Electricity", amount: 3800, created_date: "2026-08-10" },
      { name: "Water Bill", amount: 380, created_date: "2026-08-12" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-08-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-08-01" },
      { name: "Travel", amount: 7000, created_date: "2026-08-15" },
      { name: "Medicine", amount: 2000, created_date: "2026-08-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-08-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-08-07" },
      { name: "Gifts", amount: 4000, created_date: "2026-08-15" },
    ],
    cards: [
      { name: "AXIS - F", amount: 5400, created_date: "2026-08-05" },
      { name: "AXIS - R", amount: 12300, created_date: "2026-08-10" },
      { name: "HDFC", amount: 9800, created_date: "2026-08-14" },
      { name: "ICICI", amount: 4200, created_date: "2026-08-18" },
      { name: "ONE", amount: 2100, created_date: "2026-08-20" },
      { name: "RBL - P", amount: 8500, created_date: "2026-08-22" },
      { name: "SBI", amount: 1500, created_date: "2026-08-24" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-08-26" },
    ],
    homecare: [
      { name: "Groceries", amount: 5500, created_date: "2026-08-02" },
      { name: "Milk", amount: 3000, created_date: "2026-08-02" },
      { name: "Meat", amount: 2000, created_date: "2026-08-06" },
      { name: "Fruits", amount: 2500, created_date: "2026-08-08" },
      { name: "Vegetables", amount: 2200, created_date: "2026-08-10" },
      { name: "Power", amount: 2000, created_date: "2026-08-12" },
      { name: "Bike", amount: 1500, created_date: "2026-08-14" },
      { name: "Internet", amount: 1500, created_date: "2026-08-16" },
      { name: "Gas", amount: 700, created_date: "2026-08-22" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-08-05" },
      { name: "Internet - HSBC", amount: 1500, created_date: "2026-08-10" },
      { name: "Amazon", amount: 800, created_date: "2026-08-18" },
    ],
  },

  // ── SEPTEMBER ──
  Sep: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-09-01" },
      { name: "Amma", amount: 20000, created_date: "2026-09-05" },
      { name: "Electricity", amount: 3000, created_date: "2026-09-09" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-09-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-09-01" },
      { name: "Travel", amount: 5500, created_date: "2026-09-12" },
      { name: "Medicine", amount: 2800, created_date: "2026-09-18" },
      { name: "Gym", amount: 2500, created_date: "2026-09-20" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-09-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-09-07" },
      { name: "Shopping", amount: 5000, created_date: "2026-09-25" },
    ],
    cards: [
      { name: "AXIS - F", amount: 2800, created_date: "2026-09-05" },
      { name: "AXIS - A", amount: 4100, created_date: "2026-09-08" },
      { name: "AXIS - R", amount: 7600, created_date: "2026-09-12" },
      { name: "DBS", amount: 3200, created_date: "2026-09-14" },
      { name: "HDFC", amount: 11500, created_date: "2026-09-16" },
      { name: "ICICI", amount: 5400, created_date: "2026-09-18" },
      { name: "RBL - P", amount: 10200, created_date: "2026-09-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-09-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5200, created_date: "2026-09-02" },
      { name: "Milk", amount: 3000, created_date: "2026-09-02" },
      { name: "Meat", amount: 2000, created_date: "2026-09-06" },
      { name: "Fruits", amount: 2400, created_date: "2026-09-08" },
      { name: "Vegetables", amount: 2000, created_date: "2026-09-10" },
      { name: "Power", amount: 2000, created_date: "2026-09-12" },
      { name: "Bike", amount: 1500, created_date: "2026-09-14" },
      { name: "Internet", amount: 1500, created_date: "2026-09-16" },
      { name: "Gas", amount: 650, created_date: "2026-09-22" },
    ],
    gowtham: [
      { name: "Insurance", amount: 22702, created_date: "2026-09-05" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-09-10" },
      { name: "ETV Win", amount: 300, created_date: "2026-09-20" },
    ],
  },

  // ── OCTOBER ──
  Oct: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-10-01" },
      { name: "Amma", amount: 20000, created_date: "2026-10-05" },
      { name: "Electricity", amount: 2600, created_date: "2026-10-09" },
      { name: "Water Bill", amount: 350, created_date: "2026-10-12" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-10-15" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-10-01" },
      { name: "Travel", amount: 20000, created_date: "2026-10-10" },
      { name: "Medicine", amount: 1500, created_date: "2026-10-18" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-10-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-10-07" },
      { name: "Shopping", amount: 25000, created_date: "2026-10-18" },
      { name: "Gifts", amount: 10000, created_date: "2026-10-22" },
      { name: "Events", amount: 15000, created_date: "2026-10-25" },
    ],
    cards: [
      { name: "AXIS - F", amount: 8900, created_date: "2026-10-05" },
      { name: "AXIS - R", amount: 18500, created_date: "2026-10-10" },
      { name: "HDFC", amount: 25000, created_date: "2026-10-14" },
      { name: "HDFC-N", amount: 6200, created_date: "2026-10-16" },
      { name: "ICICI", amount: 12000, created_date: "2026-10-18" },
      { name: "Indus", amount: 3500, created_date: "2026-10-20" },
      { name: "RBL - P", amount: 20000, created_date: "2026-10-22" },
      { name: "SBI", amount: 4500, created_date: "2026-10-24" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-10-26" },
    ],
    homecare: [
      { name: "Groceries", amount: 7000, created_date: "2026-10-02" },
      { name: "Milk", amount: 3000, created_date: "2026-10-02" },
      { name: "Meat", amount: 3000, created_date: "2026-10-06" },
      { name: "Fruits", amount: 3500, created_date: "2026-10-08" },
      { name: "Vegetables", amount: 2800, created_date: "2026-10-10" },
      { name: "Power", amount: 2000, created_date: "2026-10-12" },
      { name: "Bike", amount: 1500, created_date: "2026-10-14" },
      { name: "Internet", amount: 1500, created_date: "2026-10-16" },
      { name: "Gas", amount: 700, created_date: "2026-10-22" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-10-05" },
      { name: "Amazon", amount: 2500, created_date: "2026-10-12" },
      { name: "ICICI", amount: 15000, created_date: "2026-10-18" },
      { name: "Groceries", amount: 2200, created_date: "2026-10-25" },
    ],
  },

  // ── NOVEMBER ──
  Nov: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-11-01" },
      { name: "Amma", amount: 20000, created_date: "2026-11-05" },
      { name: "Electricity", amount: 2400, created_date: "2026-11-09" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-11-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-11-01" },
      { name: "Travel", amount: 4000, created_date: "2026-11-10" },
      { name: "Medicine", amount: 2000, created_date: "2026-11-16" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-11-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-11-07" },
      { name: "Shopping", amount: 8000, created_date: "2026-11-20" },
    ],
    cards: [
      { name: "AXIS - F", amount: 4200, created_date: "2026-11-05" },
      { name: "AXIS - R", amount: 9500, created_date: "2026-11-10" },
      { name: "HDFC", amount: 7800, created_date: "2026-11-14" },
      { name: "ICICI", amount: 5100, created_date: "2026-11-16" },
      { name: "RBL - P", amount: 11000, created_date: "2026-11-20" },
      { name: "SBI", amount: 2800, created_date: "2026-11-22" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-11-25" },
    ],
    homecare: [
      { name: "Groceries", amount: 5500, created_date: "2026-11-02" },
      { name: "Milk", amount: 3000, created_date: "2026-11-02" },
      { name: "Meat", amount: 2000, created_date: "2026-11-06" },
      { name: "Fruits", amount: 2400, created_date: "2026-11-08" },
      { name: "Vegetables", amount: 2000, created_date: "2026-11-10" },
      { name: "Power", amount: 2000, created_date: "2026-11-12" },
      { name: "Bike", amount: 1500, created_date: "2026-11-14" },
      { name: "Internet", amount: 1500, created_date: "2026-11-16" },
      { name: "Gas", amount: 650, created_date: "2026-11-22" },
    ],
    gowtham: [
      { name: "Netflix+Paper", amount: 535, created_date: "2026-11-05" },
      { name: "Internet - HSBC", amount: 1500, created_date: "2026-11-10" },
      { name: "ETV Win", amount: 300, created_date: "2026-11-20" },
    ],
  },

  // ── DECEMBER ──
  Dec: {
    essentials: [
      { name: "Rent", amount: 17000, created_date: "2026-12-01" },
      { name: "Amma", amount: 20000, created_date: "2026-12-05" },
      { name: "Electricity", amount: 2200, created_date: "2026-12-09" },
      { name: "Water Bill", amount: 350, created_date: "2026-12-11" },
      { name: "Mobile Recharge", amount: 599, created_date: "2026-12-14" },
    ],
    health: [
      { name: "Yoga", amount: 12000, created_date: "2026-12-01" },
      { name: "Travel", amount: 25000, created_date: "2026-12-20" },
      { name: "Medicine", amount: 2500, created_date: "2026-12-15" },
      { name: "Insurance Premium", amount: 15000, created_date: "2026-12-10" },
    ],
    personal: [
      { name: "Gold_Loan", amount: 17000, created_date: "2026-12-07" },
      { name: "Inv_plan", amount: 25000, created_date: "2026-12-07" },
      { name: "Shopping", amount: 18000, created_date: "2026-12-20" },
      { name: "Gifts", amount: 12000, created_date: "2026-12-24" },
      { name: "Events", amount: 10000, created_date: "2026-12-31" },
    ],
    cards: [
      { name: "AXIS - F", amount: 7500, created_date: "2026-12-05" },
      { name: "AXIS - A", amount: 4800, created_date: "2026-12-08" },
      { name: "AXIS - R", amount: 15000, created_date: "2026-12-10" },
      { name: "BOB", amount: 6200, created_date: "2026-12-12" },
      { name: "HDFC", amount: 22000, created_date: "2026-12-14" },
      { name: "HDFC-N", amount: 5500, created_date: "2026-12-16" },
      { name: "ICICI", amount: 9800, created_date: "2026-12-18" },
      { name: "Indus", amount: 2800, created_date: "2026-12-20" },
      { name: "RBL - P", amount: 18000, created_date: "2026-12-22" },
      { name: "SBI", amount: 3500, created_date: "2026-12-24" },
      { name: "M_HDFC", amount: 1300, created_date: "2026-12-26" },
    ],
    homecare: [
      { name: "Groceries", amount: 7000, created_date: "2026-12-02" },
      { name: "Milk", amount: 3200, created_date: "2026-12-02" },
      { name: "Meat", amount: 3000, created_date: "2026-12-06" },
      { name: "Fruits", amount: 3000, created_date: "2026-12-08" },
      { name: "Vegetables", amount: 2800, created_date: "2026-12-10" },
      { name: "Power", amount: 2000, created_date: "2026-12-12" },
      { name: "Bike", amount: 1500, created_date: "2026-12-14" },
      { name: "Internet", amount: 1500, created_date: "2026-12-16" },
      { name: "Gas", amount: 700, created_date: "2026-12-22" },
    ],
    gowtham: [
      { name: "Insurance", amount: 22702, created_date: "2026-12-05" },
      { name: "Netflix+Paper", amount: 535, created_date: "2026-12-10" },
      { name: "Amazon", amount: 3500, created_date: "2026-12-15" },
      { name: "ICICI", amount: 12000, created_date: "2026-12-20" },
      { name: "Groceries", amount: 2500, created_date: "2026-12-25" },
    ],
  },
};
