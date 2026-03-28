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

export const INITIAL_DATA = {
  Jan: {
    essentials: [{name:"Rent",amount:17000,created_date:"2026-01-05"},{name:"Amma",amount:20000,created_date:"2026-01-05"}],
    health: [{name:"Yoga",amount:12000,created_date:"2026-01-03"},{name:"Travel",amount:5000,created_date:"2026-01-10"},{name:"Medicine",amount:3000,created_date:"2026-01-15"}],
    personal: [{name:"Gold_Loan",amount:17000,created_date:"2026-01-07"},{name:"Inv_plan",amount:25000,created_date:"2026-01-07"}],
    cards: [{name:"AXIS - F",amount:227,created_date:"2026-01-12"},{name:"AXIS - R",amount:5969,created_date:"2026-01-12"},{name:"DBS",amount:3645,created_date:"2026-01-14"},{name:"HDFC-N",amount:410,created_date:"2026-01-15"},{name:"ICICI",amount:4456,created_date:"2026-01-18"},{name:"Indus",amount:2492,created_date:"2026-01-18"},{name:"RBL - P",amount:7412,created_date:"2026-01-20"},{name:"SBI",amount:103,created_date:"2026-01-22"},{name:"M_HDFC",amount:5407,created_date:"2026-01-25"}],
    homecare: [{name:"Groceries",amount:5000,created_date:"2026-01-02"},{name:"Milk",amount:3000,created_date:"2026-01-02"},{name:"Meat",amount:2000,created_date:"2026-01-05"},{name:"Fruits",amount:2400,created_date:"2026-01-05"},{name:"Vegetables",amount:2000,created_date:"2026-01-08"},{name:"Power",amount:2000,created_date:"2026-01-10"},{name:"Bike",amount:1500,created_date:"2026-01-10"},{name:"Internet",amount:1500,created_date:"2026-01-12"},{name:"Dishwasher",amount:800,created_date:"2026-01-15"},{name:"Robo",amount:900,created_date:"2026-01-18"},{name:"Gas",amount:650,created_date:"2026-01-20"}],
    gowtham: [{name:"Insurance",amount:22702,created_date:"2026-01-05"},{name:"Fans+Taps",amount:10344,created_date:"2026-01-08"},{name:"GST_Tab",amount:5172,created_date:"2026-01-10"},{name:"Groceries",amount:1004,created_date:"2026-01-15"},{name:"Netflix+Paper",amount:535,created_date:"2026-01-20"}],
  },
  Feb: {
    essentials: [{name:"Rent",amount:17000,created_date:"2026-02-05"},{name:"Amma",amount:20000,created_date:"2026-02-05"}],
    health: [{name:"Yoga",amount:12000,created_date:"2026-02-03"},{name:"Travel",amount:5000,created_date:"2026-02-10"},{name:"Medicine",amount:3000,created_date:"2026-02-15"}],
    personal: [],
    cards: [{name:"AXIS - F",amount:15663,created_date:"2026-02-10"},{name:"AXIS - A",amount:5333,created_date:"2026-02-10"},{name:"AXIS - R",amount:17167,created_date:"2026-02-12"},{name:"HDFC",amount:43,created_date:"2026-02-14"},{name:"HDFC-N",amount:4470,created_date:"2026-02-15"},{name:"ICICI",amount:13237,created_date:"2026-02-16"},{name:"Indus",amount:1225,created_date:"2026-02-18"},{name:"ONE",amount:317,created_date:"2026-02-20"},{name:"RBL - P",amount:5334,created_date:"2026-02-22"},{name:"SBI",amount:6656,created_date:"2026-02-24"},{name:"M_HDFC",amount:1300,created_date:"2026-02-25"}],
    homecare: [{name:"Groceries",amount:5000,created_date:"2026-02-02"},{name:"Milk",amount:3000,created_date:"2026-02-02"},{name:"Meat",amount:2000,created_date:"2026-02-05"},{name:"Fruits",amount:2400,created_date:"2026-02-05"},{name:"Vegetables",amount:2000,created_date:"2026-02-08"},{name:"Power",amount:2000,created_date:"2026-02-10"},{name:"Bike",amount:1500,created_date:"2026-02-10"},{name:"Internet",amount:1500,created_date:"2026-02-12"},{name:"Dishwasher",amount:800,created_date:"2026-02-15"},{name:"Robo",amount:900,created_date:"2026-02-18"},{name:"Gas",amount:650,created_date:"2026-02-20"}],
    gowtham: [{name:"Internet - HSBC",amount:1500,created_date:"2026-02-05"},{name:"ICICI",amount:36543,created_date:"2026-02-10"},{name:"Netflix+Paper",amount:535,created_date:"2026-02-15"},{name:"Amazon",amount:650,created_date:"2026-02-18"},{name:"ETV Win",amount:300,created_date:"2026-02-20"}],
  },
  Mar: {
    essentials: [{name:"Rent",amount:17000,created_date:"2026-03-05"},{name:"Amma",amount:20000,created_date:"2026-03-05"}],
    health: [{name:"Yoga",amount:12000,created_date:"2026-03-03"},{name:"Travel",amount:5000,created_date:"2026-03-10"},{name:"Medicine",amount:3000,created_date:"2026-03-15"}],
    personal: [],
    cards: [{name:"AXIS - F",amount:105,created_date:"2026-03-05"},{name:"AXIS - A",amount:356,created_date:"2026-03-06"},{name:"AXIS - R",amount:5418,created_date:"2026-03-08"},{name:"BOB",amount:7323,created_date:"2026-03-10"},{name:"DBS",amount:67,created_date:"2026-03-10"},{name:"HDFC",amount:4590,created_date:"2026-03-12"},{name:"HDFC-N",amount:3426,created_date:"2026-03-14"},{name:"HSBC",amount:2058,created_date:"2026-03-15"},{name:"ICICI",amount:991,created_date:"2026-03-16"},{name:"Indus",amount:255,created_date:"2026-03-18"},{name:"ONE",amount:1021,created_date:"2026-03-20"},{name:"RBL - P",amount:3183,created_date:"2026-03-22"},{name:"M_HDFC",amount:1300,created_date:"2026-03-24"},{name:"HSBC_Gow",amount:21620,created_date:"2026-03-25"},{name:"Gowtham",amount:3239,created_date:"2026-03-26"}],
    homecare: [{name:"Groceries",amount:5000,created_date:"2026-03-02"},{name:"Milk",amount:3000,created_date:"2026-03-02"},{name:"Meat",amount:2000,created_date:"2026-03-05"},{name:"Fruits",amount:2400,created_date:"2026-03-05"},{name:"Vegetables",amount:2000,created_date:"2026-03-08"},{name:"Power",amount:2000,created_date:"2026-03-10"},{name:"Bike",amount:1500,created_date:"2026-03-10"},{name:"Internet",amount:1500,created_date:"2026-03-12"},{name:"Dishwasher",amount:800,created_date:"2026-03-15"},{name:"Robo",amount:900,created_date:"2026-03-18"},{name:"Gas",amount:650,created_date:"2026-03-20"}],
    gowtham: [],
  },
  Apr: {
    essentials: [{name:"Rent",amount:17000,created_date:"2026-04-05"},{name:"Amma",amount:20000,created_date:"2026-04-05"}],
    health: [{name:"Yoga",amount:12000,created_date:"2026-04-03"},{name:"Travel",amount:5000,created_date:"2026-04-10"},{name:"Medicine",amount:3000,created_date:"2026-04-15"}],
    personal: [],
    cards: [{name:"AXIS - F",amount:6758,created_date:"2026-04-05"},{name:"AXIS - A",amount:2286,created_date:"2026-04-08"},{name:"AXIS - R",amount:14558,created_date:"2026-04-10"},{name:"HDFC",amount:21433,created_date:"2026-04-12"},{name:"ICICI",amount:220,created_date:"2026-04-15"},{name:"Indus",amount:2063,created_date:"2026-04-18"},{name:"RBL - P",amount:27531,created_date:"2026-04-20"},{name:"SBI",amount:174,created_date:"2026-04-22"},{name:"M_HDFC",amount:1300,created_date:"2026-04-25"}],
    homecare: [{name:"Groceries",amount:5000,created_date:"2026-04-02"},{name:"Milk",amount:3000,created_date:"2026-04-02"},{name:"Meat",amount:2000,created_date:"2026-04-05"},{name:"Fruits",amount:2400,created_date:"2026-04-05"},{name:"Vegetables",amount:2000,created_date:"2026-04-08"},{name:"Power",amount:2000,created_date:"2026-04-10"},{name:"Bike",amount:1500,created_date:"2026-04-10"},{name:"Internet",amount:1500,created_date:"2026-04-12"},{name:"Dishwasher",amount:800,created_date:"2026-04-15"},{name:"Robo",amount:900,created_date:"2026-04-18"},{name:"Gas",amount:650,created_date:"2026-04-20"}],
    gowtham: [],
  },
};
