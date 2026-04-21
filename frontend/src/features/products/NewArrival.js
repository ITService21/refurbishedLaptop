import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/card/ProductCard";
import { productApi } from "../../Components/common/apiWrapper";
import { Loader } from "../../Components/common/Elements";

const NewArrival = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await productApi.getNewArrivals(16);
        if (response?.success && response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        // Fallback to general products if new arrivals endpoint fails
        try {
          const fallback = await productApi.getAll({ limit: 16, sortBy: "createdAt", sortOrder: "DESC" });
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

    fetchNewArrivals();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

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
        <p className="text-gray-500">No new arrivals available at the moment.</p>
        <Link to="/products" className="text-cyan-600 hover:underline mt-2 inline-block">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-[50px] pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            viewMode="grid"
            badge="New"
          />
        ))}
      </div>
      
      {visibleCount < products.length ? (
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={showMore}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            See More →
          </button>
        </div>
      ) : products.length > 8 && (
        <div className="text-center mt-8">
          <Link 
            to="/products" 
            className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewArrival;
