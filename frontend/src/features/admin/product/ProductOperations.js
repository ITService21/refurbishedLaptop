import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { productApi } from "../../../Components/common/apiWrapper";
import { formatIndianNumber } from "../../../utils/methods";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "inventory", label: "Inventory Insights" },
];

const defaultForm = {
  model_name: "",
  brand_name: "",
  category: "",
  processor: "",
  generation: "",
  ram: "",
  storage: "",
  price: "",
  mrp: "",
  screen_size: "",
  image: "",
  in_stock: true,
  is_featured: false,
};

export default function ProductOperations() {
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashboardRes, productsRes, categoriesRes] = await Promise.all([
        productApi.getAdminDashboardData(),
        productApi.getAll({ page: 1, limit: 1000, sortBy: "createdAt", sortOrder: "DESC" }),
        productApi.getCategories(),
      ]);

      setDashboard(dashboardRes?.data || null);
      setProducts(productsRes?.data?.products || []);
      setCategories(categoriesRes?.data || []);
    } catch (error) {
      toast.error("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  const inventoryByBrand = useMemo(() => dashboard?.byBrand || {}, [dashboard]);

  const handleFormChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.model_name || !form.brand_name || !form.price || !form.ram || !form.processor || !form.storage) {
      toast.error("Please fill required product fields.");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp || form.price),
      images: [form.image || "/image/slide1A.jpg"],
    };

    const response = editingId
      ? await productApi.update(editingId, payload)
      : await productApi.create(payload);

    if (response?.success) {
      toast.success(editingId ? "Product updated." : "Product created.");
      resetForm();
      refreshData();
      return;
    }

    toast.error(response?.message || "Unable to save product.");
  };

  const handleEdit = (item) => {
    setEditingId(item.product_id);
    setForm({
      model_name: item.model_name || "",
      brand_name: item.brand_name || "",
      category: item.category || "",
      processor: item.processor || "",
      generation: item.generation || "",
      ram: item.ram || "",
      storage: item.storage || "",
      price: item.price || "",
      mrp: item.mrp || "",
      screen_size: item.screen_size || "",
      image: item.images?.[0] || "",
      in_stock: item.in_stock !== false,
      is_featured: Boolean(item.is_featured),
    });
    setActiveTab("products");
  };

  const handleDelete = async (productId) => {
    const response = await productApi.remove(productId);
    if (response?.success) {
      toast.success("Product deleted.");
      refreshData();
      return;
    }
    toast.error(response?.message || "Unable to delete product.");
  };

  const handleCreateCategory = async () => {
    const response = await productApi.createCategory(newCategory);
    if (response?.success) {
      toast.success("Category created.");
      setNewCategory("");
      refreshData();
      return;
    }
    toast.error(response?.message || "Unable to create category.");
  };

  const handleDeleteCategory = async (categoryName) => {
    const response = await productApi.deleteCategory(categoryName);
    if (response?.success) {
      toast.success("Category removed.");
      refreshData();
      return;
    }
    toast.error(response?.message || "Unable to remove category.");
  };

  return (
    <div className="mt-[60px] min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage products, categories, and storefront inventory dashboards.
              </p>
            </div>
            <button
              onClick={refreshData}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
            >
              Refresh Data
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading dashboards...</div>
          ) : (
            <>
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    <Card title="Total Products" value={dashboard?.cards?.totalProducts || 0} />
                    <Card title="In Stock" value={dashboard?.cards?.inStockProducts || 0} />
                    <Card title="Out of Stock" value={dashboard?.cards?.outOfStockProducts || 0} />
                    <Card title="Featured" value={dashboard?.cards?.featuredProducts || 0} />
                    <Card title="Categories" value={dashboard?.cards?.categories || 0} />
                    <Card
                      title="Inventory Value"
                      value={`₹${formatIndianNumber(dashboard?.cards?.totalInventoryValue || 0)}`}
                    />
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Recent Products</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[640px]">
                        <thead>
                          <tr className="text-left border-b border-gray-200">
                            <th className="py-2 pr-3">Model</th>
                            <th className="py-2 pr-3">Brand</th>
                            <th className="py-2 pr-3">Price</th>
                            <th className="py-2 pr-3">Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(dashboard?.recentProducts || []).map((item) => (
                            <tr key={item.product_id} className="border-b border-gray-100">
                              <td className="py-2 pr-3">{item.model_name}</td>
                              <td className="py-2 pr-3">{item.brand_name}</td>
                              <td className="py-2 pr-3">₹{formatIndianNumber(item.price)}</td>
                              <td className="py-2 pr-3">
                                {item.in_stock ? (
                                  <span className="text-green-600 font-medium">In Stock</span>
                                ) : (
                                  <span className="text-red-600 font-medium">Out of Stock</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 border border-gray-200 rounded-xl p-4"
                  >
                    <Input label="Model Name *" value={form.model_name} onChange={(v) => handleFormChange("model_name", v)} />
                    <Input label="Brand *" value={form.brand_name} onChange={(v) => handleFormChange("brand_name", v)} />
                    <Input label="Category" value={form.category} onChange={(v) => handleFormChange("category", v)} />
                    <Input label="Processor *" value={form.processor} onChange={(v) => handleFormChange("processor", v)} />
                    <Input label="Generation" value={form.generation} onChange={(v) => handleFormChange("generation", v)} />
                    <Input label="RAM *" value={form.ram} onChange={(v) => handleFormChange("ram", v)} />
                    <Input label="Storage *" value={form.storage} onChange={(v) => handleFormChange("storage", v)} />
                    <Input label="Screen Size" value={form.screen_size} onChange={(v) => handleFormChange("screen_size", v)} />
                    <Input label="Price *" type="number" value={form.price} onChange={(v) => handleFormChange("price", v)} />
                    <Input label="MRP" type="number" value={form.mrp} onChange={(v) => handleFormChange("mrp", v)} />
                    <Input label="Image URL" value={form.image} onChange={(v) => handleFormChange("image", v)} />
                    <div className="flex items-center gap-4 pt-7">
                      <label className="text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={form.in_stock}
                          onChange={(e) => handleFormChange("in_stock", e.target.checked)}
                          className="mr-2"
                        />
                        In Stock
                      </label>
                      <label className="text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={form.is_featured}
                          onChange={(e) => handleFormChange("is_featured", e.target.checked)}
                          className="mr-2"
                        />
                        Featured
                      </label>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
                      <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg">
                        {editingId ? "Update Product" : "Create Product"}
                      </button>
                      {editingId && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg"
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  <div className="overflow-x-auto border border-gray-200 rounded-xl">
                    <table className="w-full text-sm min-w-[900px]">
                      <thead className="bg-gray-50">
                        <tr className="text-left">
                          <th className="px-3 py-2">Model</th>
                          <th className="px-3 py-2">Brand</th>
                          <th className="px-3 py-2">Category</th>
                          <th className="px-3 py-2">Specs</th>
                          <th className="px-3 py-2">Price</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr key={item.product_id} className="border-t border-gray-100">
                            <td className="px-3 py-2">{item.model_name}</td>
                            <td className="px-3 py-2">{item.brand_name}</td>
                            <td className="px-3 py-2">{item.category || "-"}</td>
                            <td className="px-3 py-2">{item.processor} / {item.ram} / {item.storage}</td>
                            <td className="px-3 py-2">₹{formatIndianNumber(item.price)}</td>
                            <td className="px-3 py-2">{item.in_stock ? "In Stock" : "Out of Stock"}</td>
                            <td className="px-3 py-2">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="text-cyan-700 bg-cyan-50 px-2 py-1 rounded"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item.product_id)}
                                  className="text-red-700 bg-red-50 px-2 py-1 rounded"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "categories" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Add new category"
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                    />
                    <button
                      onClick={handleCreateCategory}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                    >
                      Add Category
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categories.map((item) => (
                      <div key={item.name} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.productCount} products</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCategory(item.name)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "inventory" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inventory by Brand</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.keys(inventoryByBrand).map((brand) => (
                      <div key={brand} className="border border-gray-200 rounded-lg p-4 bg-white">
                        <p className="text-gray-800 font-medium">{brand}</p>
                        <p className="text-2xl font-bold text-cyan-700">{inventoryByBrand[brand]}</p>
                        <p className="text-xs text-gray-500">Active listed products</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="text-sm">
      <span className="text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </label>
  );
}
