import { api } from "./index";

/**
 * Order API endpoints
 */
export const orderApi = {
  /**
   * Create new order
   * @param {Object} orderData - Order details
   */
  create: (orderData) => api.post("/orders", orderData),

  /**
   * Get user orders with filters
   * @param {Object} filters - Filter parameters (page, limit, status)
   */
  getMyOrders: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/orders/my-orders${params ? `?${params}` : ""}`);
  },

  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   */
  getById: (orderId) => api.get(`/orders/${orderId}`),

  /**
   * Track order by order number
   * @param {string} orderNumber - Order number
   */
  trackByNumber: (orderNumber) => api.get(`/orders/track/${orderNumber}`),

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @param {string} reason - Cancellation reason
   */
  cancel: (orderId, reason) => api.post(`/orders/${orderId}/cancel`, { reason }),
};

export default orderApi;



