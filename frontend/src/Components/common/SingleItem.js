import React, { useState } from "react";
import { formatIndianNumber } from "../../utils/methods";
import { FaCartPlus } from "react-icons/fa6";
import ImageCard from "../card/ImageCard";

const LaptopSingle = ({ item }) => {
  const {
    images = [],
    title,
    rating,
    reviews,
    purchaseInfo,
    price,
    mrp,
    discount,
    emiInfo,
    deliveryInfo,
    serviceInfo,
    availability,
    modelNumber,
    specifications,
  } = item;
  return (
    <div className="flex flex-col md:flex-row border rounded-[5px] shadow-md p-4 mb-6 bg-white">
      <div className="md:w-1/4 flex justify-center items-center mb-4 md:mb-0 bg-[#f3f3f3] rounded-[5px]">
        <ImageCard images={images} />
      </div>
      <div className="md:w-2/3 md:pl-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-orange-500 transition-colors duration-200">
          {title}
        </h2>

        {rating && reviews && (
          <p className="text-sm text-[#dea229] font-semibold  mb-1">
            ⭐ {rating} out of 5 stars ({reviews} reviews)
          </p>
        )}
        {purchaseInfo && (
          <p className="text-sm text-gray-600 mb-1 font-semibold">
            {purchaseInfo}
          </p>
        )}
        <div className="flex gap-2 justify-start items-center">
          {" "}
          <p className="text-lg font-bold text-green-600 mb-1">
            ₹{formatIndianNumber(price)}
          </p>
          <p className="text-sm text-gray-500 mb-1 line-through">
            M.R.P: ₹{formatIndianNumber(mrp)}
          </p>
          <p className="text-sm text-red-500 mb-1">({discount} off)</p>
        </div>
        {/* <p className="text-sm text-gray-600 mb-1">{emiInfo}</p> */}
        {/* <p className="text-sm text-gray-600 mb-1">{deliveryInfo}</p> */}
        {serviceInfo && (
          <p className="text-sm text-gray-600 mb-1">{serviceInfo}</p>
        )}
        {/* <div className="mb-1">
          {" "}
          <span className="text-sm  font-semibold bg-[#f56403] text-white px-3 py-1 text rounded-[5px]">
            {availability}
          </span>
        </div> */}
        {modelNumber && (
          <p className="text-sm text-gray-600 mb-2">Model: {modelNumber}</p>
        )}
        <div className="flex flex-row flex-wrap text-nowrap gap-[6px] text-[12px] text-[#ffffff] font-semibold mb-4">
          {specifications?.map((spec, index) => (
            <div key={index} className="flex justify-center items-center gap-2">
              {/* <div className="w-2 h-2 bg-[#c35c0d] rounded-full flex-shrink-0"></div> */}
              <div className="flex-1 px-2 py-1 bg-[#909090] rounded-md">
                {spec}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 -mt-3">
          <button className="flex items-center text-[12px] justify-center gap-[6px] mt-2 bg-[#2fb411] text-white py-[4px] md:py-2 rounded-md hover:bg-[#379522] transition duration-300 w-[200px]">
            <FaCartPlus /> Buy Now
          </button>
          <button className="flex items-center text-[12px] justify-center gap-[6px] mt-2 w-[200px] bg-[#2fb411] text-white py-[4px] md:py-2 rounded-md hover:bg-[#379522] transition duration-300">
            <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopSingle;
