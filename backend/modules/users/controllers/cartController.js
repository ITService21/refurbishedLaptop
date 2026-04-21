const cartService = require("../services/cartService");

const addToCartController = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user?.user_id;

    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required.",
      });
    }

    const result = await cartService.addToCartService(user_id, product_id);

    return res.status(200).json({
      success: true,
      message: "Product added to cart.",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


const removeFromCartController = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user?.user_id;

    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required.",
      });
    }

    const result = await cartService.removeFromCartService(user_id, product_id);

    return res.status(200).json({
      success: true,
      message: "Product removed from cart.",
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


const getUserCartController = async (req, res, next) => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const cart = await cartService.getUserCartService(user_id);

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully.",
      data: cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
module.exports = { addToCartController, removeFromCartController, getUserCartController };