import React, { useState } from "react";
import { Heart } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";

const LaptopCard = ({
  title,
  price,
  images,
  isAdmin,
  ram = "8 GB",
  processor = "i6",
  storage = "512 GB",
  storageType = "SSD",
}) => {
  const [inWishlist, setInWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleWishlist = () => setInWishlist(!inWishlist);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative bg-white rounded-[5px] p-4 pb-5 pt-8 group hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {/* Admin Edit Icon */}
      {isAdmin && (
        <div className="absolute top-3 left-3 text-gray-500 hover:text-blue-600 cursor-pointer z-10">
          <i className="fas fa-edit text-2xl"></i>
        </div>
      )}

      {/* Wishlist Icon */}
      <div
        className="absolute top-1 right-3 text-[#a5a5a5] cursor-pointer z-10 -mr-2 mt-2"
        onClick={toggleWishlist}
      >
        {inWishlist ? (
          <Heart className="w-5 md:w-6  h-5 md:h-6 stroke-[1.5] text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-5 md:w-6  h-5 md:h-6 stroke-[1.5] text-[#a5a5a5]" />
        )}
      </div>

      {/* Image Carousel */}
      <div className=" relative w-full aspect-[40/32] overflow-hidden pb-[20px] mt-3">
        <img
          src={images[currentImageIndex]}
          alt={title}
          className="w-full h-full rounded-sm object-cover transition duration-300"
        />

        {images?.length > 1 && (
          <>
            {/* Left Button */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 text-black px-1 py-[1px] md:px-2 md:py-[2px] rounded-full hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ‹
            </button>

            {/* Right Button */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 text-black px-1 py-[1px] md:px-2 md:py-[2px] rounded-full hover:bg-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              ›
            </button>

            {/* Dots Indicator (max 4 shown) */}
            <div className="relative flex items-center justify-center space-x-[5px] mt-[6px] mx-auto">
              {images?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-[6px] h-[6px] rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-[#2fb411]"
                      : "bg-[#d6d6d6]"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {/* Animated Bottom Section */}
      <div className="relative overflow-hidden h-[80px] md:h-[90px] z-20">
        <div className="absolute bottom-0 left-0 w-full transition-transform duration-300 transform translate-y-[35%] group-hover:translate-y-[1%]">
          {/* Title */}
          <h3 className="text-[14px] md:text-[18px] font-semibold text-gray-800 mt-[10px] px-1  z-20">
            {title}
          </h3>

          {/* Price */}
          <p className="text-green-600  mb-[2px] text-[12px] md:text-[12px] lg:text-[15px] font-medium px-1">
            ₹ {price?.toLocaleString()}
          </p>
          {/* others */}
          <div className="flex text-nowrap gap-[5px] px-1 font-medium text-green-600">
            <span className="bg-gray-200 text-gray-800 px-1 py-[2px] rounded-[3px] md:rounded-[6px] text-[10px] md:text-[12px]">
              {ram}
            </span>
            <span className="bg-slate-200 text-slate-900 px-1 py-[2px] rounded-[3px] md:rounded-[6px] text-[10px] md:text-[12px]">
              {processor}
            </span>
            <span className="bg-zinc-200 text-zinc-800 px-1 py-[2px] rounded-[3px] md:rounded-[6px] text-[10px] md:text-[12px]">
              {storage}{" "}{storageType}
            </span>
            {/* <span className="bg-neutral-200 text-neutral-900 px-1 py-[2px] rounded-[3px]  md:rounded-[6px] text-[10px] md:text-[12px]">
              {storageType}
            </span> */}
          </div>

          {/* Button */}
          <button className="flex items-center text-[12px] justify-center gap-[6px] mt-2 w-full bg-[#2fb411] text-white py-[4px] md:py-2 rounded-md hover:bg-[#379522] transition duration-300">
          <FaCartPlus /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCard;
