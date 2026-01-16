"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { calculateFinalPrice } from "@/lib/pricing";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/product/${id}/public`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch product");
        setProduct(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  if (loading) return <ProductSkeleton />;

  if (!product)
    return <p className="text-center py-20 text-gray-500">Product not found</p>;

  const {
    image,
    name,
    price,
    discount,
    brand,
    category,
    quantity,
    quantityUnit,
    description,
    useCase,
  } = product;
  const finalPrice = calculateFinalPrice(price, discount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-6 py-12"
    >
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[420px] rounded-2xl overflow-hidden"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <p className="text-sm text-pink-500 font-bold uppercase">{brand}</p>

          <h1 className="text-3xl font-bold capitalize">{name}</h1>

          <p>
            <span className="font-bold">Category:</span>{" "}
            <span className="font-medium">{category}</span>
          </p>

          <p className="text-2xl font-semibold text-pink-600">
            ৳ {finalPrice}
            {discount > 0 && (
              <span className="ml-2 text-sm text-green-600">
                ({discount}% OFF)
              </span>
            )}
          </p>

          <p className="text-sm">
            <span className="font-bold">Quantity:</span> {quantity}{" "}
            {quantityUnit}
          </p>

          <div className="pt-2">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {product.useCase && (
            <div className="pt-2">
              <p className="whitespace-pre-line">
                <span className="font-bold">Use Case:</span> {useCase}
              </p>
            </div>
          )}
          <Button
            onClick={() => addToCart(product)}
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-full cursor-pointer"
          >
            Add to Cart
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Skeleton Loader */
function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-[420px] bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
