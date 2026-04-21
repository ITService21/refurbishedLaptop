import React from "react";
import { Link } from "react-router-dom";
import { Target, Eye, Rocket, Lightbulb, TreePine, Handshake, ArrowRight, Zap, Globe2, ShieldCheck } from "lucide-react";
import SEOHead from "../../Components/SEO/SEOHead";

const MissionVision = () => {
  return (
    <>
      <SEOHead title="Our Mission & Vision" description="Discover our mission to make premium technology accessible and our vision for a sustainable tech future." />
      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-300 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              Our Purpose
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
              Driving Change Through{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Technology
              </span>
            </h1>
            <p className="text-lg text-purple-100 max-w-2xl mx-auto">
              Our mission and vision define who we are and where we're headed. Every laptop we refurbish is a step toward a more connected, sustainable world.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To make premium technology accessible to every student, professional, and business across India
                by providing certified refurbished laptops that meet the highest standards of quality, performance,
                and reliability — all at prices that empower, not burden.
              </p>
              <ul className="space-y-3">
                {[
                  "Provide quality-checked refurbished laptops at 40-60% lower prices",
                  "Ensure every device meets our 40-point quality benchmark",
                  "Offer comprehensive warranty and after-sales support",
                  "Make technology a bridge to opportunity, not a barrier",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <Zap className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To become India's most trusted destination for refurbished technology, leading the circular
                economy revolution where sustainability meets innovation, creating a future where premium
                computing is a right, not a privilege.
              </p>
              <ul className="space-y-3">
                {[
                  "Be the #1 trusted refurbished laptop marketplace in India",
                  "Reduce 1 million tons of e-waste by 2030",
                  "Empower 1 million people with affordable technology",
                  "Set the global standard for refurbishment quality",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <Rocket className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Pillars We Stand On</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our mission and vision are built on four unshakeable pillars that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: ShieldCheck, title: "Trust", desc: "Transparent processes, honest pricing, real warranties. Trust isn't built overnight — we earn it daily.", color: "from-blue-500 to-cyan-500" },
              { icon: TreePine, title: "Sustainability", desc: "Every refurbished laptop saves resources and reduces waste. We're building a greener future.", color: "from-green-500 to-emerald-500" },
              { icon: Lightbulb, title: "Innovation", desc: "Cutting-edge refurbishment technology and processes that set new industry benchmarks.", color: "from-amber-500 to-orange-500" },
              { icon: Handshake, title: "Community", desc: "We don't just sell laptops. We build relationships and empower communities through technology.", color: "from-purple-500 to-pink-500" },
            ].map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow text-center group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${pillar.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact So Far</h2>
              <p className="text-gray-400 max-w-xl mx-auto">Numbers that reflect our commitment to making a difference.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: "10,000+", label: "Laptops Refurbished", icon: Globe2 },
                { value: "500+", label: "Tons E-Waste Saved", icon: TreePine },
                { value: "98%", label: "Customer Satisfaction", icon: Target },
                { value: "50+", label: "Cities Served", icon: Rocket },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Browse our collection of certified refurbished laptops and find your perfect match.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-cyan-700 hover:to-teal-700 transition shadow-lg"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MissionVision;
