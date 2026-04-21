const sequelize = require("../../../config/database");
const Address = require("./addressModel")(sequelize);

module.exports = { Address };



