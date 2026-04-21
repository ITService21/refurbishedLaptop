import React, { useEffect, useState, useMemo } from "react";
import { productApi } from "../../../api/productApi";
import { getStoredOrders } from "../../../utils/orderService";
import { formatIndianNumber } from "../../../utils/methods";
import StatsCard from "../components/StatsCard";
import { DollarSign, ShoppingBag, Users, TrendingUp, BarChart2 } from "lucide-react";

const AdminAnalytics = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await productApi.getAll({ page: 1, limit: 1000 });
        setProducts(res?.data?.products || []);
      } catch (e) {
        console.error("Analytics load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const orders = useMemo(() => getStoredOrders(), []);

  const data = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.totalAmount || 0), 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Sales by month
    const byMonth = {};
    orders.forEach((o) => {
      const m = new Date(o.createdAt).toLocaleString("en-IN", { month: "short", year: "numeric" });
      byMonth[m] = (byMonth[m] || 0) + Number(o.totalAmount || 0);
    });

    // By category
    const byCat = {};
    products.forEach((p) => {
      const cat = p.category || "Uncategorized";
      byCat[cat] = (byCat[cat] || 0) + 1;
    });

    // By status
    const byStatus = {};
    orders.forEach((o) => {
      const s = o.status || "unknown";
      byStatus[s] = (byStatus[s] || 0) + 1;
    });

    // Top brands by revenue
    const brandRevenue = {};
    orders.forEach((o) => {
      (o.items || []).forEach((item) => {
        const brand = item.brand || "Unknown";
        brandRevenue[brand] = (brandRevenue[brand] || 0) + Number(item.price || 0) * Number(item.quantity || 1);
      });
    });

    return { totalRevenue, totalOrders, avgOrder, byMonth, byCat, byStatus, brandRevenue };
  }, [products, orders]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600" />
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-500", confirmed: "bg-blue-500", processing: "bg-purple-500",
    shipped: "bg-cyan-500", out_for_delivery: "bg-lime-500", delivered: "bg-green-500", cancelled: "bg-red-500",
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Sales & Business Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">Insights into your store's performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={`₹${formatIndianNumber(data.totalRevenue)}`} icon={DollarSign} color="text-green-600" bgColor="bg-green-50" />
        <StatsCard title="Total Orders" value={data.totalOrders} icon={ShoppingBag} />
        <StatsCard title="Avg. Order Value" value={`₹${formatIndianNumber(Math.round(data.avgOrder))}`} icon={TrendingUp} color="text-purple-600" bgColor="bg-purple-50" />
        <StatsCard title="Total Products" value={products.length} icon={BarChart2} color="text-cyan-600" bgColor="bg-cyan-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="space-y-3">
            {Object.entries(data.byMonth).length > 0 ? (
              Object.entries(data.byMonth).map(([month, amount]) => {
                const maxAmount = Math.max(...Object.values(data.byMonth));
                const pct = maxAmount > 0 ? (amount / maxAmount) * 100 : 0;
                return (
                  <div key={month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{month}</span>
                      <span className="font-medium text-gray-800">₹{formatIndianNumber(amount)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No revenue data yet</p>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(data.byStatus).length > 0 ? (
              Object.entries(data.byStatus).map(([status, count]) => {
                const pct = data.totalOrders > 0 ? (count / data.totalOrders) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 capitalize">{status.replace(/_/g, " ")}</span>
                      <span className="text-gray-500">{count} ({Math.round(pct)}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${statusColors[status] || "bg-gray-400"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No order data</p>
            )}
          </div>
        </div>

        {/* Products by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Products by Category</h3>
          <div className="space-y-3">
            {Object.entries(data.byCat)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => {
                const pct = products.length > 0 ? (count / products.length) * 100 : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{cat}</span>
                      <span className="text-gray-500">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            {Object.keys(data.byCat).length === 0 && <p className="text-sm text-gray-400 text-center py-4">No data</p>}
          </div>
        </div>

        {/* Top Brands by Revenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Top Brands by Revenue</h3>
          <div className="space-y-3">
            {Object.entries(data.brandRevenue).length > 0 ? (
              Object.entries(data.brandRevenue)
                .sort((a, b) => b[1] - a[1])
                .map(([brand, rev]) => {
                  const maxRev = Math.max(...Object.values(data.brandRevenue));
                  const pct = maxRev > 0 ? (rev / maxRev) * 100 : 0;
                  return (
                    <div key={brand}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{brand}</span>
                        <span className="font-medium text-gray-800">₹{formatIndianNumber(rev)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No revenue data by brand</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
