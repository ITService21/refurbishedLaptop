import React, { useMemo } from "react";
import { formatIndianNumber } from "../../../utils/methods";
import { getStoredOrders } from "../../../utils/orderService";
import StatsCard from "../components/StatsCard";
import { Users, UserPlus, DollarSign, ShoppingBag } from "lucide-react";

const MOCK_CUSTOMERS = [
  { id: "user-1", first_name: "Sumit", last_name: "Kumar", email: "sumit@example.com", phone: "9876543210", registered_on: "2025-01-15", total_orders: 2, total_spent: 61998 },
  { id: "user-2", first_name: "Priya", last_name: "Sharma", email: "priya@example.com", phone: "9876543211", registered_on: "2025-02-20", total_orders: 1, total_spent: 35999 },
  { id: "user-3", first_name: "Rahul", last_name: "Singh", email: "rahul@example.com", phone: "9876543212", registered_on: "2025-03-01", total_orders: 1, total_spent: 58999 },
  { id: "user-4", first_name: "Anjali", last_name: "Mehta", email: "anjali@example.com", phone: "9876543213", registered_on: "2025-04-10", total_orders: 1, total_spent: 64999 },
  { id: "user-5", first_name: "Vikram", last_name: "Patel", email: "vikram@example.com", phone: "9876543214", registered_on: "2025-05-18", total_orders: 3, total_spent: 89997 },
  { id: "user-6", first_name: "Neha", last_name: "Gupta", email: "neha@example.com", phone: "9876543215", registered_on: "2025-06-25", total_orders: 2, total_spent: 54998 },
];

const AdminCustomers = () => {
  const orders = useMemo(() => getStoredOrders(), []);

  const stats = useMemo(() => {
    const total = MOCK_CUSTOMERS.length;
    const totalSpent = MOCK_CUSTOMERS.reduce((s, c) => s + c.total_spent, 0);
    const avgSpend = total > 0 ? totalSpent / total : 0;
    const active = MOCK_CUSTOMERS.filter((c) => c.total_orders > 0).length;
    return { total, totalSpent, avgSpend, active };
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
        <p className="text-sm text-gray-500 mt-1">View and manage your customer base</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Customers" value={stats.total} icon={Users} />
        <StatsCard title="Active Customers" value={stats.active} icon={UserPlus} color="text-green-600" bgColor="bg-green-50" />
        <StatsCard title="Total Revenue" value={`₹${formatIndianNumber(stats.totalSpent)}`} icon={DollarSign} color="text-indigo-600" bgColor="bg-indigo-50" />
        <StatsCard title="Avg. Spend" value={`₹${formatIndianNumber(Math.round(stats.avgSpend))}`} icon={ShoppingBag} color="text-orange-600" bgColor="bg-orange-50" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Registered</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_CUSTOMERS.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-xs font-bold">
                        {c.first_name[0]}{c.last_name[0]}
                      </div>
                      <span className="font-medium text-gray-800">{c.first_name} {c.last_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(c.registered_on).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-gray-800 font-medium">{c.total_orders}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">₹{formatIndianNumber(c.total_spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
