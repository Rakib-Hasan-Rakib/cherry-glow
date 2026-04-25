"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function FloatingSummary({
  subtotal = 0,
  discount = 0,
  total = 0,
  handleCheckout,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="
        fixed z-50
        bottom-0 left-0 right-0
        sm:bottom-4 sm:left-auto sm:right-4
        w-full sm:w-[320px]
        bg-white dark:bg-gray-900
        border-t sm:border
        shadow-lg sm:shadow-2xl
        rounded-none sm:rounded-xl
      "
    >
      {/* 🔽 Toggle Button (Mobile only) */}
      <div className="flex justify-center sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="
            p-1 -mt-3
            bg-white dark:bg-gray-900
            rounded-full shadow border
            transition
          "
        >
          {open ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* 📱 MOBILE BAR */}
      <div className="flex items-center justify-between px-4 py-2 sm:hidden">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="font-bold text-sm">৳ {total.toFixed(0)}</p>
        </div>

        <button
          onClick={handleCheckout}
          className="
            bg-pink-500 hover:bg-pink-600
            text-white px-4 py-1.5
            rounded-md text-sm
            transition cursor-pointer
          "
        >
          Checkout
        </button>
      </div>

      {/* 📱 EXPANDABLE CONTENT (SMOOTH ANIMATION) */}
      <div
        className={`
          sm:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳ {subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Discount</span>
            <span>-৳ {discount.toFixed(0)}</span>
          </div>

          <div className="border-t" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>৳ {total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      {/* 💻 DESKTOP VERSION */}
      <div className="hidden sm:block p-5">
        <h2 className="font-semibold mb-3">Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>৳ {subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <span>-৳ {discount.toFixed(0)}</span>
        </div>

        <div className="border-t my-2" />

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>৳ {total.toFixed(0)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="
            mt-4 w-full
            bg-pink-500 hover:bg-pink-600
            text-white py-2 rounded-lg
            transition cursor-pointer
          "
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
