const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const orderData = {
      ...req.body,
      user_id: req.user.user_id,
    };

    const order = await orderService.createOrder(orderData);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const order = await orderService.getOrderById(order_id);

    // Check if user owns this order or is admin
    if (order.user_id !== req.user.user_id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this order",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderByNumber = async (req, res, next) => {
  try {
    const { order_number } = req.params;
    const order = await orderService.getOrderByNumber(order_number);

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { page, limit, status } = req.query;

    const result = await orderService.getUserOrders(userId, {
      page,
      limit,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const { page, limit, status, search, startDate, endDate } = req.query;

    const result = await orderService.getAllOrders({
      page,
      limit,
      status,
      search,
      startDate,
      endDate,
    });

    return res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { status, tracking_number, courier_name, admin_notes } = req.body;

    const order = await orderService.updateOrderStatus(order_id, status, {
      tracking_number,
      courier_name,
      admin_notes,
    });

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const { reason } = req.body;
    const userId = req.user.user_id;

    const order = await orderService.cancelOrder(order_id, userId, reason);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const updatePaymentStatus = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    const paymentData = req.body;

    const order = await orderService.updatePaymentStatus(order_id, paymentData);

    return res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const getOrderStats = async (req, res, next) => {
  try {
    const stats = await orderService.getOrderStats();

    return res.status(200).json({
      success: true,
      message: "Order stats fetched successfully",
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderByNumber,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  updatePaymentStatus,
  getOrderStats,
};



