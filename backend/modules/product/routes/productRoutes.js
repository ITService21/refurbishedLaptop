const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authMiddleware, adminMiddleware } = require("../../../middlewares/auth/authMiddleware");

// Public routes
router.get("/", productController.getGeneralProducts);
router.get("/all", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/suggest", productController.suggestProducts);
router.get("/filters", productController.getProductFilters);
router.get("/featured", productController.getFeaturedProducts);
router.get("/new-arrivals", productController.getNewArrivals);
router.get("/best-sellers", productController.getBestSellers);
router.get("/:product_id", productController.getProductById);
router.get("/:product_id/related", productController.getRelatedProducts);
router.get("/:product_id/duplicate", authMiddleware, adminMiddleware, productController.duplicateProduct);

// Admin routes
router.post("/", authMiddleware, adminMiddleware, productController.addProduct);
router.put("/:product_id", authMiddleware, adminMiddleware, productController.updateProduct);
router.delete("/:product_id", authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
