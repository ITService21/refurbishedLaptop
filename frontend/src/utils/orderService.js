import { SAMPLE_ORDERS } from "../data/sampleOrders";

const LS_ORDERS_KEY = "refurbLap_sample_orders_v1";

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const writeOrders = (orders) => {
  localStorage.setItem(LS_ORDERS_KEY, JSON.stringify(orders));
};

const initializeOrders = () => {
  const existing = safeParse(localStorage.getItem(LS_ORDERS_KEY), null);
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    writeOrders(SAMPLE_ORDERS);
  }
};

export const getStoredOrders = () => {
  initializeOrders();
  const orders = safeParse(localStorage.getItem(LS_ORDERS_KEY), []);
  return Array.isArray(orders) ? orders : [];
};

export const getOrderById = (orderId) => {
  const orders = getStoredOrders();
  return orders.find((o) => o.orderId === orderId) || null;
};

export const getOrdersByStatus = (status) => {
  const orders = getStoredOrders();
  if (!status || status === "all") return orders;
  return orders.filter((o) => o.status === status);
};

export const updateOrderInStore = (orderId, updates) => {
  const orders = getStoredOrders();
  const index = orders.findIndex((o) => o.orderId === orderId);
  if (index === -1) return null;

  const order = orders[index];
  const updatedOrder = { ...order, ...updates, updatedAt: new Date().toISOString() };

  // Add tracking timeline entry if status changed
  if (updates.status && updates.status !== order.status) {
    const statusLabels = {
      pending: "Order Placed",
      confirmed: "Confirmed",
      processing: "Processing",
      shipped: "Shipped",
      out_for_delivery: "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };

    const newEvent = {
      status: statusLabels[updates.status] || updates.status,
      date: new Date().toISOString(),
      description: `Order status updated to ${statusLabels[updates.status] || updates.status} by admin`,
    };

    updatedOrder.tracking = {
      ...order.tracking,
      timeline: [...(order.tracking?.timeline || []), newEvent],
    };
  }

  orders[index] = updatedOrder;
  writeOrders(orders);
  return updatedOrder;
};

export const searchOrderByTrackingId = (query) => {
  if (!query?.trim()) return null;
  const q = query.trim().toLowerCase();
  const orders = getStoredOrders();
  return orders.find(
    (o) =>
      o.orderId?.toLowerCase().includes(q) ||
      o.tracking?.trackingId?.toLowerCase().includes(q) ||
      o.customerEmail?.toLowerCase().includes(q)
  );
};

