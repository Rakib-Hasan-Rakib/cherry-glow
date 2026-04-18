"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { BookmarkPlus } from "lucide-react";
import { getPriceInfo } from "@/lib/price";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const { name, images = [], variants = [], _id } = product;

  // ✅ Safe image fallback
  const image = images?.[0]?.url || "/placeholder.png";

  // ✅ Price
  const { original, final, hasDiscount } = getPriceInfo(product);

  // ✅ Stock calculation from variants
  const totalStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  const inStock = totalStock > 0;

  return (
    <div
      onClick={() => router.push(`/products/${_id}`)}
      className={cn(
        "group relative overflow-hidden rounded-2xl cursor-pointer",
        "shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      )}
    >
      {/* Image */}
      <div className="relative h-[320px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{Math.round(((original - final) / original) * 100)}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4">
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            "rounded-xl bg-white/80 backdrop-blur-md",
            "px-4 py-3 shadow-lg",
          )}
        >
          {/* Info */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold capitalize line-clamp-1">
              {name}
            </h3>

            {/* Stock */}
            <span
              className={cn(
                "text-xs",
                inStock ? "text-green-600" : "text-red-500",
              )}
            >
              {inStock ? "In stock" : "Out of stock"}
            </span>

            {/* Price */}
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-bold">৳ {final}</span>

              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  ৳ {original}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent redirect
              addToCart(product);
            }}
            size="sm"
            disabled={!inStock}
            className="shrink-0 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
