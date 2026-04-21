const addressRepository = require("../repositories/addressRepository");

const addAddress = async (userId, addressData) => {
  // Validate required fields
  const requiredFields = ["full_name", "phone", "address_line_1", "city", "state", "pincode"];
  for (const field of requiredFields) {
    if (!addressData[field]) {
      throw new Error(`${field.replace("_", " ")} is required`);
    }
  }

  // Validate phone number
  if (!/^[0-9]{10}$/.test(addressData.phone.replace(/[^0-9]/g, ""))) {
    throw new Error("Invalid phone number");
  }

  // Validate pincode
  if (!/^[0-9]{6}$/.test(addressData.pincode)) {
    throw new Error("Invalid pincode");
  }

  return await addressRepository.createAddress(userId, {
    ...addressData,
    country: addressData.country || "India",
  });
};

const getUserAddresses = async (userId) => {
  return await addressRepository.findAddressesByUserId(userId);
};

const getAddressById = async (addressId, userId) => {
  return await addressRepository.findAddressById(addressId, userId);
};

const updateAddress = async (addressId, userId, updateData) => {
  // Validate phone if provided
  if (updateData.phone && !/^[0-9]{10}$/.test(updateData.phone.replace(/[^0-9]/g, ""))) {
    throw new Error("Invalid phone number");
  }

  // Validate pincode if provided
  if (updateData.pincode && !/^[0-9]{6}$/.test(updateData.pincode)) {
    throw new Error("Invalid pincode");
  }

  return await addressRepository.updateAddress(addressId, userId, updateData);
};

const deleteAddress = async (addressId, userId) => {
  return await addressRepository.deleteAddress(addressId, userId);
};

const setDefaultAddress = async (addressId, userId) => {
  return await addressRepository.setDefaultAddress(addressId, userId);
};

module.exports = {
  addAddress,
  getUserAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};



