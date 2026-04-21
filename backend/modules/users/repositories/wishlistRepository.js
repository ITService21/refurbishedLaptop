const sequelize = require("../../../config/database");
const { QueryTypes } = require("sequelize");

const addProductToWishlist = async (user_id, product_id) => {
  const [user] = await sequelize.query(
    "SELECT wishlists FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  // Convert string to array
  const wishlists = user.wishlists ? JSON.parse(user.wishlists) : [];

  console.log("back1", typeof wishlists, user, wishlists);

  if (wishlists.includes(product_id)) {
    throw new Error("Product already in wishlist.");
  }

  const updatedWishlist = [...wishlists, product_id];

  await sequelize.query("UPDATE users SET wishlists = ? WHERE user_id = ?", {
    replacements: [JSON.stringify(updatedWishlist), user_id],
  });

  return { wishlists: updatedWishlist };
};


const removeProductFromWishlist = async (user_id, product_id) => {
  const [user] = await sequelize.query(
    "SELECT wishlists FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  if (!user || !user.wishlists) {
    throw new Error("User not found or wishlist missing");
  }

  const wishlists = JSON.parse(user.wishlists);

  if (!wishlists.includes(product_id)) {
    throw new Error("Product not found in wishlist");
  }

  const updatedWishlist = wishlists.filter(id => id !== product_id);

  await sequelize.query(
    "UPDATE users SET wishlists = ? WHERE user_id = ?",
    {
      replacements: [JSON.stringify(updatedWishlist), user_id],
    }
  );

  return { wishlists: updatedWishlist };
};


const getUserWishlist = async (user_id) => {
  const [user] = await sequelize.query(
    "SELECT wishlists FROM users WHERE user_id = ?",
    {
      replacements: [user_id],
      type: QueryTypes.SELECT,
    }
  );

  if (!user || !user.wishlists) {
    return [];
  }

  return JSON.parse(user.wishlists);
};

module.exports = { addProductToWishlist, removeProductFromWishlist, getUserWishlist };
