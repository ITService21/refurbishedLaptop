const  wishlistRepositories = require("../repositories/wishlistRepository");

const addToWishlistService = async (user_id, product_id) => {
  return await wishlistRepositories.addProductToWishlist(user_id, product_id);
};

const removeFromWishlistService = async (user_id, product_id) => {
  return await wishlistRepositories.removeProductFromWishlist(user_id, product_id);
};

const getUserWishlistService = async (user_id) => {
  return await wishlistRepositories.getUserWishlist(user_id);
};

module.exports = { addToWishlistService, removeFromWishlistService, getUserWishlistService };
