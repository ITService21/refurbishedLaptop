const { GeneralProductInfo, DetailedSpecifications } = require("../dbmodels");
const { Op } = require("sequelize");

const createProduct = async (productData) => {
  const { specifications, ...generalInfo } = productData;

  const product = await GeneralProductInfo.create(generalInfo);

  if (specifications) {
    await DetailedSpecifications.create({
      ...specifications,
      product_id: product.product_id,
    });
  }

  return product;
};

const findProductById = async (productId) => {
  return await GeneralProductInfo.findByPk(productId, {
    include: [
      {
        model: DetailedSpecifications,
        as: "detailedSpecs",
      },
    ],
  });
};

const findAllProducts = async () => {
  return await GeneralProductInfo.findAll({
    include: [
      {
        model: DetailedSpecifications,
        as: "detailedSpecs",
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const findFilteredProducts = async (filters = {}) => {
  const {
    page = 1,
    limit = 12,
    brand,
    processor,
    ram,
    storage,
    minPrice,
    maxPrice,
    inStock,
    sortBy = "createdAt",
    sortOrder = "DESC",
    generation,
    type,
    category,
  } = filters;

  const offset = (page - 1) * limit;
  const where = {};

  // Apply filters
  if (brand) {
    const brands = Array.isArray(brand) ? brand : brand.split(",");
    where.brand_name = { [Op.in]: brands };
  }

  if (processor) {
    const processors = Array.isArray(processor) ? processor : processor.split(",");
    where.processor = { [Op.in]: processors };
  }

  if (ram) {
    const rams = Array.isArray(ram) ? ram : ram.split(",");
    where.ram = { [Op.in]: rams };
  }

  if (storage) {
    const storages = Array.isArray(storage) ? storage : storage.split(",");
    where.storage = { [Op.in]: storages };
  }

  if (generation) {
    where.generation = { [Op.like]: `%${generation}%` };
  }

  if (type) {
    where.type = type;
  }

  if (category) {
    where.category = category;
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = parseInt(minPrice);
    if (maxPrice) where.price[Op.lte] = parseInt(maxPrice);
  }

  if (inStock !== undefined) {
    where.in_stock = inStock === "true" || inStock === true;
  }

  // Determine sort field
  const validSortFields = ["price", "createdAt", "model_name", "brand_name"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const order = [[sortField, sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC"]];

  const { count, rows } = await GeneralProductInfo.findAndCountAll({
    where,
    include: [
      {
        model: DetailedSpecifications,
        as: "detailedSpecs",
      },
    ],
    order,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    products: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
    hasMore: page * limit < count,
  };
};

const searchProducts = async (query, filters = {}) => {
  const {
    page = 1,
    limit = 12,
    brand,
    processor,
    ram,
    storage,
    minPrice,
    maxPrice,
    inStock,
    sortBy = "createdAt",
    sortOrder = "DESC",
    generation,
    type,
  } = filters;
  const offset = (page - 1) * limit;

  const searchTerms = query.split(" ").filter((term) => term.length > 0);
  const searchConditions = searchTerms.map((term) => ({
    [Op.or]: [
      { model_name: { [Op.like]: `%${term}%` } },
      { brand_name: { [Op.like]: `%${term}%` } },
      { processor: { [Op.like]: `%${term}%` } },
      { model_number: { [Op.like]: `%${term}%` } },
    ],
  }));

  const where = {
    [Op.and]: searchConditions,
  };

  // Apply optional filters (same behavior as `findFilteredProducts`)
  if (brand) {
    const brands = Array.isArray(brand) ? brand : String(brand).split(",");
    where.brand_name = { [Op.in]: brands };
  }
  if (processor) {
    const processors = Array.isArray(processor) ? processor : String(processor).split(",");
    where.processor = { [Op.in]: processors };
  }
  if (ram) {
    const rams = Array.isArray(ram) ? ram : String(ram).split(",");
    where.ram = { [Op.in]: rams };
  }
  if (storage) {
    const storages = Array.isArray(storage) ? storage : String(storage).split(",");
    where.storage = { [Op.in]: storages };
  }
  if (generation) {
    where.generation = { [Op.like]: `%${generation}%` };
  }
  if (type) {
    where.type = type;
  }
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price[Op.gte] = parseInt(minPrice);
    if (maxPrice) where.price[Op.lte] = parseInt(maxPrice);
  }
  if (inStock !== undefined) {
    where.in_stock = inStock === "true" || inStock === true;
  }

  const validSortFields = ["price", "createdAt", "model_name", "brand_name"];
  const sortField = validSortFields.includes(sortBy) ? sortBy : "createdAt";
  const order = [[sortField, sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC"]];

  const { count, rows } = await GeneralProductInfo.findAndCountAll({
    where,
    include: [
      {
        model: DetailedSpecifications,
        as: "detailedSpecs",
      },
    ],
    order,
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  return {
    products: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  };
};

const findFeaturedProducts = async (limit = 10) => {
  // First try category-based, then fallback to type-based
  let products = await GeneralProductInfo.findAll({
    where: {
      category: "Our Latest Collection",
    },
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
  });
  if (products.length === 0) {
    products = await GeneralProductInfo.findAll({
      where: {
        in_stock: true,
        type: "featured",
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
    });
  }
  return products;
};

const findNewArrivals = async (limit = 10) => {
  // First try category-based
  let products = await GeneralProductInfo.findAll({
    where: {
      category: "New Arrivals",
    },
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
  });
  if (products.length === 0) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    products = await GeneralProductInfo.findAll({
      where: {
        added_date: { [Op.gte]: thirtyDaysAgo },
      },
      order: [["added_date", "DESC"]],
      limit: parseInt(limit),
    });
  }
  return products;
};

const findBestSellers = async (limit = 10) => {
  // First try category-based
  let products = await GeneralProductInfo.findAll({
    where: {
      category: "Best Sellers",
    },
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
  });
  if (products.length === 0) {
    products = await GeneralProductInfo.findAll({
      where: {
        in_stock: true,
        type: "bestseller",
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
    });
  }
  return products;
};

const findRelatedProducts = async (product, limit = 8) => {
  return await GeneralProductInfo.findAll({
    where: {
      product_id: { [Op.ne]: product.product_id },
      [Op.or]: [
        { brand_name: product.brand_name },
        { processor: product.processor },
      ],
      in_stock: true,
    },
    order: [["createdAt", "DESC"]],
    limit: parseInt(limit),
  });
};

const updateProduct = async (productId, updateData) => {
  const { specifications, ...generalInfo } = updateData;

  const product = await GeneralProductInfo.findByPk(productId);
  if (!product) return null;

  await product.update(generalInfo);

  if (specifications) {
    const existingSpecs = await DetailedSpecifications.findOne({
      where: { product_id: productId },
    });

    if (existingSpecs) {
      await existingSpecs.update(specifications);
    } else {
      await DetailedSpecifications.create({
        ...specifications,
        product_id: productId,
      });
    }
  }

  return await findProductById(productId);
};

const deleteProduct = async (productId) => {
  const product = await GeneralProductInfo.findByPk(productId);
  if (!product) return null;

  await DetailedSpecifications.destroy({ where: { product_id: productId } });
  await product.destroy();

  return true;
};

const getAvailableFilters = async () => {
  const [brands, processors, rams, storages, generations] = await Promise.all([
    GeneralProductInfo.findAll({
      attributes: [[GeneralProductInfo.sequelize.fn("DISTINCT", GeneralProductInfo.sequelize.col("brand_name")), "value"]],
      where: { brand_name: { [Op.ne]: null } },
      raw: true,
    }),
    GeneralProductInfo.findAll({
      attributes: [[GeneralProductInfo.sequelize.fn("DISTINCT", GeneralProductInfo.sequelize.col("processor")), "value"]],
      where: { processor: { [Op.ne]: null } },
      raw: true,
    }),
    GeneralProductInfo.findAll({
      attributes: [[GeneralProductInfo.sequelize.fn("DISTINCT", GeneralProductInfo.sequelize.col("ram")), "value"]],
      where: { ram: { [Op.ne]: null } },
      raw: true,
    }),
    GeneralProductInfo.findAll({
      attributes: [[GeneralProductInfo.sequelize.fn("DISTINCT", GeneralProductInfo.sequelize.col("storage")), "value"]],
      where: { storage: { [Op.ne]: null } },
      raw: true,
    }),
    GeneralProductInfo.findAll({
      attributes: [[GeneralProductInfo.sequelize.fn("DISTINCT", GeneralProductInfo.sequelize.col("generation")), "value"]],
      where: { generation: { [Op.ne]: null } },
      raw: true,
    }),
  ]);

  const priceRange = await GeneralProductInfo.findOne({
    attributes: [
      [GeneralProductInfo.sequelize.fn("MIN", GeneralProductInfo.sequelize.col("price")), "minPrice"],
      [GeneralProductInfo.sequelize.fn("MAX", GeneralProductInfo.sequelize.col("price")), "maxPrice"],
    ],
    raw: true,
  });

  return {
    brands: brands.map((b) => b.value).filter(Boolean),
    processors: processors.map((p) => p.value).filter(Boolean),
    rams: rams.map((r) => r.value).filter(Boolean),
    storages: storages.map((s) => s.value).filter(Boolean),
    generations: generations.map((g) => g.value).filter(Boolean),
    priceRange: {
      min: priceRange?.minPrice || 0,
      max: priceRange?.maxPrice || 100000,
    },
  };
};

const suggestProducts = async (query) => {
  const suggestions = await GeneralProductInfo.findAll({
    attributes: ["product_id", "model_name", "brand_name", "processor", "ram", "storage", "price", "images"],
    where: {
      [Op.or]: [
        { model_name: { [Op.like]: `%${query}%` } },
        { brand_name: { [Op.like]: `%${query}%` } },
        { processor: { [Op.like]: `%${query}%` } },
        { model_number: { [Op.like]: `%${query}%` } },
      ],
    },
    order: [["createdAt", "DESC"]],
    limit: 12,
  });
  return suggestions;
};

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  findFilteredProducts,
  searchProducts,
  findFeaturedProducts,
  findNewArrivals,
  findBestSellers,
  findRelatedProducts,
  updateProduct,
  deleteProduct,
  getAvailableFilters,
  suggestProducts,
};
