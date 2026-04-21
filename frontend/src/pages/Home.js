import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, ArrowRight, Shield, Truck, RefreshCw, CreditCard,
  CheckCircle, Headphones, Star, Laptop, Award, Zap, ArrowUpRight,
  ChevronRight, Monitor, Cpu, Battery,
  Users, ThumbsUp, Package, MapPin, Phone, Mail,
  Sparkles, TrendingUp,
} from "lucide-react";
import LatestCollection from "../features/products/LatestCollection";
import BestSeller from "../features/products/BestSeller";
import NewArrival from "../features/products/NewArrival";
import { COMPANY } from "../config/constants";

const banners = [
  {
    src1: "/image/slide3A.jpg",
    alt: "About Us",
    title: "Why Choose Us",
    subtitle: "Premium quality at unbeatable prices",
    description: "Trusted refurbished laptop provider.",
  },
  {
    src1: "/image/slide2A.jpg",
    alt: "Top Brands",
    title: "Premium Brands Available",
    subtitle: "Dell, HP, Lenovo, Apple & more",
    description: "Dell, HP, Lenovo, and more.",
  },
  {
    src1: "/image/slide5A.jpg",
    alt: "Best Deals",
    title: "Unbeatable Prices",
    subtitle: "Save up to 60% on top laptops",
    description: "Affordable laptops, top performance.",
  },
  {
    src1: "/image/slide4A.jpg",
    alt: "Certified Devices",
    title: "Certified Refurbished",
    subtitle: "40-point quality tested & certified",
    description: "Quality tested and certified laptops.",
  },
  {
    src1: "/image/slide1A.jpg",
    alt: "Support & Warranty",
    title: "Warranty & Support",
    subtitle: "2-year warranty on every laptop",
    description: "Reliable service with warranty included.",
  },
];

const popularCategories = [
  { name: "Business Laptops", icon: Monitor, desc: "Dell Latitude, HP EliteBook, Lenovo ThinkPad", link: "/products?processor=Intel Core i5", gradient: "from-blue-500 to-indigo-600" },
  { name: "Gaming Laptops", icon: Zap, desc: "High performance GPUs, fast refresh rates", link: "/products?processor=Intel Core i7", gradient: "from-red-500 to-rose-600" },
  { name: "Student Friendly", icon: Sparkles, desc: "Budget-friendly, lightweight, all-day battery", link: "/products?maxPrice=25000", gradient: "from-green-500 to-emerald-600" },
  { name: "MacBooks", icon: Laptop, desc: "Apple MacBook Air & Pro - Certified Refurbished", link: "/products?brand=Apple", gradient: "from-gray-700 to-gray-900" },
  { name: "Ultrabooks", icon: Battery, desc: "Slim, lightweight & powerful for professionals", link: "/products?processor=Intel Core i5", gradient: "from-purple-500 to-violet-600" },
  { name: "Workstations", icon: Cpu, desc: "For creators, developers & heavy workloads", link: "/products?processor=Intel Core i9", gradient: "from-amber-500 to-orange-600" },
];

