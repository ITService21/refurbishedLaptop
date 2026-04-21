import { api } from "./index";

/**
 * Wishlist API endpoints
 */
export const wishlistApi = {
  /**
   * Get user wishlist
   */
  getWishlist: () => api.get("/wishlist"),

  /**
   * Add product to wishlist
   * @param {string} productId - Product ID
   */
  addToWishlist: (productId) => 
    api.post("/wishlist", { product_id: productId }),

  /**
   * Remove product from wishlist
   * @param {string} productId - Product ID
   */
  removeFromWishlist: (productId) => 
    api.delete("/wishlist", { product_id: productId }),

  /**
   * Clear entire wishlist
   */
  clearWishlist: () => api.delete("/wishlist/clear"),
};

export default wishlistApi;



