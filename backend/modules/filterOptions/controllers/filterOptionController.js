const { FilterOption } = require("../dbmodels");
const { Op } = require("sequelize");

// Get all options by type
const getByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    const validTypes = ["brand", "processor", "ram", "storage"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, message: `Invalid type. Must be one of: ${validTypes.join(", ")}` });
    }
    const options = await FilterOption.findAll({
      where: { type, is_active: true },
      order: [["display_order", "ASC"], ["value", "ASC"]],
    });
    return res.status(200).json({ success: true, data: options });
  } catch (err) {
    next(err);
  }
};

// Get all filter options grouped by type
const getAll = async (req, res, next) => {
  try {
    const options = await FilterOption.findAll({
      where: { is_active: true },
      order: [["type", "ASC"], ["display_order", "ASC"], ["value", "ASC"]],
    });
    const grouped = {
      brands: options.filter((o) => o.type === "brand"),
      processors: options.filter((o) => o.type === "processor"),
      ram: options.filter((o) => o.type === "ram"),
      storage: options.filter((o) => o.type === "storage"),
    };
    return res.status(200).json({ success: true, data: grouped });
  } catch (err) {
    next(err);
  }
};

// Create a new filter option
const create = async (req, res, next) => {
  try {
    const { type, value, logo_url, display_order } = req.body;
    if (!type || !value) {
      return res.status(400).json({ success: false, message: "Type and value are required" });
    }
    const validTypes = ["brand", "processor", "ram", "storage"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ success: false, message: `Invalid type. Must be one of: ${validTypes.join(", ")}` });
    }
    // Check for duplicate (case-insensitive)
    const existing = await FilterOption.findOne({
      where: {
        type,
        value: { [Op.like]: value.trim() },
      },
    });
    if (existing) {
      // If it was deactivated, reactivate it
      if (!existing.is_active) {
        await existing.update({ is_active: true, logo_url, display_order });
        return res.status(200).json({ success: true, message: "Option reactivated", data: existing });
      }
      return res.status(409).json({ success: false, message: `${type} "${value}" already exists` });
    }
    const option = await FilterOption.create({
      type,
      value: value.trim(),
      logo_url: logo_url || null,
      display_order: display_order || 0,
    });
    return res.status(201).json({ success: true, message: `${type} created successfully`, data: option });
  } catch (err) {
    next(err);
  }
};

// Update a filter option
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, logo_url, is_active, display_order } = req.body;
    const option = await FilterOption.findByPk(id);
    if (!option) {
      return res.status(404).json({ success: false, message: "Option not found" });
    }
    await option.update({
      ...(value !== undefined && { value: value.trim() }),
      ...(logo_url !== undefined && { logo_url }),
      ...(is_active !== undefined && { is_active }),
      ...(display_order !== undefined && { display_order }),
    });
    return res.status(200).json({ success: true, message: "Option updated", data: option });
  } catch (err) {
    next(err);
  }
};

// Delete a filter option (soft delete - set is_active to false)
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = await FilterOption.findByPk(id);
    if (!option) {
      return res.status(404).json({ success: false, message: "Option not found" });
    }
    await option.update({ is_active: false });
    return res.status(200).json({ success: true, message: "Option deleted" });
  } catch (err) {
    next(err);
  }
};

// Hard delete
const hardDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = await FilterOption.findByPk(id);
    if (!option) {
      return res.status(404).json({ success: false, message: "Option not found" });
    }
    await option.destroy();
    return res.status(200).json({ success: true, message: "Option permanently deleted" });
  } catch (err) {
    next(err);
  }
};

// Search options by type
const search = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { q } = req.query;
    const where = { type, is_active: true };
    if (q) {
      where.value = { [Op.like]: `%${q}%` };
    }
    const options = await FilterOption.findAll({
      where,
      order: [["display_order", "ASC"], ["value", "ASC"]],
      limit: 20,
    });
    return res.status(200).json({ success: true, data: options });
  } catch (err) {
    next(err);
  }
};

module.exports = { getByType, getAll, create, update, remove, hardDelete, search };
