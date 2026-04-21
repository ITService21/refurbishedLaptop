const sequelize = require("../../../config/database");
const { QueryTypes } = require("sequelize");

const findUserByEmailOrPhone = async (email_or_phone, isEmail) => {
  const query = `SELECT * FROM users WHERE ${isEmail ? "email" : "phone"} = ? LIMIT 1`;
  const [user] = await sequelize.query(query, {
    replacements: [email_or_phone],
    type: QueryTypes.SELECT,
  });
  return user;
};

const checkUserExists = async (email, phone) => {
  const [user] = await sequelize.query(
    "SELECT email, phone FROM users WHERE email = ? OR phone = ? LIMIT 1",
    {
      replacements: [email, phone],
      type: QueryTypes.SELECT,
    }
  );
  return user;
};

const createUser = async ({
  user_id,
  email,
  hashedPassword,
  phone,
  first_name,
  last_name,
  role
}) => {
  
await sequelize.query(
  `INSERT INTO users 
    (user_id, email, password, phone, first_name, last_name, role, purchased_products, wishlists, carts, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
  {
    replacements: [
      user_id,
      email,
      hashedPassword,
      phone,
      first_name,
      last_name,
      role,
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify([]),
    ],
  }
);

  console.log("back2A");
};

module.exports = {
  findUserByEmailOrPhone,
  checkUserExists,
  createUser,
};
