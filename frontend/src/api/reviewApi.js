import { api } from "./index";

/**
 * Review API endpoints
 */
export const reviewApi = {
  /**
   * Get reviews for a product
   * @param {string} productId - Product ID
   * @param {number} page - Page number
   */
  getProductReviews: (productId, page = 1) => 
    api.get(`/reviews/product/${productId}?page=${page}`),

  /**
   * Add a review
   * @param {Object} data - Review data { product_id, rating, title, comment }
   */
  addReview: (data) => api.post("/reviews", data),

  /**
   * Update a review
   * @param {string} reviewId - Review ID
   * @param {Object} data - Updated review data
   */
  updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),

  /**
   * Delete a review
   * @param {string} reviewId - Review ID
   */
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),

  /**
   * Mark review as helpful
   * @param {string} reviewId - Review ID
   */
  markHelpful: (reviewId) => api.post(`/reviews/${reviewId}/helpful`),
};

export default reviewApi;



