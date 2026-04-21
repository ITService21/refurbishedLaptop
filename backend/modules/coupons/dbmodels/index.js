const sequelize = require("../../../config/database");
const Coupon = require("./couponModel")(sequelize);

module.exports = { Coupon };



