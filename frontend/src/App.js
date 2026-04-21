import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import "./styles/Class.css";
import Products from "./pages/Products";
import SingleItem from "./pages/SingleItem.js";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setLogin, userData } from "./redux/loginSlice";
import AdminPortal from "./features/admin/AdminPortal";
import AdminRouteGuard from "./features/admin/AdminRouteGuard";
import { WhatsAppIcon } from "./Components/common/Elements";
import { COMPANY } from "./config/constants";

// Lazy load additional pages
const ShippingPolicy = React.lazy(() => import("./pages/ShippingPolicy"));
const ReturnPolicy = React.lazy(() => import("./pages/ReturnPolicy"));
const WarrantyPolicy = React.lazy(() => import("./pages/WarrantyPolicy"));
const TrackOrder = React.lazy(() => import("./pages/TrackOrder"));
const Cart = React.lazy(() => import("./pages/Cart"));
const Checkout = React.lazy(() => import("./pages/Checkout"));
const Account = React.lazy(() => import("./pages/Account"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const OrderSuccess = React.lazy(() => import("./pages/OrderSuccess"));

// About sub-pages
const WhoWeAre = React.lazy(() => import("./pages/about/WhoWeAre"));
const MissionVision = React.lazy(() => import("./pages/about/MissionVision"));
const OurStore = React.lazy(() => import("./pages/about/OurStore"));
const WhyChooseUs = React.lazy(() => import("./pages/about/WhyChooseUs"));

// Loading component for suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
  </div>
);

// ScrollToTop component: scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get("refurbLapToken_CID_200");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(userData(decoded));
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("refurbLapToken_CID_200");
      }
    }
  }, [token, dispatch]);

  const reduxState = useSelector((state) => state);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<SingleItem />} />
              <Route path="/single-product" element={<SingleItem />} />
              
              {/* Information Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/about/who-we-are" element={<WhoWeAre />} />
              <Route path="/about/mission-vision" element={<MissionVision />} />
              <Route path="/about/our-store" element={<OurStore />} />
              <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              
              {/* Policy Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/warranty-policy" element={<WarrantyPolicy />} />
              <Route path="/cancellation-policy" element={<ReturnPolicy />} />
              
              {/* E-commerce Pages */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/track-order" element={<TrackOrder />} />
              
              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account" element={<Account />} />
              <Route path="/account/*" element={<Account />} />
              
              {/* Admin Pages - Protected */}
              <Route path="/admin-portal/*" element={<AdminRouteGuard><AdminPortal /></AdminRouteGuard>} />
              
              {/* 404 Page */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center min-h-[60vh] mt-[60px]">
                    <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                      Page Not Found
                    </h2>
                    <p className="text-gray-500 mb-6">
                      The page you're looking for doesn't exist.
                    </p>
                    <a
                      href="/"
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                      Go to Homepage
                    </a>
                  </div>
                }
              />
            </Routes>
          </React.Suspense>
        </main>

        <Footer />
        
        {/* WhatsApp Floating Button */}
        <WhatsAppIcon phoneNumber={COMPANY.whatsapp} />
      </div>
    </Router>
  );
}

export default App;
