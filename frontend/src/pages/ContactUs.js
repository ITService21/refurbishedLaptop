import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Headphones } from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { COMPANY } from "../config/constants";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone, label: "Call Us", value: COMPANY.phone || "+91 95824 06531",
      action: `tel:${COMPANY.phone || "+919582406531"}`,
      desc: "Mon-Sat, 9AM - 7PM IST", color: "cyan",
    },
    {
      icon: Mail, label: "Email Us", value: COMPANY.email || "support@laptoprefurbished.in",
      action: `mailto:${COMPANY.email || "support@laptoprefurbished.in"}`,
      desc: "We reply within 24 hours", color: "blue",
    },
    {
      icon: MessageCircle, label: "WhatsApp", value: "Chat with us",
      action: `https://wa.me/${COMPANY.whatsapp || "919582406531"}`,
      desc: "Quick responses on WhatsApp", color: "green",
    },
    {
      icon: MapPin, label: "Visit Us", value: "Navde, Taloja, Navi Mumbai",
      action: "#map", desc: "Maharashtra 410208", color: "purple",
    },
  ];

  const colorMap = {
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", hover: "hover:bg-cyan-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", hover: "hover:bg-blue-100" },
    green: { bg: "bg-green-50", text: "text-green-600", hover: "hover:bg-green-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", hover: "hover:bg-purple-100" },
  };

  return (
    <>
      <SEOHead
        title="Contact Us - Support"
        description="Get in touch with our support team. We're here to help with orders, products, and any questions."
        keywords="contact us, support, customer service, help"
        canonical="https://laptoprefurbished.in/contact-us"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700 text-white py-16 md:py-20 mt-[60px]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Headphones className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-cyan-100 text-lg max-w-xl mx-auto">
            We're here to help. Reach out to us and we'll respond as soon as we can.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 relative z-10 mb-12">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            const colors = colorMap[item.color];
            return (
              <a
                key={item.label}
                href={item.action}
                target={item.action.startsWith("http") ? "_blank" : undefined}
                rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`bg-white rounded-xl border border-gray-100 p-5 shadow-md ${colors.hover} transition group text-center`}
              >
                <div className={`w-12 h-12 ${colors.bg} ${colors.text} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-700 font-medium">{item.value}</p>
                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Send Us a Message</h2>
            <p className="text-sm text-gray-500 mb-6">Fill in the form below and we'll get back to you shortly</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </span>
                  <input name="name" value={form.name} onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="Your name" required />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="your@email.com" required />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Phone</span>
                  <input name="phone" value={form.phone} onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="+91 XXXXX XXXXX" />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Subject</span>
                  <select name="subject" value={form.subject} onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500">
                    <option value="">Select a topic</option>
                    <option>Order Inquiry</option>
                    <option>Product Question</option>
                    <option>Return / Refund</option>
                    <option>Warranty Claim</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-sm font-medium text-gray-700">
                  Message <span className="text-red-500">*</span>
                </span>
                <textarea name="message" rows={5} value={form.message} onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                  placeholder="How can we help you?" required />
              </label>
              <button type="submit"
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-cyan-600" />
                <h3 className="font-semibold text-gray-800">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 7:00 PM" },
                  { day: "Saturday", time: "10:00 AM - 5:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{h.day}</span>
                    <span className={`font-medium ${h.time === "Closed" ? "text-red-500" : "text-gray-800"}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-6 border border-cyan-100">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Track Your Order", href: "/track-order" },
                  { label: "Shipping Policy", href: "/shipping-policy" },
                  { label: "Return & Refund Policy", href: "/return-policy" },
                  { label: "FAQ", href: "/faq" },
                ].map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-cyan-700 hover:text-cyan-800 hover:underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Map */}
        <div id="map" className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-600" /> Our Location
              </h3>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7542.190150458803!2d73.119027!3d19.059557!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9d7f525cad1%3A0x2049828996a93ba0!2sRSR%20AVIATION%20SERVICES%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1746992185569!5m2!1sen!2sin"
              width="100%" height="350" style={{ border: 0 }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Office Location"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
