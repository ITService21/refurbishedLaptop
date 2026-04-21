import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Heart, User, Search, X, Sparkles } from "lucide-react";

import CompanyLogo from "../common/ComapnyIcon";
import { HamburgerButton } from "./HamburgerButton/HamburgerButton";
import { MobileMenu } from "./MobileMenu/MobileMenu";
import { NavbarLinks } from "../../data/navbar-links.js";
import { selectCartItemCount } from "../../redux/cartSlice";
import { selectWishlistCount } from "../../redux/wishlistSlice";
import { selectIsLoggedIn } from "../../redux/loginSlice";
import ProfileDropdown from "./ProfileDropdown";
import AboutDropdown from "./dropdowns/AboutDropdown";
import ProductsDropdown from "./dropdowns/ProductsDropdown";
import { productApi } from "../../api/productApi";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const searchRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const navRef = useRef(null);

  const cartCount = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setShowSearch(false);
  }, [location]);

  // Click outside to close dropdown and search bar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [defaultSuggestions] = useState([
    { type: "quick", label: "Latest Laptops", link: "/products?sortBy=createdAt&sortOrder=DESC" },
    { type: "quick", label: "Under ₹20,000", link: "/products?maxPrice=20000" },
    { type: "quick", label: "Under ₹30,000", link: "/products?maxPrice=30000" },
    { type: "quick", label: "Dell Laptops", link: "/products?brand=Dell" },
    { type: "quick", label: "HP Laptops", link: "/products?brand=HP" },
    { type: "quick", label: "MacBook", link: "/products?brand=Apple" },
    { type: "quick", label: "Intel i5 Laptops", link: "/products?processor=Intel+Core+i5" },
    { type: "quick", label: "Intel i7 Laptops", link: "/products?processor=Intel+Core+i7" },
    { type: "quick", label: "8 GB RAM", link: "/products?ram=8+GB" },
    { type: "quick", label: "Best Sellers", link: "/products?category=Best+Sellers" },
  ]);

  // Debounced search suggestions
  const fetchSuggestions = useCallback(async (query) => {
    if (query.trim().length < 1) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await productApi.suggest(query);
      if (res?.success && res.data) {
        setSuggestions(res.data.slice(0, 12));
      }
    } catch {
      setSuggestions([]);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(searchQuery);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setShowSearch(false);
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false);
    setShowSearch(false);
    setSearchQuery("");
    navigate(`/product/${product.product_id}`);
  };

  const handleDropdownEnter = (name) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50" ref={navRef}>
      {/* Main Navbar */}
      <nav className="flex items-center h-[60px] px-3 md:px-4 bg-gradient-to-r from-cyan-600 to-teal-600 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Mobile: Hamburger on Left */}
          <div className="md:hidden">
            <HamburgerButton
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none">
            <CompanyLogo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <ul className="flex px-1 lg:px-4">
              {NavbarLinks?.map((menuLink) => (
                <div
                  className="relative"
                  key={menuLink?.name}
                  onMouseEnter={() => menuLink.dropdownType && handleDropdownEnter(menuLink.name)}
                  onMouseLeave={() => menuLink.dropdownType && handleDropdownLeave()}
                >
                  <li>
                    <Link
                      to={menuLink?.link}
                      className={`flex items-center px-2 py-1 rounded-md font-semibold cursor-pointer lg:px-3 text-white hover:bg-white/10 text-sm lg:text-base transition ${menuLink?.class || ""}`}
                      onClick={() => !menuLink.dropdownType && setActiveDropdown(null)}
                    >
                      {menuLink?.name}
                      {menuLink?.dropdownType && (
                        <svg
                          className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === menuLink.name ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>
                  </li>

                  {/* About Us Dropdown */}
                  {menuLink.dropdownType === "about" && activeDropdown === menuLink.name && (
                    <AboutDropdown
                      subLinks={menuLink.subLinks}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}

                  {/* Products Dropdown */}
                  {menuLink.dropdownType === "products" && activeDropdown === menuLink.name && (
                    <ProductsDropdown onClose={() => setActiveDropdown(null)} />
                  )}
                </div>
              ))}
            </ul>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button */}
            <button
              onClick={() => { setShowSearch(!showSearch); setActiveDropdown(null); }}
              className={`p-2 rounded-full transition hidden md:flex ${showSearch ? "bg-white/20 text-white" : "text-white hover:bg-white/10"}`}
              aria-label="Search"
            >
              {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition hidden md:flex"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:bg-white/10 rounded-full transition"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* User/Profile */}
            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 bg-white/95 text-cyan-700 px-4 py-2 rounded-full font-medium hover:bg-white transition text-sm shadow-sm"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Aesthetic Search Bar (Desktop) */}
      {showSearch && (
        <div className="hidden md:block bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
          <div className="max-w-3xl mx-auto py-4 px-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur-lg group-focus-within:blur-xl transition-all opacity-0 group-focus-within:opacity-100" />
                <div className="relative flex items-center bg-gray-50/80 border border-gray-200 rounded-2xl focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-100 transition-all">
                  <Search className="ml-5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder="Search laptops, brands, processors..."
                    className="w-full bg-transparent px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none text-[15px]"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => { setSearchQuery(""); setSuggestions([]); }}
                      className="mr-2 p-1 text-gray-400 hover:text-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="mr-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                  {suggestions.length > 0 ? (
                    <>
                      <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                          Suggestions
                        </p>
                      </div>
                      {suggestions.map((product) => (
                        <button
                          key={product.product_id}
                          type="button"
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50/60 transition-colors text-left group"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200/50">
                            <img
                              src={(() => {
                                const imgs = product.images;
                                let arr = Array.isArray(imgs) ? imgs : (typeof imgs === "string" ? (() => { try { return JSON.parse(imgs); } catch { return []; } })() : []);
                                arr = arr.filter(u => u && !u.startsWith("blob:"));
                                return arr[0] || "/image/slide1A.jpg";
                              })()}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate group-hover:text-cyan-700 transition-colors">
                              {product.model_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {product.brand_name}
                              {product.processor ? ` · ${product.processor}` : ""}
                              {product.ram ? ` · ${product.ram}` : ""}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                            ₹{product.price?.toLocaleString("en-IN")}
                          </span>
                        </button>
                      ))}
                      <button
                        type="submit"
                        className="w-full py-3 text-sm font-medium text-cyan-600 hover:bg-cyan-50 transition-colors border-t border-gray-100"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </>
                  ) : searchQuery.length > 0 ? (
                    <div className="px-4 py-6 text-center">
                      <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
                      <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                          Popular Searches
                        </p>
                      </div>
                      {defaultSuggestions.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => { setShowSuggestions(false); setShowSearch(false); navigate(item.link); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cyan-50/60 transition-colors text-left group"
                        >
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-cyan-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{item.label}</span>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu
        menuLinks={NavbarLinks}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Navbar;
