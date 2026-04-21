const express = require("express");
const router = express.Router();
const addressRoutes = require("./addressRoutes");

router.use("/addresses", addressRoutes);

module.exports = router;



