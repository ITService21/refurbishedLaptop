import { api } from "./index";
import { localCatalogApi } from "../utils/localCatalogService";

const useRemoteOrLocal = async (remoteCall, localCall) => {
  try {
    const response = await remoteCall();
    if (response?.success) {
      return response;
    }
    return localCall();
  } catch (error) {
    return localCall(error);
  }
};

/**
 * Product API endpoints
 */
export const productApi = {
  /**
   * Get all products with filters
   * @param {Object} filters - Filter parameters (brand, processor, ram, storage, minPrice, maxPrice, etc.)
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return useRemoteOrLocal(
      () => api.getSilent(`/products${params ? `?${params}` : ""}`),
      () => localCatalogApi.getAll(filters)
    );
  },

  /**
   * Get product by ID
   * @param {string} productId - Product UUID
   */
  getById: (productId) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/${productId}`),
      () => localCatalogApi.getById(productId)
    ),

  /**
   * Search products
   * @param {string} query - Search query
   * @param {Object} filters - Additional filters
   */
  search: (query, filters = {}) => {
    const params = new URLSearchParams({ q: query, ...filters }).toString();
    return useRemoteOrLocal(
      () => api.getSilent(`/products/search?${params}`),
      () => localCatalogApi.search(query, filters)
    );
  },

  /**
   * Get featured products
   * @param {number} limit - Number of products to fetch
   */
  getFeatured: (limit = 10) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/featured?limit=${limit}`),
      () => localCatalogApi.getFeatured(limit)
    ),

  /**
   * Get new arrivals
   * @param {number} limit - Number of products to fetch
   */
  getNewArrivals: (limit = 10) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/new-arrivals?limit=${limit}`),
      () => localCatalogApi.getNewArrivals(limit)
    ),

  /**
   * Get best sellers
   * @param {number} limit - Number of products to fetch
   */
  getBestSellers: (limit = 10) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/best-sellers?limit=${limit}`),
      () => localCatalogApi.getBestSellers(limit)
    ),

  /**
   * Get related products
   * @param {string} productId - Current product ID
   * @param {number} limit - Number of related products
   */
  getRelated: (productId, limit = 8) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/${productId}/related?limit=${limit}`),
      () => localCatalogApi.getRelated(productId, limit)
    ),

  /**
   * Get available filter options
   */
  getFilters: () =>
    useRemoteOrLocal(
      () => api.getSilent("/products/filters"),
      () => localCatalogApi.getFilters()
    ),

  create: (payload) =>
    useRemoteOrLocal(
      () => api.post("/products", payload),
      () => localCatalogApi.createProduct(payload)
    ),

  update: (productId, payload) =>
    useRemoteOrLocal(
      () => api.put(`/products/${productId}`, payload),
      () => localCatalogApi.updateProduct(productId, payload)
    ),

  remove: (productId) =>
    useRemoteOrLocal(
      () => api.delete(`/products/${productId}`),
      () => localCatalogApi.deleteProduct(productId)
    ),

  suggest: (query) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/suggest?q=${encodeURIComponent(query)}`),
      () => ({ success: true, data: [] })
    ),

  duplicate: (productId) =>
    useRemoteOrLocal(
      () => api.getSilent(`/products/${productId}/duplicate`),
      () => ({ success: false, message: "Not available" })
    ),

  /**
   * Upload product images via multipart form data
   * @param {FileList|File[]} files - Image files to upload
   * @returns {Promise<{success: boolean, data: string[]}>} - Array of image URLs
   */
  uploadImages: async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("images", file));
    return api.postData("/upload/images", formData);
  },

  getAdminDashboardData: () => localCatalogApi.getAdminDashboardData(),
  getCategories: () => localCatalogApi.getCategories(),
  createCategory: (categoryName) => localCatalogApi.createCategory(categoryName),
  deleteCategory: (categoryName) => localCatalogApi.deleteCategory(categoryName),
};

export default productApi;



