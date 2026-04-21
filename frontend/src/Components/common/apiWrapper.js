/**
 * API Wrapper - Re-exports from centralized API modules
 * 
 * This file maintains backward compatibility with existing imports.
 * All API endpoints are now organized in separate files under src/api/
 * 
 * Structure:
 * - src/api/index.js        - Base API wrapper with fetch logic
 * - src/api/productApi.js   - Product endpoints
 * - src/api/authApi.js      - Authentication endpoints
 * - src/api/userApi.js      - User profile & addresses
 * - src/api/cartApi.js      - Cart operations
 * - src/api/wishlistApi.js  - Wishlist operations
 * - src/api/orderApi.js     - Order management
 * - src/api/reviewApi.js    - Product reviews
 * - src/api/couponApi.js    - Coupon validation
 */

// Re-export everything from centralized API modules
export { api } from "../../api/index";
export { productApi } from "../../api/productApi";
export { authApi } from "../../api/authApi";
export { userApi } from "../../api/userApi";
export { cartApi } from "../../api/cartApi";
export { wishlistApi } from "../../api/wishlistApi";
export { orderApi } from "../../api/orderApi";
export { reviewApi } from "../../api/reviewApi";
export { couponApi } from "../../api/couponApi";

// Default export for backward compatibility
export { api as default } from "../../api/index";
