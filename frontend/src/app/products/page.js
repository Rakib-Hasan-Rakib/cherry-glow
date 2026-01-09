"use client";

import HeroImageSlider from "@/components/products/HeroImageSlider";
import ProductCard from "@/components/products/ProductCard";
import ProductModal from "@/components/products/ProductModal";
import SkeletonCard from "@/components/products/SkeletonCard";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "All",
  "CLEANSER",
  "TONER",
  "SERUMS",
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
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category !== "All") params.append("category", category);

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/products/allProduct/public?${params.toString()}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        // IMPORTANT: ignore abort errors
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [debouncedSearch, category]);

console.log(products);
  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-pink-100 rounded-3xl p-10 grid md:grid-cols-2 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Healthy Skin is a Reflection of Wellness
            </h1>
            <p className="text-gray-600 mb-6">
              Discover premium beauty products curated for your glow.
            </p>
          </div>
          <HeroImageSlider />
        </div>
      </section>

      {/* Search */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)} className="w-full md:w-1/2 md:py-5 focus:ring-2 focus:outline-pink-300"
        />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full border whitespace-nowrap
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
      <section
        className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 max-w-7xl mx-auto px-6"
        id="products"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
      </section>
    </div>
  );
}
