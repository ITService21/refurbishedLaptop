import { api } from "./index";

/**
 * Coupon API endpoints
 */
export const couponApi = {
  /**
   * Validate a coupon code
   * @param {string} code - Coupon code
   */
  validate: (code) => api.post("/coupons/validate", { code }),

  /**
   * Get available coupons for user
   */
  getAvailable: () => api.get("/coupons/available"),
};

export default couponApi;



