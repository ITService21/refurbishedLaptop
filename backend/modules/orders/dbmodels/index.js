const sequelize = require("../../../config/database");
const Order = require("./orderModel")(sequelize);

module.exports = { Order };



