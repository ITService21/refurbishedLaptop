const sequelize = require("../../../config/database");
const Review = require("./reviewModel")(sequelize);

module.exports = { Review };



