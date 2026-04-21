import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, X, Plus } from "lucide-react";

const SearchableSelect = ({
  label,
  options = [],
  value,
  onChange,
  onCreateNew,
  placeholder = "Select or type...",
  allowNew = false,
  className = "",
  required = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(searchTerm.toLowerCase())),
    [options, searchTerm]
  );

  const showCreate = allowNew && searchTerm && !options.some((o) => o.toLowerCase() === searchTerm.toLowerCase());

  const handleSelect = (opt) => {
    onChange(opt);
    setSearchTerm(opt);
    setIsOpen(false);
  };

  const handleCreate = () => {
    if (onCreateNew) onCreateNew(searchTerm);
    onChange(searchTerm);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className="relative border border-gray-300 rounded-lg bg-white cursor-pointer flex items-center hover:border-gray-400 transition"
        onClick={() => setIsOpen(true)}
      >
        <input
          type="text"
          className="w-full p-2.5 pr-16 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder={placeholder}
          value={isOpen ? searchTerm : value || ""}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            setIsOpen(true);
            setSearchTerm("");
          }}
        />
        {value && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(""); setSearchTerm(""); }}
            className="absolute right-8 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <ChevronDown className={`absolute right-3 w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <div
                key={opt}
                className={`px-3 py-2 text-sm cursor-pointer transition ${
                  value === opt ? "bg-cyan-50 text-cyan-700 font-medium" : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-400">No results found</div>
          )}
          {showCreate && (
            <div
              className="px-3 py-2 text-sm text-cyan-600 cursor-pointer hover:bg-cyan-50 border-t flex items-center gap-1"
              onClick={handleCreate}
            >
              <Plus className="w-3.5 h-3.5" /> Create &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
