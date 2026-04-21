import React from "react";
import { Shield, CheckCircle, XCircle, Wrench, Clock, Phone, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const WarrantyPolicy = () => {
  return (
    <>
      <SEOHead
        title="Warranty Policy - 2 Year Comprehensive Warranty"
        description={`2-year comprehensive warranty on all refurbished laptops. Free repairs, genuine parts replacement, and dedicated support. Complete peace of mind guaranteed.`}
        keywords="laptop warranty, 2 year warranty, refurbished laptop warranty, warranty coverage, warranty claim"
        canonical="https://laptoprefurbished.in/warranty-policy"
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-12 md:py-16 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-80" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            2 Year Comprehensive Warranty
          </h1>
          <p className="text-cyan-100 text-lg">
            Complete peace of mind with every purchase
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Warranty Highlights */}
          <section className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "2 Year Coverage",
                  desc: "Comprehensive warranty covering all hardware components",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: <Wrench className="w-8 h-8" />,
                  title: "Free Repairs",
                  desc: "No repair charges for covered issues during warranty period",
                  color: "bg-green-50 text-green-600",
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: "Quick Turnaround",
                  desc: "5-7 business days for most warranty repairs",
                  color: "bg-purple-50 text-purple-600",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} rounded-xl p-6 text-center`}
                >
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's Covered */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    What's Covered
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Motherboard and CPU issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>RAM and storage failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Display/screen defects (dead pixels, backlight)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Keyboard and trackpad malfunctions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Port connectivity issues (USB, HDMI, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Audio and speaker problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>WiFi and Bluetooth connectivity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Power and charging issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>Software support (first 30 days)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-red-600" />
                  <h2 className="text-xl font-bold text-gray-800">
                    What's Not Covered
                  </h2>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Physical damage (drops, cracks, dents)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Liquid/water damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Damage from unauthorized repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Battery (covered separately for 6 months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Software issues after 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Virus/malware related issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Accessories (chargers, bags, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Cosmetic wear and tear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>Data loss or recovery</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Warranty Claim Process */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              How to Claim Warranty
            </h2>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Contact Support",
                    desc: "Reach out to our support team via phone, email, or WhatsApp with your order number and description of the issue.",
                  },
                  {
                    step: 2,
                    title: "Diagnosis",
                    desc: "Our technical team will try to diagnose and resolve the issue remotely. Many problems can be fixed without pickup.",
                  },
                  {
                    step: 3,
                    title: "Pickup Arranged",
                    desc: "If the issue requires physical repair, we'll arrange a free pickup from your location.",
                  },
                  {
                    step: 4,
                    title: "Repair/Replacement",
                    desc: "Our certified technicians will repair or replace faulty components. Genuine parts are used for all repairs.",
                  },
                  {
                    step: 5,
                    title: "Delivery",
                    desc: "Once repaired, your laptop will be delivered back to you free of charge within 5-7 business days.",
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

          {/* Battery Warranty */}
          <section className="mb-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    Battery Warranty
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Batteries are covered separately with a 6-month warranty. Battery
                    replacement is provided if the battery health drops below 70% of
                    original capacity within the warranty period. Natural battery
                    degradation due to usage is not covered.
                  </p>
                  <p className="text-gray-600 text-sm">
                    Tip: For optimal battery life, avoid keeping your laptop plugged
                    in 24/7 and try to maintain battery level between 20-80%.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 md:p-8 text-center">
            <Phone className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Need Warranty Support?
            </h2>
            <p className="text-gray-600 mb-4">
              Our technical support team is here to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Call Support
              </a>
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-6 py-3 rounded-lg font-medium transition"
              >
                Contact Form
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default WarrantyPolicy;



