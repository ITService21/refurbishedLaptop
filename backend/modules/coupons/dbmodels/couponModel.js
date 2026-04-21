const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Coupon",
    {
      coupon_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      discount_type: {
        type: DataTypes.ENUM("percentage", "fixed"),
        defaultValue: "percentage",
      },
      discount_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      min_order_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
      },
      max_discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Maximum discount for percentage coupons",
      },
      usage_limit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Total times coupon can be used",
      },
      usage_limit_per_user: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      used_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      valid_from: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valid_until: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      applicable_products: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Array of product_ids, null means all products",
      },
      applicable_categories: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Array of category_ids, null means all categories",
      },
      first_order_only: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "coupons",
      timestamps: true,
    }
  );
};



