const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      registered_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      purchased_products: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      wishlists: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      carts: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
      },
      added_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "users",
      timestamps: true,  
    }
  );
};
