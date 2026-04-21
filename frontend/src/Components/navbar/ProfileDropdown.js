import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  ChevronDown,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";
import { logout, selectUserData } from "../../redux/loginSlice";
import { COOKIES } from "../../config/constants";
import Cookies from "js-cookie";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove(COOKIES.authToken);
    Cookies.remove(COOKIES.userId);
    dispatch(logout());
    setIsOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getInitials = (firstName = "", lastName = "") => {
    const first = firstName?.charAt(0)?.toUpperCase() || "";
    const last = lastName?.charAt(0)?.toUpperCase() || "";
    return first + last || "U";
  };

  const menuItems = [
    // Admin portal link - only visible to admins
    ...(userData?.role === "admin" ? [{ icon: Shield, label: "Admin Portal", link: "/admin-portal", isAdmin: true }] : []),
    { icon: User, label: "My Profile", link: "/account/profile" },
    { icon: Package, label: "My Orders", link: "/account/orders" },
    { icon: Heart, label: "Wishlist", link: "/account/wishlist" },
    { icon: MapPin, label: "Addresses", link: "/account/addresses" },
    { icon: Settings, label: "Settings", link: "/account/settings" },
  ];

  const initials = getInitials(userData?.first_name, userData?.last_name);
  const displayName = userData?.first_name || "User";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition"
      >
        <div className="w-7 h-7 bg-white text-cyan-600 rounded-full flex items-center justify-center text-sm font-bold">
          {initials}
        </div>
        <span className="hidden md:inline text-sm font-medium max-w-[80px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold">
                {initials}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {userData?.first_name} {userData?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[120px]">
                  {userData?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                  item.isAdmin
                    ? "text-cyan-700 bg-cyan-50 hover:bg-cyan-100 font-medium border-b border-cyan-100"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className={`w-4 h-4 ${item.isAdmin ? "text-cyan-600" : "text-gray-500"}`} />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
