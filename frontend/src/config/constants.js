// API Configuration
// NOTE: Use a dedicated env var for backend API to avoid accidental overrides from generic REACT_APP_URL.
// Set `REACT_APP_API_BASE_URL` to something like: http://localhost:5001/api/v1
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api/v1";

// Company Information - SEO & Branding
export const COMPANY = {
  name: "Laptop Refurbished",
  legalName: "Laptop Refurbished India Pvt. Ltd.",
  tagline: "Premium Certified Refurbished Laptops at Unbeatable Prices",
  description: "India's most trusted destination for certified refurbished laptops. Get premium Dell, HP, Lenovo, and MacBook laptops with 2-year warranty, free delivery across India.",
  email: "info@laptoprefurbished.in",
  phone: "+91-9876543210",
  whatsapp: "919876543210",
  address: {
    street: "123, IT Park",
    area: "Malviya Nagar",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302017",
    country: "India",
    full: "123, IT Park, Malviya Nagar, Jaipur, Rajasthan - 302017, India",
  },
  social: {
    facebook: "https://facebook.com/laptoprefurbished",
    instagram: "https://instagram.com/laptoprefurbished",
    twitter: "https://twitter.com/laptoprefurb",
    linkedin: "https://linkedin.com/company/laptop-refurbished",
    youtube: "https://youtube.com/@laptoprefurbished",
  },
  workingHours: "Mon-Sat: 10:00 AM - 7:00 PM",
  established: 2020,
  creator: {
    name: "PI Web Technology",
    url: "https://piwebtechnology.com",
    tagline: "Crafted with ❤️ by PI Web Technology",
  },
};

// SEO Meta Tags
export const SEO_DEFAULTS = {
  title: "Laptop Refurbished - Certified Refurbished Laptops in India | Best Deals",
  titleTemplate: "%s | Laptop Refurbished",
  description: "Buy premium certified refurbished laptops from Dell, HP, Lenovo, Apple MacBook at 40-60% discount. Free delivery across India. 2-year warranty. COD available.",
  keywords: "refurbished laptops, certified refurbished, Dell laptops, HP laptops, Lenovo laptops, MacBook, affordable laptops, laptops Jaipur, laptops India, second hand laptops, renewed laptops",
  author: "Laptop Refurbished",
  robots: "index, follow",
  canonical: "https://laptoprefurbished.in",
  og: {
    type: "website",
    siteName: "Laptop Refurbished",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@laptoprefurb",
    creator: "@laptoprefurb",
  },
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Laptops", slug: "all-laptops" },
  { id: "dell", name: "Dell Laptops", slug: "dell-laptops" },
  { id: "hp", name: "HP Laptops", slug: "hp-laptops" },
  { id: "lenovo", name: "Lenovo Laptops", slug: "lenovo-laptops" },
  { id: "apple", name: "MacBook", slug: "macbook-apple" },
  { id: "asus", name: "ASUS Laptops", slug: "asus-laptops" },
  { id: "acer", name: "Acer Laptops", slug: "acer-laptops" },
];

// Filter Options
export const FILTER_OPTIONS = {
  brands: ["Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer", "Samsung", "MSI"],
  processors: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M1", "Apple M2"],
  ram: ["4 GB", "8 GB", "16 GB", "32 GB", "64 GB"],
  storage: ["128 GB SSD", "256 GB SSD", "512 GB SSD", "1 TB SSD", "1 TB HDD", "2 TB HDD"],
  generation: ["10th Gen", "11th Gen", "12th Gen", "13th Gen", "14th Gen"],
  priceRanges: [
    { label: "Under ₹15,000", min: 0, max: 15000 },
    { label: "₹15,000 - ₹25,000", min: 15000, max: 25000 },
    { label: "₹25,000 - ₹40,000", min: 25000, max: 40000 },
    { label: "₹40,000 - ₹60,000", min: 40000, max: 60000 },
    { label: "Above ₹60,000", min: 60000, max: 500000 },
  ],
};

// Features & USPs
export const FEATURES = [
  {
    icon: "shield",
    title: "2 Year Warranty",
    description: "Complete peace of mind with comprehensive warranty coverage",
  },
  {
    icon: "truck",
    title: "Free Delivery",
    description: "Free shipping on all orders across India",
  },
  {
    icon: "refresh",
    title: "7 Days Replacement",
    description: "Easy replacement within 7 days of delivery",
  },
  {
    icon: "credit-card",
    title: "Secure Payment",
    description: "100% secure payments with multiple options",
  },
  {
    icon: "check-circle",
    title: "Certified Quality",
    description: "Every laptop undergoes 40-point quality check",
  },
  {
    icon: "headphones",
    title: "24/7 Support",
    description: "Dedicated customer support for all queries",
  },
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: "cod", name: "Cash on Delivery", icon: "cash" },
  { id: "upi", name: "UPI", icon: "upi" },
  { id: "card", name: "Debit/Credit Card", icon: "credit-card" },
  { id: "netbanking", name: "Net Banking", icon: "bank" },
  { id: "emi", name: "EMI Options", icon: "calendar" },
];

// Delivery Information
export const DELIVERY = {
  freeDeliveryThreshold: 0, // Free delivery on all orders
  estimatedDays: {
    metro: "2-4 business days",
    tier2: "4-6 business days",
    remote: "6-8 business days",
  },
  partners: ["Delhivery", "BlueDart", "DTDC", "FedEx"],
};

// Order Status
export const ORDER_STATUS = {
  pending: { label: "Order Placed", color: "orange" },
  confirmed: { label: "Confirmed", color: "blue" },
  processing: { label: "Processing", color: "purple" },
  shipped: { label: "Shipped", color: "cyan" },
  out_for_delivery: { label: "Out for Delivery", color: "lime" },
  delivered: { label: "Delivered", color: "green" },
  cancelled: { label: "Cancelled", color: "red" },
  returned: { label: "Returned", color: "gray" },
  refunded: { label: "Refunded", color: "volcano" },
};

// Cookie Names
export const COOKIES = {
  authToken: "refurbLapToken_CID_200",
  userId: "refurbLapUserId",
  cart: "refurbLapCart",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  recentlyViewed: "refurbLap_recentlyViewed",
  wishlist: "refurbLap_wishlist",
  cart: "refurbLap_cart",
  searchHistory: "refurbLap_searchHistory",
};



