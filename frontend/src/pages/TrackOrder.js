import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search, Package, Truck, CheckCircle, MapPin, Clock,
  Calendar, Phone, Mail, Shield, ArrowRight, Info,
} from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";
import { searchOrderByTrackingId } from "../utils/orderService";
import { orderApi } from "../api/orderApi";
import { formatIndianNumber } from "../utils/methods";

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper to look up order from both local storage and API
  const lookupOrder = async (query) => {
    setLoading(true);
    setError("");
    setOrderData(null);
    // First try local storage (for sample orders)
    const localResult = searchOrderByTrackingId(query);
    if (localResult) {
      setOrderData(localResult);
      setLoading(false);
      return;
    }
    // Then try the API
    try {
      const res = await orderApi.trackByNumber(query);
      if (res?.success && res.data) {
        // Normalize API order format to match display format
        const apiOrder = res.data;
        setOrderData({
          orderId: apiOrder.order_number || apiOrder.order_id,
          status: apiOrder.order_status || "pending",
          totalAmount: apiOrder.total_amount,
          paymentMethod: apiOrder.payment_method || "N/A",
          createdAt: apiOrder.ordered_at || apiOrder.createdAt,
          customerName: apiOrder.user?.first_name ? `${apiOrder.user.first_name} ${apiOrder.user.last_name || ""}` : "Customer",
          shippingAddress: apiOrder.shipping_address || "",
          items: (apiOrder.items || []).map(item => ({
            name: item.model_name || item.product_name || "Product",
            quantity: item.quantity || 1,
            price: item.price || 0,
            productId: item.product_id,
            image: (() => {
              const imgs = item.images;
              let arr = Array.isArray(imgs) ? imgs : (typeof imgs === "string" ? (() => { try { return JSON.parse(imgs); } catch { return []; } })() : []);
              arr = arr.filter(u => u && !u.startsWith("blob:"));
              return arr[0] || "/image/slide1A.jpg";
            })(),
          })),
          tracking: apiOrder.tracking || {},
        });
        setLoading(false);
        return;
      }
    } catch {
      // API failed, continue
    }
    setError("Order not found. Please check your order number and try again.");
    setLoading(false);
  };

  // Auto-fill and auto-track from URL query param
  useEffect(() => {
    const orderFromUrl = searchParams.get("order");
    if (orderFromUrl) {
      setOrderNumber(orderFromUrl);
      lookupOrder(orderFromUrl.trim());
    }
    // eslint-disable-next-line
  }, [searchParams]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter an order number or tracking ID");
      return;
    }
    lookupOrder(orderNumber.trim());
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  const orderStages = [
    { key: "pending", label: "Order Placed", icon: Package },
    { key: "confirmed", label: "Confirmed", icon: CheckCircle },
    { key: "processing", label: "Processing", icon: Clock },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "out_for_delivery", label: "Out for Delivery", icon: MapPin },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const statusIndex = (status) => {
    if (status === "cancelled") return -1;
    return orderStages.findIndex((s) => s.key === status);
  };

  const sampleOrderIds = ["ORD-2026-001", "ORD-2026-002", "ORD-2026-003"];

  return (
    <>
      <SEOHead
        title="Track Your Order"
        description="Track your refurbished laptop order status in real-time with advanced tracking."
        keywords="track order, order status, laptop delivery tracking"
        canonical="https://laptoprefurbished.in/track-order"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 text-white py-16 md:py-20 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Package className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Track Your Order</h1>
          <p className="text-cyan-100 text-lg max-w-xl mx-auto">
            Enter your order number or tracking ID to get real-time delivery updates
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 -mt-12 relative z-10 border border-gray-100">
            <form onSubmit={handleTrack}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Number / Tracking ID
              </label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                    placeholder="e.g., ORD-2026-001"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-base"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white px-6 py-3.5 rounded-xl font-medium transition flex items-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                  ) : (
                    <>Track <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm mt-3 flex items-center gap-1"><Info className="w-4 h-4" /> {error}</p>}
              <p className="text-gray-400 text-xs mt-3">
                Try sample: {sampleOrderIds.map((id, i) => (
                  <button key={id} type="button" onClick={() => setOrderNumber(id)}
                    className="text-cyan-600 hover:underline mx-1">{id}{i < sampleOrderIds.length - 1 ? "," : ""}</button>
                ))}
              </p>
            </form>
          </div>

          {/* Order Result */}
          {orderData && (
            <div className="mt-8 space-y-6">
              {/* Order Info Card */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Order Number</p>
                      <p className="text-xl font-bold text-gray-900">{orderData.orderId}</p>
                    </div>
                    <StatusBadge status={orderData.status} />
                  </div>
                </div>

                {/* Progress Bar (non-cancelled) */}
                {orderData.status !== "cancelled" && (
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4 overflow-x-auto">
                      {orderStages.map((stage, idx) => {
                        const currentIdx = statusIndex(orderData.status);
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;
                        const Icon = stage.icon;
                        return (
                          <div key={stage.key} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center min-w-[60px]">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isCompleted
                                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                                  : "bg-gray-100 text-gray-400"
                              } ${isCurrent ? "ring-4 ring-green-100" : ""}`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <span className={`text-[10px] mt-1.5 text-center ${isCompleted ? "text-green-700 font-medium" : "text-gray-400"}`}>
                                {stage.label}
                              </span>
                            </div>
                            {idx < orderStages.length - 1 && (
                              <div className={`flex-1 h-0.5 mx-1 ${idx < currentIdx ? "bg-green-500" : "bg-gray-200"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tracking Timeline */}
                {orderData.tracking?.timeline?.length > 0 && (
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-600" /> Tracking Timeline
                    </h3>
                    <div className="relative pl-8 space-y-0">
                      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
                      {orderData.tracking.timeline.map((event, idx) => {
                        const isLast = idx === orderData.tracking.timeline.length - 1;
                        return (
                          <div key={idx} className="relative pb-5 last:pb-0">
                            <div className={`absolute -left-5 w-3 h-3 rounded-full border-2 ${
                              isLast ? "bg-cyan-500 border-cyan-500 ring-4 ring-cyan-100" : "bg-white border-gray-300"
                            }`} />
                            <div className="bg-gray-50 rounded-lg p-3 ml-2">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <span className={`text-sm font-medium ${isLast ? "text-cyan-700" : "text-gray-800"}`}>
                                  {event.status}
                                </span>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <Calendar className="w-3 h-3" /> {formatDate(event.date)}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Details Grid */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <DetailItem label="Order Date" value={formatDate(orderData.createdAt)} />
                  <DetailItem label="Total Amount" value={`₹${formatIndianNumber(orderData.totalAmount)}`} />
                  <DetailItem label="Payment Method" value={orderData.paymentMethod} />
                  <DetailItem label="Courier" value={orderData.tracking?.courier || "N/A"} />
                  {orderData.tracking?.trackingId && (
                    <DetailItem label="Tracking ID" value={orderData.tracking.trackingId} />
                  )}
                  <DetailItem label="Items" value={`${(orderData.items || []).length} item(s)`} />
                </div>

                {/* Order Items */}
                {orderData.items?.length > 0 && (
                  <div className="p-5 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 text-cyan-600" /> Order Items
                    </h3>
                    <div className="space-y-3">
                      {orderData.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-14 h-14 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image || "/image/slide1A.jpg"} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {item.productId ? (
                              <Link to={`/product/${item.productId}`} className="text-sm font-medium text-gray-800 hover:text-cyan-600 transition truncate block">
                                {item.name}
                              </Link>
                            ) : (
                              <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                            )}
                            <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                          </div>
                          <p className="text-sm font-semibold text-gray-800">₹{formatIndianNumber(item.price || 0)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shipping Address */}
                {orderData.shippingAddress && (
                  <div className="p-5 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800">Shipping Address</p>
                        <p className="text-gray-500 mt-0.5">{orderData.shippingAddress}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Secure Tracking", desc: "Your data is encrypted and secure" },
              { icon: Truck, title: "Real-time Updates", desc: "Get live status on your delivery" },
              { icon: Phone, title: "24/7 Support", desc: "We're always here to help" },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition">
                <f.icon className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-gray-800">{f.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Help */}
          <div className="mt-10 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 text-center border border-cyan-100">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help with Your Order?</h3>
            <p className="text-gray-600 text-sm mb-4">Our support team is available to assist you</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
                <Phone className="w-4 h-4" /> Call Us
              </a>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
                <Mail className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const StatusBadge = ({ status }) => {
  const config = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped: "bg-cyan-100 text-cyan-700",
    out_for_delivery: "bg-lime-100 text-lime-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config[status] || "bg-gray-100 text-gray-700"}`}>
      {status?.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
    </span>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
    <p className="text-gray-800 font-medium mt-0.5">{value}</p>
  </div>
);

export default TrackOrder;
