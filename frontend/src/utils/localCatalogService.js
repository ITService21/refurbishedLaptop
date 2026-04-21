import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from "../data/sampleCatalog";

const LS_PRODUCTS_KEY = "refurbLap_sample_products_v1";
const LS_CATEGORIES_KEY = "refurbLap_sample_categories_v1";

const SORT_FALLBACK = { sortBy: "createdAt", sortOrder: "DESC" };

const nowIso = () => new Date().toISOString();

const normalizeProduct = (product, idx = 0) => {
  const stamp = new Date(Date.now() - idx * 86400000).toISOString();
  return {
    ...product,
    createdAt: product.createdAt || stamp,
    updatedAt: product.updatedAt || stamp,
    detailedSpecs: product.detailedSpecs || {},
  };
};

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const writeProducts = (products) => {
  localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(products));
};

const writeCategories = (categories) => {
  localStorage.setItem(LS_CATEGORIES_KEY, JSON.stringify(categories));
};

export const initializeSampleCatalog = () => {
  const existingProducts = safeParse(localStorage.getItem(LS_PRODUCTS_KEY), null);
  const existingCategories = safeParse(localStorage.getItem(LS_CATEGORIES_KEY), null);

  if (!existingProducts || !Array.isArray(existingProducts) || existingProducts.length === 0) {
    writeProducts(SAMPLE_PRODUCTS.map((item, idx) => normalizeProduct(item, idx)));
  }

  if (!existingCategories || !Array.isArray(existingCategories) || existingCategories.length === 0) {
    writeCategories(SAMPLE_CATEGORIES);
  }
};

export const getStoredProducts = () => {
  initializeSampleCatalog();
  const products = safeParse(localStorage.getItem(LS_PRODUCTS_KEY), []);
  return Array.isArray(products) ? products : [];
};

export const getStoredCategories = () => {
  initializeSampleCatalog();
  const categories = safeParse(localStorage.getItem(LS_CATEGORIES_KEY), []);
  return Array.isArray(categories) ? categories : [];
};

const toArrayValue = (rawValue) => {
  if (!rawValue) return [];
  if (Array.isArray(rawValue)) return rawValue;
  return String(rawValue)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const inRange = (value, min, max) => {
  if (Number.isNaN(value)) return false;
  if (!Number.isNaN(min) && value < min) return false;
  if (!Number.isNaN(max) && value > max) return false;
  return true;
};

const filterProducts = (products, filters = {}) => {
  const brands = toArrayValue(filters.brand).map((v) => v.toLowerCase());
  const processors = toArrayValue(filters.processor).map((v) => v.toLowerCase());
  const ramValues = toArrayValue(filters.ram).map((v) => v.toLowerCase());
  const storageValues = toArrayValue(filters.storage).map((v) => v.toLowerCase());
  const generations = toArrayValue(filters.generation).map((v) => v.toLowerCase());
  const category = filters.category ? String(filters.category).toLowerCase() : "";
  const inStockOnly = String(filters.inStock).toLowerCase() === "true";

  const minPrice = Number(filters.minPrice);
  const maxPrice = Number(filters.maxPrice);
  const hasMin = filters.minPrice !== undefined && filters.minPrice !== "";
  const hasMax = filters.maxPrice !== undefined && filters.maxPrice !== "";

  return products.filter((item) => {
    const brandOk =
      brands.length === 0 || brands.includes(String(item.brand_name || "").toLowerCase());
    const processorOk =
      processors.length === 0 ||
      processors.includes(String(item.processor || "").toLowerCase());
    const ramOk = ramValues.length === 0 || ramValues.includes(String(item.ram || "").toLowerCase());
    const storageOk =
      storageValues.length === 0 ||
      storageValues.includes(String(item.storage || "").toLowerCase());
    const genOk =
      generations.length === 0 ||
      generations.includes(String(item.generation || "").toLowerCase());
    const categoryOk =
      !category || String(item.category || "").toLowerCase() === category;
    const stockOk = !inStockOnly || Boolean(item.in_stock);
    const price = Number(item.price);
    const priceOk =
      (!hasMin && !hasMax) || inRange(price, hasMin ? minPrice : NaN, hasMax ? maxPrice : NaN);

    return brandOk && processorOk && ramOk && storageOk && genOk && categoryOk && stockOk && priceOk;
  });
};

const sortProducts = (products, sortBy = SORT_FALLBACK.sortBy, sortOrder = SORT_FALLBACK.sortOrder) => {
  const order = String(sortOrder).toUpperCase() === "ASC" ? 1 : -1;
  return [...products].sort((a, b) => {
    let left = a?.[sortBy];
    let right = b?.[sortBy];

    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      left = new Date(left || 0).getTime();
      right = new Date(right || 0).getTime();
    }

    if (typeof left === "string") left = left.toLowerCase();
    if (typeof right === "string") right = right.toLowerCase();

    if (left > right) return order;
    if (left < right) return -order;
    return 0;
  });
};

const paginateProducts = (products, page = 1, limit = 12) => {
  const p = Math.max(1, Number(page) || 1);
  const l = Math.max(1, Number(limit) || 12);
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / l));
  const start = (p - 1) * l;
  return {
    products: products.slice(start, start + l),
    total,
    page: p,
    totalPages,
  };
};

const successResponse = (data, message = "Success") => ({
  success: true,
  message,
  data,
});

