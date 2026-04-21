const sequelize = require("../../../config/database");

const userModel = require("./userModel")(sequelize);

module.exports = {
  sequelize,
  userModel,
  // Backwards-compatible export used across controllers/services
  User: userModel,
};