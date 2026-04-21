import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { productApi } from "../../../api/productApi";
import { Plus, Trash2, FolderOpen } from "lucide-react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productApi.getCategories();
      if (res?.success) setCategories(res.data || []);
    } catch (e) {
      console.error("Error loading categories:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories]);

  const handleAdd = async () => {
    if (!newCategory.trim()) { toast.error("Enter a category name"); return; }
    const res = await productApi.createCategory(newCategory.trim());
    if (res?.success) {
      toast.success(`Category "${newCategory}" created!`);
      setNewCategory("");
      loadCategories();
    } else {
      toast.error(res?.message || "Failed to create category.");
    }
  };

  const handleDelete = async (name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    const res = await productApi.deleteCategory(name);
    if (res?.success) { toast.success("Category deleted!"); loadCategories(); }
    else toast.error(res?.message || "Delete failed.");
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
        <p className="text-sm text-gray-500 mt-1">Manage product categories</p>
      </div>

      {/* Add Category */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Add New Category</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Category name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
          <button onClick={handleAdd} className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Category List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4">All Categories ({categories.length})</h3>
        {categories.length === 0 ? (
          <div className="text-center py-10">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400">No categories yet. Create your first one above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const name = typeof cat === "string" ? cat : cat.name;
              const count = typeof cat === "object" ? cat.count || 0 : 0;
              return (
                <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{name}</p>
                      {count > 0 && <p className="text-xs text-gray-500">{count} products</p>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(name)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;

