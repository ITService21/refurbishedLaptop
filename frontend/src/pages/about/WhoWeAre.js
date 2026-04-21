import React from "react";
import { Link } from "react-router-dom";
import { Users, Award, Shield, Heart, TrendingUp, Globe, CheckCircle, Star, ArrowRight } from "lucide-react";
import SEOHead from "../../Components/SEO/SEOHead";
import { COMPANY } from "../../config/constants";

const WhoWeAre = () => {
  return (
    <>
      <SEOHead title="Who We Are" description="Learn about our story, values, and what drives us forward at Laptop Refurbished." />
      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-cyan-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
                About {COMPANY.name}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                We Make Premium Tech{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Accessible
                </span>{" "}
                for Everyone
              </h1>
              <p className="text-lg md:text-xl text-cyan-100 leading-relaxed max-w-2xl">
                Founded in {COMPANY.established}, we've been on a mission to bridge the digital divide by providing
                high-quality certified refurbished laptops at prices that make sense.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                It started with a simple question: Why should quality technology be a luxury? Our founders saw
                thousands of premium laptops being discarded while millions couldn't afford basic computing.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We set out to change that. Every laptop in our inventory goes through a rigorous 40-point quality
                check, professional refurbishment, and comes backed with our comprehensive 2-year warranty.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we've served over 10,000+ happy customers across India, helping students, professionals,
                and businesses get the technology they need without breaking the bank.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: "10,000+", label: "Happy Customers" },
                { icon: Award, value: "40-Point", label: "Quality Check" },
                { icon: Shield, value: "2 Years", label: "Warranty" },
                { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <stat.icon className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These aren't just words on a wall. They guide every decision we make, every laptop we refurbish,
                and every customer interaction.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Heart,
                  title: "Customer First",
                  desc: "Every decision starts with our customers. We listen, adapt, and constantly improve to exceed expectations.",
                  color: "from-rose-500 to-pink-500",
                },
                {
                  icon: Globe,
                  title: "Sustainability",
                  desc: "By refurbishing laptops, we reduce e-waste and give technology a second life. Good for you, good for the planet.",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  icon: CheckCircle,
                  title: "Quality Obsession",
                  desc: "No shortcuts. Every laptop passes our 40-point quality check before it reaches your hands.",
                  color: "from-cyan-500 to-blue-500",
                },
              ].map((value) => (
                <div key={value.title} className="relative group">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Highlights */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Growing Family</h2>
            <p className="text-cyan-100 max-w-2xl mx-auto mb-8 text-lg">
              We're a team of passionate technologists, quality experts, and customer advocates
              working together to make premium tech accessible for all.
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-white text-cyan-700 px-8 py-3 rounded-full font-semibold hover:bg-cyan-50 transition shadow-lg"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhoWeAre;
