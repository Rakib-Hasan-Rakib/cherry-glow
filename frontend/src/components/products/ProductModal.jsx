"use client";

import { X } from "lucide-react";

export default function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h2>

            <p className="mt-2 text-pink-600 text-xl font-semibold">
              ৳ {product.price}
            </p>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {product.description || "No description available."}
            </p>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Category: {product.category}
            </p>

            <button
              onClick={() => onAddToCart(product)}
              className="mt-6 w-full rounded-xl bg-pink-500 py-3 text-white font-medium hover:bg-pink-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
