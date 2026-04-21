import React, { useState, useMemo } from "react";
import { ChevronDown, Search, MessageCircle, HelpCircle, Package, CreditCard, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { FAQSchema } from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";

const faqCategories = [
  { id: "all", name: "All Questions", icon: HelpCircle, color: "cyan" },
  { id: "general", name: "General", icon: HelpCircle, color: "blue" },
  { id: "products", name: "Products", icon: Package, color: "purple" },
  { id: "orders", name: "Orders & Shipping", icon: Truck, color: "green" },
  { id: "payment", name: "Payment", icon: CreditCard, color: "orange" },
  { id: "warranty", name: "Warranty & Returns", icon: Shield, color: "red" },
];

const faqs = [
  { id: 1, category: "general", question: "What is a refurbished laptop?", answer: "A refurbished laptop is a pre-owned device that has been thoroughly tested, repaired if necessary, and restored to excellent working condition. Our refurbished laptops undergo a rigorous 40-point quality check to ensure they meet our high standards before being sold." },
  { id: 2, category: "general", question: "Are refurbished laptops reliable?", answer: "Yes, absolutely! Our refurbished laptops are as reliable as new ones. Each device goes through comprehensive testing, and we replace any faulty components with genuine parts. Plus, all our laptops come with a 2-year warranty for complete peace of mind." },
  { id: 3, category: "general", question: "Where do you source your laptops from?", answer: "We source our laptops from verified corporate returns, lease returns, and certified channels. We only accept devices that meet our strict quality criteria and can be restored to excellent working condition." },
  { id: 4, category: "products", question: "What brands do you sell?", answer: "We offer laptops from all major brands including Dell, HP, Lenovo, Apple (MacBook), ASUS, Acer, Samsung, and MSI. Our collection includes business laptops, gaming laptops, and everyday use laptops to suit different needs and budgets." },
  { id: 5, category: "products", question: "What is the condition of refurbished laptops?", answer: "Our laptops are graded based on cosmetic condition. Grade A+ laptops look like new with minimal to no signs of use. Grade A laptops may have minor cosmetic marks but are in excellent functional condition. All laptops, regardless of grade, are fully functional and tested." },
  { id: 6, category: "products", question: "Can I customize my laptop specifications?", answer: "Yes! We offer upgrade options for RAM and storage on most laptops. You can choose from available configurations during purchase, or contact us for custom requirements." },
  { id: 7, category: "orders", question: "How long does delivery take?", answer: "We deliver across India: Metro cities (2-4 business days), Tier-2 cities (4-6 business days), and remote areas (6-8 business days). You'll receive a tracking number once your order is shipped." },
  { id: 8, category: "orders", question: "Is delivery free?", answer: "Yes! We offer free delivery on all orders across India. There are no hidden shipping charges." },
  { id: 9, category: "orders", question: "Can I track my order?", answer: "Absolutely! Once shipped, you'll receive an email and SMS with tracking details. Track your order on our website at the Track Order page." },
  { id: 10, category: "orders", question: "Do you deliver to my location?", answer: "We deliver to all pin codes across India. If unsure, enter your pin code during checkout or contact support." },
  { id: 11, category: "payment", question: "What payment methods do you accept?", answer: "We accept Credit/Debit Cards, UPI (GPay, PhonePe, Paytm), Net Banking, Cash on Delivery (COD), and EMI options. All online payments are secured with industry-standard encryption." },
  { id: 12, category: "payment", question: "Is Cash on Delivery (COD) available?", answer: "Yes, COD is available for orders up to ₹50,000 across most locations in India." },
  { id: 13, category: "payment", question: "Do you offer EMI options?", answer: "Yes, we offer No-Cost EMI and Standard EMI options on select credit cards. EMI options start from ₹1,999/month." },
  { id: 14, category: "warranty", question: "What warranty do you provide?", answer: "All laptops come with a comprehensive 2-year warranty covering hardware defects and component failures. This includes free repairs, part replacements, and technical support." },
  { id: 15, category: "warranty", question: "What is your return policy?", answer: "We offer a 7-day replacement policy. If you're not satisfied or find defects, request a replacement within 7 days of delivery." },
  { id: 16, category: "warranty", question: "How do I claim warranty?", answer: "Contact our support team with your order details. We'll arrange pickup or guide you through the process. Turnaround time is typically 5-7 business days." },
  { id: 17, category: "warranty", question: "What is not covered under warranty?", answer: "Physical damage, liquid damage, unauthorized modifications, software issues (after 30 days), and damage from misuse are not covered." },
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCat = activeCategory === "all" || faq.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  const catCount = useMemo(() => {
    const counts = { all: faqs.length };
    faqs.forEach((f) => { counts[f.category] = (counts[f.category] || 0) + 1; });
    return counts;
  }, []);

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about refurbished laptops, warranty, shipping, returns, and payment."
        keywords="faq refurbished laptops, laptop warranty, shipping, return policy"
        canonical="https://laptoprefurbished.in/faq"
      />
      <FAQSchema faqs={faqs} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 text-white py-16 md:py-20 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">How can we help?</h1>
          <p className="text-cyan-100 text-lg max-w-xl mx-auto mb-8">
            Find answers to frequently asked questions about our products and services
          </p>
          {/* Inline Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 border-0 shadow-lg focus:ring-2 focus:ring-cyan-300"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-14">
        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10 -mt-8 relative z-10">
          {faqCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center p-4 rounded-xl border transition text-center ${
                  isActive
                    ? "bg-cyan-600 text-white border-cyan-600 shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:shadow-md"
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${isActive ? "text-white" : "text-gray-500"}`} />
                <span className="text-xs font-medium">{cat.name}</span>
                <span className={`text-[10px] mt-0.5 ${isActive ? "text-cyan-100" : "text-gray-400"}`}>
                  {catCount[cat.id] || 0} questions
                </span>
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-sm transition">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="w-7 h-7 flex items-center justify-center bg-cyan-50 text-cyan-600 rounded-lg text-xs font-bold flex-shrink-0">
                      Q
                    </span>
                    <span className="font-medium text-gray-800 text-sm">{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expandedItems[faq.id] ? "rotate-180" : ""}`} />
                </button>
                {expandedItems[faq.id] && (
                  <div className="px-5 pb-5 ml-10 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 text-center border border-cyan-100">
          <MessageCircle className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Still have questions?</h2>
          <p className="text-gray-600 text-sm mb-6">Our support team is available to help you with anything</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition text-sm">
              Contact Support
            </Link>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition text-sm">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
