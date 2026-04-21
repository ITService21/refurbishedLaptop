const cartRepository = require("../repositories/cartRepository");

const addToCartService = async (user_id, product_id) => {
  return await cartRepository.addProductToCart(user_id, product_id);
};

const removeFromCartService = async (user_id, product_id) => {
  return await cartRepository.removeProductFromCart(user_id, product_id);
};

const getUserCartService = async (user_id) => {
  return await cartRepository.getUserCart(user_id);
};

module.exports = { addToCartService, removeFromCartService, getUserCartService };
