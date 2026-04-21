const addressService = require("../services/addressService");

const addAddress = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;
    const addressData = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const address = await addressService.addAddress(userId, addressData);

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const getUserAddresses = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const addresses = await addressService.getUserAddresses(userId);

    return res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

const getAddressById = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;
    const { addressId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const address = await addressService.getAddressById(addressId, userId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;
    const { addressId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const address = await addressService.updateAddress(addressId, userId, updateData);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;
    const { addressId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const deleted = await addressService.deleteAddress(addressId, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const setDefaultAddress = async (req, res, next) => {
  try {
    const userId = req.user?.user_id;
    const { addressId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const address = await addressService.setDefaultAddress(addressId, userId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Default address updated successfully",
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};



