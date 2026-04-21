import React, { useState } from "react";
import { Heart } from "lucide-react";
import { FaCartPlus } from "react-icons/fa6";

const ImageCard = ({images = []}) => {
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
    <div className="relative  rounded-[5px] pt-8 group  transition-shadow duration-300 overflow-hidden">

      {/* Image Carousel */}
      <div className="relative w-full aspect-[40/32] overflow-hidden pb-[20px] mt-3">
        <img
          src={images[currentImageIndex]}
          alt={"Item Image"}
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
    </div>
  );
};

export default ImageCard;
