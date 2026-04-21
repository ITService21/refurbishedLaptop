const productService = require("../services/productService");

const addProduct = async (req, res, next) => {
  try {
    const product = await productService.addProduct(req.body);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product_id: product.product_id,
    });
  } catch (err) {
    console.error("Error adding product:", err);
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product_id = req.params.product_id;
    const updatedData = req.body;

    const updated = await productService.updateProduct(product_id, updatedData);
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product_id = req.params.product_id;
    await productService.deleteProduct(product_id);
    return res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully" 
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const product = await productService.getProductById(product_id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found", 
        data: {} 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    next(err);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getGeneralProducts = async (req, res, next) => {
  try {
    const filters = req.query;
    const products = await productService.fetchFilteredGeneralProducts(filters);
    res.status(200).json({
      success: true,
      message: "Filtered general products fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const searchProducts = async (req, res, next) => {
  try {
    const { q, page, limit, brand, processor, ram, storage, minPrice, maxPrice, inStock, sortBy, sortOrder, generation, type } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const results = await productService.searchProducts(q, {
      page,
      limit,
      brand,
      processor,
      ram,
      storage,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
      sortOrder,
      generation,
      type,
    });
    return res.status(200).json({
      success: true,
      message: "Search results fetched successfully",
      data: results,
    });
  } catch (err) {
    next(err);
  }
};

const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await productService.getFeaturedProducts(limit);
    return res.status(200).json({
      success: true,
      message: "Featured products fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getNewArrivals = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await productService.getNewArrivals(limit);
    return res.status(200).json({
      success: true,
      message: "New arrivals fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getBestSellers = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;
    const products = await productService.getBestSellers(limit);
    return res.status(200).json({
      success: true,
      message: "Best sellers fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getRelatedProducts = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { limit = 8 } = req.query;
    const products = await productService.getRelatedProducts(product_id, limit);
    return res.status(200).json({
      success: true,
      message: "Related products fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

const getProductFilters = async (req, res, next) => {
  try {
    const filters = await productService.getProductFilters();
    return res.status(200).json({
      success: true,
      message: "Product filters fetched successfully",
      data: filters,
    });
  } catch (err) {
    next(err);
  }
};

const suggestProducts = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }
    const suggestions = await productService.suggestProducts(q.trim());
    return res.status(200).json({ success: true, data: suggestions });
  } catch (err) {
    next(err);
  }
};

const duplicateProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const product = await productService.getProductById(product_id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    // Return product data for duplication (don't create yet)
    const dupData = product.toJSON ? product.toJSON() : { ...product };
    delete dupData.product_id;
    delete dupData.createdAt;
    delete dupData.updatedAt;
    if (dupData.detailedSpecs) {
      delete dupData.detailedSpecs.id;
      delete dupData.detailedSpecs.product_id;
    }
    dupData.model_name = `${dupData.model_name} (Copy)`;
    return res.status(200).json({ success: true, data: dupData });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  getGeneralProducts,
  searchProducts,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  getRelatedProducts,
  getProductFilters,
  suggestProducts,
  duplicateProduct,
};
