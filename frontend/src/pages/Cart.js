import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck } from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { formatIndianNumber } from "../utils/methods";
import { 
  selectCartItems, 
  updateQuantity, 
  removeFromCart, 
  applyCoupon, 
  removeCoupon,
  selectCouponDiscount 
} from "../redux/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const couponDiscount = useSelector(selectCouponDiscount);
  
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(couponDiscount > 0);

  const handleUpdateQuantity = (productId, change) => {
    const item = cartItems.find((i) => i.product_id === productId);
    if (item) {
      const newQty = Math.max(1, item.quantity + change);
      dispatch(updateQuantity({ productId, quantity: newQty }));
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleApplyCoupon = () => {
    setCouponError("");
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    // Valid coupons
    const validCoupons = {
      WELCOME10: { type: "percentage", value: 10, maxDiscount: 2000 },
      FLAT500: { type: "fixed", value: 500 },
      NEWUSER: { type: "percentage", value: 15, maxDiscount: 3000 },
      LAPTOP1000: { type: "fixed", value: 1000 },
      SAVE20: { type: "percentage", value: 20, maxDiscount: 5000 },
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      dispatch(applyCoupon({
        code: couponCode.toUpperCase(),
        discount: coupon.value,
        type: coupon.type,
        maxDiscount: coupon.maxDiscount,
      }));
      setAppliedCoupon(true);
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
    setAppliedCoupon(false);
    setCouponError("");
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);
  const productDiscount = totalMrp - subtotal;
  const shippingCharge = 0; // Free shipping
  const totalAmount = Math.max(0, subtotal - couponDiscount + shippingCharge);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEOHead title="Shopping Cart" noIndex={true} />
        <div className="min-h-screen bg-gray-50 mt-[60px] flex items-center justify-center">
          <div className="text-center px-4 py-20">
            <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any laptops to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Browse Laptops <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Shopping Cart" noIndex={true} />

      <div className="min-h-screen bg-gray-50 mt-[60px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
          </h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {cartItems.map((item, index) => (
                  <div
                    key={item.product_id}
                    className={`p-4 md:p-6 flex flex-col sm:flex-row gap-4 ${
                      index > 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    {/* Image */}
                    <Link
                      to={`/product/${item.product_id}`}
                      className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <img
                        src={item.image || item.images?.[0] || "/image/slide1A.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product_id}`}
                        className="font-medium text-gray-800 hover:text-cyan-600 transition line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.brand} {item.processor && `| ${item.processor}`} {item.ram && `| ${item.ram}`} {item.storage && `| ${item.storage}`}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{formatIndianNumber(item.price)}
                        </span>
                        {item.mrp > item.price && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ₹{formatIndianNumber(item.mrp)}
                            </span>
                            <span className="text-sm text-green-600">
                              {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.product_id, -1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product_id, 1)}
                            className="p-2 hover:bg-gray-100 transition"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.product_id)}
                          className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm transition"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-4">
                <Link
                  to="/products"
                  className="text-cyan-600 hover:text-cyan-700 font-medium inline-flex items-center gap-2 transition"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        disabled={appliedCoupon}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-100"
                      />
                    </div>
                    {appliedCoupon ? (
                      <button
                        onClick={handleRemoveCoupon}
                        className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponError && (
                    <p className="text-red-500 text-sm mt-1">{couponError}</p>
                  )}
                  {couponDiscount > 0 && (
                    <p className="text-green-600 text-sm mt-1">
                      ✓ Coupon applied! You save ₹{formatIndianNumber(couponDiscount)}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Try: WELCOME10, FLAT500, SAVE20
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({cartItems.length} items)</span>
                    <span className="text-gray-800">₹{formatIndianNumber(totalMrp)}</span>
                  </div>
                  {productDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Product Discount</span>
                      <span>- ₹{formatIndianNumber(productDiscount)}</span>
                    </div>
                  )}
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>- ₹{formatIndianNumber(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{formatIndianNumber(totalAmount)}</span>
                  </div>
                </div>

                {productDiscount + couponDiscount > 0 && (
                  <div className="mt-4 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm text-center">
                    You're saving ₹{formatIndianNumber(productDiscount + couponDiscount)} on this order!
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>Free Delivery</span>
                    </div>
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

export default Cart;
