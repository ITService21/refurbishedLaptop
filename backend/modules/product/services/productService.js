const productRepository = require("../repositories/productRepository");

const addProduct = async (productData) => {
  return await productRepository.createProduct(productData);
};

const updateProduct = async (productId, updateData) => {
  return await productRepository.updateProduct(productId, updateData);
};

const deleteProduct = async (productId) => {
  return await productRepository.deleteProduct(productId);
};

const getProductById = async (productId) => {
  return await productRepository.findProductById(productId);
};

const getAllProducts = async () => {
  return await productRepository.findAllProducts();
};

const fetchFilteredGeneralProducts = async (filters) => {
  return await productRepository.findFilteredProducts(filters);
};

const searchProducts = async (query, filters = {}) => {
  return await productRepository.searchProducts(query, filters);
};

const getProductsByCategory = async (categorySlug, filters = {}) => {
  return await productRepository.findByCategory(categorySlug, filters);
};

const getFeaturedProducts = async (limit = 10) => {
  return await productRepository.findFeaturedProducts(limit);
};

const getNewArrivals = async (limit = 10) => {
  return await productRepository.findNewArrivals(limit);
};

const getBestSellers = async (limit = 10) => {
  return await productRepository.findBestSellers(limit);
};

const getRelatedProducts = async (productId, limit = 8) => {
  const product = await productRepository.findProductById(productId);
  if (!product) return [];

  return await productRepository.findRelatedProducts(product, limit);
};

const updateProductStock = async (productId, inStock) => {
  return await productRepository.updateProduct(productId, { in_stock: inStock });
};

const getProductFilters = async () => {
  return await productRepository.getAvailableFilters();
};

const suggestProducts = async (query) => {
  return await productRepository.suggestProducts(query);
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  fetchFilteredGeneralProducts,
  searchProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getRelatedProducts,
  updateProductStock,
  getProductFilters,
  suggestProducts,
};
