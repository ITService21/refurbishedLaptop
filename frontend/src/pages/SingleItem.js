import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, CreditCard,
  Award, Lock, ChevronLeft, ChevronRight, Check, Minus, Plus,
  ZoomIn, ZoomOut, Maximize2, X, Star, Package, MessageCircle,
  Copy, ExternalLink,
} from "lucide-react";
import SEOHead from "../Components/SEO/SEOHead";
import { productApi } from "../Components/common/apiWrapper";
import { formatIndianNumber } from "../utils/methods";
import { Loader } from "../Components/common/Elements";
import { addToCart } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import ProductCard from "../Components/card/ProductCard";
import { COMPANY } from "../config/constants";

// Helper to parse images safely
const safeImages = (imgs) => {
  let arr = [];
  if (Array.isArray(imgs)) arr = imgs;
  else if (typeof imgs === "string") { try { arr = JSON.parse(imgs); } catch { arr = []; } }
  return arr.filter(u => u && !u.startsWith("blob:"));
};

const SingleItem = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");

  // Image zoom state
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const shareRef = useRef(null);

  const isInWishlist = product && wishlistItems.some((item) => item.product_id === product.product_id);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) { navigate("/products"); return; }
      setLoading(true);
      try {
        const response = await productApi.getById(productId);
        if (response?.success && response.data) {
          setProduct(response.data);
          const relatedRes = await productApi.getRelated(productId, 4);
          if (relatedRes?.success) setRelatedProducts(relatedRes.data || []);
        } else { navigate("/products"); }
      } catch { navigate("/products"); }
      finally { setLoading(false); }
    };
    fetchProduct();
  }, [productId, navigate]);

  // Close share menu on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShowShareMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleAddToCart = () => { dispatch(addToCart({ ...product, quantity })); };
  const handleBuyNow = () => { dispatch(addToCart({ ...product, quantity })); navigate("/checkout"); };
  const handleToggleWishlist = () => { dispatch(toggleWishlist(product)); };

  // Image zoom handlers
  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.5, 4));
  const handleZoomOut = () => { setZoomLevel(z => { const n = Math.max(z - 0.5, 1); if (n <= 1) setDragPos({ x: 0, y: 0 }); return n; }); };
  const handleImageClick = () => { if (zoomLevel <= 1) { setZoomLevel(2); } else { setZoomLevel(1); setDragPos({ x: 0, y: 0 }); } };
  const handleFullscreen = () => { setIsZoomed(true); setZoomLevel(1); setDragPos({ x: 0, y: 0 }); };
  const handleCloseFullscreen = () => { setIsZoomed(false); setZoomLevel(1); setDragPos({ x: 0, y: 0 }); };

  const handleMouseDown = useCallback((e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - dragPos.x, y: e.clientY - dragPos.y });
  }, [zoomLevel, dragPos]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setDragPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => { setIsDragging(false); }, []);

  // Touch handlers for mobile zoom/drag
  const handleTouchStart = useCallback((e) => {
    if (zoomLevel <= 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - dragPos.x, y: touch.clientY - dragPos.y });
  }, [zoomLevel, dragPos]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || zoomLevel <= 1) return;
    const touch = e.touches[0];
    setDragPos({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
  }, [isDragging, dragStart, zoomLevel]);

  // Share functions
  const shareUrl = window.location.href;
  const shareText = product ? `Check out this ${product.brand_name} ${product.model_name} at ${COMPANY.name}! ₹${formatIndianNumber(product.price)}` : "";

  const shareOptions = [
    { name: "WhatsApp", icon: "💬", color: "bg-green-500 hover:bg-green-600", action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank") },
    { name: "Instagram", icon: "📷", color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600", action: () => { navigator.clipboard.writeText(shareUrl); alert("Link copied! Share it on Instagram."); } },
    { name: "Facebook", icon: "📘", color: "bg-blue-600 hover:bg-blue-700", action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank") },
    { name: "Twitter", icon: "🐦", color: "bg-sky-500 hover:bg-sky-600", action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank") },
    { name: "Copy Link", icon: "🔗", color: "bg-gray-600 hover:bg-gray-700", action: () => { navigator.clipboard.writeText(shareUrl); } },
  ];

  if (loading) return (<div className="min-h-screen flex items-center justify-center mt-[60px]"><Loader /></div>);
  if (!product) return (<div className="min-h-screen flex flex-col items-center justify-center mt-[60px]"><h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2><Link to="/products" className="text-cyan-600 hover:underline">Browse All Products</Link></div>);

  const { model_name, brand_name, images: rawImages, price, mrp, processor, ram, storage, generation, screen_size, in_stock = true, model_number, detailedSpecs } = product;
  const parsedImages = safeImages(rawImages);
  const discount = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const displayImages = parsedImages.length > 0 ? parsedImages : ["/image/slide1A.jpg"];

  const features = [
    { icon: <RefreshCw className="w-5 h-5" />, label: "7 Days Replacement", desc: "No questions asked" },
    { icon: <Truck className="w-5 h-5" />, label: "Free Delivery", desc: "Across India" },
    { icon: <Shield className="w-5 h-5" />, label: "2 Year Warranty", desc: "Full coverage" },
    { icon: <CreditCard className="w-5 h-5" />, label: "Pay on Delivery", desc: "COD available" },
    { icon: <Award className="w-5 h-5" />, label: "Certified Quality", desc: "40-point check" },
    { icon: <Lock className="w-5 h-5" />, label: "Secure Payment", desc: "100% safe" },
  ];

  const specifications = [
    { label: "Brand", value: brand_name },
    { label: "Model Name", value: model_name },
    { label: "Model Number", value: model_number },
    { label: "Processor", value: processor },
    { label: "Generation", value: generation },
    { label: "RAM", value: ram },
    { label: "Storage", value: storage },
    { label: "Screen Size", value: screen_size },
    ...(detailedSpecs ? [
      { label: "Display", value: detailedSpecs.display },
      { label: "Graphics", value: detailedSpecs.graphics },
      { label: "Operating System", value: detailedSpecs.operating_system },
      { label: "Weight", value: detailedSpecs.weight },
      { label: "Battery", value: detailedSpecs.battery },
      { label: "Keyboard", value: detailedSpecs.keyboard },
      { label: "Ports", value: detailedSpecs.ports },
      { label: "Color", value: detailedSpecs.color },
    ] : []),
  ].filter(spec => spec.value);

  // Fullscreen image viewer
  const FullscreenViewer = () => (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={handleCloseFullscreen}>
      <button onClick={handleCloseFullscreen} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white z-10"><X className="w-6 h-6" /></button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        <button onClick={(e) => { e.stopPropagation(); handleZoomOut(); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"><ZoomOut className="w-5 h-5" /></button>
        <span className="px-3 py-2 bg-white/10 rounded-full text-white text-sm">{Math.round(zoomLevel * 100)}%</span>
        <button onClick={(e) => { e.stopPropagation(); handleZoomIn(); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"><ZoomIn className="w-5 h-5" /></button>
      </div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i === 0 ? displayImages.length - 1 : i - 1); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronLeft className="w-6 h-6" /></button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i === displayImages.length - 1 ? 0 : i + 1); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"><ChevronRight className="w-6 h-6" /></button>
      </div>
      <img
        src={displayImages[selectedImage]}
        alt={model_name}
        className="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel}) translate(${dragPos.x / zoomLevel}px, ${dragPos.y / zoomLevel}px)`, cursor: zoomLevel > 1 ? "grab" : "zoom-in" }}
        onClick={(e) => { e.stopPropagation(); handleImageClick(); }}
        onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(e); }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        draggable={false}
      />
    </div>
  );

  return (
    <>
      <SEOHead
        title={`${brand_name} ${model_name} | Buy at Best Price`}
        description={`Buy ${brand_name} ${model_name} - ${processor}, ${ram}, ${storage} at ₹${formatIndianNumber(price)}.`}
        keywords={`${brand_name} laptop, ${model_name}, refurbished laptop`}
        canonical={`https://laptoprefurbished.in/product/${productId}`}
      />

      {isZoomed && <FullscreenViewer />}

      <div className="bg-gray-50 min-h-screen mt-[60px]">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* Breadcrumb */}
          <nav className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
            <Link to="/" className="hover:text-cyan-600">Home</Link>
            <span className="mx-1.5">/</span>
            <Link to="/products" className="hover:text-cyan-600">Products</Link>
            <span className="mx-1.5">/</span>
            <Link to={`/products?brand=${brand_name}`} className="hover:text-cyan-600">{brand_name}</Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-800 font-medium">{model_name}</span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="lg:w-1/2 p-4 md:p-6">
                {/* Main Image with zoom */}
                <div
                  ref={imageContainerRef}
                  className="relative aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden cursor-zoom-in group"
                  onClick={handleImageClick}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  <img
                    src={displayImages[selectedImage]}
                    alt={model_name}
                    className="w-full h-full object-contain transition-transform duration-200 select-none"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${dragPos.x / zoomLevel}px, ${dragPos.y / zoomLevel}px)`,
                      cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
                    }}
                    draggable={false}
                  />

                  {/* Zoom controls overlay */}
                  <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={(e) => { e.stopPropagation(); handleZoomOut(); }} className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-md transition" title="Zoom Out"><ZoomOut className="w-4 h-4 text-gray-700" /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleZoomIn(); }} className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-md transition" title="Zoom In"><ZoomIn className="w-4 h-4 text-gray-700" /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleFullscreen(); }} className="p-1.5 bg-white/90 hover:bg-white rounded-lg shadow-md transition" title="Fullscreen"><Maximize2 className="w-4 h-4 text-gray-700" /></button>
                  </div>

                  {/* Zoom indicator */}
                  {zoomLevel > 1 && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-xs rounded-md z-10">
                      {Math.round(zoomLevel * 100)}%
                    </div>
                  )}

                  {/* Navigation arrows */}
                  {displayImages.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i === 0 ? displayImages.length - 1 : i - 1); setZoomLevel(1); setDragPos({ x: 0, y: 0 }); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md z-10"><ChevronLeft className="w-4 h-4 md:w-5 md:h-5" /></button>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedImage(i => i === displayImages.length - 1 ? 0 : i + 1); setZoomLevel(1); setDragPos({ x: 0, y: 0 }); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 md:p-2 rounded-full shadow-md z-10"><ChevronRight className="w-4 h-4 md:w-5 md:h-5" /></button>
                    </>
                  )}

                  {/* Badges outside image */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {discount > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {displayImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {displayImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => { setSelectedImage(index); setZoomLevel(1); setDragPos({ x: 0, y: 0 }); }}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${selectedImage === index ? "border-cyan-600 shadow-md" : "border-gray-200 hover:border-gray-400"}`}
                      >
                        <img src={img} alt={`${model_name} - ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="lg:w-1/2 p-4 md:p-6 lg:border-l border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs md:text-sm text-cyan-600 font-semibold uppercase tracking-wide bg-cyan-50 px-2.5 py-0.5 rounded-md">{brand_name}</span>
                  {in_stock ? (
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-md font-medium"><Check className="w-3 h-3" /> In Stock</span>
                  ) : (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-medium">Out of Stock</span>
                  )}
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">{model_name}</h1>

                {/* Price */}
                <div className="bg-gradient-to-r from-gray-50 to-cyan-50/30 rounded-xl p-4 mb-4 border border-gray-100">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-extrabold text-gray-900">₹{formatIndianNumber(price)}</span>
                    {mrp && mrp > price && (
                      <>
                        <span className="text-base md:text-lg text-gray-400 line-through">₹{formatIndianNumber(mrp)}</span>
                        <span className="text-base md:text-lg text-green-600 font-bold">{discount}% off</span>
                      </>
                    )}
                  </div>
                  {mrp && mrp > price && (
                    <p className="text-xs text-green-700 mt-1 font-medium">You save ₹{formatIndianNumber(mrp - price)}</p>
                  )}
                </div>

                {/* Quick Specs Pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {processor && <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{processor} {generation && `(${generation})`}</span>}
                  {ram && <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{ram} RAM</span>}
                  {storage && <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{storage}</span>}
                  {screen_size && <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">{screen_size}</span>}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-gray-700 font-medium text-sm">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-100 transition"><Minus className="w-4 h-4" /></button>
                    <span className="px-4 py-2 font-semibold text-sm border-x border-gray-300 min-w-[40px] text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 hover:bg-gray-100 transition"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <button onClick={handleBuyNow} disabled={!in_stock} className="flex-1 min-w-[130px] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 px-5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl text-sm md:text-base">Buy Now</button>
                  <button onClick={handleAddToCart} disabled={!in_stock} className="flex-1 min-w-[130px] bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-3 px-5 rounded-xl font-semibold transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"><ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Add to Cart</button>
                </div>

                <div className="flex gap-2 mb-5">
                  <button onClick={handleToggleWishlist} className={`flex items-center gap-2 px-4 py-2.5 border-2 rounded-xl transition text-sm font-medium ${isInWishlist ? "border-red-400 text-red-500 bg-red-50" : "border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-500 hover:bg-red-50"}`}>
                    <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} /> {isInWishlist ? "Wishlisted" : "Wishlist"}
                  </button>
                  <div className="relative" ref={shareRef}>
                    <button onClick={() => setShowShareMenu(!showShareMenu)} className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl hover:border-cyan-400 hover:text-cyan-600 transition text-sm font-medium">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 w-48">
                        <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase border-b border-gray-100">Share via</p>
                        {shareOptions.map((opt) => (
                          <button key={opt.name} onClick={() => { opt.action(); setShowShareMenu(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 transition text-left text-sm text-gray-700">
                            <span className="text-base">{opt.icon}</span> {opt.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-cyan-600 flex-shrink-0">{f.icon}</span>
                      <div>
                        <span className="text-xs font-semibold text-gray-800 block leading-tight">{f.label}</span>
                        <span className="text-[10px] text-gray-500">{f.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs: Specifications / Description */}
            <div className="border-t border-gray-100">
              <div className="flex border-b border-gray-100">
                {[
                  { id: "specs", label: "Specifications" },
                  { id: "delivery", label: "Delivery & Returns" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3.5 text-sm font-semibold transition border-b-2 ${activeTab === tab.id ? "text-cyan-700 border-cyan-600 bg-cyan-50/30" : "text-gray-500 border-transparent hover:text-gray-700"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4 md:p-6">
                {activeTab === "specs" && (
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-0">
                    {specifications.map((spec, i) => (
                      <div key={i} className={`flex py-3 ${i < specifications.length - 1 ? "border-b border-gray-100" : ""}`}>
                        <span className="w-36 md:w-44 flex-shrink-0 text-sm font-medium text-gray-500">{spec.label}</span>
                        <span className="text-sm text-gray-900 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "delivery" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <Truck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-800 text-sm">Free Delivery</h4>
                        <p className="text-xs text-green-700 mt-1">Delivered within 3-5 business days across India. No extra charges.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-800 text-sm">7-Day Replacement</h4>
                        <p className="text-xs text-blue-700 mt-1">Not satisfied? Get a full replacement within 7 days, no questions asked.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <Shield className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-800 text-sm">2 Year Warranty</h4>
                        <p className="text-xs text-purple-700 mt-1">Comprehensive warranty covering all hardware defects and component failures.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 md:mt-12">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.product_id} product={item} viewMode="grid" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleItem;
