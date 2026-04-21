const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "GeneralProductInfo",
    {
      product_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      model_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      model_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      model_number: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      brand_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      color: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ram: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      processor: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      storage: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      generation: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      graphics: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      in_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      mrp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Our Latest Collection, Best Sellers, New Arrivals",
      },
      added_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "product_general_info",
      timestamps: true,
    }
  );
};
