const sequelize = require("../../../config/database");

const GeneralProductInfo = require("./generalProductInfo")(sequelize);
const DetailedSpecifications = require("./detailedSpecifications")(sequelize);

// Define associations
GeneralProductInfo.hasOne(DetailedSpecifications, {
  foreignKey: "product_id",
  as: "detailedSpecs",
});
DetailedSpecifications.belongsTo(GeneralProductInfo, {
  foreignKey: "product_id",
  as: "generalInfo",
});

// Export all
module.exports = {
  sequelize,
  GeneralProductInfo,
  DetailedSpecifications,
};
