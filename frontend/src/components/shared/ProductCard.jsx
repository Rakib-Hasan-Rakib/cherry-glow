"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { BookmarkPlus } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { image, name, price, stock } = product;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      )}
    >
      {/* Background Image */}
      <div className="relative h-[320px] w-full">
        <Image
          src={image}
          alt={name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Floating Content */}
      <div className="absolute bottom-4 left-4 right-4">
        <div
          className={cn(
            "flex items-center justify-between gap-4",
            "rounded-xl bg-white/80 backdrop-blur-md",
            "px-4 py-3 shadow-lg",
            "dark:bg-black/70"
          )}
        >
          {/* Left Info */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold leading-tight capitalize">{name}</h3>

            <span
              className={cn(
                "text-xs",
                stock > 0 ? "text-green-600" : "text-red-500"
              )}
            >
              {stock > 0 ? "In stock" : "Out of stock"}
            </span>

            <span className="mt-1 text-sm font-bold">৳ {price}</span>
          </div>

          {/* Right Action */}
          <Button
            onClick={() => addToCart(product)}
            size="sm"
            disabled={stock === 0}
            className="shrink-0 bg-pink-500 hover:bg-pink-600 text-white cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <BookmarkPlus className="h-4 w-4" /> Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
