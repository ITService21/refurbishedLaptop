const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authMiddleware } = require("../../../middlewares/auth/authMiddleware");

// Get user cart
router.get("/", authMiddleware, cartController.getUserCartController);

// Add to cart
router.post("/", authMiddleware, cartController.addToCartController);

// Update cart quantity
router.put("/", authMiddleware, cartController.addToCartController);

// Remove from cart
router.delete("/", authMiddleware, cartController.removeFromCartController);

module.exports = router;
