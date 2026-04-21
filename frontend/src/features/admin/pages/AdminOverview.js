import React, { useEffect, useState, useMemo } from "react";
import { Package, TrendingUp, TrendingDown, List, DollarSign, ShoppingBag, Users, Star } from "lucide-react";
import { productApi } from "../../../api/productApi";
import { formatIndianNumber } from "../../../utils/methods";
import { getStoredOrders } from "../../../utils/orderService";
import StatsCard from "../components/StatsCard";

const AdminOverview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await productApi.getAll({ page: 1, limit: 1000 });
        setProducts(res?.data?.products || []);
      } catch (e) {
        console.error("Error loading overview:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const orders = useMemo(() => getStoredOrders(), []);

  const stats = useMemo(() => {
    const total = products.length;
    const inStock = products.filter((p) => p.in_stock).length;
    const outOfStock = total - inStock;
    const featured = products.filter((p) => p.is_featured).length;
    const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].length;
    const value = products.reduce((s, p) => s + Number(p.price || 0), 0);
    const revenue = orders.reduce((s, o) => s + Number(o.totalAmount || 0), 0);

    const byBrand = {};
    products.forEach((p) => {
      const b = p.brand_name || "Unknown";
      byBrand[b] = (byBrand[b] || 0) + 1;
    });

    return { total, inStock, outOfStock, featured, categories, value, revenue, byBrand };
  }, [products, orders]);

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
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening with your store</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Products" value={stats.total} icon={Package} />
        <StatsCard title="In Stock" value={stats.inStock} icon={TrendingUp} color="text-green-600" bgColor="bg-green-50" />
        <StatsCard title="Out of Stock" value={stats.outOfStock} icon={TrendingDown} color="text-red-600" bgColor="bg-red-50" />
        <StatsCard title="Categories" value={stats.categories} icon={List} color="text-purple-600" bgColor="bg-purple-50" />
        <StatsCard title="Featured" value={stats.featured} icon={Star} color="text-yellow-600" bgColor="bg-yellow-50" />
        <StatsCard title="Inventory Value" value={`₹${formatIndianNumber(stats.value)}`} icon={DollarSign} color="text-indigo-600" bgColor="bg-indigo-50" />
        <StatsCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="text-orange-600" bgColor="bg-orange-50" />
        <StatsCard title="Revenue" value={`₹${formatIndianNumber(stats.revenue)}`} icon={DollarSign} color="text-emerald-600" bgColor="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Products</h3>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.product_id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <img
                  src={(() => {
                    const imgs = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? (() => { try { return JSON.parse(p.images); } catch { return []; } })() : []);
                    const first = imgs[0];
                    return (first && !first.startsWith("blob:")) ? first : "/image/slide1A.jpg";
                  })()}
                  alt={p.model_name}
                  className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{p.model_name}</p>
                  <p className="text-xs text-gray-500">{p.brand_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">₹{formatIndianNumber(p.price)}</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {p.in_stock ? "In Stock" : "Out"}
                  </span>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No products yet</p>}
          </div>
        </div>

        {/* Inventory by Brand */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Inventory by Brand</h3>
          <div className="space-y-2">
            {Object.entries(stats.byBrand)
              .sort((a, b) => b[1] - a[1])
              .map(([brand, count]) => {
                const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                return (
                  <div key={brand}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 font-medium">{brand}</span>
                      <span className="text-gray-500">{count} items</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            {Object.keys(stats.byBrand).length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No brand data</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.orderId} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 px-3 font-medium text-gray-800">{o.orderId}</td>
                    <td className="py-2.5 px-3 text-gray-600">{o.customerName}</td>
                    <td className="py-2.5 px-3 text-gray-800">₹{formatIndianNumber(o.totalAmount)}</td>
                    <td className="py-2.5 px-3">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="py-2.5 px-3 text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-4 text-gray-400">No orders yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderStatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-cyan-100 text-cyan-700",
    out_for_delivery: "bg-lime-100 text-lime-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
};

export default AdminOverview;
