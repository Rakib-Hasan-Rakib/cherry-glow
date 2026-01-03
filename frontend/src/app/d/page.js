"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialCart = [
  {
    _id: "1",
    name: "Hydrating Face Cream",
    price: 1200,
    stock: 10,
    quantity: 1,
    image: "/hero-1.png",
  },
  {
    _id: "2",
    name: "Vitamin C Serum",
    price: 1800,
    stock: 5,
    quantity: 2,
    image: "/hero-2.png",
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;

        const newQty =
          type === "inc"
            ? Math.min(item.quantity + 1, item.stock)
            : Math.max(item.quantity - 1, 1);

        return { ...item, quantity: newQty };
      })
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 bg-white p-4 rounded-xl shadow-sm"
              >
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-pink-600 font-bold mt-1">৳ {item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item._id, "dec")}
                      className="p-1 border rounded-md hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-[24px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item._id, "inc")}
                      className="p-1 border rounded-md hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>৳ {subtotal}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span>৳ {shipping}</span>
            </div>

            <div className="border-t my-3" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>

            <button
              className="mt-6 w-full bg-pink-500 hover:bg-pink-600
                         text-white py-3 rounded-xl font-medium transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
