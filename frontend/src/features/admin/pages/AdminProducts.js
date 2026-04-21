import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { productApi } from "../../../api/productApi";
import { filterOptionApi } from "../../../api/filterOptionApi";
import { formatIndianNumber } from "../../../utils/methods";
import SearchableSelect from "../components/SearchableSelect";
import {
  Edit, Trash2, PlusCircle, X, Save, Search, Eye, Copy,
  ChevronDown, ChevronUp, Package, Image as ImageIcon,
  RotateCw, Crop, FlipHorizontal, ZoomIn, ZoomOut,
} from "lucide-react";

const CATEGORIES = ["Our Latest Collection", "Best Sellers", "New Arrivals"];

// Helper: ensure images is always an array and filter out invalid blob URLs
const safeImages = (imgs) => {
  let arr = [];
  if (Array.isArray(imgs)) arr = imgs;
  else if (typeof imgs === "string") {
    try { arr = JSON.parse(imgs); } catch { arr = []; }
  }
  return arr.filter(u => u && !u.startsWith("blob:"));
};

const defaultForm = {
  model_name: "", brand_name: "", category: "", processor: "", generation: "",
  ram: "", storage: "", screen_size: "", price: "", mrp: "", color: "",
  images: [], in_stock: true, is_featured: false,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ brands: [], processors: [], ram: [], storage: [], generations: [] });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [colSearch, setColSearch] = useState({ model: "", brand: "", category: "", processor: "", stock: "" });
  const [viewProduct, setViewProduct] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [imageTransforms, setImageTransforms] = useState({});
  const formRef = useRef(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, filterRes] = await Promise.all([
        productApi.getAll({ page: 1, limit: 1000, sortBy: "createdAt", sortOrder: "DESC" }),
        filterOptionApi.getAll(),
      ]);
      setProducts(prodRes?.data?.products || []);
      if (filterRes?.success && filterRes.data) {
        setFilters({
          brands: (filterRes.data.brands || []).map(b => b.value || b),
          processors: (filterRes.data.processors || []).map(p => p.value || p),
          ram: (filterRes.data.ram || []).map(r => r.value || r),
          storage: (filterRes.data.storage || []).map(s => s.value || s),
          generations: [],
        });
      }
    } catch (e) {
      console.error("Load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const screenSizes = useMemo(
    () => [...new Set(products.map((p) => p.screen_size).filter(Boolean))],
    [products]
  );

  const handleFormChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  // Store raw File objects for upload
  const [pendingFiles, setPendingFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagePreviews(prev => [...prev, ...previews]);
    setPendingFiles(prev => [...prev, ...files]);
    // Don't store blob URLs in form.images - we'll upload files on submit
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
    setForm(p => ({ ...p, images: (p.images || []).filter((_, i) => i !== index) }));
  };

  const resetForm = () => { setForm(defaultForm); setEditingId(null); setShowForm(false); setImagePreviews([]); setImageTransforms({}); setPendingFiles([]); };

  const addFilterOption = async (type, val) => {
    try {
      const res = await filterOptionApi.create({ type, value: val });
      if (res?.success) {
        setFilters((prev) => ({ ...prev, [`${type}s`]: [...(prev[`${type}s`] || []), val] }));
        toast.success(`"${val}" created!`);
      } else {
        // Still add locally
        setFilters((prev) => ({ ...prev, [`${type}s`]: [...(prev[`${type}s`] || []), val] }));
        toast.info(`"${val}" added locally`);
      }
    } catch {
      setFilters((prev) => ({ ...prev, [`${type}s`]: [...(prev[`${type}s`] || []), val] }));
      toast.info(`"${val}" added`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.model_name || !form.brand_name || !form.price) {
      toast.error("Model name, brand, and price are required.");
      return;
    }

    // Upload new files if any
    let uploadedUrls = [...(form.images || [])]; // keep existing URLs (from edit)
    if (pendingFiles.length > 0) {
      try {
        toast.info("Uploading images...");
        const uploadRes = await productApi.uploadImages(pendingFiles);
        if (uploadRes?.success && uploadRes.data) {
          uploadedUrls = [...uploadedUrls, ...uploadRes.data];
        } else {
          toast.error("Image upload failed. Using default image.");
        }
      } catch (err) {
        console.error("Upload error:", err);
        toast.error("Image upload failed.");
      }
    }

    // Filter out any blob: URLs that might be leftover
    const cleanUrls = uploadedUrls.filter(u => u && !u.startsWith("blob:"));

    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp || form.price),
      images: cleanUrls.length > 0 ? cleanUrls : ["/image/slide1A.jpg"],
      type: form.category === "Our Latest Collection" ? "featured" : form.category === "Best Sellers" ? "bestseller" : form.category === "New Arrivals" ? "new_arrival" : "",
    };
    const res = editingId ? await productApi.update(editingId, payload) : await productApi.create(payload);
    if (res?.success) {
      toast.success(editingId ? "Product updated!" : "Product created!");
      resetForm();
      loadData();
    } else {
      toast.error(res?.message || "Save failed.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.product_id);
    const imgs = safeImages(item.images).filter(u => u && !u.startsWith("blob:"));
    setForm({
      model_name: item.model_name || "", brand_name: item.brand_name || "",
      category: item.category || "", processor: item.processor || "",
      generation: item.generation || "", ram: item.ram || "",
      storage: item.storage || "", screen_size: item.screen_size || "",
      price: item.price || "", mrp: item.mrp || "", color: item.color || "",
      images: imgs, in_stock: item.in_stock !== false,
      is_featured: Boolean(item.is_featured),
    });
    setImagePreviews(imgs);
    setPendingFiles([]);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    const res = await productApi.remove(id);
    if (res?.success) { toast.success("Deleted!"); loadData(); }
    else toast.error("Delete failed.");
  };

  const handleDuplicate = (item) => {
    setEditingId(null);
    const imgs = safeImages(item.images).filter(u => u && !u.startsWith("blob:"));
    setForm({
      model_name: `${item.model_name} (Copy)`, brand_name: item.brand_name || "",
      category: item.category || "", processor: item.processor || "",
      generation: item.generation || "", ram: item.ram || "",
      storage: item.storage || "", screen_size: item.screen_size || "",
      price: item.price || "", mrp: item.mrp || "", color: item.color || "",
      images: imgs, in_stock: item.in_stock !== false,
      is_featured: Boolean(item.is_featured),
    });
    setImagePreviews(imgs);
    setPendingFiles([]);
    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    toast.info("Product duplicated. Edit and save to create new.");
  };

  const handleView = (item) => {
    setViewProduct(item);
  };

  // Image editing helpers
  const rotateImage = (index) => {
    setImageTransforms(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), rotation: ((prev[index]?.rotation || 0) + 90) % 360 }
    }));
  };

  const flipImage = (index) => {
    setImageTransforms(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), flipped: !(prev[index]?.flipped || false) }
    }));
  };

  const zoomImage = (index, dir) => {
    setImageTransforms(prev => ({
      ...prev,
      [index]: { ...(prev[index] || {}), zoom: Math.max(0.5, Math.min(3, (prev[index]?.zoom || 1) + dir * 0.25)) }
    }));
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (colSearch.model && !p.model_name?.toLowerCase().includes(colSearch.model.toLowerCase())) return false;
      if (colSearch.brand && !p.brand_name?.toLowerCase().includes(colSearch.brand.toLowerCase())) return false;
      if (colSearch.category && !p.category?.toLowerCase().includes(colSearch.category.toLowerCase())) return false;
      if (colSearch.processor && !p.processor?.toLowerCase().includes(colSearch.processor.toLowerCase())) return false;
      if (colSearch.stock === "in" && !p.in_stock) return false;
      if (colSearch.stock === "out" && p.in_stock) return false;
      return true;
    });
  }, [products, colSearch]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-sm text-gray-500">{products.length} products total</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-lg"
        >
          <PlusCircle className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* View Product Modal */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewProduct(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
              <button onClick={() => setViewProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5 space-y-4">
              {safeImages(viewProduct.images).length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {safeImages(viewProduct.images).map((img, i) => (
                    <img key={i} src={img} alt="" className="w-24 h-24 rounded-xl object-cover border border-gray-200 flex-shrink-0" />
                  ))}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Model", viewProduct.model_name],
                  ["Brand", viewProduct.brand_name],
                  ["Category", viewProduct.category],
                  ["Processor", viewProduct.processor],
                  ["Generation", viewProduct.generation],
                  ["RAM", viewProduct.ram],
                  ["Storage", viewProduct.storage],
                  ["Screen Size", viewProduct.screen_size],
                  ["Color", viewProduct.color],
                  ["Price", `₹${formatIndianNumber(viewProduct.price)}`],
                  ["MRP", `₹${formatIndianNumber(viewProduct.mrp)}`],
                  ["Stock", viewProduct.in_stock ? "In Stock" : "Out of Stock"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs font-semibold text-gray-400 uppercase">{label}</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{value || "-"}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 p-5 border-t border-gray-100">
              <button onClick={() => { handleEdit(viewProduct); setViewProduct(null); }} className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => { handleDuplicate(viewProduct); setViewProduct(null); }} className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </button>
              <button onClick={() => { handleDelete(viewProduct.product_id); setViewProduct(null); }} className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div ref={formRef} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-gray-900">{editingId ? "Edit Product" : "Add New Product"}</h3>
            <button onClick={resetForm} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput label="Model Name" value={form.model_name} onChange={(v) => handleFormChange("model_name", v)} required />
            <SearchableSelect label="Brand" options={filters.brands} value={form.brand_name} onChange={(v) => handleFormChange("brand_name", v)} onCreateNew={(v) => addFilterOption("brand", v)} allowNew required />
            <SearchableSelect label="Category" options={CATEGORIES} value={form.category} onChange={(v) => handleFormChange("category", v)} />
            <SearchableSelect label="Processor" options={filters.processors} value={form.processor} onChange={(v) => handleFormChange("processor", v)} onCreateNew={(v) => addFilterOption("processor", v)} allowNew />
            <FormInput label="Generation" value={form.generation} onChange={(v) => handleFormChange("generation", v)} />
            <SearchableSelect label="RAM" options={filters.ram} value={form.ram} onChange={(v) => handleFormChange("ram", v)} onCreateNew={(v) => addFilterOption("ram", v)} allowNew />
            <SearchableSelect label="Storage" options={filters.storage} value={form.storage} onChange={(v) => handleFormChange("storage", v)} onCreateNew={(v) => addFilterOption("storage", v)} allowNew />
            <SearchableSelect label="Screen Size" options={screenSizes} value={form.screen_size} onChange={(v) => handleFormChange("screen_size", v)} onCreateNew={() => {}} allowNew />
            <FormInput label="Color" value={form.color} onChange={(v) => handleFormChange("color", v)} />
            <FormInput label="Price (₹)" type="number" value={form.price} onChange={(v) => handleFormChange("price", v)} required />
            <FormInput label="MRP (₹)" type="number" value={form.mrp} onChange={(v) => handleFormChange("mrp", v)} />

            {/* Image Upload with Editing */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <input type="file" multiple accept="image/*" onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 file:font-medium file:cursor-pointer" />
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {imagePreviews.map((src, i) => {
                    const transform = imageTransforms[i] || {};
                    const style = {
                      transform: `rotate(${transform.rotation || 0}deg) scaleX(${transform.flipped ? -1 : 1}) scale(${transform.zoom || 1})`,
                    };
                    return (
                      <div key={i} className="relative group">
                        <div className="w-24 h-24 rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                          <img src={src} alt="" className="w-full h-full object-cover transition-transform" style={style} />
                        </div>
                        {/* Image edit controls */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={() => rotateImage(i)} className="p-1 hover:bg-gray-100 rounded" title="Rotate">
                            <RotateCw className="w-3 h-3 text-gray-600" />
                          </button>
                          <button type="button" onClick={() => flipImage(i)} className="p-1 hover:bg-gray-100 rounded" title="Flip">
                            <FlipHorizontal className="w-3 h-3 text-gray-600" />
                          </button>
                          <button type="button" onClick={() => zoomImage(i, 1)} className="p-1 hover:bg-gray-100 rounded" title="Zoom In">
                            <ZoomIn className="w-3 h-3 text-gray-600" />
                          </button>
                          <button type="button" onClick={() => zoomImage(i, -1)} className="p-1 hover:bg-gray-100 rounded" title="Zoom Out">
                            <ZoomOut className="w-3 h-3 text-gray-600" />
                          </button>
                          <button type="button" onClick={() => removeImage(i)} className="p-1 hover:bg-red-100 rounded" title="Remove">
                            <X className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 col-span-full">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.in_stock} onChange={(e) => handleFormChange("in_stock", e.target.checked)}
                  className="h-4 w-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500" /> In Stock
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => handleFormChange("is_featured", e.target.checked)}
                  className="h-4 w-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500" /> Featured
              </label>
            </div>

            <div className="col-span-full flex gap-3">
              <button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition shadow-lg">
                <Save className="w-4 h-4" /> {editingId ? "Update" : "Create"} Product
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table with proper scrolling */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
          <table className="w-full text-sm" style={{ minWidth: "900px" }}>
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {[
                  { key: "model", label: "Model", width: "200px" },
                  { key: "brand", label: "Brand", width: "120px" },
                  { key: "category", label: "Category", width: "150px" },
                  { key: "processor", label: "Processor", width: "140px" },
                ].map((col) => (
                  <th key={col.key} className="text-left px-3 py-2.5" style={{ minWidth: col.width }}>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">{col.label}</span>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                      <input type="text" value={colSearch[col.key]}
                        onChange={(e) => setColSearch((p) => ({ ...p, [col.key]: e.target.value }))}
                        placeholder="Search" className="w-full pl-6 pr-2 py-1 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                  </th>
                ))}
                <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider text-gray-500" style={{ minWidth: "80px" }}>RAM</th>
                <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider text-gray-500" style={{ minWidth: "100px" }}>Storage</th>
                <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider text-gray-500" style={{ minWidth: "100px" }}>Price</th>
                <th className="text-left px-3 py-2.5" style={{ minWidth: "100px" }}>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 block mb-1">Stock</span>
                  <select value={colSearch.stock} onChange={(e) => setColSearch((p) => ({ ...p, stock: e.target.value }))}
                    className="w-full py-1 px-1 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-cyan-500">
                    <option value="">All</option>
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </th>
                <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider text-gray-500 sticky right-0 bg-gray-50" style={{ minWidth: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => (
                <tr key={p.product_id} className="hover:bg-gray-50/50 transition">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      {safeImages(p.images)?.[0] && (
                        <img src={safeImages(p.images)[0]} alt="" className="w-8 h-8 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                      )}
                      <span className="font-medium text-gray-800 truncate max-w-[160px]">{p.model_name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{p.brand_name}</td>
                  <td className="px-3 py-2.5">
                    {p.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">{p.category}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-gray-600">{p.processor}</td>
                  <td className="px-3 py-2.5 text-gray-600">{p.ram}</td>
                  <td className="px-3 py-2.5 text-gray-600">{p.storage}</td>
                  <td className="px-3 py-2.5 font-semibold text-gray-800">₹{formatIndianNumber(p.price)}</td>
                  <td className="px-3 py-2.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {p.in_stock ? "In Stock" : "Out"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 sticky right-0 bg-white">
                    <div className="flex gap-1">
                      <button onClick={() => handleView(p)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg text-cyan-600 hover:bg-cyan-50 transition" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDuplicate(p)} className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p.product_id)} className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center py-12 text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  No products found.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({ label, value, onChange, type = "text", required = false }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required}
      className="mt-1 block w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" />
  </label>
);

export default AdminProducts;
