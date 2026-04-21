const { Address } = require("../dbmodels");

const createAddress = async (userId, addressData) => {
  // If this is set as default, unset other defaults first
  if (addressData.is_default) {
    await Address.update(
      { is_default: false },
      { where: { user_id: userId } }
    );
  }

  return await Address.create({
    ...addressData,
    user_id: userId,
  });
};

const findAddressesByUserId = async (userId) => {
  return await Address.findAll({
    where: { user_id: userId, is_active: true },
    order: [
      ["is_default", "DESC"],
      ["createdAt", "DESC"],
    ],
  });
};

const findAddressById = async (addressId, userId = null) => {
  const where = { address_id: addressId, is_active: true };
  if (userId) {
    where.user_id = userId;
  }
  return await Address.findOne({ where });
};

const updateAddress = async (addressId, userId, updateData) => {
  // If setting as default, unset other defaults first
  if (updateData.is_default) {
    await Address.update(
      { is_default: false },
      { where: { user_id: userId } }
    );
  }

  const address = await Address.findOne({
    where: { address_id: addressId, user_id: userId, is_active: true },
  });

  if (!address) return null;

  await address.update(updateData);
  return address;
};

const deleteAddress = async (addressId, userId) => {
  const address = await Address.findOne({
    where: { address_id: addressId, user_id: userId, is_active: true },
  });

  if (!address) return null;

  // Soft delete by setting is_active to false
  await address.update({ is_active: false });
  return true;
};

const setDefaultAddress = async (addressId, userId) => {
  // Unset all defaults for this user
  await Address.update(
    { is_default: false },
    { where: { user_id: userId } }
  );

  // Set the new default
  const address = await Address.findOne({
    where: { address_id: addressId, user_id: userId, is_active: true },
  });

  if (!address) return null;

  await address.update({ is_default: true });
  return address;
};

module.exports = {
  createAddress,
  findAddressesByUserId,
  findAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};



