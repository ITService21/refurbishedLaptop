const express = require("express");
const router = express.Router();
const controller = require("../controllers/filterOptionController");
const { authMiddleware, adminMiddleware } = require("../../../middlewares/auth/authMiddleware");

// Public routes
router.get("/filter-options", controller.getAll);
router.get("/filter-options/:type", controller.getByType);
router.get("/filter-options/:type/search", controller.search);

// Admin routes
router.post("/filter-options", authMiddleware, adminMiddleware, controller.create);
router.put("/filter-options/:id", authMiddleware, adminMiddleware, controller.update);
router.delete("/filter-options/:id", authMiddleware, adminMiddleware, controller.remove);
router.delete("/filter-options/:id/hard", authMiddleware, adminMiddleware, controller.hardDelete);

module.exports = router;
