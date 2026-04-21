import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { formatIndianNumber } from "../../../utils/methods";
import { getStoredOrders, updateOrderInStore } from "../../../utils/orderService";
import StatsCard from "../components/StatsCard";
import {
  Package, Truck, CheckCircle, XCircle, Clock, Eye, X,
  Calendar, MapPin, CreditCard, ShoppingBag,
} from "lucide-react";

const STATUS_OPTIONS = [
  "pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(getStoredOrders());
      setLoading(false);
    }, 300);
  }, []);

  const handleStatusUpdate = () => {
    if (!selectedOrder || !newStatus) { toast.error("Select a new status."); return; }
    const updated = updateOrderInStore(selectedOrder.orderId, { status: newStatus });
    if (updated) {
      setOrders(getStoredOrders());
      setSelectedOrder(updated);
      setNewStatus("");
      toast.success(`Order updated to "${newStatus}"`);
    }
  };

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.totalAmount || 0), 0);
    return { total, pending, shipped, delivered, cancelled, revenue };
  }, [orders]);

  const filtered = useMemo(() => {
    if (filterStatus === "all") return orders;
    return orders.filter((o) => o.status === filterStatus);
  }, [orders, filterStatus]);

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
        <h2 className="text-2xl font-bold text-gray-900">Orders & Tracking</h2>
        <p className="text-sm text-gray-500 mt-1">Manage orders, update statuses, and track deliveries</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="Total Orders" value={stats.total} icon={ShoppingBag} />
        <StatsCard title="Pending" value={stats.pending} icon={Clock} color="text-orange-600" bgColor="bg-orange-50" />
        <StatsCard title="Shipped" value={stats.shipped} icon={Truck} color="text-blue-600" bgColor="bg-blue-50" />
        <StatsCard title="Delivered" value={stats.delivered} icon={CheckCircle} color="text-green-600" bgColor="bg-green-50" />
        <StatsCard title="Cancelled" value={stats.cancelled} icon={XCircle} color="text-red-600" bgColor="bg-red-50" />
        <StatsCard title="Revenue" value={`₹${formatIndianNumber(stats.revenue)}`} icon={CreditCard} color="text-indigo-600" bgColor="bg-indigo-50" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["all", ...STATUS_OPTIONS].map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === s ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {s === "all" ? "All" : s.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((o) => (
                <tr key={o.orderId} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-800">{o.orderId}</td>
                  <td className="px-4 py-3">
                    <p className="text-gray-800">{o.customerName}</p>
                    <p className="text-xs text-gray-400">{o.customerEmail}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">₹{formatIndianNumber(o.totalAmount)}</td>
                  <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => { setSelectedOrder(o); setNewStatus(""); }}
                      className="p-1.5 rounded-lg text-cyan-600 hover:bg-cyan-50 transition" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white w-full max-w-xl h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-gray-900">Order {selectedOrder.orderId}</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-5 space-y-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <StatusBadge status={selectedOrder.status} />
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {new Date(selectedOrder.createdAt).toLocaleString("en-IN")}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-semibold text-gray-900">Customer</h4>
                <p className="text-gray-700">{selectedOrder.customerName}</p>
                <p className="text-gray-500">{selectedOrder.customerEmail}</p>
                <p className="text-gray-500">{selectedOrder.customerPhone}</p>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Items</h4>
                <div className="space-y-2">
                  {(selectedOrder.items || []).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <img src={item.image || "/image/slide1A.jpg"} alt="" className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold">₹{formatIndianNumber(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Shipping */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-gray-500 uppercase">Payment</p>
                  <p className="font-medium text-gray-800">{selectedOrder.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Total</p>
                  <p className="font-bold text-gray-900">₹{formatIndianNumber(selectedOrder.totalAmount)}</p>
                </div>
              </div>

              {selectedOrder.shippingAddress && (
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-xs text-gray-500 uppercase mb-1">
                    <MapPin className="w-3 h-3" /> Shipping Address
                  </div>
                  <p className="text-gray-700">{selectedOrder.shippingAddress}</p>
                </div>
              )}

              {/* Tracking Timeline */}
              {selectedOrder.tracking?.timeline?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-3">Tracking Timeline</h4>
                  <div className="relative pl-6 space-y-0">
                    <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-gray-200" />
                    {selectedOrder.tracking.timeline.map((ev, i) => {
                      const isLast = i === selectedOrder.tracking.timeline.length - 1;
                      return (
                        <div key={i} className="relative pb-4 last:pb-0">
                          <div className={`absolute -left-3.5 w-2.5 h-2.5 rounded-full ${isLast ? "bg-cyan-500 ring-4 ring-cyan-100" : "bg-gray-300"}`} />
                          <div className="ml-2">
                            <p className={`text-sm font-medium ${isLast ? "text-cyan-700" : "text-gray-700"}`}>{ev.status}</p>
                            <p className="text-xs text-gray-400">{new Date(ev.date).toLocaleString("en-IN")}</p>
                            {ev.description && <p className="text-xs text-gray-500 mt-0.5">{ev.description}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Update Status */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-semibold text-gray-900 text-sm mb-2">Update Status</h4>
                <div className="flex gap-2">
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-cyan-500">
                    <option value="">Select status</option>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</option>
                    ))}
                  </select>
                  <button onClick={handleStatusUpdate}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
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

export default AdminOrders;
