import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutDropdown = ({ subLinks, onClose }) => {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
      style={{ animation: "dropdownFadeIn 0.2s ease-out" }}
    >
      {/* Glassmorphism header */}
      <div className="px-5 py-3 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">About Us</p>
      </div>

      <div className="p-2">
        {subLinks?.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.link}
              onClick={onClose}
              className="flex items-start gap-4 px-4 py-3.5 rounded-xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-teal-50 transition-all group"
            >
              <div className="mt-0.5 w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-200 group-hover:to-teal-200 transition-all shadow-sm">
                {Icon && <Icon className="w-5 h-5 text-cyan-700" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-cyan-700 transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-cyan-500 mt-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100">
        <Link
          to="/about-us"
          onClick={onClose}
          className="text-xs font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition"
        >
          View all about us <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutDropdown;
