import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Truck,
  Shield,
  ChevronRight,
  Plus,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";
import SEOHead from "../Components/SEO/SEOHead";
import { formatIndianNumber } from "../utils/methods";
import { orderApi, userApi } from "../Components/common/apiWrapper";
import { STORAGE_KEYS, PAYMENT_METHODS, COMPANY } from "../config/constants";

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Review
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    address_type: "home",
    full_name: "",
    phone: "",
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    // Load cart from local storage
    const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
    if (savedCart) {
      const items = JSON.parse(savedCart);
      if (items.length === 0) {
        navigate("/cart");
        return;
      }
      setCartItems(items);
    } else {
      navigate("/cart");
    }

    // Fetch user addresses
    fetchAddresses();
  }, [navigate]);

  const fetchAddresses = async () => {
    try {
      const response = await userApi.getAddresses();
      if (response?.success && response.data) {
        setAddresses(response.data);
        const defaultAddr = response.data.find((a) => a.is_default);
        if (defaultAddr) setSelectedAddress(defaultAddr);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.addAddress(newAddress);
      if (response?.success) {
        toast.success("Address added successfully");
        setShowAddressForm(false);
        setNewAddress({
          address_type: "home",
          full_name: "",
          phone: "",
          address_line_1: "",
          address_line_2: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
        });
        fetchAddresses();
      }
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCharge = 0;
  const totalAmount = subtotal + shippingCharge;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image,
        })),
        shipping_address: selectedAddress,
        payment_method: paymentMethod,
        shipping_charge: shippingCharge,
      };

      const response = await orderApi.create(orderData);
      if (response?.success) {
        // Clear cart
        localStorage.removeItem(STORAGE_KEYS.cart);

        // Navigate to success page
        toast.success("Order placed successfully!");
        navigate(`/order-success?order=${response.data.order_number}`);
      } else {
        toast.error(response?.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: "Address" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Review" },
  ];

  return (
    <>
      <SEOHead title="Checkout" noIndex={true} />

      <div className="min-h-screen bg-gray-50 mt-[60px]">
        <div className="container mx-auto px-4 py-8">
          {/* Stepper */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= s.num
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                    </div>
                    <span
                      className={`ml-2 hidden sm:inline ${
                        step >= s.num ? "text-gray-800 font-medium" : "text-gray-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        step > s.num ? "bg-cyan-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1">
              {/* Step 1: Address */}
              {step === 1 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-cyan-600" />
                    Select Delivery Address
                  </h2>

                  {/* Saved Addresses */}
                  <div className="space-y-4 mb-6">
                    {addresses.map((address) => (
                      <div
                        key={address.address_id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedAddress?.address_id === address.address_id
                            ? "border-cyan-600 bg-cyan-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded capitalize mb-2">
                              {address.address_type}
                            </span>
                            <p className="font-medium text-gray-800">
                              {address.full_name}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              {address.address_line_1}
                              {address.address_line_2 && `, ${address.address_line_2}`}
                              <br />
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                              Phone: {address.phone}
                            </p>
                          </div>
                          {selectedAddress?.address_id === address.address_id && (
                            <Check className="w-6 h-6 text-cyan-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address Button */}
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium"
                  >
                    <Plus className="w-5 h-5" />
                    Add New Address
                  </button>

                  {/* Address Form */}
                  {showAddressForm && (
                    <form onSubmit={handleAddAddress} className="mt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="full_name"
                          value={newAddress.full_name}
                          onChange={handleAddressChange}
                          placeholder="Full Name *"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={newAddress.phone}
                          onChange={handleAddressChange}
                          placeholder="Phone Number *"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <input
                        type="text"
                        name="address_line_1"
                        value={newAddress.address_line_1}
                        onChange={handleAddressChange}
                        placeholder="Address Line 1 *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      />
                      <input
                        type="text"
                        name="address_line_2"
                        value={newAddress.address_line_2}
                        onChange={handleAddressChange}
                        placeholder="Address Line 2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          value={newAddress.city}
                          onChange={handleAddressChange}
                          placeholder="City *"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                          type="text"
                          name="state"
                          value={newAddress.state}
                          onChange={handleAddressChange}
                          placeholder="State *"
                          required
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <input
                        type="text"
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleAddressChange}
                        placeholder="Pincode *"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        Save Address
                      </button>
                    </form>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedAddress}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      Continue to Payment <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-cyan-600" />
                    Select Payment Method
                  </h2>

                  <div className="space-y-4">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                          paymentMethod === method.id
                            ? "border-cyan-600 bg-cyan-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-800">
                              {method.name}
                            </span>
                          </div>
                          {paymentMethod === method.id && (
                            <Check className="w-6 h-6 text-cyan-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      Review Order <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Review Your Order
                  </h2>

                  {/* Delivery Address */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Delivery Address
                    </h3>
                    <p className="text-gray-600">
                      {selectedAddress?.full_name}
                      <br />
                      {selectedAddress?.address_line_1}
                      <br />
                      {selectedAddress?.city}, {selectedAddress?.state} -{" "}
                      {selectedAddress?.pincode}
                      <br />
                      Phone: {selectedAddress?.phone}
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="text-cyan-600 text-sm mt-2 hover:underline"
                    >
                      Change Address
                    </button>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-gray-600 capitalize">{paymentMethod}</p>
                    <button
                      onClick={() => setStep(2)}
                      className="text-cyan-600 text-sm mt-2 hover:underline"
                    >
                      Change Payment Method
                    </button>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-800 mb-4">
                      Order Items ({cartItems.length})
                    </h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex gap-4 items-center"
                        >
                          <img
                            src={item.image || "/image/slide1A.jpg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 line-clamp-1">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            ₹{formatIndianNumber(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition"
                    >
                      {loading ? "Placing Order..." : "Place Order"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-80">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h3 className="font-bold text-gray-800 mb-4">Order Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span>₹{formatIndianNumber(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{formatIndianNumber(totalAmount)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>100% Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>Free Delivery Across India</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;



