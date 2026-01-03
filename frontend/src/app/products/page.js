"use client";

import HeroImageSlider from "@/components/products/HeroImageSlider";
import ProductCard from "@/components/products/ProductCard";
// import { a } from "framer-motion/dist/types.d-DagZKalS";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import ProductModal from "@/components/products/ProductModal";

const CATEGORIES = ["All", "Skincare", "Makeup", "Haircare", "Bodycare"];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const categoryFromURL = searchParams.get("category") || "All";
  const [category, setCategory] = useState(categoryFromURL);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/allProduct/public`)
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    setCategory(categoryFromURL);
  }, [categoryFromURL]);

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="bg-pink-100 rounded-3xl p-10 grid md:grid-cols-2 items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Healthy Skin is a Reflection of Wellness
            </h1>
            <p className="text-gray-600 mb-6">
              Discover premium beauty products curated for your glow.
            </p>
            <a
              href="#products"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600"
            >
              View All Products
            </a>
          </div>

          <div className="flex justify-center">
            <HeroImageSlider />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap border
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

      {/* Products Grid */}
      <div
        className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center py-10 max-w-7xl mx-auto px-6"
        id="products"
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
            onOpen={setSelectedProduct}
          />
        ))}
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
}
