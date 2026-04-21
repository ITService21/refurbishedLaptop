import React from "react";

const StatsCard = ({ title, value, icon: Icon, color = "text-cyan-600", bgColor = "bg-cyan-50", trend, trendUp }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trendUp ? "text-green-600" : "text-red-500"}`}>
              {trendUp ? "+" : ""}{trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`${bgColor} ${color} p-2.5 rounded-xl flex-shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
