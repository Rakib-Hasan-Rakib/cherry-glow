"use client";

import Image from "next/image";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BookmarkPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getPriceInfo } from "@/lib/price";

export default function BestSoldProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const router = useRouter();

  const API = `${process.env.NEXT_PUBLIC_API_URL}/products/best?limit=5`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API);
        setProducts(res.data.data || []);
      } catch (err) {
        console.error("Best products error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API]);

  if (loading || products.length === 0) return null;

  // ✅ helpers
  const getStock = (variants = []) =>
    variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  const mainProduct = products[0];
  const otherProducts = products.slice(1, 5);

  const handleAddToCart = () => {
    // ✅ Minimal optimized cart object
    const productForCart = {
      _id: mainProduct?._id,
      name: mainProduct?.name,
      image: mainProduct?.images?.[0]?.url || "/placeholder.png",
      variants: mainProduct?.variants,
    };
    addToCart(productForCart);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <p className="mt-2 text-muted-foreground">
            Loved, trusted, and reordered by customers
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {/* Main Product */}
          <motion.div
            onClick={() => router.push(`/products/${mainProduct._id}`)}
            className="relative col-span-1 overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Image
              src={mainProduct?.images?.[0]?.url}
              alt={mainProduct?.name}
              width={600}
              height={800}
              sizes="33vw"
              className="h-full w-full object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-semibold capitalize">
                {mainProduct?.name}
              </h3>

              {/* Price */}
              {(() => {
                const { final } = getPriceInfo(mainProduct);
                return <p className="mt-1 text-lg">৳ {final}</p>;
              })()}

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                size="sm"
                disabled={getStock(mainProduct.variants) === 0}
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
              >
                <BookmarkPlus className="h-4 w-4" /> Cart
              </Button>
            </div>
          </motion.div>

          {/* Other Products */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {otherProducts.map((product, index) => {
              const { final } = getPriceInfo(product);

              return (
                <motion.div
                  key={product._id}
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src={product?.images?.[0]?.url}
                    alt={product?.name}
                    width={400}
                    height={400}
                    sizes="25vw"
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-sm font-medium capitalize">
                      {product?.name}
                    </h4>
                    <p className="text-sm">৳ {final}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div
            onClick={() => router.push(`/products/${mainProduct._id}`)}
            className="relative mb-6 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          >
            <Image
              src={mainProduct?.images?.[0]?.url}
              alt={mainProduct?.name}
              width={600}
              height={600}
              sizes="100vw"
              className="h-80 w-full object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-lg font-semibold">{mainProduct?.name}</h3>

              {(() => {
                const { final } = getPriceInfo(mainProduct);
                return <p>৳ {final}</p>;
              })()}

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                size="sm"
                className="mt-3 bg-pink-500 text-white"
              >
                <BookmarkPlus className="h-4 w-4" /> Cart
              </Button>
            </div>
          </div>

          {/* Scroll list */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {otherProducts.map((product) => {
              const { final } = getPriceInfo(product);

              return (
                <div
                  key={product._id}
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="min-w-[200px] overflow-hidden rounded-xl shadow-md cursor-pointer"
                >
                  <Image
                    src={product?.images?.[0]?.url}
                    alt={product?.name}
                    width={300}
                    height={300}
                    sizes="200px"
                    className="h-40 w-full object-cover"
                  />

                  <div className="p-3">
                    <h4 className="text-sm font-medium capitalize">
                      {product?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">৳ {final}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
