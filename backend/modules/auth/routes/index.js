const express = require("express");
const router = express.Router();

// Import and mount each route file here
const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

module.exports = router;
