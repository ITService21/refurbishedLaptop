const { Order } = require("../dbmodels");
const { Op } = require("sequelize");

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const findOrderById = async (orderId) => {
  return await Order.findByPk(orderId);
};

const findOrderByNumber = async (orderNumber) => {
  return await Order.findOne({ where: { order_number: orderNumber } });
};

const findOrdersByUserId = async (userId, options = {}) => {
  const { page = 1, limit = 10, status } = options;
  const offset = (page - 1) * limit;

  const where = { user_id: userId };
  if (status) where.order_status = status;

  const { count, rows } = await Order.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    orders: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  };
};

const findAllOrders = async (options = {}) => {
  const { page = 1, limit = 20, status, search, startDate, endDate } = options;
  const offset = (page - 1) * limit;

  const where = {};
  
  if (status) where.order_status = status;
  
  if (search) {
    where[Op.or] = [
      { order_number: { [Op.like]: `%${search}%` } },
      { tracking_number: { [Op.like]: `%${search}%` } },
    ];
  }

  if (startDate && endDate) {
    where.ordered_at = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  const { count, rows } = await Order.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    orders: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  };
};

const updateOrder = async (orderId, updateData) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  return await order.update(updateData);
};

const updateOrderStatus = async (orderId, status, additionalData = {}) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;

  const updateObj = { order_status: status, ...additionalData };

  // Set appropriate timestamps based on status
  if (status === "shipped") updateObj.shipped_at = new Date();
  if (status === "delivered") updateObj.delivered_at = new Date();
  if (status === "cancelled") updateObj.cancelled_at = new Date();

  return await order.update(updateObj);
};

const getOrderStats = async () => {
  const stats = await Order.findAll({
    attributes: [
      "order_status",
      [Order.sequelize.fn("COUNT", Order.sequelize.col("order_id")), "count"],
      [Order.sequelize.fn("SUM", Order.sequelize.col("total_amount")), "total"],
    ],
    group: ["order_status"],
  });

  return stats;
};

const generateOrderNumber = async () => {
  const date = new Date();
  const prefix = `LR${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
  
  const lastOrder = await Order.findOne({
    where: {
      order_number: { [Op.like]: `${prefix}%` },
    },
    order: [["createdAt", "DESC"]],
  });

  let nextNum = 1;
  if (lastOrder) {
    const lastNum = parseInt(lastOrder.order_number.slice(-6));
    nextNum = lastNum + 1;
  }

  return `${prefix}${String(nextNum).padStart(6, "0")}`;
};

module.exports = {
  createOrder,
  findOrderById,
  findOrderByNumber,
  findOrdersByUserId,
  findAllOrders,
  updateOrder,
  updateOrderStatus,
  getOrderStats,
  generateOrderNumber,
};



