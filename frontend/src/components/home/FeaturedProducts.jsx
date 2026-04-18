"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../shared/ProductCard";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products/featured`;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get(API);
        setFeaturedProducts(res?.data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [API]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-20">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[300px] rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Products */}
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && featuredProducts.length === 0 && (
          <p className="text-center text-gray-500">
            No featured products available
          </p>
        )}
      </div>
    </section>
  );
}
