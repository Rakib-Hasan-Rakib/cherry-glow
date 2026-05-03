"use client";

import HeroImageSlider from "@/components/products/HeroImageSlider";
import ProductCard from "@/components/products/ProductCard";
import SkeletonCard from "@/components/products/SkeletonCard";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const CATEGORIES = [
  "All",
  "CLEANSER",
  "TONER",
  "SERUM",
  "EYE CARE",
  "MOISTURIZER",
  "SUNSCREEN",
  "MASK",
  "OIL",
];

export default function ProductsPage() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [category, setCategory] = useState("All");

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products`;

  /* ---------------- Get category from URL (SAFE) ---------------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat) setCategory(cat);
    }
  }, []);

  /* ---------------- Debounce ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ---------------- Fetch ---------------- */
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API}/allProduct/public`, {
          params: {
            ...(debouncedSearch && { search: debouncedSearch }),
            ...(category !== "All" && { category }),
          },
          cancelToken: source.token,
        });

        setProducts(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => source.cancel("Request cancelled");
  }, [debouncedSearch, category]);

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-pink-100 rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Healthy Skin is a Reflection of Wellness
            </h1>
            <p className="text-gray-600">
              Discover premium skincare curated for your glow.
            </p>
          </div>

          <HeroImageSlider />
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 mt-8 relative">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 md:py-5 bg-white rounded-full shadow-sm pr-10"
        />

        {search && (
          <X
            onClick={() => setSearch("")}
            className="absolute right-8 md:right-[50%] top-1/2 -translate-y-1/2 cursor-pointer text-pink-500 hover:text-pink-700"
          />
        )}
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border whitespace-nowrap transition
              ${
                category === cat
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-600 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 my-10">
        {loading ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-1">Try different keywords or category</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
