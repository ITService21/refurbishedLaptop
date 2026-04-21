import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, List, Warehouse,
  ShoppingBag, Users, BarChart2, Settings,
  ChevronLeft, ChevronRight, Monitor,
} from "lucide-react";

const navLinks = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin-portal/overview" },
  { name: "Products", icon: Package, path: "/admin-portal/products" },
  { name: "Categories", icon: List, path: "/admin-portal/categories" },
  { name: "Inventory", icon: Warehouse, path: "/admin-portal/inventory" },
  { name: "Orders", icon: ShoppingBag, path: "/admin-portal/orders" },
  { name: "Customers", icon: Users, path: "/admin-portal/customers" },
  { name: "Analytics", icon: BarChart2, path: "/admin-portal/analytics" },
  { name: "Settings", icon: Settings, path: "/admin-portal/settings" },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-60"
      } bg-gray-900 text-white flex flex-col transition-all duration-300 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-sm font-bold text-cyan-400">Admin Panel</h2>
              <p className="text-[10px] text-gray-500">Manage your store</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.path);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.path}
              title={link.name}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/30"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium truncate">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition"
          >
            <Monitor className="w-3 h-3" />
            Back to Store
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
