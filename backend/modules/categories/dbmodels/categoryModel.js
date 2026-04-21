const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Category",
    {
      category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      parent_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "categories",
          key: "category_id",
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      display_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      meta_title: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      meta_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
    }
  );
};



