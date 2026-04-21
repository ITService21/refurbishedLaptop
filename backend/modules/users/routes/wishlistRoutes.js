const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { authMiddleware } = require("../../../middlewares/auth/authMiddleware.js");

// Get user wishlist
router.get("/", authMiddleware, wishlistController.getUserWishlistController);

// Add to wishlist
router.post("/", authMiddleware, wishlistController.addToWishlistController);

// Remove from wishlist
router.delete("/", authMiddleware, wishlistController.removeFromWishlistController);

module.exports = router;
