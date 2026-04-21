const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authMiddleware } = require("../../../middlewares/auth/authMiddleware");

// All user routes require authentication
router.use(authMiddleware);

// Get user profile
router.get("/profile", userController.getProfile);

// Update user profile
router.put("/profile", userController.updateProfile);

// Change password
router.post("/change-password", userController.changePassword);

// Delete account
router.delete("/delete-account", userController.deleteAccount);

module.exports = router;



