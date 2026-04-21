const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Address",
    {
      address_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      address_type: {
        type: DataTypes.ENUM("home", "office", "other"),
        defaultValue: "home",
      },
      full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      alternate_phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      address_line_1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      landmark: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      pincode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        defaultValue: "India",
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "addresses",
      timestamps: true,
    }
  );
};



