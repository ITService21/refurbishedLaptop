import { api } from "./index";

/**
 * Cart API endpoints
 */
export const cartApi = {
  /**
   * Get user cart
   */
  getCart: () => api.get("/cart"),

  /**
   * Add product to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   */
  addToCart: (productId, quantity = 1) => 
    api.post("/cart", { product_id: productId, quantity }),

  /**
   * Update product quantity in cart
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity: (productId, quantity) => 
    api.put("/cart", { product_id: productId, quantity }),

  /**
   * Remove product from cart
   * @param {string} productId - Product ID
   */
  removeFromCart: (productId) => 
    api.delete("/cart", { product_id: productId }),

  /**
   * Clear entire cart
   */
  clearCart: () => api.delete("/cart/clear"),

  /**
   * Apply coupon code
   * @param {string} code - Coupon code
   */
  applyCoupon: (code) => api.post("/cart/apply-coupon", { code }),

  /**
   * Remove applied coupon
   */
  removeCoupon: () => api.delete("/cart/remove-coupon"),
};

export default cartApi;



