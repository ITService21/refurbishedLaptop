import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, Navigation, Wifi, Coffee, Wrench, Shield, Star, ArrowRight, Headphones } from "lucide-react";
import SEOHead from "../../Components/SEO/SEOHead";
import { COMPANY } from "../../config/constants";

const OurStore = () => {
  return (
    <>
      <SEOHead title="Our Store" description="Visit our physical store and experience our premium refurbished laptops hands-on." />
      <div className="min-h-screen bg-gray-50 mt-[60px]">
        {/* Hero */}
        <div className="relative bg-gradient-to-br from-emerald-700 via-teal-600 to-cyan-600 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-80 h-80 bg-yellow-300 rounded-full blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <span className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm mb-6">
              Visit Us
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight max-w-3xl">
              Experience Our{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Store
              </span>
            </h1>
            <p className="text-lg text-emerald-100 max-w-2xl leading-relaxed">
              Walk in, test any laptop, talk to our experts, and walk out with the perfect device. 
              Our store is designed to give you the best hands-on experience.
            </p>
          </div>
        </div>

        {/* Store Info */}
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MapPin, title: "Location", content: COMPANY.address.full, color: "from-red-500 to-rose-500" },
              { icon: Clock, title: "Working Hours", content: COMPANY.workingHours, color: "from-amber-500 to-orange-500" },
              { icon: Phone, title: "Contact", content: COMPANY.phone, color: "from-cyan-500 to-teal-500" },
            ].map((info) => (
              <div key={info.title} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{info.title}</p>
                  <p className="text-gray-800 font-medium mt-1">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to Expect */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What to Expect</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our store is more than just a shop — it's an experience designed around you.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Wrench, title: "Hands-On Testing", desc: "Test any laptop before you buy. Feel the keyboard, check the display, experience the performance." },
              { icon: Headphones, title: "Expert Guidance", desc: "Our tech experts help you find the perfect laptop based on your needs and budget." },
              { icon: Shield, title: "Instant Warranty", desc: "Walk out with a comprehensive 2-year warranty card and peace of mind." },
              { icon: Wifi, title: "Live Demo Zone", desc: "High-speed WiFi zone where you can test gaming, streaming, and productivity." },
              { icon: Coffee, title: "Comfortable Space", desc: "Air-conditioned, comfortable seating area where you can take your time deciding." },
              { icon: Star, title: "Best Prices", desc: "Same online prices in-store. Plus exclusive in-store deals and bundle offers." },
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <feature.icon className="w-10 h-10 text-cyan-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
                <p className="text-gray-600">Located in the heart of {COMPANY.address.city}, easy to reach from anywhere.</p>
              </div>
              <div className="bg-gray-200 rounded-2xl overflow-hidden h-[400px] shadow-lg">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.5!2d75.78!3d26.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUyJzEyLjAiTiA3NcKwNDYnNDguMCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex flex-wrap gap-4 mt-6 justify-center">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-full font-medium hover:bg-cyan-700 transition shadow-lg"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition"
                >
                  <Phone className="w-4 h-4" /> Call Us
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition"
                >
                  <Mail className="w-4 h-4" /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Can't Visit? Shop Online!</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Our entire collection is available online with free delivery across India.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3.5 rounded-full font-semibold hover:from-cyan-700 hover:to-teal-700 transition shadow-lg"
          >
            Shop Online <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurStore;
