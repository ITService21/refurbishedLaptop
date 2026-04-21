import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Truck, Shield } from "lucide-react";
import { formatIndianNumber } from "../../utils/methods";
import { addToCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";

// Helper: ensure images is always an array and filter out invalid blob URLs
const safeImages = (imgs) => {
  let arr = [];
  if (Array.isArray(imgs)) arr = imgs;
  else if (typeof imgs === "string") {
    try { arr = JSON.parse(imgs); } catch { arr = []; }
  }
  return arr.filter(u => u && !u.startsWith("blob:"));
};

const ProductCard = ({ product, viewMode = "grid", badge }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  
  const {
    product_id,
    model_name,
    brand_name,
    images: rawImages,
    price,
    mrp,
    ram,
    processor,
    storage,
    in_stock = true,
    generation,
  } = product;

  const images = safeImages(rawImages);
  const discount = mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const imageUrl = images?.[0] || "/image/slide1A.jpg";
  const isInWishlist = wishlistItems.some((item) => item.product_id === product_id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({
      product_id,
      model_name,
      brand_name,
      images,
      price,
      mrp,
      ram,
      processor,
      storage,
      quantity: 1,
    }));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      product_id,
      model_name,
      brand_name,
      images,
      price,
      mrp,
      ram,
      processor,
      storage,
    }));
  };

  // Grid View
  if (viewMode === "grid") {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
        <Link to={`/product/${product_id}`} className="block">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={model_name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
            />
            
            {/* Badges - positioned as small pills at bottom-left of image */}
            <div className="absolute bottom-2 left-2 flex gap-1">
              {badge && (
                <span className="bg-cyan-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {badge}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Out of Stock Overlay */}
            {!in_stock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Wishlist Button */}
            <button
              className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                isInWishlist 
                  ? "bg-red-50 text-red-500" 
                  : "bg-white text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-xs text-cyan-600 font-medium mb-1 uppercase tracking-wide">
              {brand_name}
            </p>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px] hover:text-cyan-600 transition">
              {model_name}
            </h3>

            {/* Specs */}
            <div className="flex flex-wrap gap-1 mb-3">
              {processor && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {processor}
                </span>
              )}
              {ram && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {ram}
                </span>
              )}
              {storage && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {storage}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                ₹{formatIndianNumber(price)}
              </span>
              {mrp && mrp > price && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{formatIndianNumber(mrp)}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-green-600" />
                <span className="hidden sm:inline">Free Delivery</span>
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">2 Yr Warranty</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            disabled={!in_stock}
            className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {in_stock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link
        to={`/product/${product_id}`}
        className="flex flex-col sm:flex-row"
      >
        {/* Image */}
        <div className="relative sm:w-64 aspect-[4/3] sm:aspect-auto overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={imageUrl}
            alt={model_name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {discount}% OFF
            </span>
          )}
          {badge && (
            <span className="absolute top-2 left-2 mt-7 bg-cyan-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            <p className="text-xs text-cyan-600 font-medium mb-1 uppercase tracking-wide">
              {brand_name}
            </p>
            <h3 className="text-base font-medium text-gray-800 mb-2 hover:text-cyan-600 transition">
              {model_name}
            </h3>

            {/* Specs */}
            <div className="flex flex-wrap gap-2 mb-3">
              {processor && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {processor} {generation && `(${generation})`}
                </span>
              )}
              {ram && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {ram} RAM
                </span>
              )}
              {storage && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {storage}
                </span>
              )}
            </div>

            {/* Features */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4 text-green-600" />
                Free Delivery
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-600" />
                2 Year Warranty
              </span>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ₹{formatIndianNumber(price)}
                </span>
                {mrp && mrp > price && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{formatIndianNumber(mrp)}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-sm text-green-600 font-medium">
                  Save ₹{formatIndianNumber(mrp - price)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleToggleWishlist}
                className={`p-2 border rounded-lg transition ${
                  isInWishlist 
                    ? "border-red-500 text-red-500 bg-red-50" 
                    : "border-gray-300 hover:border-red-500 hover:text-red-500"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!in_stock}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {in_stock ? "Add to Cart" : "Out of Stock"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
