const sequelize = require("../../../config/database");
const { QueryTypes } = require("sequelize");

const addProductToCart = async (user_id, product_id) => {
  const [user] = await sequelize.query(
    "SELECT carts FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  const carts = user.carts ? JSON.parse(user.carts) : [];

  if (carts.includes(product_id)) {
    throw new Error("Product already in cart.");
  }

  const updatedCart = [...carts, product_id];

  await sequelize.query("UPDATE users SET carts = ? WHERE user_id = ?", {
    replacements: [JSON.stringify(updatedCart), user_id],
  });

  return { carts: updatedCart };
};



const removeProductFromCart = async (user_id, product_id) => {
  const [user] = await sequelize.query(
    "SELECT carts FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  if (!user || !user.carts) {
    throw new Error("User not found or cart missing");
  }

  const carts = JSON.parse(user.carts);

  if (!carts.includes(product_id)) {
    throw new Error("Product not found in cart");
  }

  const updatedCart = carts.filter(id => id !== product_id);

  await sequelize.query(
    "UPDATE users SET carts = ? WHERE user_id = ?",
    {
      replacements: [JSON.stringify(updatedCart), user_id],
    }
  );

  return { carts: updatedCart };
};


const getUserCart = async (user_id) => {
  const [user] = await sequelize.query(
    "SELECT carts FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  if (!user || !user.carts) {
    return [];
  }

  return JSON.parse(user.carts);
};


module.exports = { addProductToCart, removeProductFromCart, getUserCart };