export const localCatalogApi = {
  getAll: (filters = {}) => {
    const { page = 1, limit = 12, sortBy = "createdAt", sortOrder = "DESC", ...rest } = filters;
    const products = getStoredProducts();
    const filtered = filterProducts(products, rest);
    const sorted = sortProducts(filtered, sortBy, sortOrder);
    return successResponse(paginateProducts(sorted, page, limit), "Products loaded from sample catalog");
  },

  search: (query, filters = {}) => {
    const q = String(query || "").trim().toLowerCase();
    const source = getStoredProducts().filter((item) => {
      if (!q) return true;
      return [item.model_name, item.brand_name, item.processor, item.storage, item.category]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });

    const { page = 1, limit = 12, sortBy = "createdAt", sortOrder = "DESC", ...rest } = filters;
    const filtered = filterProducts(source, rest);
    const sorted = sortProducts(filtered, sortBy, sortOrder);
    return successResponse(paginateProducts(sorted, page, limit), "Search results loaded from sample catalog");
  },

  getById: (productId) => {
    const product = getStoredProducts().find((item) => item.product_id === productId);
    return product
      ? successResponse(product, "Product loaded from sample catalog")
      : { success: false, message: "Product not found", data: null };
  },

  getFeatured: (limit = 10) => {
    const products = getStoredProducts()
      .filter((item) => item.is_featured)
      .slice(0, Number(limit) || 10);
    return successResponse(products, "Featured products loaded from sample catalog");
  },

  getNewArrivals: (limit = 10) => {
    const products = sortProducts(getStoredProducts(), "createdAt", "DESC").slice(0, Number(limit) || 10);
    return successResponse(products, "New arrivals loaded from sample catalog");
  },

  getBestSellers: (limit = 10) => {
    const products = sortProducts(getStoredProducts(), "total_sales", "DESC").slice(0, Number(limit) || 10);
    return successResponse(products, "Best sellers loaded from sample catalog");
  },

  getRelated: (productId, limit = 8) => {
    const products = getStoredProducts();
    const product = products.find((item) => item.product_id === productId);
    if (!product) return successResponse([], "No related products");

    const related = products
      .filter((item) => item.product_id !== productId)
      .sort((a, b) => {
        const score = (p) =>
          (p.brand_name === product.brand_name ? 2 : 0) +
          (p.processor === product.processor ? 1 : 0);
        return score(b) - score(a);
      })
      .slice(0, Number(limit) || 8);

    return successResponse(related, "Related products loaded from sample catalog");
  },

  getFilters: () => {
    const products = getStoredProducts();
    const unique = (key) => [...new Set(products.map((item) => item[key]).filter(Boolean))];
    return successResponse(
      {
        brands: unique("brand_name"),
        processors: unique("processor"),
        ram: unique("ram"),
        storage: unique("storage"),
        generations: unique("generation"),
        categories: getStoredCategories(),
      },
      "Filter options loaded from sample catalog"
    );
  },

  createProduct: (payload) => {
    const products = getStoredProducts();
    const product = normalizeProduct(
      {
        ...payload,
        product_id: payload.product_id || `prod-${Date.now()}`,
        total_sales: payload.total_sales || 0,
        is_featured: Boolean(payload.is_featured),
        in_stock: payload.in_stock !== false,
        images: payload.images && payload.images.length ? payload.images : ["/image/slide1A.jpg"],
      },
      0
    );
    products.unshift(product);
    writeProducts(products);
    return successResponse(product, "Product created in sample catalog");
  },

  updateProduct: (productId, payload) => {
    const products = getStoredProducts();
    const index = products.findIndex((item) => item.product_id === productId);
    if (index === -1) return { success: false, message: "Product not found", data: null };
    const updated = {
      ...products[index],
      ...payload,
      updatedAt: nowIso(),
    };
    products[index] = updated;
    writeProducts(products);
    return successResponse(updated, "Product updated in sample catalog");
  },

  deleteProduct: (productId) => {
    const products = getStoredProducts();
    const next = products.filter((item) => item.product_id !== productId);
    writeProducts(next);
    return successResponse({ deleted: next.length !== products.length }, "Product deleted from sample catalog");
  },

  getAdminDashboardData: () => {
    const products = getStoredProducts();
    const categories = getStoredCategories();
    const totalProducts = products.length;
    const inStockProducts = products.filter((item) => item.in_stock).length;
    const outOfStockProducts = totalProducts - inStockProducts;
    const featuredProducts = products.filter((item) => item.is_featured).length;
    const totalInventoryValue = products.reduce((acc, item) => acc + Number(item.price || 0), 0);
    const byBrand = products.reduce((acc, item) => {
      const brand = item.brand_name || "Unknown";
      acc[brand] = (acc[brand] || 0) + 1;
      return acc;
    }, {});

    return successResponse(
      {
        cards: {
          totalProducts,
          inStockProducts,
          outOfStockProducts,
          featuredProducts,
          totalInventoryValue,
          categories: categories.length,
        },
        byBrand,
        recentProducts: sortProducts(products, "createdAt", "DESC").slice(0, 6),
      },
      "Admin dashboard data loaded from sample catalog"
    );
  },

  getCategories: () => {
    const categories = getStoredCategories();
    const products = getStoredProducts();
    const data = categories.map((name) => ({
      name,
      productCount: products.filter((item) => item.category === name).length,
    }));
    return successResponse(data, "Categories loaded from sample catalog");
  },

  createCategory: (categoryName) => {
    const raw = String(categoryName || "").trim();
    if (!raw) return { success: false, message: "Category name is required", data: null };
    const categories = getStoredCategories();
    if (categories.some((item) => item.toLowerCase() === raw.toLowerCase())) {
      return { success: false, message: "Category already exists", data: null };
    }
    const next = [...categories, raw];
    writeCategories(next);
    return successResponse(raw, "Category created in sample catalog");
  },

  deleteCategory: (categoryName) => {
    const categories = getStoredCategories();
    const next = categories.filter((item) => item !== categoryName);
    writeCategories(next);
    return successResponse(next, "Category removed from sample catalog");
  },
};

