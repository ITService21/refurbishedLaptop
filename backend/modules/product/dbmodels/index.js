const sequelize = require("../../../config/database");

const GeneralProductInfo = require("./GeneralProductInfo")(sequelize);
const DetailedSpecifications = require("./DetailedSpecifications")(sequelize);

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
