import { api } from "./index";

/**
 * User API endpoints
 */
export const userApi = {
  /**
   * Get current user profile
   */
  getProfile: () => api.get("/users/profile"),

  /**
   * Update user profile
   * @param {Object} data - Profile data to update
   */
  updateProfile: (data) => api.put("/users/profile", data),

  /**
   * Change user password
   * @param {Object} data - { current_password, new_password, confirm_password }
   */
  changePassword: (data) => api.post("/users/change-password", data),

  /**
   * Get all user addresses
   */
  getAddresses: () => api.get("/addresses"),

  /**
   * Add new address
   * @param {Object} data - Address data
   */
  addAddress: (data) => api.post("/addresses", data),

  /**
   * Update address
   * @param {string} id - Address ID
   * @param {Object} data - Address data to update
   */
  updateAddress: (id, data) => api.put(`/addresses/${id}`, data),

  /**
   * Delete address
   * @param {string} id - Address ID
   */
  deleteAddress: (id) => api.delete(`/addresses/${id}`),

  /**
   * Set address as default
   * @param {string} id - Address ID
   */
  setDefaultAddress: (id) => api.patch(`/addresses/${id}/default`),
};

export default userApi;



