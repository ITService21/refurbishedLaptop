import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminOverview from "./pages/AdminOverview";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminInventory from "./pages/AdminInventory";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";

const AdminPortal = () => {
  return (
    <div className="flex min-h-screen mt-[60px] bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-60px)]">
        <Routes>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="*" element={<Navigate to="overview" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPortal;
