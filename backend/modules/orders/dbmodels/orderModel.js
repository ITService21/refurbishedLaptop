const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      // Order Items stored as JSON for flexibility
      items: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        comment: "Array of {product_id, quantity, price, name, image}",
      },
      // Pricing Details
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      coupon_code: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      shipping_charge: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      // Shipping Address
      shipping_address: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "Full address object with name, phone, address, city, state, pincode",
      },
      billing_address: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      // Order Status
      order_status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "out_for_delivery",
          "delivered",
          "cancelled",
          "returned",
          "refunded"
        ),
        defaultValue: "pending",
      },
      // Payment Details
      payment_method: {
        type: DataTypes.ENUM("cod", "online", "upi", "card", "netbanking"),
        defaultValue: "cod",
      },
      payment_status: {
        type: DataTypes.ENUM("pending", "paid", "failed", "refunded"),
        defaultValue: "pending",
      },
      payment_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      razorpay_order_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      razorpay_payment_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      razorpay_signature: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      // Tracking
      tracking_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      courier_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      // Dates
      ordered_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      shipped_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      delivered_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      // Notes
      order_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admin_notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cancellation_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Warranty
      warranty_expiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );
};



