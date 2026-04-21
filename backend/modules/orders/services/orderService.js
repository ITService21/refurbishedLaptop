const orderRepository = require("../repositories/orderRepository");

const createOrder = async (orderData) => {
  // Generate unique order number
  const orderNumber = await orderRepository.generateOrderNumber();

  // Calculate totals
  const subtotal = orderData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = orderData.discount_amount || 0;
  const shippingCharge = orderData.shipping_charge || 0;
  const taxAmount = orderData.tax_amount || 0;
  const totalAmount = subtotal - discountAmount + shippingCharge + taxAmount;

  // Calculate warranty expiry (2 years from order date)
  const warrantyExpiry = new Date();
  warrantyExpiry.setFullYear(warrantyExpiry.getFullYear() + 2);

  const order = await orderRepository.createOrder({
    ...orderData,
    order_number: orderNumber,
    subtotal,
    total_amount: totalAmount,
    ordered_at: new Date(),
    warranty_expiry: warrantyExpiry,
  });

  return order;
};

const getOrderById = async (orderId) => {
  const order = await orderRepository.findOrderById(orderId);
  if (!order) {
    throw { status: 404, message: "Order not found" };
  }
  return order;
};

const getOrderByNumber = async (orderNumber) => {
  const order = await orderRepository.findOrderByNumber(orderNumber);
  if (!order) {
    throw { status: 404, message: "Order not found" };
  }
  return order;
};

const getUserOrders = async (userId, options) => {
  return await orderRepository.findOrdersByUserId(userId, options);
};

const getAllOrders = async (options) => {
  return await orderRepository.findAllOrders(options);
};

const updateOrderStatus = async (orderId, status, additionalData = {}) => {
  const validStatuses = [
    "pending",
    "confirmed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "returned",
    "refunded",
  ];

  if (!validStatuses.includes(status)) {
    throw { status: 400, message: "Invalid order status" };
  }

  const order = await orderRepository.updateOrderStatus(orderId, status, additionalData);
  if (!order) {
    throw { status: 404, message: "Order not found" };
  }

  return order;
};

const cancelOrder = async (orderId, userId, reason) => {
  const order = await orderRepository.findOrderById(orderId);

  if (!order) {
    throw { status: 404, message: "Order not found" };
  }

  if (order.user_id !== userId) {
    throw { status: 403, message: "Unauthorized to cancel this order" };
  }

  if (!["pending", "confirmed"].includes(order.order_status)) {
    throw { status: 400, message: "Order cannot be cancelled at this stage" };
  }

  return await orderRepository.updateOrderStatus(orderId, "cancelled", {
    cancellation_reason: reason,
  });
};

const updatePaymentStatus = async (orderId, paymentData) => {
  const order = await orderRepository.findOrderById(orderId);
  if (!order) {
    throw { status: 404, message: "Order not found" };
  }

  return await orderRepository.updateOrder(orderId, {
    payment_status: paymentData.status,
    payment_id: paymentData.payment_id,
    razorpay_order_id: paymentData.razorpay_order_id,
    razorpay_payment_id: paymentData.razorpay_payment_id,
    razorpay_signature: paymentData.razorpay_signature,
    order_status: paymentData.status === "paid" ? "confirmed" : order.order_status,
  });
};

const addTrackingInfo = async (orderId, trackingNumber, courierName) => {
  return await orderRepository.updateOrder(orderId, {
    tracking_number: trackingNumber,
    courier_name: courierName,
    order_status: "shipped",
    shipped_at: new Date(),
  });
};

const getOrderStats = async () => {
  return await orderRepository.getOrderStats();
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
  addTrackingInfo,
  getOrderStats,
};



