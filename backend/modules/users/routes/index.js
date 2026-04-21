const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const cartRoutes = require("./cartRoutes");

// User routes
router.use("/users", userRoutes);

// Cart and wishlist routes
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
