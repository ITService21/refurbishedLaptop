import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "../../config/constants";

function ComapnyIcon() {
  return (
    <Link to="/home" className="flex items-center gap-2 no-underline">
      <img
        src="/icons/Logo-01 1.svg"
        alt={COMPANY.name}
        className="h-8 md:h-9 w-auto"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <span
        className="hidden items-center text-white font-bold text-lg tracking-tight"
        style={{ display: "none" }}
      >
        {COMPANY.name}
      </span>
    </Link>
  );
}

export default ComapnyIcon;
