import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { orderApi } from "../Components/common/apiWrapper";
import { formatIndianNumber } from "../utils/methods";
import { COMPANY } from "../config/constants";
import { Loader } from "../Components/common/Elements";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        setLoading(false);
        return;
      }

      try {
        const response = await orderApi.trackByNumber(orderNumber);
        if (response?.success && response.data) {
          setOrder(response.data);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-[60px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Order Confirmed" noIndex={true} />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white mt-[60px]">
        <div className="container mx-auto px-4 py-12">
          {/* Success Animation */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Order Number Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Order Number</p>
                  <p className="text-2xl font-bold text-gray-800 font-mono">
                    {orderNumber || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">Order Placed</span>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="py-6">
                <h3 className="font-semibold text-gray-800 mb-4">Order Status</h3>
                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200"></div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center z-10">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Order Confirmed</p>
                      <p className="text-sm text-gray-500">Your order has been placed successfully</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center z-10">
                      <Package className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Processing</p>
                      <p className="text-sm text-gray-400">We're preparing your order</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center z-10">
                      <Truck className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Shipped</p>
                      <p className="text-sm text-gray-400">Your order is on its way</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center z-10">
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-500">Delivered</p>
                      <p className="text-sm text-gray-400">Order delivered to your address</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-cyan-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-6 h-6 text-cyan-600" />
                  <div>
                    <p className="font-medium text-gray-800">Estimated Delivery</p>
                    <p className="text-sm text-gray-600">
                      Expected within 3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            {order && order.items && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <img
                        src={item.image || "/image/slide1A.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-800">
                        ₹{formatIndianNumber(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-xl font-bold text-gray-800">
                      ₹{formatIndianNumber(order.total_amount || 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>You'll receive an order confirmation email with details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>We'll notify you when your order is shipped</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>You can track your order status anytime</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/track-order?order=${orderNumber}`}
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-6 rounded-lg font-medium transition text-center flex items-center justify-center gap-2"
              >
                Track Order <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="flex-1 border-2 border-cyan-600 text-cyan-600 py-3 px-6 rounded-lg font-medium hover:bg-cyan-50 transition text-center"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Contact Support */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Need help with your order?</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-2 text-cyan-600 hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-2 text-cyan-600 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;



