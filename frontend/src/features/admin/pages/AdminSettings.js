import React, { useState } from "react";
import { toast } from "react-toastify";
import { Settings, Bell, Truck, Shield, CreditCard, Save } from "lucide-react";

const AdminSettings = () => {
  const [general, setGeneral] = useState({
    siteName: "Laptop Refurbished",
    email: "support@laptoprefurbished.in",
    phone: "+91-9582406531",
    currency: "INR",
  });

  const [notifications, setNotifications] = useState({
    newOrder: true, lowStock: true, customerSupport: true,
  });

  const [shipping, setShipping] = useState({
    freeThreshold: 0, defaultCost: 0, partners: "Delhivery, BlueDart, DTDC",
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully!`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-1">Configure your store preferences</p>
      </div>

      {/* General */}
      <SettingsCard icon={Settings} title="General Settings" color="text-cyan-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsInput label="Site Name" value={general.siteName} onChange={(v) => setGeneral((p) => ({ ...p, siteName: v }))} />
          <SettingsInput label="Contact Email" type="email" value={general.email} onChange={(v) => setGeneral((p) => ({ ...p, email: v }))} />
          <SettingsInput label="Contact Phone" value={general.phone} onChange={(v) => setGeneral((p) => ({ ...p, phone: v }))} />
          <SettingsInput label="Currency" value={general.currency} onChange={(v) => setGeneral((p) => ({ ...p, currency: v }))} />
        </div>
        <SaveButton onClick={() => handleSave("General")} />
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard icon={Bell} title="Notification Settings" color="text-orange-600">
        <div className="space-y-3">
          <SettingsToggle label="Email for new orders" checked={notifications.newOrder} onChange={(v) => setNotifications((p) => ({ ...p, newOrder: v }))} />
          <SettingsToggle label="Low stock alerts" checked={notifications.lowStock} onChange={(v) => setNotifications((p) => ({ ...p, lowStock: v }))} />
          <SettingsToggle label="Customer support emails" checked={notifications.customerSupport} onChange={(v) => setNotifications((p) => ({ ...p, customerSupport: v }))} />
        </div>
        <SaveButton onClick={() => handleSave("Notification")} />
      </SettingsCard>

      {/* Shipping */}
      <SettingsCard icon={Truck} title="Shipping Settings" color="text-blue-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsInput label="Free Shipping Threshold (₹)" type="number" value={shipping.freeThreshold} onChange={(v) => setShipping((p) => ({ ...p, freeThreshold: v }))} />
          <SettingsInput label="Default Shipping Cost (₹)" type="number" value={shipping.defaultCost} onChange={(v) => setShipping((p) => ({ ...p, defaultCost: v }))} />
          <div className="md:col-span-2">
            <SettingsInput label="Delivery Partners (comma-separated)" value={shipping.partners} onChange={(v) => setShipping((p) => ({ ...p, partners: v }))} />
          </div>
        </div>
        <SaveButton onClick={() => handleSave("Shipping")} />
      </SettingsCard>

      {/* Payment */}
      <SettingsCard icon={CreditCard} title="Payment Gateway" color="text-purple-600">
        <p className="text-sm text-gray-500">Configure payment gateways like Razorpay, Stripe, or PayPal. API keys and webhook settings will be available here.</p>
        <button onClick={() => toast.info("Payment gateway configuration coming soon!")}
          className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
          Configure Gateways
        </button>
      </SettingsCard>

      {/* Security */}
      <SettingsCard icon={Shield} title="Security" color="text-red-600">
        <p className="text-sm text-gray-500">Manage password policies, two-factor authentication, and API keys.</p>
        <button onClick={() => toast.info("Security settings coming soon!")}
          className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition">
          Manage Security
        </button>
      </SettingsCard>
    </div>
  );
};

const SettingsCard = ({ icon: Icon, title, color, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-5 h-5 ${color}`} />
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

const SettingsInput = ({ label, value, onChange, type = "text" }) => (
  <label className="block">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
  </label>
);

const SettingsToggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-cyan-600 rounded border-gray-300 focus:ring-cyan-500" />
    {label}
  </label>
);

const SaveButton = ({ onClick }) => (
  <button onClick={onClick}
    className="mt-5 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
    <Save className="w-4 h-4" /> Save Changes
  </button>
);

export default AdminSettings;
