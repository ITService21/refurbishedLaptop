import { api } from "./index";

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * User login
   * @param {Object} credentials - { email, password }
   */
  login: (credentials) => api.post("/auth/login", credentials),

  /**
   * User registration
   * @param {Object} userData - { first_name, last_name, email, phone, password }
   */
  register: (userData) => api.post("/auth/register", userData),

  /**
   * Forgot password - send reset email
   * @param {string} email - User email
   */
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} password - New password
   */
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),

  /**
   * Verify email address
   * @param {string} token - Verification token
   */
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
};

export default authApi;



