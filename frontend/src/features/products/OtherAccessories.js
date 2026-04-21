import React, { useState } from "react";
import BaseCard from "../../Components/card/BaseCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const laptops = [
  {
    id: 1,
    title: "Dell Inspiron 15",
    price: 54999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 2,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 3,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 4,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 5,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 6,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 7,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 8,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 9,
    title: "Dell Inspiron 15",
    price: 54999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 10,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 11,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 12,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 13,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 14,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 15,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 16,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 17,
    title: "Dell Inspiron 15",
    price: 54999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 18,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 19,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 20,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 21,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 22,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 23,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
  {
    id: 24,
    title: "HP Pavilion x360",
    price: 62999,
    images: [
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
      "/image/slide3B.jpg",
      "/image/slide1B.jpg",
      "/image/slide2B.jpg",
    ],
  },
];

const isAdmin = true;

const LaptopGrid = () => {
  const [visibleCount, setVisibleCount] = useState(16);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="">
      <div className=" px-2 md:px-[50px]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-6">
          {laptops.slice(0, visibleCount).map((laptop) => (
            <BaseCard
              key={laptop.id}
              title={laptop.title}
              price={laptop.price}
              images={laptop.images}
              isAdmin={isAdmin}
            />
          ))}
        </div>
        {visibleCount < laptops.length ? (
          <div className=" flex justify-center items-center md:mt-8">
            {" "}
            <button
              onClick={showMore}
              className="my-3 w-[120px] bg-[#2fb411] text-white py-[4px] md:py-2 rounded-md hover:bg-[#379522] transition duration-300"
            >
              See More →
            </button>
          </div>
        ) : (
          <div className="my-3 md:mt-8 w-[220px] text-center mx-auto bg-[#2b9912] text-white py-[4px] md:py-2 rounded-md hover:bg-[#2fb411] transition duration-300">
            You’re all caught up!
          </div>
        )}
      </div>
    </div>
  );
  // {/* ffac12 */}
};

export default LaptopGrid;
