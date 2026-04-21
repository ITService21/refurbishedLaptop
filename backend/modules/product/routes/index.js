const express = require("express");
const router = express.Router();

// Import and mount each route file here
const productRoutes = require("./productRoutes");

router.use("/products", productRoutes);

module.exports = router;
