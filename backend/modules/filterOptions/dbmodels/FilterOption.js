const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "FilterOption",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("brand", "processor", "ram", "storage"),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      logo_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "filter_options",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["type", "value"],
        },
      ],
    }
  );
};
