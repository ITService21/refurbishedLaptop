const sequelize = require("../../../config/database");
const FilterOption = require("./FilterOption")(sequelize);

module.exports = {
  sequelize,
  FilterOption,
};
