"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { X } from "lucide-react";

export default function CheckoutModal({ open, onClose }) {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, address, phone, cart }),
    });

    if (!res.ok) {
      alert("Order failed");
      return;
    }

    const data = await res.json();

    if (data.success) {
      alert("Your order has been confirmed");
      clearCart();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg text-gray-900 dark:text-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="mb-4 text-lg font-semibold">Checkout</h2>

        <input
          placeholder="Your Name"
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-500
                     dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Your Phone Number"
          className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-500
                     dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          placeholder="Delivery Address"
          className="mb-4 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-500
                     dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-pink-500 py-2 text-white hover:bg-pink-600 transition-colors cursor-pointer"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
