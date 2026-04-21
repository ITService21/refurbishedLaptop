import React, { useEffect, useState, useMemo, useCallback } from "react";
import { productApi } from "../../../api/productApi";
import { formatIndianNumber } from "../../../utils/methods";
import StatsCard from "../components/StatsCard";
import { Warehouse, AlertTriangle, CheckCircle, DollarSign, Package } from "lucide-react";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productApi.getAll({ page: 1, limit: 1000 });
      setProducts(res?.data?.products || []);
    } catch (e) {
      console.error("Inventory load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.in_stock).length;
    const outOfStock = total - inStock;
    const value = products.reduce((s, p) => s + (p.in_stock ? Number(p.price || 0) : 0), 0);
    const byCategory = {};
    const byBrand = {};
    products.forEach((p) => {
      const cat = p.category || "Uncategorized";
      const brand = p.brand_name || "Unknown";
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      byBrand[brand] = (byBrand[brand] || 0) + 1;
    });
    return { total, inStock, outOfStock, value, byCategory, byBrand };
  }, [products]);

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
        <h2 className="text-2xl font-bold text-gray-900">Inventory Insights</h2>
        <p className="text-sm text-gray-500 mt-1">Monitor your stock levels and inventory health</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total SKUs" value={stats.total} icon={Warehouse} />
        <StatsCard title="In Stock" value={stats.inStock} icon={CheckCircle} color="text-green-600" bgColor="bg-green-50" />
        <StatsCard title="Out of Stock" value={stats.outOfStock} icon={AlertTriangle} color="text-red-600" bgColor="bg-red-50" />
        <StatsCard title="Stock Value" value={`₹${formatIndianNumber(stats.value)}`} icon={DollarSign} color="text-indigo-600" bgColor="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Stock by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.byCategory)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => {
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            {Object.keys(stats.byCategory).length === 0 && <p className="text-sm text-gray-400 text-center">No data</p>}
          </div>
        </div>

        {/* By Brand */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Stock by Brand</h3>
          <div className="space-y-3">
            {Object.entries(stats.byBrand)
              .sort((a, b) => b[1] - a[1])
              .map(([brand, count]) => {
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={brand}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{brand}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            {Object.keys(stats.byBrand).length === 0 && <p className="text-sm text-gray-400 text-center">No data</p>}
          </div>
        </div>
      </div>

      {/* Out of Stock Table */}
      {stats.outOfStock > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-5">
          <h3 className="text-base font-semibold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Out of Stock Items ({stats.outOfStock})
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-red-50">
                <tr>
                  <th className="text-left px-4 py-2 text-xs font-medium text-red-800">Model</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-red-800">Brand</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-red-800">Category</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-red-800">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.filter((p) => !p.in_stock).map((p) => (
                  <tr key={p.product_id} className="hover:bg-red-50/50">
                    <td className="px-4 py-2 font-medium text-gray-800">{p.model_name}</td>
                    <td className="px-4 py-2 text-gray-600">{p.brand_name}</td>
                    <td className="px-4 py-2 text-gray-600">{p.category}</td>
                    <td className="px-4 py-2 text-gray-800">₹{formatIndianNumber(p.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-cyan-600" /> Full Inventory ({products.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Model</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Specs</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="text-left px-4 py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.product_id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-800">{p.model_name}</td>
                  <td className="px-4 py-2 text-gray-600">{p.brand_name}</td>
                  <td className="px-4 py-2 text-gray-600">{p.category}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{[p.processor, p.ram, p.storage].filter(Boolean).join(" | ")}</td>
                  <td className="px-4 py-2 text-gray-800">₹{formatIndianNumber(p.price)}</td>
                  <td className="px-4 py-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {p.in_stock ? "In Stock" : "Out"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInventory;
