import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Laptop, ArrowRight, Monitor, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { filterOptionApi } from "../../../api/filterOptionApi";

const CATEGORY_ICONS = {
  brand: Monitor,
  processor: Cpu,
  ram: MemoryStick,
  storage: HardDrive,
};

const CATEGORY_LABELS = {
  brands: "By Brand",
  processors: "By Processor",
  ram: "By RAM",
  storage: "By Storage",
};

const ProductsDropdown = ({ onClose }) => {
  const [filterData, setFilterData] = useState({ brands: [], processors: [], ram: [], storage: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await filterOptionApi.getAll();
        if (res?.success && res.data) {
          setFilterData({
            brands: res.data.brands || [],
            processors: res.data.processors || [],
            ram: res.data.ram || [],
            storage: res.data.storage || [],
          });
        }
      } catch {
        // fallback to empty
      } finally {
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const sections = [
    { key: "brands", filterParam: "brand" },
    { key: "processors", filterParam: "processor" },
    { key: "ram", filterParam: "ram" },
    { key: "storage", filterParam: "storage" },
  ];

  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] max-w-[90vw] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50"
      style={{ animation: "megaDropdownFadeIn 0.2s ease-out" }}
    >
      {/* Header */}
      <div className="px-5 py-3 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-gray-100 flex items-center justify-between">
        <p className="text-xs font-semibold text-cyan-700 uppercase tracking-wider flex items-center gap-1.5">
          <Laptop className="w-3.5 h-3.5" /> Browse Products
        </p>
        <Link
          to="/products"
          onClick={onClose}
          className="text-xs font-medium text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {loading ? (
        <div className="p-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-cyan-600" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-gray-100">
          {sections.map(({ key, filterParam }) => {
            const items = filterData[key] || [];
            const Icon = CATEGORY_ICONS[key === "brands" ? "brand" : key === "processors" ? "processor" : key] || Monitor;
            return (
              <div key={key} className="p-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5 px-2">
                  <Icon className="w-3 h-3" />
                  {CATEGORY_LABELS[key]}
                </p>
                <div className="space-y-0.5">
                  {items.slice(0, 8).map((item) => (
                    <Link
                      key={item.id || item.value}
                      to={`/products?${filterParam}=${encodeURIComponent(item.value)}`}
                      onClick={onClose}
                      className="block px-2 py-1.5 text-sm text-gray-700 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors truncate"
                    >
                      {item.value}
                    </Link>
                  ))}
                  {items.length > 8 && (
                    <Link
                      to={`/products`}
                      onClick={onClose}
                      className="block px-2 py-1.5 text-xs text-cyan-600 font-medium hover:text-cyan-700 transition"
                    >
                      +{items.length - 8} more
                    </Link>
                  )}
                  {items.length === 0 && (
                    <p className="px-2 py-1.5 text-xs text-gray-400">None yet</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer with categories */}
      <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {["Our Latest Collection", "Best Sellers", "New Arrivals"].map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              onClick={onClose}
              className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-full hover:bg-cyan-200 transition font-medium"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes megaDropdownFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProductsDropdown;
