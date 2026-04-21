import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  X, ChevronDown, ChevronUp, ShoppingCart, Heart, User,
  Package, MapPin, Settings, LogOut, Home, Laptop, Phone,
  Info, Search, Monitor, Cpu, ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import { logout } from "../../../redux/loginSlice";
import { COOKIES, COMPANY } from "../../../config/constants";
import Cookies from "js-cookie";
import { filterOptionApi } from "../../../api/filterOptionApi";

export const MobileMenu = ({
  menuLinks,
  isOpen,
  onClose,
  cartCount = 0,
  wishlistCount = 0,
  isLoggedIn = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [productBrands, setProductBrands] = useState([]);

  useEffect(() => {
    if (isOpen) {
      const loadBrands = async () => {
        try {
          const res = await filterOptionApi.getByType("brand");
          if (res?.success) setProductBrands(res.data || []);
        } catch {}
      };
      loadBrands();
    }
  }, [isOpen]);

  const handleLogout = () => {
    Cookies.remove(COOKIES.authToken);
    Cookies.remove(COOKIES.userId);
    dispatch(logout());
    onClose();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleLinkClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  const linksToRender = menuLinks?.length > 0 ? menuLinks : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 md:hidden overflow-y-auto shadow-2xl"
        style={{ animation: "slideIn 0.25s ease-out" }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
          <Link to="/" onClick={handleLinkClick} className="font-bold text-lg">
            {COMPANY.name}
          </Link>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laptops..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </form>

        {/* Quick Links */}
        <div className="flex border-b border-gray-100">
          <Link to="/cart" onClick={handleLinkClick} className="flex-1 flex flex-col items-center py-3 hover:bg-gray-50 transition">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{cartCount > 9 ? "9+" : cartCount}</span>
              )}
            </div>
            <span className="text-xs text-gray-600 mt-1">Cart</span>
          </Link>
          <Link to="/account/wishlist" onClick={handleLinkClick} className="flex-1 flex flex-col items-center py-3 hover:bg-gray-50 transition border-l border-gray-100">
            <div className="relative">
              <Heart className="w-5 h-5 text-gray-600" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{wishlistCount > 9 ? "9+" : wishlistCount}</span>
              )}
            </div>
            <span className="text-xs text-gray-600 mt-1">Wishlist</span>
          </Link>
          <Link to={isLoggedIn ? "/account" : "/login"} onClick={handleLinkClick} className="flex-1 flex flex-col items-center py-3 hover:bg-gray-50 transition border-l border-gray-100">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600 mt-1">{isLoggedIn ? "Account" : "Login"}</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="py-2">
          {linksToRender.map((item, index) => {
            const Icon = item.icon || Laptop;
            const hasSubLinks = (item.subLinks && item.subLinks.length > 0) || item.dropdownType === "products";

            return (
              <div key={item.name || index}>
                {hasSubLinks ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                      {expandedIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    {expandedIndex === index && (
                      <div className="bg-gray-50 py-2">
                        {/* About Us sub-links */}
                        {item.subLinks?.map((subLink) => {
                          const SubIcon = subLink.icon || Laptop;
                          return (
                            <Link
                              key={subLink.name}
                              to={subLink.link}
                              onClick={handleLinkClick}
                              className="flex items-center gap-3 px-6 py-2.5 text-gray-600 hover:text-cyan-600 transition"
                            >
                              <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center">
                                <SubIcon className="w-3.5 h-3.5 text-cyan-600" />
                              </div>
                              <span className="text-sm">{subLink.name}</span>
                            </Link>
                          );
                        })}
                        {/* Products dropdown - show brands */}
                        {item.dropdownType === "products" && (
                          <>
                            <p className="px-6 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Brands</p>
                            {productBrands.slice(0, 8).map((brand) => (
                              <Link
                                key={brand.id || brand.value}
                                to={`/products?brand=${encodeURIComponent(brand.value)}`}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-6 py-2 text-gray-600 hover:text-cyan-600 transition"
                              >
                                <Monitor className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-sm">{brand.value}</span>
                              </Link>
                            ))}
                            <Link
                              to="/products"
                              onClick={handleLinkClick}
                              className="flex items-center gap-2 px-6 py-2 text-cyan-600 font-medium text-sm"
                            >
                              View All Products <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.link || "/"}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Account Section (if logged in) */}
        {isLoggedIn && (
          <div className="border-t border-gray-100 py-2">
            <p className="px-4 py-2 text-[10px] text-gray-400 uppercase tracking-wider font-bold">Account</p>
            {[
              { to: "/account/orders", icon: Package, label: "My Orders" },
              { to: "/account/addresses", icon: MapPin, label: "Addresses" },
              { to: "/account/settings", icon: Settings, label: "Settings" },
            ].map((item) => (
              <Link key={item.to} to={item.to} onClick={handleLinkClick} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-500" />
                </div>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full transition">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <LogOut className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        )}

        {/* Login Button (if not logged in) */}
        {!isLoggedIn && (
          <div className="p-4 border-t border-gray-100">
            <Link to="/login" onClick={handleLinkClick} className="block w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-3 rounded-xl font-medium transition shadow-lg">
              Login / Sign Up
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            Need help? Call us at{" "}
            <a href={`tel:${COMPANY.phone}`} className="text-cyan-600 font-medium">
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};
