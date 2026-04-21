import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Linkedin,
  Youtube,
  Phone,
  MapPin,
  Clock,
  Shield,
  Truck,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { COMPANY } from "../../config/constants";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "All Laptops", path: "/products" },
    { name: "Best Sellers", path: "/products?type=bestseller" },
    { name: "New Arrivals", path: "/products?type=new" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const customerService = [
    { name: "My Account", path: "/account" },
    { name: "Track Order", path: "/track-order" },
    { name: "Shipping & Delivery", path: "/shipping-policy" },
    { name: "Returns & Refunds", path: "/return-policy" },
    { name: "FAQ", path: "/faq" },
    { name: "Support", path: "/contact-us" },
  ];

  const policies = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Warranty Policy", path: "/warranty-policy" },
    { name: "Cancellation Policy", path: "/cancellation-policy" },
  ];

  const brands = [
    { name: "Dell Laptops", path: "/products?brand=Dell" },
    { name: "HP Laptops", path: "/products?brand=HP" },
    { name: "Lenovo Laptops", path: "/products?brand=Lenovo" },
    { name: "MacBook", path: "/products?brand=Apple" },
    { name: "ASUS Laptops", path: "/products?brand=ASUS" },
    { name: "Acer Laptops", path: "/products?brand=Acer" },
  ];

  const features = [
    { icon: <Truck className="w-6 h-6" />, text: "Free Delivery" },
    { icon: <Shield className="w-6 h-6" />, text: "2 Year Warranty" },
    { icon: <RefreshCw className="w-6 h-6" />, text: "7 Days Return" },
    { icon: <CreditCard className="w-6 h-6" />, text: "Secure Payment" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Features Strip */}
      <div className="bg-gray-800 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 md:gap-3"
              >
                <span className="text-green-500">{feature.icon}</span>
                <span className="text-sm md:text-base font-medium text-white">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-white">
                Laptop<span className="text-green-500">Refurbished</span>
              </h2>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm md:text-base">
              {COMPANY.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{COMPANY.address.full}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="text-sm hover:text-green-500 transition"
                >
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-sm hover:text-green-500 transition"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{COMPANY.workingHours}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href={COMPANY.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-sky-500 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-700 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={COMPANY.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-green-500 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop by Brand */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Shop by Brand
            </h3>
            <ul className="space-y-2">
              {brands.map((brand, index) => (
                <li key={index}>
                  <Link
                    to={brand.path}
                    className="text-sm text-gray-400 hover:text-green-500 transition"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {customerService.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-green-500 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-white font-semibold text-lg mb-2">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest deals and offers directly in your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} {COMPANY.name}. All rights reserved.
            </div>

            {/* Policies */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {policies.map((policy, index) => (
                <Link
                  key={index}
                  to={policy.path}
                  className="text-gray-500 hover:text-green-500 transition"
                >
                  {policy.name}
                </Link>
              ))}
            </div>

            {/* Creator Credit */}
            <div className="text-sm text-gray-500 text-center md:text-right">
              <a
                href={COMPANY.creator.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                {COMPANY.creator.tagline}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
