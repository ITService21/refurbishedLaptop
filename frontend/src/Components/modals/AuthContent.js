import { useState } from "react";
import { Input, Loader } from "../common/Elements";
import { toast } from "react-toastify";
import { textBeautifyFunction } from "../../utils/methods";
import Cookies from "js-cookie";
import { loginRegisterAPI } from "../../routes/auth";
import { useDispatch } from "react-redux";
import { setLogin, logout, toggleLoginPopup } from "../../redux/loginSlice";

export default function AuthContent({ handleLoginModalClose = () => {} }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    role: "",
    emailLogin: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});

  const resetAll = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
      role: "",
    });
    setErrors({});
  };

  const validateField = (name, value) => {
    let error = "";
    if (isLogin) {
      switch (name) {
        case "emailLogin":
          if (!value) error = "Email or Phone is required.";
          else if (
            !(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
              /^\d{10}$/.test(value)
            )
          )
            error = "Enter a valid email or 10-digit phone number.";
          break;
        case "phone":
          if (!isLogin) {
            if (!value) error = "Phone number is required.";
            else if (!/^\d{10}$/.test(value))
              error = "Phone must be 10 digits.";
          }
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case "first_name":
          if (!isLogin && !value) error = "First name is required.";
          break;

        case "email":
          if (!value) error = "Email required.";
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
            error = "Enter a valid email.";
          break;

        case "emailLogin":
          if (!value) error = "Email or Phone is required.";
          else if (
            !(
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
              /^\d{10}$/.test(value)
            )
          )
            error = "Enter a valid email or 10-digit phone number.";
          break;
        case "phone":
          if (!isLogin) {
            if (!value) error = "Phone number is required.";
            else if (!/^\d{10}$/.test(value))
              error = "Phone must be 10 digits.";
          }
          break;

        case "password":
          if (!value) error = "Password is required.";
          else if (value.length < 6)
            error = "Password must be at least 6 characters.";
          break;

        case "confirmpassword":
          if (!isLogin) {
            if (!value) error = "Confirm your password.";
            else if (value !== form.password) error = "Passwords do not match.";
          }
          break;

        default:
          break;
      }
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      const errorMsg = validateField(name, value);
      if (errorMsg) newErrors[name] = errorMsg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;
    const url = isLogin ? `/auth/login` : `/auth/register`;
    const payload = isLogin
      ? {
          email_or_phone: form.emailLogin?.trim(),
          password: form.password,
        }
      : {
          first_name: form.first_name?.trim(),
          last_name: form.last_name?.trim(),
          email: form.email?.trim(),
          phone: form.phone?.trim(),
          password: form.password,
          role: "user",
        };

    try {
      const res = await loginRegisterAPI(url, payload);
      if (!res || !res.ok) throw new Error(res?.message || "Something went wrong");

      if (isLogin) {
        const token = res?.data?.token;
        if (!token) throw new Error("Token not received!");
        dispatch(setLogin(token));
        toast.success("Login successful!");
        setTimeout(() => {
          handleLoginModalClose();
          resetAll();
        }, 200);
      } else {
        toast.success("Registration successful!");
        setIsLogin(true);
        resetAll();
      }
    } catch (err) {
      toast.error(err.message || err.error?.message || "Something went wrong");
    }
  };

  const handleToggleMode = () => {
    resetAll();
    setIsLoading(true);
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setIsLoading(false);
    }, 500);
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon.");
  };

  return (
    <div className="w-[400px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <div className="mx-2">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {!isLogin && (
                <>
                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="first_name"
                    >
                      First Name
                    </label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={textBeautifyFunction(form.first_name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="John"
                    />
                    {errors.first_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block mb-1 font-medium text-gray-700"
                      htmlFor="last_name"
                    >
                      Last Name (Optional)
                    </label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={textBeautifyFunction(form.last_name)}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                </>
              )}

              {!isLogin ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.email?.toLowerCase()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="emailLogin"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email Address or Phone
                  </label>
                  <Input
                    id="emailLogin"
                    name="emailLogin"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={form.emailLogin?.toLowerCase()}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.emailLogin && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emailLogin}
                    </p>
                  )}
                </div>
              )}

              {!isLogin && (
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Phone No
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="1234567890"
                    required
                    value={String(form.phone)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="password"
                  className="block mb-1 font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                    value={form.confirmpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmpassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmpassword}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-[100px]">
                <button
                  type="submit"
                  className="w-full bg-blue-600 mt-4 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="my-4 text-center text-gray-500">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              {isLogin ? "Login with Google" : "Sign up with Google"}
            </button>

            <p className="text-sm text-center text-gray-600 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={handleToggleMode}
                className="text-blue-600 ml-1 font-medium hover:underline"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
