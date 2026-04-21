import React from "react";
import { Truck, Clock, MapPin, Package, Shield, Phone } from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY, DELIVERY } from "../config/constants";

const ShippingPolicy = () => {
  const deliveryPartners = DELIVERY.partners;

  return (
    <>
      <SEOHead
        title="Shipping & Delivery Policy"
        description={`Free shipping on all refurbished laptops across India. Delivery within 2-8 business days. Secure packaging and real-time tracking available.`}
        keywords="laptop shipping, free delivery india, laptop delivery time, shipping policy"
        canonical="https://laptoprefurbished.in/shipping-policy"
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-12 md:py-16 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <Truck className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Shipping & Delivery
          </h1>
          <p className="text-cyan-100 text-lg">
            Free delivery on all orders across India
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Delivery Times */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-cyan-600" />
              Delivery Timelines
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Metro Cities",
                  time: DELIVERY.estimatedDays.metro,
                  cities: "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad, Pune",
                  color: "bg-green-50 border-green-200",
                },
                {
                  title: "Tier-2 Cities",
                  time: DELIVERY.estimatedDays.tier2,
                  cities: "Jaipur, Lucknow, Chandigarh, Indore, Bhopal, and more",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  title: "Remote Areas",
                  time: DELIVERY.estimatedDays.remote,
                  cities: "Other serviceable locations across India",
                  color: "bg-orange-50 border-orange-200",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} border rounded-xl p-6 text-center`}
                >
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {item.time}
                  </p>
                  <p className="text-sm text-gray-600">{item.cities}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Points */}
          <section className="mb-12 bg-white rounded-xl shadow-sm p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Key Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Free Shipping
                  </h3>
                  <p className="text-gray-600">
                    We offer free shipping on all orders across India. No minimum
                    order value required. No hidden charges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Secure Packaging
                  </h3>
                  <p className="text-gray-600">
                    All laptops are carefully packaged with bubble wrap, foam
                    inserts, and sturdy boxes to ensure safe delivery. Each package
                    is sealed with tamper-evident tape.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Real-Time Tracking
                  </h3>
                  <p className="text-gray-600">
                    Once shipped, you'll receive a tracking number via email and
                    SMS. Track your order in real-time on our website or the
                    courier's platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Insured Shipment
                  </h3>
                  <p className="text-gray-600">
                    All shipments are fully insured against damage or loss during
                    transit. In the rare event of any issues, we'll provide a
                    replacement or full refund.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Partners */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Our Delivery Partners
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {deliveryPartners.map((partner, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center"
                >
                  <span className="font-medium text-gray-700">{partner}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Important Notes
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                Delivery timelines are estimates and may vary based on location and
                unforeseen circumstances.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                Orders placed after 2 PM will be processed the next business day.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                Please ensure someone is available to receive the delivery. Multiple
                delivery attempts may result in return to origin.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                For high-value orders, signature confirmation may be required at
                delivery.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">•</span>
                Delivery to PO Boxes is not available. Please provide a physical
                address.
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="bg-gray-50 rounded-xl p-6 md:p-8 text-center">
            <Phone className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Questions About Delivery?
            </h2>
            <p className="text-gray-600 mb-4">
              Our support team is here to help with any shipping queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Call Us
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium transition"
              >
                Email Support
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;



