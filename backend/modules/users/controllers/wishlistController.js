const wishListService = require("../services/wishlistService");

const addToWishlistController = async (req, res, next) => {
  try {
    const { product_id } = req.body || {};
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }
    
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required.",
      });
    }

    const updatedUser = await wishListService.addToWishlistService(user_id, product_id);

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist.",
      data: updatedUser.wishlists,
    });
  } catch (err) {
    next(err);
  }
};


const removeFromWishlistController = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user?.user_id;

    if (!user_id || !product_id) {
      return res.status(400).json({
        success: false,
        message: "user_id and product_id are required",
      });
    }

    const result = await wishListService.removeFromWishlistService(user_id, product_id);
    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
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


const getUserWishlistController = async (req, res, next) => {
  try {
    const user_id = req.user?.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const wishlist = await wishListService.getUserWishlistService(user_id);

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully.",
      data: wishlist,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


module.exports = { addToWishlistController, removeFromWishlistController, getUserWishlistController };
