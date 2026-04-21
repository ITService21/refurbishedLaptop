const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authMiddleware, adminMiddleware } = require("../../../middlewares/auth/authMiddleware");

// User routes (requires authentication)
router.post("/", authMiddleware, orderController.createOrder);
router.get("/my-orders", authMiddleware, orderController.getUserOrders);
router.get("/track/:order_number", orderController.getOrderByNumber);
router.get("/:order_id", authMiddleware, orderController.getOrderById);
router.post("/:order_id/cancel", authMiddleware, orderController.cancelOrder);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put("/:order_id/status", authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.put("/:order_id/payment", authMiddleware, adminMiddleware, orderController.updatePaymentStatus);
router.get("/stats/summary", authMiddleware, adminMiddleware, orderController.getOrderStats);

module.exports = router;



