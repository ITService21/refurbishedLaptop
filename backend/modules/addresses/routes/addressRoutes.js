const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const { authMiddleware } = require("../../../middlewares/auth/authMiddleware");

// All address routes require authentication
router.use(authMiddleware);

// Get all user addresses
router.get("/", addressController.getUserAddresses);

// Get address by ID
router.get("/:addressId", addressController.getAddressById);

// Add new address
router.post("/", addressController.addAddress);

// Update address
router.put("/:addressId", addressController.updateAddress);

// Delete address
router.delete("/:addressId", addressController.deleteAddress);

// Set as default address
router.patch("/:addressId/default", addressController.setDefaultAddress);

module.exports = router;



