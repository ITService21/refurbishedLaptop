import React from "react";
import { Link } from "react-router-dom";
import { Shield, Award, Truck, RefreshCw, CreditCard, Headphones, CheckCircle, Star, ThumbsUp, Zap, Clock, ArrowRight, BadgeCheck } from "lucide-react";
import SEOHead from "../../Components/SEO/SEOHead";

const WhyChooseUs = () => {
  return (
    <>
      <SEOHead title="Why Choose Us" description="Quality assured, warranty backed, trusted by thousands. Discover why we're India's #1 refurbished laptop store." />
      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-72 h-72 bg-yellow-300 rounded-full blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              The Smart Choice
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              Why Thousands{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                Trust Us
              </span>
            </h1>
            <p className="text-lg text-orange-100 max-w-2xl mx-auto">
              Quality, trust, and value — the three pillars that make us India's preferred choice for refurbished laptops.
            </p>
          </div>
        </div>

        {/* Main Features */}
        <div className="container mx-auto px-4 -mt-12 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Shield, title: "2-Year Warranty", desc: "Complete peace of mind with our comprehensive warranty coverage on every device.", color: "from-blue-500 to-cyan-500" },
              { icon: Truck, title: "Free Delivery", desc: "Free shipping on all orders, anywhere in India. Fast and reliable delivery.", color: "from-green-500 to-emerald-500" },
              { icon: RefreshCw, title: "7-Day Replacement", desc: "Not satisfied? Easy replacement within 7 days of delivery. No questions asked.", color: "from-purple-500 to-pink-500" },
              { icon: CreditCard, title: "Secure Payment", desc: "Multiple payment options including COD, UPI, cards, and EMI. 100% secure.", color: "from-amber-500 to-orange-500" },
              { icon: BadgeCheck, title: "Certified Quality", desc: "Every laptop undergoes our rigorous 40-point quality check before listing.", color: "from-red-500 to-rose-500" },
              { icon: Headphones, title: "24/7 Support", desc: "Our dedicated customer support team is always here to help you.", color: "from-teal-500 to-cyan-500" },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Process */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Quality Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every laptop goes through a meticulous journey before it reaches you.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Inspection", desc: "Thorough hardware and software inspection of every component.", icon: CheckCircle },
              { step: "02", title: "Refurbishment", desc: "Professional cleaning, component replacement, and performance tuning.", icon: Zap },
              { step: "03", title: "Testing", desc: "40-point quality check including battery, display, keyboard, and ports.", icon: Award },
              { step: "04", title: "Certification", desc: "Final certification and quality seal before packaging and shipping.", icon: Star },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center mx-auto group-hover:from-cyan-200 group-hover:to-teal-200 transition-colors">
                    <item.icon className="w-8 h-8 text-cyan-700" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Rahul K.", role: "Software Engineer", review: "Got a Dell Latitude for half the price. Runs like new! The 40-point check really shows.", rating: 5 },
                { name: "Priya M.", role: "College Student", review: "Couldn't afford a new MacBook but got a refurbished one that's perfect for my design work.", rating: 5 },
                { name: "Amit S.", role: "Business Owner", review: "Bought 10 laptops for my office. Excellent quality and the bulk discount was amazing!", rating: 5 },
              ].map((review) => (
                <div key={review.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{review.review}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                    <ThumbsUp className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">New vs Refurbished</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See why smart buyers choose refurbished.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white">
                  <th className="py-4 px-6 text-left font-semibold">Feature</th>
                  <th className="py-4 px-6 text-center font-semibold">New Laptop</th>
                  <th className="py-4 px-6 text-center font-semibold">Our Refurbished</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Price", "₹60,000+", "₹25,000-35,000"],
                  ["Warranty", "1 Year", "2 Years"],
                  ["Quality Check", "Standard", "40-Point Check"],
                  ["Performance", "100%", "95-100%"],
                  ["Free Delivery", "Sometimes", "Always"],
                  ["Eco-Friendly", "No", "Yes"],
                ].map(([feature, newVal, refurb]) => (
                  <tr key={feature} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-800">{feature}</td>
                    <td className="py-3 px-6 text-center text-gray-600">{newVal}</td>
                    <td className="py-3 px-6 text-center text-cyan-700 font-semibold">{refurb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <Clock className="w-12 h-12 mx-auto mb-4 text-cyan-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make the Smart Choice?</h2>
            <p className="text-cyan-100 mb-8 max-w-xl mx-auto">
              Join 10,000+ happy customers who chose quality, value, and sustainability.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-3.5 rounded-full font-semibold hover:bg-cyan-50 transition shadow-lg"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
