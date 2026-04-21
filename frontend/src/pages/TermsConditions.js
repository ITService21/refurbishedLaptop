import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const TermsConditions = () => {
  const lastUpdated = "January 1, 2026";

  return (
    <>
      <SEOHead
        title="Terms & Conditions"
        description={`Terms and Conditions for using ${COMPANY.name} website and services. Read our policies regarding purchases, warranty, returns, and more.`}
        keywords="terms and conditions, terms of service, laptop refurbished terms, purchase terms"
        canonical="https://laptoprefurbished.in/terms-conditions"
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 md:py-16 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-300">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the {COMPANY.name} website
                (laptoprefurbished.in), you accept and agree to be bound by these
                Terms and Conditions. If you do not agree to these terms, please do
                not use our website or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                2. Products and Services
              </h2>
              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                2.1 Product Descriptions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We strive to provide accurate product descriptions, specifications,
                and images. However, we do not warrant that product descriptions or
                other content is accurate, complete, or error-free. All laptops are
                certified refurbished unless otherwise specified.
              </p>

              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                2.2 Refurbished Condition
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our refurbished laptops undergo a 40-point quality check process.
                Products are graded based on cosmetic condition:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>
                  <strong>Grade A+:</strong> Like new, minimal to no signs of use
                </li>
                <li>
                  <strong>Grade A:</strong> Minor cosmetic marks, excellent functional
                  condition
                </li>
                <li>
                  <strong>Grade B:</strong> Visible cosmetic wear, fully functional
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                3. Pricing and Payment
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All prices are listed in Indian Rupees (INR) and include applicable
                taxes unless otherwise stated. We reserve the right to change prices
                at any time without prior notice. Payment must be made in full before
                order dispatch.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                We accept various payment methods including Credit/Debit Cards, UPI,
                Net Banking, and Cash on Delivery (subject to availability and order
                value limits).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                4. Shipping and Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We offer free delivery across India on all orders. Estimated delivery
                times are:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Metro cities: 2-4 business days</li>
                <li>Tier-2 cities: 4-6 business days</li>
                <li>Remote areas: 6-8 business days</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Delivery times are estimates and not guaranteed. We are not
                responsible for delays caused by shipping carriers, weather, or other
                unforeseen circumstances.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                5. Warranty Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All laptops come with a 2-year comprehensive warranty covering:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Hardware defects and component failures</li>
                <li>Manufacturing defects</li>
                <li>Free repairs and part replacements</li>
                <li>Software support (first 30 days)</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                Warranty Exclusions:
              </h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Physical or liquid damage</li>
                <li>Unauthorized repairs or modifications</li>
                <li>Damage from misuse or negligence</li>
                <li>Consumables (batteries covered for 6 months)</li>
                <li>Software issues after 30 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                6. Return and Replacement Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We offer a 7-day replacement policy. To be eligible for replacement:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>
                  Request must be made within 7 days of delivery
                </li>
                <li>Product must be in original condition with all accessories</li>
                <li>Original packaging should be intact</li>
                <li>Product should not have physical damage caused after delivery</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Refunds are processed within 7-10 business days after receiving and
                inspecting the returned product. Refund method depends on original
                payment method.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                7. Cancellation Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You may cancel your order before it is shipped. Once shipped,
                cancellation requests will be treated as returns. For Cash on Delivery
                orders, refusal at delivery will be treated as cancellation and may
                affect future COD eligibility.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                8. User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities under your account. You
                must provide accurate and complete information during registration.
                We reserve the right to suspend or terminate accounts that violate
                these terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                9. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website, including text, graphics, logos, images,
                and software, is the property of {COMPANY.name} and is protected by
                intellectual property laws. You may not reproduce, distribute, or use
                any content without our prior written consent.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, {COMPANY.name} shall not be
                liable for any indirect, incidental, special, or consequential
                damages arising from the use of our products or services. Our
                liability is limited to the purchase price of the product in
                question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                11. Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms and Conditions are governed by the laws of India. Any
                disputes shall be subject to the exclusive jurisdiction of the courts
                in Jaipur, Rajasthan.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                12. Contact Information
              </h2>
              <div className="bg-gray-50 rounded-lg p-4">
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
                to="/privacy-policy"
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Read our Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;



