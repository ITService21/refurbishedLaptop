import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserData } from "../../redux/loginSlice";
import { ShieldAlert } from "lucide-react";

const AdminRouteGuard = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userData = useSelector(selectUserData);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mt-[60px]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            This area is restricted to administrators only. If you believe this is an error,
            please contact the system administrator.
          </p>
          <a
            href="/home"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRouteGuard;