const faqs = [
  {
    q: "Are refurbished laptops reliable?",
    a: "Absolutely! Every laptop undergoes our rigorous 40-point quality check. We test hardware, software, battery, and cosmetics to ensure each device meets premium standards. Plus, you get a full 2-year warranty.",
  },
  {
    q: "What warranty do you provide?",
    a: "All our laptops come with a comprehensive 2-year warranty covering hardware defects and component failures. We also offer a 7-day no-questions-asked replacement policy.",
  },
  {
    q: "Can I return a laptop if I'm not satisfied?",
    a: "Yes! We offer a 7-day replacement policy. If you're not completely satisfied with your purchase, you can return it within 7 days for a full replacement or refund.",
  },
  {
    q: "Do you offer EMI options?",
    a: "Yes, we offer easy EMI options on all major credit cards and select debit cards. You can also pay using UPI, net banking, or Cash on Delivery.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero Section - Reduced Height with Overlapping Title */}
      <section className="w-full relative overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          autoplay={{ delay: 2400, disableOnInteraction: false }}
          speed={500}
          loop
          className="w-full h-[35vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh]"
        >
          {banners?.map((item, index) => (
            <SwiperSlide key={index} className="w-full h-full relative">
              <img
                src={item.src1}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 sm:pb-12 text-white px-4 text-center">
                <h2 className="text-lg sm:text-2xl md:text-4xl font-bold mb-1 drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white/80 mb-3 md:mb-5 max-w-xl">
                  {item.subtitle}
                </p>
                <div className="flex flex-row items-center gap-2 md:gap-4">
                  <button
                    onClick={() => navigate("/contact-us")}
                    className="bg-emerald-500/90 hover:bg-emerald-600 text-xs sm:text-sm md:text-base text-white font-semibold px-4 sm:px-5 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-2 transition shadow-lg"
                  >
                    Buy Now <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                  <Link
                    to="/products"
                    className="bg-cyan-500/90 hover:bg-cyan-600 text-xs sm:text-sm md:text-base text-white font-semibold px-4 sm:px-5 md:px-8 py-2 md:py-3 rounded-full transition shadow-lg"
                  >
                    See All Products
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation - Visible on all screen sizes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <button className="custom-prev pointer-events-auto absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-1.5 md:p-2.5 rounded-full shadow-lg transition">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
          </button>
          <button className="custom-next pointer-events-auto absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 p-1.5 md:p-2.5 rounded-full shadow-lg transition">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-800" />
          </button>
        </div>
      </section>

      {/* Trust Badges - Floating */}
      <section className="relative z-10 -mt-8 md:-mt-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {[
              { icon: Shield, label: "2 Year Warranty", color: "from-blue-500 to-cyan-500" },
              { icon: Truck, label: "Free Delivery", color: "from-green-500 to-emerald-500" },
              { icon: RefreshCw, label: "7-Day Return", color: "from-purple-500 to-pink-500" },
              { icon: CreditCard, label: "Secure Pay", color: "from-amber-500 to-orange-500" },
              { icon: CheckCircle, label: "Certified", color: "from-red-500 to-rose-500" },
              { icon: Headphones, label: "24/7 Support", color: "from-teal-500 to-cyan-500" },
            ].map((badge) => (
              <div key={badge.label} className="bg-white rounded-xl md:rounded-2xl p-2.5 md:p-4 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow group">
                <div className={`w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r ${badge.color} flex items-center justify-center mx-auto mb-1.5 md:mb-2 shadow-md group-hover:scale-110 transition-transform`}>
                  <badge.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <p className="text-[9px] md:text-xs font-semibold text-gray-700 leading-tight">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcement / Quick Stats Bar */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-4 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 text-white/90">
            {[
              { icon: Package, value: "5000+", label: "Products Sold" },
              { icon: Users, value: "10,000+", label: "Happy Customers" },
              { icon: ThumbsUp, value: "4.8/5", label: "Avg. Rating" },
              { icon: TrendingUp, value: "60%", label: "Max Savings" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold">{stat.value}</span>
                <span className="text-xs text-gray-400">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Browse by Use Case
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Shop by <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
              Find the perfect laptop for your needs — whether it's business, gaming, or everyday use.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {popularCategories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-transparent"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-10 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                <div className="relative rounded-2xl p-4 md:p-5 text-center h-full">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${cat.gradient} flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all`}>
                    <cat.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-gray-800 group-hover:text-white transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] md:text-xs text-gray-500 group-hover:text-white/80 transition-colors leading-relaxed hidden md:block">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Latest Collection */}
      <section className="bg-gradient-to-b from-cyan-50/50 to-white pt-12 md:pt-16 pb-8">
        <div className="w-[92%] max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Featured
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Our Latest <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Discover our newest arrivals, thoughtfully curated to fuse timeless elegance with contemporary design.
            </p>
          </div>
          <LatestCollection />
          <div className="text-center mt-6">
            <Link
              to="/products?category=Our+Latest+Collection"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold text-sm transition group"
            >
              View All in Latest Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Proposition Banner */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-12 md:py-16 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold mb-4">
                WHY REFURBISHED?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Smart.{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Fast.
                </span>{" "}
                Reliable.
              </h2>
              <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                Discover high-performance laptops tailored for gaming, productivity, and everyday use.
                Handpicked for speed, design, and reliability — ideal for students, professionals, and creators alike.
              </p>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  { value: "40-60%", label: "Lower Prices" },
                  { value: "40-Point", label: "Quality Check" },
                  { value: "2 Year", label: "Full Warranty" },
                  { value: "10K+", label: "Happy Customers" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 md:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold hover:from-cyan-600 hover:to-teal-600 transition shadow-lg text-sm md:text-base"
              >
                Explore Now <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-48 group">
                  <img src="/image/home1.jpg" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden h-32 group">
                  <img src="/image/slide2A.jpg" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative rounded-2xl overflow-hidden h-32 group">
                  <img src="/image/slide4A.jpg" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="relative rounded-2xl overflow-hidden h-48 group">
                  <img src="/image/home2.jpg" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-white pt-12 md:pt-16 pb-8">
        <div className="w-[92%] max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Most Popular
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Best <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Sellers</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our most loved products, trusted and rated by thousands of happy customers.
            </p>
          </div>
          <BestSeller />
          <div className="text-center mt-6">
            <Link
              to="/products?category=Best+Sellers"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition group"
            >
              View All Best Sellers <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Favorite Section */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src="/image/land2.jpg"
              alt="Featured"
              className="w-full h-[250px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
              <div className="p-6 md:p-16 max-w-2xl">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-bold mb-3 md:mb-4">
                  SPOTLIGHT
                </span>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
                  Featured{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Favorite
                  </span>
                </h2>
                <p className="text-gray-300 text-sm md:text-lg mb-4 md:mb-6 leading-relaxed">
                  Experience unmatched quality and sleek design with one of our best-loved pieces.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-white/95 text-gray-900 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:bg-white transition shadow-lg text-sm md:text-base"
                >
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-gradient-to-b from-rose-50/50 to-white pt-12 md:pt-16 pb-8">
        <div className="w-[92%] max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Just In
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              New <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Arrivals</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Fresh additions to our collection. Be the first to grab these amazing deals.
            </p>
          </div>
          <NewArrival />
          <div className="text-center mt-6">
            <Link
              to="/products?category=New+Arrivals"
              className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold text-sm transition group"
            >
              View All New Arrivals <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Simple Process
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">How It <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Works</span></h2>
            <p className="text-gray-600 text-sm md:text-base">Getting your perfect laptop is as easy as 1-2-3.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { step: "01", icon: Laptop, title: "Choose Your Laptop", desc: "Browse our curated collection of certified refurbished laptops from top brands.", color: "from-cyan-500 to-teal-500" },
              { step: "02", icon: Award, title: "We Certify It", desc: "Every laptop goes through our rigorous 40-point quality check and gets certified.", color: "from-purple-500 to-pink-500" },
              { step: "03", icon: Truck, title: "Delivered to You", desc: "Free delivery across India with 2-year warranty. Unbox perfection.", color: "from-amber-500 to-orange-500" },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="relative mb-5 md:mb-6 inline-block">
                  <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                  </div>
                  <span className={`absolute -top-2 -right-2 md:-top-3 md:-right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-r ${item.color} text-white text-xs md:text-sm font-bold flex items-center justify-center shadow-lg ring-2 ring-white`}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart - Comparison */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Compare & Save
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              New <span className="text-gray-500">vs</span> <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Refurbished</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
              See why thousands of smart buyers choose certified refurbished over brand new.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-3">
              <div className="p-3 md:p-5 bg-white/5 font-bold text-gray-300 text-xs md:text-sm">Feature</div>
              <div className="p-3 md:p-5 bg-white/5 font-bold text-center text-gray-500 text-xs md:text-sm border-l border-white/10">Brand New</div>
              <div className="p-3 md:p-5 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 font-bold text-center text-cyan-400 text-xs md:text-sm border-l border-white/10">Our Refurbished</div>
            </div>
            {[
              { feature: "Price", brandNew: "Full MRP", refurb: "40-60% Less", icon: "💰" },
              { feature: "Warranty", brandNew: "1 Year", refurb: "2 Years", icon: "🛡️" },
              { feature: "Quality Check", brandNew: "Factory Standard", refurb: "40-Point Check", icon: "✅" },
              { feature: "Free Delivery", brandNew: "Varies", refurb: "Always Free", icon: "🚚" },
              { feature: "Return Policy", brandNew: "7-10 Days", refurb: "7-Day Replacement", icon: "↩️" },
              { feature: "Eco Friendly", brandNew: "New Resources", refurb: "Sustainable", icon: "🌱" },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-3 border-t border-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}`}>
                <div className="p-3 md:p-4 text-xs md:text-sm text-gray-300 font-medium flex items-center gap-2">
                  <span className="text-sm">{row.icon}</span> {row.feature}
                </div>
                <div className="p-3 md:p-4 text-xs md:text-sm text-gray-500 text-center border-l border-white/5">{row.brandNew}</div>
                <div className="p-3 md:p-4 text-xs md:text-sm text-cyan-400 text-center font-semibold border-l border-white/5">{row.refurb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Testimonials
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">Loved by <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Thousands</span></h2>
            <p className="text-gray-600 text-sm md:text-base">See what our customers have to say.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Akash P.", city: "Delhi", review: "Got a Dell Latitude for my office work. It's been 6 months and runs flawlessly. Best investment!", rating: 5, product: "Dell Latitude E7470" },
              { name: "Sneha R.", city: "Mumbai", review: "The MacBook Air I received looks brand new! Amazing quality and the warranty gives peace of mind.", rating: 5, product: "MacBook Air M1" },
              { name: "Vikram J.", city: "Bangalore", review: "Bought 5 HP laptops for my startup. Great quality, amazing support team. Highly recommend!", rating: 5, product: "HP EliteBook 840 G5" },
              { name: "Priya M.", city: "Pune", review: "Ordered a Lenovo ThinkPad for college. Runs smooth, battery is excellent, and delivery was super fast!", rating: 5, product: "Lenovo ThinkPad T480" },
              { name: "Rahul S.", city: "Jaipur", review: "Second purchase from here. Both laptops running great after 1+ year. Trustworthy and value for money.", rating: 5, product: "Dell Inspiron 15" },
              { name: "Anjali K.", city: "Hyderabad", review: "Customer service is outstanding. Had a minor issue and it was resolved within 24 hours. 10/10!", rating: 5, product: "HP ProBook 450 G7" },
            ].map((review) => (
              <div key={review.name} className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-3 md:mb-4 italic leading-relaxed text-sm">"{review.review}"</p>
                <p className="text-[10px] md:text-xs text-cyan-600 font-medium mb-3">Purchased: {review.product}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              Got Questions?
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Everything you need to know before making your purchase.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden transition-all duration-200 ${
                  openFaq === i
                    ? "bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 shadow-md"
                    : "bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4"
                >
                  <span className={`font-semibold text-sm md:text-base ${openFaq === i ? "text-cyan-800" : "text-gray-800"}`}>{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-90 text-cyan-600" : "text-gray-400"
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/faq"
              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm inline-flex items-center gap-1"
            >
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Trusted <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Brands</span> We Carry
            </h2>
            <p className="text-gray-500 text-xs md:text-sm">Handpicked from the world's most reliable laptop manufacturers</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {["Dell", "HP", "Lenovo", "Apple", "ASUS", "Acer", "Samsung"].map((brand) => (
              <Link
                key={brand}
                to={`/products?brand=${brand}`}
                className="px-5 md:px-8 py-3 md:py-4 rounded-2xl border border-gray-200 hover:border-cyan-400 bg-white hover:bg-cyan-50 transition-all shadow-sm hover:shadow-md group"
              >
                <span className="text-lg md:text-2xl font-bold text-gray-400 group-hover:text-cyan-600 transition-colors">
                  {brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-white py-8 md:py-10 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            <a href={`tel:${COMPANY.phone}`} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left p-3 md:p-4 rounded-xl hover:bg-cyan-50 transition group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium">Call Us</p>
                <p className="text-[11px] md:text-sm font-bold text-gray-800 group-hover:text-cyan-700 transition">{COMPANY.phone}</p>
              </div>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left p-3 md:p-4 rounded-xl hover:bg-emerald-50 transition group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium">Email Us</p>
                <p className="text-[11px] md:text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition truncate max-w-[100px] md:max-w-none">{COMPANY.email}</p>
              </div>
            </a>
            <Link to="/about/our-store" className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left p-3 md:p-4 rounded-xl hover:bg-amber-50 transition group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 font-medium">Visit Us</p>
                <p className="text-[11px] md:text-sm font-bold text-gray-800 group-hover:text-amber-700 transition">{COMPANY.address.city}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Zap className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-yellow-300" />
          <h2 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            Ready for Your Next Laptop?
          </h2>
          <p className="text-cyan-100 text-sm md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
            Join 10,000+ happy customers who chose quality, value, and sustainability.
            Browse our collection and find your perfect match today.
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-cyan-700 px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold hover:bg-cyan-50 transition shadow-xl text-sm md:text-base"
            >
              Shop Now <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold hover:bg-white/20 transition border border-white/20 text-sm md:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
