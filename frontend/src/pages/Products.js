import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Filter,
  X,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { productApi } from "../Components/common/apiWrapper";
import { Loader } from "../Components/common/Elements";
import ProductCard from "../Components/card/ProductCard";
import { FILTER_OPTIONS } from "../config/constants";
import { filterOptionApi } from "../api/filterOptionApi";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Support both `?q=` (preferred) and legacy `?search=` from older links
  const searchQuery =
    searchParams.get("q") || searchParams.get("search") || "";

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: searchParams.get("brand")?.split(",") || [],
    processor: searchParams.get("processor")?.split(",") || [],
    ram: searchParams.get("ram")?.split(",") || [],
    storage: searchParams.get("storage")?.split(",") || [],
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    inStock: searchParams.get("inStock") === "true",
  });
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "DESC");
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // Re-sync filters when URL params change (e.g., coming from navbar dropdown)
  useEffect(() => {
    setFilters({
      brand: searchParams.get("brand")?.split(",") || [],
      processor: searchParams.get("processor")?.split(",") || [],
      ram: searchParams.get("ram")?.split(",") || [],
      storage: searchParams.get("storage")?.split(",") || [],
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      inStock: searchParams.get("inStock") === "true",
    });
    setPage(parseInt(searchParams.get("page")) || 1);
    setSortBy(searchParams.get("sortBy") || "createdAt");
    setSortOrder(searchParams.get("sortOrder") || "DESC");
  // eslint-disable-next-line
  }, [searchParams.toString()]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [expandedFilters, setExpandedFilters] = useState({
    brand: true,
    processor: true,
    ram: true,
    storage: false,
    price: false,
  });

  // Dynamic filter options from API
  const [dynamicFilters, setDynamicFilters] = useState(null);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const res = await filterOptionApi.getAll();
        if (res?.success && res.data) {
          setDynamicFilters({
            brands: (res.data.brands || []).map(b => b.value || b),
            processors: (res.data.processors || []).map(p => p.value || p),
            ram: (res.data.ram || []).map(r => r.value || r),
            storage: (res.data.storage || []).map(s => s.value || s),
          });
        }
      } catch {
        // fallback to hardcoded
      }
    };
    loadFilters();
  }, []);

  const filterOptions = {
    brands: dynamicFilters?.brands || FILTER_OPTIONS.brands,
    processors: dynamicFilters?.processors || FILTER_OPTIONS.processors,
    ram: dynamicFilters?.ram || FILTER_OPTIONS.ram,
    storage: dynamicFilters?.storage || FILTER_OPTIONS.storage,
    priceRanges: FILTER_OPTIONS.priceRanges,
  };

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = {
        page,
        limit: 12,
        sortBy,
        sortOrder,
      };

      // Add active filters
      if (filters.brand.length) queryParams.brand = filters.brand.join(",");
      if (filters.processor.length) queryParams.processor = filters.processor.join(",");
      if (filters.ram.length) queryParams.ram = filters.ram.join(",");
      if (filters.storage.length) queryParams.storage = filters.storage.join(",");
      if (filters.minPrice) queryParams.minPrice = filters.minPrice;
      if (filters.maxPrice) queryParams.maxPrice = filters.maxPrice;
      if (filters.inStock) queryParams.inStock = "true";
      // Category filter from URL
      const categoryParam = searchParams.get("category");
      if (categoryParam) queryParams.category = categoryParam;

      const response = searchQuery
        ? await productApi.search(searchQuery, queryParams)
        : await productApi.getAll(queryParams);

      if (response?.success) {
        setProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
        setTotal(response.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder, page, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.brand.length) params.set("brand", filters.brand.join(","));
    if (filters.processor.length) params.set("processor", filters.processor.join(","));
    if (filters.ram.length) params.set("ram", filters.ram.join(","));
    if (filters.storage.length) params.set("storage", filters.storage.join(","));
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.inStock) params.set("inStock", "true");
    if (sortBy !== "createdAt") params.set("sortBy", sortBy);
    if (sortOrder !== "DESC") params.set("sortOrder", sortOrder);
    if (page > 1) params.set("page", page.toString());

    setSearchParams(params, { replace: true });
  }, [filters, sortBy, sortOrder, page, setSearchParams, searchQuery]);

  // Handle filter changes
  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
    setPage(1); // Reset to first page
  };

  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    setPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      brand: [],
      processor: [],
      ram: [],
      storage: [],
      minPrice: "",
      maxPrice: "",
      inStock: false,
    });
    setPage(1);
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFilterCount =
    filters.brand.length +
    filters.processor.length +
    filters.ram.length +
    filters.storage.length +
    (filters.minPrice ? 1 : 0) +
    (filters.maxPrice ? 1 : 0) +
    (filters.inStock ? 1 : 0);

  // Filter Section Component
  const FilterSection = ({ title, name, options, expanded }) => (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleFilterSection(name)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer hover:text-cyan-600"
            >
              <input
                type="checkbox"
                checked={filters[name]?.includes(option)}
                onChange={() => handleFilterChange(name, option)}
                className="w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  // Sidebar Filters
  const FiltersContent = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-cyan-600 hover:text-cyan-700"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* In Stock Toggle */}
      <div className="border-b border-gray-200 py-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() =>
              setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
            }
            className="w-4 h-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500"
          />
          <span className="text-sm font-medium text-gray-700">In Stock Only</span>
        </label>
      </div>

      <FilterSection
        title="Brand"
        name="brand"
        options={filterOptions.brands}
        expanded={expandedFilters.brand}
      />
      <FilterSection
        title="Processor"
        name="processor"
        options={filterOptions.processors}
        expanded={expandedFilters.processor}
      />
      <FilterSection
        title="RAM"
        name="ram"
        options={filterOptions.ram}
        expanded={expandedFilters.ram}
      />
      <FilterSection
        title="Storage"
        name="storage"
        options={filterOptions.storage}
        expanded={expandedFilters.storage}
      />

      {/* Price Range */}
      <div className="border-b border-gray-200 py-4">
        <button
          onClick={() => toggleFilterSection("price")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-medium text-gray-800">Price Range</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform ${
              expandedFilters.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedFilters.price && (
          <div className="mt-3 space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange("minPrice", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="space-y-2">
              {filterOptions.priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    handlePriceChange("minPrice", range.min.toString());
                    handlePriceChange("maxPrice", range.max.toString());
                  }}
                  className="block w-full text-left text-sm text-gray-600 hover:text-cyan-600 py-1"
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Buy Certified Refurbished Laptops Online"
        description="Shop premium certified refurbished laptops from Dell, HP, Lenovo, Apple MacBook at up to 60% discount. Free delivery across India. 2-year warranty."
        keywords="buy refurbished laptops, certified laptops, dell laptops, hp laptops, lenovo laptops, macbook, affordable laptops india"
        canonical="https://laptoprefurbished.in/products"
      />

      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              Certified Refurbished Laptops
            </h1>
            <p className="text-cyan-100">
              Premium quality laptops at unbeatable prices
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          {/* Mobile Filter Button - Left aligned */}
          <div className="lg:hidden mb-4 flex justify-start">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FiltersContent />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort & View Options */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
                <div className="text-gray-600 text-sm">
                  Showing {products.length} of {total} products
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 hidden sm:inline">
                      Sort by:
                    </span>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split("-");
                        setSortBy(field);
                        setSortOrder(order);
                      }}
                      className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <option value="createdAt-DESC">Newest First</option>
                      <option value="price-ASC">Price: Low to High</option>
                      <option value="price-DESC">Price: High to Low</option>
                      <option value="model_name-ASC">Name: A-Z</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-cyan-600 text-white"
                          : "text-gray-600"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-cyan-600 text-white"
                          : "text-gray-600"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters Tags */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.brand.map((b) => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full"
                    >
                      {b}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleFilterChange("brand", b)}
                      />
                    </span>
                  ))}
                  {filters.processor.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full"
                    >
                      {p}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleFilterChange("processor", p)}
                      />
                    </span>
                  ))}
                  {filters.ram.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 text-sm px-3 py-1 rounded-full"
                    >
                      {r}
                      <X
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => handleFilterChange("ram", r)}
                      />
                    </span>
                  ))}
                </div>
              )}

              {/* Products */}
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader />
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your filters to find what you're looking for
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div
                  className={`grid gap-4 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {products.map((product) => (
                    <ProductCard
                      key={product.product_id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}

              {/* Pagination - smart page window like Ant Design */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center flex-wrap gap-1 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">&lt;</span>
                  </button>
                  {(() => {
                    const pages = [];
                    const maxVisible = 5;
                    let start = Math.max(1, page - Math.floor(maxVisible / 2));
                    let end = Math.min(totalPages, start + maxVisible - 1);
                    if (end - start + 1 < maxVisible) {
                      start = Math.max(1, end - maxVisible + 1);
                    }

                    if (start > 1) {
                      pages.push(
                        <button key={1} onClick={() => setPage(1)} className="w-9 h-9 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition">1</button>
                      );
                      if (start > 2) {
                        pages.push(<span key="start-ellipsis" className="px-1 text-gray-400 text-sm">...</span>);
                      }
                    }

                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setPage(i)}
                          className={`w-9 h-9 text-sm border rounded-md transition ${
                            page === i
                              ? "bg-cyan-600 text-white border-cyan-600"
                              : "border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }

                    if (end < totalPages) {
                      if (end < totalPages - 1) {
                        pages.push(<span key="end-ellipsis" className="px-1 text-gray-400 text-sm">...</span>);
                      }
                      pages.push(
                        <button key={totalPages} onClick={() => setPage(totalPages)} className="w-9 h-9 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition">{totalPages}</button>
                      );
                    }

                    return pages;
                  })()}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">&gt;</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal - Opens from LEFT */}
        {showMobileFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setShowMobileFilters(false)}>
            <div
              className="absolute left-0 top-0 h-full w-full max-w-sm bg-white overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-4">
                <FiltersContent />
              </div>
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-cyan-600 text-white py-3 rounded-lg font-medium hover:bg-cyan-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
    </>
  );
};

export default Products;
