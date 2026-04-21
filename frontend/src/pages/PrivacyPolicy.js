import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const PrivacyPolicy = () => {
  const lastUpdated = "January 1, 2026";

  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description={`Privacy Policy of ${COMPANY.name}. Learn how we collect, use, and protect your personal information when you use our website and services.`}
        keywords="privacy policy, data protection, personal information, laptop refurbished privacy"
        canonical="https://laptoprefurbished.in/privacy-policy"
        noIndex={false}
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 md:py-16 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-300">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to {COMPANY.name} ("we," "our," or "us"). We are committed to
                protecting your privacy and ensuring the security of your personal
                information. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website
                laptoprefurbished.in and use our services.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                By accessing or using our website, you agree to this Privacy Policy.
                If you do not agree with our policies and practices, please do not
                use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Information We Collect
              </h2>
              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                2.1 Personal Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We may collect personal information that you voluntarily provide to
                us, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Name and contact information (email, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through payment gateways)</li>
                <li>Account credentials</li>
                <li>Order history and preferences</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                2.2 Automatically Collected Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you visit our website, we may automatically collect certain
                information, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the collected information for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Processing and fulfilling your orders</li>
                <li>Communicating with you about orders, products, and services</li>
                <li>Providing customer support</li>
                <li>Sending promotional emails and newsletters (with your consent)</li>
                <li>Improving our website and services</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Service providers (payment processors, shipping partners)</li>
                <li>Analytics providers for website improvement</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners for fulfilling orders</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate technical and organizational measures to
                protect your personal information against unauthorized access,
                alteration, disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Access and receive a copy of your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Cookies Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar technologies to enhance your browsing
                experience, analyze website traffic, and personalize content. You can
                control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>{COMPANY.name}</strong>
                </p>
                <p className="text-gray-600">{COMPANY.address.full}</p>
                <p className="text-gray-600">Email: {COMPANY.email}</p>
                <p className="text-gray-600">Phone: {COMPANY.phone}</p>
              </div>
            </section>

            <div className="text-center mt-10 pt-6 border-t border-gray-200">
              <Link
                to="/terms-conditions"
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Read our Terms & Conditions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;



