"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";
import { useState,useMemo } from "react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [deliveryArea, setDeliveryArea] =useState("outside");

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  
  const deliveryCharge = useMemo(() => {
    if (deliveryArea === "dhaka") return 70;
    if (deliveryArea === "outside") return 120;
    return 0;
  }, [deliveryArea]);
  const total = subtotal + deliveryCharge;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 mb-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {item.name}
                  </h3>

                  <p className="text-pink-600 dark:text-pink-400">
                    ৳ {item.price}
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, "dec")}
                      className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Minus />
                    </button>

                    <span className="min-w-[24px] flex items-center justify-center font-medium border px-2 rounded">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item._id, "inc")}
                      className="rounded p-1 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="rounded p-1 text-red-500 cursor-pointer"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-medium mb-4">Delivery Area</h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="dhaka"
                    checked={deliveryArea === "dhaka"}
                    onChange={() => setDeliveryArea("dhaka")}
                    className="accent-black"
                  />
                  <span>Inside Dhaka City (৳70)</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    value="outside"
                    checked={deliveryArea === "outside"}
                    onChange={() => setDeliveryArea("outside")}
                    className="accent-black"
                  />
                  <span>Outside Dhaka City (৳120)</span>
                </label>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm h-fit">
              <h2 className="font-bold text-lg mb-4 text-center">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>৳ {subtotal}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>৳ {deliveryCharge}</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>৳ {total}</span>
              </div>

              <button
                className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-medium transition-colors cursor-pointer"
                onClick={() => setOpen(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
