const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Review",
    {
      review_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "product_general_info",
          key: "product_id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      is_verified_purchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      helpful_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      admin_reply: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      admin_reply_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "reviews",
      timestamps: true,
    }
  );
};



