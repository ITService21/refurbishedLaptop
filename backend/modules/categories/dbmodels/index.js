const sequelize = require("../../../config/database");
const Category = require("./categoryModel")(sequelize);

// Self-referencing association for subcategories
Category.hasMany(Category, { foreignKey: "parent_id", as: "subcategories" });
Category.belongsTo(Category, { foreignKey: "parent_id", as: "parent" });

module.exports = { Category };



