/**
 * Format number in Indian numbering system (with commas)
 * @param {number} num - Number to format
 * @param {boolean} includeDecimal - Include decimal places
 * @returns {string} - Formatted number string
 */
export function formatIndianNumber(num, includeDecimal = false) {
  if (num === null || num === undefined || isNaN(num)) return "0";

  const numStr = includeDecimal ? num.toFixed(2) : Math.floor(num).toString();
  const [integerPart, decimalPart] = numStr.split(".");

  // Format integer part with Indian numbering system
  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  const formatted = otherDigits
    ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
    : lastThree;

  return decimalPart ? `${formatted}.${decimalPart}` : formatted;
}

/**
 * Calculate discount percentage
 * @param {number} mrp - Maximum Retail Price
 * @param {number} price - Selling Price
 * @returns {number} - Discount percentage
 */
export function calculateDiscount(mrp, price) {
  if (!mrp || !price || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'relative'
 * @returns {string} - Formatted date string
 */
export function formatDate(date, format = "short") {
  if (!date) return "";

  const d = new Date(date);

  if (format === "short") {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (format === "long") {
    return d.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  if (format === "relative") {
  const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  }

  return d.toISOString();
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate Indian pincode
 * @param {string} pincode - Pincode to validate
 * @returns {boolean} - Is valid pincode
 */
export function isValidPincode(pincode) {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
}

/**
 * Generate a slug from text
 * @param {string} text - Text to convert
 * @returns {string} - URL-friendly slug
 */
export function generateSlug(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - Is empty
 */
export function isEmpty(obj) {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === "object") return Object.keys(obj).length === 0;
  return false;
}

/**
 * Get local storage item with JSON parse
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} - Stored value or default
 */
export function getLocalStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set local storage item with JSON stringify
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

/**
 * Remove item from local storage
 * @param {string} key - Storage key
 */
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

/**
 * Scroll to top of page smoothly
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy:", err);
    return false;
  }
}

/**
 * Get query params from URL
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value
 */
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Format bytes to human readable size
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Decimal places
 * @returns {string} - Formatted size
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
