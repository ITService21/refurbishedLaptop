import React from "react";
import { RefreshCw, CheckCircle, XCircle, Clock, Package, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const ReturnPolicy = () => {
  return (
    <>
      <SEOHead
        title="Return & Refund Policy"
        description={`7-day easy return and replacement policy on all refurbished laptops. Full refund within 10 business days. Hassle-free return process.`}
        keywords="laptop return policy, refund policy, replacement policy, laptop refurbished returns"
        canonical="https://laptoprefurbished.in/return-policy"
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-12 md:py-16 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <RefreshCw className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-cyan-100 text-lg">
            7 days easy replacement guarantee
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Return Timeline */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Return Timeline
            </h2>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Day 1-7</h3>
                  <p className="text-sm text-gray-600">Return Window</p>
                </div>
                <div className="hidden md:block text-gray-300 text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Pickup</h3>
                  <p className="text-sm text-gray-600">Free pickup arranged</p>
                </div>
                <div className="hidden md:block text-gray-300 text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Processing</h3>
                  <p className="text-sm text-gray-600">5-7 business days</p>
                </div>
                <div className="hidden md:block text-gray-300 text-2xl">→</div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Refund</h3>
                  <p className="text-sm text-gray-600">Within 10 days</p>
                </div>
              </div>
            </div>
          </section>

          {/* Eligible for Returns */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Eligible for Return
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Product received with defects or damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Wrong product delivered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Product not as described</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Missing accessories or components</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Hardware malfunction within 7 days</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    Not Eligible for Return
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Physical damage caused after delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Liquid damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Software issues (check warranty)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Missing original packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Request made after 7 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How to Return */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How to Return
            </h2>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Initiate Return Request",
                    desc: "Log in to your account, go to My Orders, select the order, and click 'Request Return'. Or contact our support team.",
                  },
                  {
                    step: 2,
                    title: "Reason & Verification",
                    desc: "Select the reason for return and provide photos if applicable. Our team will verify and approve your request within 24 hours.",
                  },
                  {
                    step: 3,
                    title: "Pack the Product",
                    desc: "Pack the laptop securely with all original accessories, charger, and packaging. Use bubble wrap for protection.",
                  },
                  {
                    step: 4,
                    title: "Pickup Scheduled",
                    desc: "Our courier partner will pick up the product from your address. Free pickup is available for all returns.",
                  },
                  {
                    step: 5,
                    title: "Refund Processed",
                    desc: "Once we receive and inspect the product, refund will be initiated within 7-10 business days to your original payment method.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Refund Information
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-gray-800 font-semibold">
                      Payment Method
                    </th>
                    <th className="text-left py-3 text-gray-800 font-semibold">
                      Refund Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-200">
                    <td className="py-3">Credit/Debit Card</td>
                    <td className="py-3">5-7 business days</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">UPI (GPay, PhonePe, etc.)</td>
                    <td className="py-3">2-4 business days</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3">Net Banking</td>
                    <td className="py-3">5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="py-3">Cash on Delivery</td>
                    <td className="py-3">
                      7-10 business days (via bank transfer)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 md:p-8 text-center">
            <Phone className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Need Help with Returns?
            </h2>
            <p className="text-gray-600 mb-4">
              Our customer support team is available to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Contact Support
              </Link>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                WhatsApp Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;



