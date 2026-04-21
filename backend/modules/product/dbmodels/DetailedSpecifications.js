const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "DetailedSpecifications",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "product_general_info", // table name
          key: "product_id", // primary key from other table
        },
      },
      screen_size: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: true,
      },
      processor_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      os_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      display_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      graphics_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      wifi_bt_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      memory_storage: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      camera_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      keyboard_info: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      special_feature: {
        type: DataTypes.STRING(200),
        defaultValue: null,
        allowNull: true,
      },
      benefits: {
        type: DataTypes.JSON(),
        defaultValue: [], //ex [{key:"7_day_replacement":label:"7 Days Replacement"},{key:"free_delivery":label:"Free Delivery"},{key:"pay_on_delivery":label:"Pay On Delivery"}]
        allowNull: true,
      },
    },
    {
      tableName: "product_detailed_specifications",
      timestamps: true,  
    }
  );
};
