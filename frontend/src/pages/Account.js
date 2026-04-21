import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, Edit2,
  Camera, Shield, Bell, Lock, Trash2, Eye, EyeOff, Plus, Phone, Mail,
  Calendar, Award, ShoppingBag, TrendingUp, Clock, Star, CheckCircle,
  Globe, CreditCard, Truck, AlertTriangle, Download, HelpCircle, Copy,
} from "lucide-react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SEOHead from "../Components/SEO/SEOHead";
import { userApi, orderApi } from "../Components/common/apiWrapper";
import { COOKIES, ORDER_STATUS, COMPANY } from "../config/constants";
import { formatIndianNumber } from "../utils/methods";
import { Loader } from "../Components/common/Elements";
import { selectWishlistItems, removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login?.user);
  const userData = useSelector((state) => state.login?.userData);
  const wishlistItems = useSelector(selectWishlistItems);

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: "", new: "", confirm: "" });
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [showAddAddress, setShowAddAddress] = useState(false);

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (["orders", "addresses", "wishlist", "settings"].includes(path)) {
      setActiveTab(path);
    } else {
      setActiveTab("profile");
    }
  }, [location]);

  useEffect(() => {
    const token = Cookies.get(COOKIES.authToken);
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileRes, ordersRes, addressesRes] = await Promise.all([
        userApi.getProfile(),
        orderApi.getMyOrders({ limit: 20 }),
        userApi.getAddresses(),
      ]);
      if (profileRes?.success) setProfile(profileRes.data);
      if (ordersRes?.success) setOrders(ordersRes.data?.orders || []);
      if (addressesRes?.success) setAddresses(addressesRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove(COOKIES.authToken);
    Cookies.remove(COOKIES.userId);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const menuItems = [
    { id: "profile", label: "My Profile", icon: User, desc: "Personal information" },
    { id: "orders", label: "My Orders", icon: Package, desc: `${orders.length} orders` },
    { id: "addresses", label: "Addresses", icon: MapPin, desc: `${addresses.length} saved` },
    { id: "wishlist", label: "Wishlist", icon: Heart, desc: `${wishlistItems.length} items` },
    { id: "settings", label: "Settings", icon: Settings, desc: "Security & preferences" },
  ];

  const memberSince = profile?.registered_date
    ? new Date(profile.registered_date).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[60px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SEOHead title="My Account" noIndex={true} />
      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold shadow-lg">
                  {profile?.first_name?.charAt(0) || "U"}
                  {profile?.last_name?.charAt(0) || ""}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-3.5 h-3.5 text-gray-600" />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold">
                  {profile?.first_name} {profile?.last_name}
                </h1>
                <p className="text-cyan-100 text-sm">{profile?.email}</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1 text-xs bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <Calendar className="w-3 h-3" /> Member since {memberSince}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    <ShoppingBag className="w-3 h-3" /> {orders.length} Orders
                  </span>
                  {userData?.role === "admin" && (
                    <span className="inline-flex items-center gap-1 text-xs bg-amber-500/20 text-amber-200 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Shield className="w-3 h-3" /> Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-72">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <nav className="divide-y divide-gray-50">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); navigate(`/account/${item.id}`); }}
                      className={`w-full flex items-center gap-3 px-5 py-4 transition ${
                        activeTab === item.id
                          ? "bg-cyan-50 border-l-4 border-cyan-600"
                          : "hover:bg-gray-50 border-l-4 border-transparent"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activeTab === item.id ? "bg-cyan-100" : "bg-gray-100"
                      }`}>
                        <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-cyan-600" : "text-gray-500"}`} />
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className={`font-medium text-sm ${activeTab === item.id ? "text-cyan-700" : "text-gray-800"}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${activeTab === item.id ? "text-cyan-500" : "text-gray-300"}`} />
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition border-l-4 border-transparent"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-500" />
                    </div>
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-5 border border-cyan-100">
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-3">Account Overview</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Orders</span>
                    <span className="text-sm font-bold text-gray-900">{orders.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Wishlist Items</span>
                    <span className="text-sm font-bold text-gray-900">{wishlistItems.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Saved Addresses</span>
                    <span className="text-sm font-bold text-gray-900">{addresses.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                      <button className="flex items-center gap-1.5 text-cyan-600 hover:text-cyan-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-cyan-50 transition">
                        <Edit2 className="w-4 h-4" /> Edit Profile
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                      {[
                        { icon: User, label: "First Name", value: profile?.first_name },
                        { icon: User, label: "Last Name", value: profile?.last_name },
                        { icon: Mail, label: "Email Address", value: profile?.email },
                        { icon: Phone, label: "Phone Number", value: profile?.phone },
                        { icon: Calendar, label: "Member Since", value: memberSince },
                        { icon: Shield, label: "Account Type", value: userData?.role === "admin" ? "Administrator" : "Customer" },
                      ].map((field) => (
                        <div key={field.label} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <field.icon className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{field.label}</p>
                            <p className="text-gray-800 font-medium mt-0.5">{field.value || "Not provided"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                    {orders.length > 0 ? (
                      <div className="space-y-3">
                        {orders.slice(0, 3).map((order) => (
                          <div key={order.order_id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                              <Package className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800">Order #{order.order_number}</p>
                              <p className="text-xs text-gray-500">{new Date(order.ordered_at).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              ORDER_STATUS[order.order_status]?.color === "green" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              {ORDER_STATUS[order.order_status]?.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No recent activity. Start shopping!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
                      <span className="text-sm text-gray-500">{orders.length} total orders</span>
                    </div>

                    {/* Order Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: "Total Orders", value: orders.length, icon: Package, color: "bg-blue-50 text-blue-600" },
                        { label: "Delivered", value: orders.filter(o => o.order_status === "delivered").length, icon: CheckCircle, color: "bg-green-50 text-green-600" },
                        { label: "In Progress", value: orders.filter(o => ["pending", "processing", "shipped"].includes(o.order_status)).length, icon: Clock, color: "bg-amber-50 text-amber-600" },
                        { label: "Total Spent", value: `₹${formatIndianNumber(orders.reduce((s, o) => s + (o.total_amount || 0), 0))}`, icon: CreditCard, color: "bg-purple-50 text-purple-600" },
                      ].map((stat) => (
                        <div key={stat.label} className="p-4 bg-gray-50 rounded-xl text-center">
                          <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color.split(" ")[1]}`} />
                          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-cyan-700 transition">
                          Browse Products <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.order_id}
                            className="p-5 bg-gray-50 border border-gray-100 rounded-xl hover:border-cyan-300 hover:shadow-md transition group"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div>
                                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                                    Order #{order.order_number}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(order.order_number);
                                        toast.success("Order ID copied!");
                                      }}
                                      className="p-1 rounded-md hover:bg-gray-200 transition text-gray-400 hover:text-cyan-600"
                                      title="Copy Order ID"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>
                                  </p>
                                  <p className="text-xs text-gray-500 mt-0.5">
                                    Placed on {new Date(order.ordered_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                                  </p>
                                </div>
                              </div>
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                order.order_status === "delivered" ? "bg-green-100 text-green-700" :
                                order.order_status === "cancelled" ? "bg-red-100 text-red-700" :
                                "bg-amber-100 text-amber-700"
                              }`}>
                                {ORDER_STATUS[order.order_status]?.label || order.order_status}
                              </span>
                            </div>
                            <Link
                              to={`/track-order?order=${order.order_number}`}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900">₹{formatIndianNumber(order.total_amount)}</span>
                                <span className="text-xs text-cyan-600 font-medium group-hover:underline">Track Order</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 transition" />
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                      <button
                        onClick={() => setShowAddAddress(true)}
                        className="flex items-center gap-1.5 bg-cyan-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-cyan-700 transition"
                      >
                        <Plus className="w-4 h-4" /> Add New
                      </button>
                    </div>

                    {addresses.length === 0 ? (
                      <div className="text-center py-12">
                        <MapPin className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">No saved addresses</h3>
                        <p className="text-gray-500 mb-6">Add your first address for faster checkout.</p>
                        <button
                          onClick={() => setShowAddAddress(true)}
                          className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-cyan-700 transition"
                        >
                          <Plus className="w-4 h-4" /> Add Address
                        </button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {addresses.map((address) => (
                          <div
                            key={address.address_id}
                            className={`p-5 rounded-xl border-2 transition ${
                              address.is_default ? "border-cyan-300 bg-cyan-50/30" : "border-gray-100 bg-white hover:border-gray-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                  {address.address_type || "Home"}
                                </span>
                                {address.is_default && (
                                  <span className="text-xs font-bold bg-cyan-100 text-cyan-700 px-2.5 py-1 rounded-lg">
                                    Default
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">{address.full_name}</p>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {address.address_line_1}
                              {address.address_line_2 && <>, {address.address_line_2}</>}
                              <br />
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5" /> {address.phone}
                            </p>
                            <div className="flex gap-3 mt-4">
                              <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                              </button>
                              <button className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                              {!address.is_default && (
                                <button className="text-sm text-gray-500 hover:text-gray-600 font-medium">
                                  Set as Default
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">My Wishlist</h2>
                      <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
                    </div>

                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-6">Save items you love and come back to them anytime.</p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-cyan-700 transition">
                          Browse Products <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {wishlistItems.map((item) => (
                          <div
                            key={item.product_id}
                            className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition group"
                          >
                            <Link to={`/product/${item.product_id}`} className="block relative">
                              <div className="w-full h-44 bg-gray-100 overflow-hidden">
                                <img
                                  src={item.image || "/image/slide1A.jpg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                            <div className="p-4">
                              <Link
                                to={`/product/${item.product_id}`}
                                className="font-semibold text-gray-800 hover:text-cyan-600 transition line-clamp-2 text-sm"
                              >
                                {item.name}
                              </Link>
                              <p className="text-xs text-gray-500 mt-1">
                                {item.brand}
                                {item.processor ? ` · ${item.processor}` : ""}
                                {item.ram ? ` · ${item.ram}` : ""}
                              </p>
                              <div className="flex items-center justify-between mt-3">
                                <div>
                                  <span className="text-lg font-bold text-gray-900">₹{formatIndianNumber(item.price)}</span>
                                  {item.mrp > item.price && (
                                    <span className="text-xs text-gray-400 line-through ml-1.5">₹{formatIndianNumber(item.mrp)}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 mt-3">
                                <button
                                  onClick={() => {
                                    dispatch(addToCart({
                                      product_id: item.product_id,
                                      model_name: item.name,
                                      brand_name: item.brand,
                                      processor: item.processor,
                                      ram: item.ram,
                                      storage: item.storage,
                                      price: item.price,
                                      mrp: item.mrp,
                                      images: item.image ? [item.image] : [],
                                      quantity: 1,
                                    }));
                                    toast.success("Added to cart!");
                                  }}
                                  className="flex-1 text-sm bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-xl font-medium transition"
                                >
                                  Add to Cart
                                </button>
                                <button
                                  onClick={() => dispatch(removeFromWishlist(item.product_id))}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 transition"
                                  title="Remove"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                      </div>
                    </div>
                    {showPasswordForm ? (
                      <div className="space-y-4 max-w-md">
                        {["current", "new", "confirm"].map((field) => (
                          <div key={field} className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{field} Password</label>
                            <div className="relative">
                              <input
                                type={showPasswords[field] ? "text" : "password"}
                                value={passwordForm[field]}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, [field]: e.target.value }))}
                                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                                placeholder={`Enter ${field} password`}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex gap-3 pt-2">
                          <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition">
                            Update Password
                          </button>
                          <button onClick={() => setShowPasswordForm(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium transition">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium px-4 py-2 rounded-xl hover:bg-cyan-50 transition"
                      >
                        <Lock className="w-4 h-4" /> Change Password
                      </button>
                    )}
                  </div>

                  {/* Notifications */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Notification Preferences</h3>
                        <p className="text-sm text-gray-500">Choose what notifications you want to receive</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: "Order Updates", desc: "Get notified about order status changes", defaultChecked: true },
                        { label: "Promotional Emails", desc: "Receive deals, offers, and product updates", defaultChecked: true },
                        { label: "Price Drop Alerts", desc: "Get notified when wishlist items go on sale", defaultChecked: false },
                        { label: "New Arrivals", desc: "Be the first to know about new products", defaultChecked: false },
                      ].map((notif) => (
                        <div key={notif.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="text-sm font-medium text-gray-800">{notif.label}</p>
                            <p className="text-xs text-gray-500">{notif.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked={notif.defaultChecked} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Privacy & Data */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Privacy & Data</h3>
                        <p className="text-sm text-gray-500">Manage your data and privacy settings</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-left">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Download My Data</p>
                            <p className="text-xs text-gray-500">Get a copy of your personal data</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </button>
                      <Link to="/privacy-policy" className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">Privacy Policy</p>
                            <p className="text-xs text-gray-500">Read our privacy policy</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </Link>
                    </div>
                  </div>

                  {/* Help */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Help & Support</h3>
                        <p className="text-sm text-gray-500">Get assistance with your account</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Link to="/faq" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                        <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-800">FAQs</p>
                        <p className="text-xs text-gray-500">Find quick answers</p>
                      </Link>
                      <Link to="/contact-us" className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-center">
                        <Phone className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-800">Contact Us</p>
                        <p className="text-xs text-gray-500">{COMPANY.phone}</p>
                      </Link>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white rounded-2xl shadow-sm border-2 border-red-100 p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-900">Danger Zone</h3>
                        <p className="text-sm text-red-500">Irreversible actions</p>
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl">
                      <p className="text-sm text-red-700 mb-3">
                        Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                      </p>
                      <button className="flex items-center gap-1.5 text-red-600 hover:text-red-700 font-medium text-sm px-4 py-2 rounded-lg border border-red-300 hover:bg-red-100 transition">
                        <Trash2 className="w-4 h-4" /> Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
