"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { BookmarkPlus } from "lucide-react";

export default function BestSoldProducts() {
  const [bestSoldProducts, setBestSoldProducts] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/best`)
      .then((res) => res.json())
      .then(setBestSoldProducts);
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <p className="mt-2 text-muted-foreground">
            Loved, trusted, and reordered by thousands
          </p>
        </div>
        {/* Desktop Layout */}
        {bestSoldProducts.length > 0 && (
          <div className="hidden gap-8 md:grid md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative col-span-1 overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={bestSoldProducts[0]?.image}
                alt={bestSoldProducts[0]?.name}
                width={600}
                height={800}
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-semibold capitalize">
                  {bestSoldProducts[0]?.name}
                </h3>
                <p className="mt-1 text-lg font-medium">
                  ৳ {bestSoldProducts[0]?.price}
                </p>
                <Button
                  onClick={() => addToCart(bestSoldProducts[0])}
                  size="sm"
                  disabled={bestSoldProducts[0]?.stock === 0}
                  className="shrink-0 my-4 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <BookmarkPlus className="h-4 w-4" /> Cart
                </Button>
              </div>
            </motion.div>

            {/* Secondary Products */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {bestSoldProducts.slice(1).map((product) => (
                <motion.div
                  key={product?._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl shadow-md"
                >
                  <Image
                    src={product?.image}
                    alt={product?.name}
                    width={400}
                    height={400}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-sm font-medium capitalize">
                      {product?.name}
                    </h4>
                    <p className="text-sm">৳ {product?.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {/* Mobile Layout */}
        {bestSoldProducts.length > 0 && (
          <div className="md:hidden">
            {/* Featured */}
            <div className="relative mb-8 overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={bestSoldProducts[0]?.image}
                alt={bestSoldProducts[0]?.name}
                width={600}
                height={600}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold">
                  {bestSoldProducts[0]?.name}
                </h3>
                <p>৳ {bestSoldProducts[0]?.price}</p>
                <Button
                  onClick={() => addToCart(bestSoldProducts[0])}
                  size="sm"
                  disabled={bestSoldProducts[0]?.stock === 0}
                  className="shrink-0 my-4 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <BookmarkPlus className="h-4 w-4" /> Cart
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* Scroll Products */}
        {bestSoldProducts.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {bestSoldProducts.slice(1).map((product) => (
              <div
                key={product._id}
                className="min-w-[200px] overflow-hidden rounded-xl shadow-md"
              >
                <Image
                  src={product?.image}
                  alt={product?.name}
                  width={300}
                  height={300}
                  className="h-40 w-full object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-medium capitalize">
                    {product?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    ৳ {product?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
