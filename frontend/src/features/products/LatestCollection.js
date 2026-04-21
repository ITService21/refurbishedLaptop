import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../Components/card/ProductCard";
import { productApi } from "../../Components/common/apiWrapper";
import { Loader } from "../../Components/common/Elements";
import { ChevronLeft, ChevronRight } from "lucide-react";

const LatestCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productApi.getFeatured(12);
        if (response?.success && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
        // Fallback to general products
        try {
          const fallback = await productApi.getAll({ limit: 12 });
          if (fallback?.success) {
            setProducts(fallback.data?.products || []);
          }
        } catch (e) {
          console.error("Fallback also failed:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No products available at the moment.</p>
        <Link to="/products" className="text-cyan-600 hover:underline mt-2 inline-block">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-[50px] pb-8 relative">
      {/* Custom Navigation Buttons */}
      <button className="swiper-prev-latest absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition hidden md:flex">
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button className="swiper-next-latest absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition hidden md:flex">
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".swiper-prev-latest",
          nextEl: ".swiper-next-latest",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!px-2 md:!px-12"
      >
        {products.map((product) => (
          <SwiperSlide key={product.product_id}>
            <ProductCard
              product={product}
              viewMode="grid"
              badge="Featured"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-8">
        <Link 
          to="/products" 
          className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default LatestCollection;
