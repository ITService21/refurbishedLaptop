import React, { useState, useEffect } from "react";

const CustomCarousel = ({
  items = [],
  renderItem,
  paddingX = 30, // horizontal padding around all items container in px
  itemPaddingX = 10, // horizontal padding inside each item in px
  buttonSize = 32, // left/right button size in px
  buttonColor = "#2fb411", // green button color
  breakpoints = {
    // responsive slides per view config
    desktop: { minWidth: 1024, slidesPerView: 5 },
    tablet: { minWidth: 768, slidesPerView: 3 },
    mobile: { minWidth: 0, slidesPerView: 2 },
  },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(2);

  // Compute slidesPerView based on window width and breakpoints
  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width >= breakpoints.desktop.minWidth)
      setSlidesPerView(breakpoints.desktop.slidesPerView);
    else if (width >= breakpoints.tablet.minWidth)
      setSlidesPerView(breakpoints.tablet.slidesPerView);
    else setSlidesPerView(breakpoints.mobile.slidesPerView);
  };

  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(items.length - slidesPerView, 0);

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  // Reset currentIndex if items or slidesPerView change and currentIndex is out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const slideWidthPercent = 100 / slidesPerView;

  return (
    <div
      className="relative"
      style={{ paddingLeft: paddingX, paddingRight: paddingX }}
    >
      {/* Left nav button */}
      <button
        onClick={prev}
        disabled={currentIndex === 0}
        aria-label="Previous"
        className="absolute top-1/2 rounded-full shadow-lg flex items-center justify-center text-white disabled:opacity-40"
        style={{
          left: 12,
          width: buttonSize,
          height: buttonSize,
          backgroundColor: buttonColor,
          transform: `translate(0, -50%)`,
          zIndex: 10,
          cursor: currentIndex === 0 ? "not-allowed" : "pointer",
        }}
      >
        &#8592;
      </button>

      {/* Right nav button */}
      <button
        onClick={next}
        disabled={currentIndex === maxIndex}
        aria-label="Next"
        className="absolute top-1/2 rounded-full shadow-lg flex items-center justify-center text-white disabled:opacity-40"
        style={{
          right: 12,
          width: buttonSize,
          height: buttonSize,
          backgroundColor: buttonColor,
          transform: `translate(0, -50%)`,
          zIndex: 10,
          cursor: currentIndex === maxIndex ? "not-allowed" : "pointer",
        }}
      >
        &#8594;
      </button>

      {/* Carousel viewport */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * slideWidthPercent}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{
                width: `${slideWidthPercent}%`,
                paddingLeft: itemPaddingX,
                paddingRight: itemPaddingX,
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      {/* Indicator container */}
      <div
        className="relative mt-10 mx-auto"
        style={{
          width: 200,
          height: 6,
          backgroundColor: "#CBD5E0",
          borderRadius: 3,
        }}
      >
        {/* Filled progress bar */}
        <div
          className="absolute top-0 left-0 h-full bg-green-600 rounded-l"
          style={{
            width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
            transition: "width 0.3s ease-in-out",
            borderTopRightRadius: currentIndex === maxIndex ? 3 : 0,
            borderBottomRightRadius: currentIndex === maxIndex ? 3 : 0,
          }}
        />

        {/* Clickable segments */}
        <div className="absolute inset-0 flex ">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="flex-grow"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                // Prevent highlight or focus outlines messing with UI:
                outline: "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
