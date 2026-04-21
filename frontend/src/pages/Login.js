import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Laptop } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import SEOHead from "../Components/SEO/SEOHead";
import { authApi } from "../Components/common/apiWrapper";
import { COOKIES, COMPANY } from "../config/constants";
import { useDispatch } from "react-redux";
import { userData } from "../redux/loginSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Backend expects email_or_phone, not email
      const loginPayload = {
        email_or_phone: formData.email,
        password: formData.password
      };
      const response = await authApi.login(loginPayload);
      if (response?.success && response.data?.token) {
        // Save token to cookie
        Cookies.set(COOKIES.authToken, response.data.token, { expires: 7 });

        // Decode and save user data
        const decoded = jwtDecode(response.data.token);
        dispatch(userData(decoded));

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Login to Your Account" noIndex={true} />

      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center px-4 py-12 mt-[60px]">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <Laptop className="w-10 h-10 text-cyan-600" />
              <span className="text-2xl font-bold text-gray-800">
                Laptop<span className="text-cyan-600">Refurbished</span>
              </span>
            </Link>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Sign in to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pl-11 pr-4 py-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full pl-11 pr-12 py-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-cyan-600 hover:text-cyan-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <Link
              to="/register"
              className="block w-full text-center py-3 border-2 border-cyan-600 text-cyan-600 rounded-lg font-medium hover:bg-cyan-50 transition"
            >
              Create Account
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms-conditions" className="text-cyan-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-cyan-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;



