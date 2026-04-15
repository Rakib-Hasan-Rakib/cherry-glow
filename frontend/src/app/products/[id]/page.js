"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const FALLBACK_IMAGE = "/placeholder.jpg";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [adding, setAdding] = useState(false);

  /* ---------------- Fetch ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products/singleProduct/${id}`,
        );

        const data = res.data;
        setProduct(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ---------------- Normalize Images ---------------- */
  const imageList = useMemo(() => {
    if (!product) return [];

    const imgs = [
      product.thumbnail,
      product.image,
      ...(product.images?.map((i) => i?.url || i) || []),
    ];

    return [...new Set(imgs.filter(Boolean))];
  }, [product]);

  /* ---------------- Default Image ---------------- */
  useEffect(() => {
    if (imageList.length > 0) {
      setSelectedImage(imageList[0]);
    }
  }, [imageList]);

  /* ---------------- Default Variant ---------------- */
  useEffect(() => {
    if (product?.variants?.length) {
      const baseVariant =
        product.variants.find((v) => v.isBase) || product.variants[0];

      setSelectedVariant(baseVariant);
    }
  }, [product]);

  /* ---------------- Price ---------------- */
  const finalPrice = useMemo(() => {
    if (!product) return 0;

    const base = selectedVariant?.price || product.basePrice;

    if (!product.discountType) return base;

    if (product.discountType === "percentage") {
      return Math.round(base - (base * product.discountValue) / 100);
    }

    if (product.discountType === "fixed") {
      return Math.max(0, base - product.discountValue);
    }

    return base;
  }, [product, selectedVariant]);

  const originalPrice = selectedVariant?.price || product?.basePrice;

  /* ---------------- Add To Cart ---------------- */
  const handleAddToCart = () => {
    if (!product) return;

    setAdding(true);

    addToCart({
      productId: product._id,
      name: product.name,
      image: selectedImage || FALLBACK_IMAGE,
      price: finalPrice,
      variant: selectedVariant
        ? {
            name: selectedVariant.name,
            weight: selectedVariant.weight,
          }
        : null,
      quantity: 1,
    });

    setTimeout(() => {
      setAdding(false);
      toast.success("Added to cart");
    }, 400);
  };

  if (loading) return <ProductSkeleton />;

  if (!product)
    return <p className="text-center py-20 text-gray-500">Product not found</p>;

  const { name, brand, category, description, useCase, stock } = product;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* ================= IMAGES ================= */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative w-full h-[420px] rounded-2xl bg-white shadow-md overflow-hidden">
            <Image
              src={selectedImage || FALLBACK_IMAGE}
              alt={name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {imageList.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {imageList.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === img
                      ? "border-pink-500 scale-105"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* ================= DETAILS ================= */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <p className="text-sm text-pink-500 font-bold uppercase">{brand}</p>
            <h1 className="text-3xl font-bold mt-1">{name}</h1>
            <p className="text-gray-500 text-sm">{category}</p>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-pink-600">
              ৳ {finalPrice}
            </span>

            {product.discountType && (
              <>
                <span className="line-through text-gray-400">
                  ৳ {originalPrice}
                </span>

                <span className="text-green-600 text-sm">
                  {product.discountType === "percentage"
                    ? `${product.discountValue}% OFF`
                    : `৳${product.discountValue} OFF`}
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <p
            className={`text-sm font-medium ${
              stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Select Option</h3>

              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => {
                  const isSelected =
                    selectedVariant?.weight === v.weight &&
                    selectedVariant?.unit === v.unit;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full border text-sm transition ${
                        isSelected
                          ? "bg-pink-500 text-white border-pink-500"
                          : "bg-white text-pink-500 border-pink-500 hover:bg-pink-50"
                      }`}
                    >
                      {v.weight}
                      {v.unit && ` ${v.unit}`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{description}</p>
          </div>

          {/* Use Case */}
          {useCase && (
            <div>
              <h3 className="font-semibold mb-1">Use Case</h3>
              <p className="text-gray-600 whitespace-pre-line">{useCase}</p>
            </div>
          )}

          {/* CTA */}
          <Button
            onClick={handleAddToCart}
            disabled={stock === 0 || adding}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-full py-3"
          >
            {adding ? "Adding..." : "Add to Cart"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

/* ---------------- Skeleton ---------------- */
function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="h-[420px] bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
