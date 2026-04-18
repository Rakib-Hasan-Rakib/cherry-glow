"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedDiscountBorder from "../shared/AnimatedDiscountBorder";

export default function ProductCard({ product, onAddToCart, index }) {
  const {
    _id,
    name,
    image,
    variants = [],
    discountType,
    discountValue,
    stock,
  } = product;

  // 👉 Default variant (lowest price or first)
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

  /* ---------------- Price Logic ---------------- */

  const finalPrice = useMemo(() => {
    if (!selectedVariant) return 0;

    const base = selectedVariant.price;

    if (discountType === "percentage") {
      return Math.round(base - (base * discountValue) / 100);
    }

    if (discountType === "flat") {
      return Math.max(base - discountValue, 0);
    }

    return base;
  }, [selectedVariant, discountType, discountValue]);

  const hasDiscount = discountValue > 0;

  /* ---------------- Cart Payload ---------------- */
  const handleAddToCart = () => {
    if (!selectedVariant || selectedVariant.stock === 0) return;

    // ✅ Minimal optimized cart object
    onAddToCart({
      productId: _id,
      name,
      image,
      price: finalPrice,
      originalPrice: selectedVariant.price,
      quantity: 1,
      variant: {
        weight: selectedVariant.weight,
        unit: selectedVariant.unit,
      },
    });
  };

  const optimizedImage = image.replace(
    "/upload/",
    "/upload/w_600,f_auto,q_auto:good/",
  );
  console.log(product)

  /* ---------------- UI ---------------- */

  const CardContent = (
    <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Discount badge */}
      {hasDiscount && (
        <span className="self-end text-xs font-bold text-pink-500 bg-gray-100 px-2 py-1 rounded-full">
          {discountType === "percentage"
            ? `${discountValue}% OFF`
            : `৳${discountValue} OFF`}
        </span>
      )}

      {/* Image */}
      <div className="relative w-full h-48 mb-4">
        <Image
          src={optimizedImage || "/placeholder.png"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={index < 4}
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <h3 className="font-semibold text-gray-900">{name}</h3>

        {/* Variant Selector */}
        {variants.length > 1 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1 text-xs rounded-full border transition
                  ${
                    selectedVariant === v
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-gray-600 hover:bg-pink-100"
                  }`}
              >
                {v.weight}
                {v.unit}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-2 items-baseline">
            <span className="text-lg font-bold text-pink-600">
              ৳ {finalPrice}
            </span>

            {hasDiscount && (
              <span className="text-sm line-through text-gray-400">
                ৳ {selectedVariant?.price}
              </span>
            )}
          </div>

          {/* Stock */}
          <span
            className={`text-xs font-medium ${
              selectedVariant?.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {selectedVariant?.stock > 0 ? "In Stock" : "Out"}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3 pt-4">
          <Link
            href={`/products/${_id}`}
            className="w-full text-center rounded-full border border-pink-500 py-2 text-sm text-pink-600 hover:bg-pink-500 hover:text-white transition"
          >
            Details
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock === 0}
            className={`w-full rounded-full py-2 text-sm font-medium transition
              ${
                selectedVariant?.stock > 0
                  ? "bg-pink-500 text-white hover:bg-pink-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {selectedVariant?.stock > 0 ? "Add" : "Out"}
          </button>
        </div>
      </div>
    </div>
  );

  return hasDiscount && discountValue >= 10 ? (
    <AnimatedDiscountBorder>{CardContent}</AnimatedDiscountBorder>
  ) : (
    CardContent
  );
}
