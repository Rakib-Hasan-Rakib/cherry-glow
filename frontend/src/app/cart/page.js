"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import CheckoutModal from "@/components/CheckoutModal";
import CheckoutSuccessModal from "@/components/CheckoutSuccessModal";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, selectVariant, updateQuantity, removeFromCart, coupon } =
    useCart();

  const router = useRouter();

  const [deliveryArea, setDeliveryArea] = useState("outside");
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  // ✅ Subtotal
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      if (!item.selectedVariant) return sum;
      return sum + item.selectedVariant.price * item.quantity;
    }, 0);
  }, [cart]);

  // ✅ Coupon
  const discount = useMemo(() => {
    if (!coupon) return 0;

    if (coupon.type === "percentage") {
      return (subtotal * coupon.value) / 100;
    }

    return coupon.value;
  }, [coupon, subtotal]);

  // ✅ Shipping
  const deliveryCharge = deliveryArea === "dhaka" ? 70 : 120;

  const total = subtotal - discount + deliveryCharge;

  // ✅ CHECKOUT VALIDATION
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const hasMissingVariant = cart.some((item) => !item.selectedVariant);

    if (hasMissingVariant) {
      toast.error("Please select at least one variant");
      return;
    }

    // ✅ Open modal instead of redirect
    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg mb-4">Your cart is empty</p>
          <button
            onClick={() => router.push("/products")}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item,i) => (
              <div
                key={i}
                className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm"
              >
                {/* IMAGE */}
                <div
                  onClick={() => router.push(`/products/${item.productId}`)}
                  className="relative w-24 h-24 cursor-pointer"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg" />
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1">
                  {/* NAME */}
                  <h3
                    onClick={() => router.push(`/products/${item.productId}`)}
                    className="font-semibold cursor-pointer hover:underline"
                  >
                    {item.name}
                  </h3>

                  {/* 🔥 VARIANT SELECTION (RADIO) */}
                  <div className="mt-2 space-y-1">
                    {item.variants?.map((v, i) => (
                      <label
                        key={i}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="radio"
                          checked={
                            item.selectedVariant?.weight === v.weight &&
                            item.selectedVariant?.unit === v.unit
                          }
                          onChange={() => selectVariant(item.productId, v)}
                        />
                        {v.weight} {v.unit} — ৳ {v.price}
                      </label>
                    ))}
                  </div>

                  {/* ❗ Warning if not selected */}
                  {!item.selectedVariant && (
                    <p className="text-xs text-red-500 mt-1">
                      Please select a variant
                    </p>
                  )}

                  {/* PRICE */}
                  {item.selectedVariant && (
                    <p className="text-pink-600 mt-1">
                      ৳ {item.selectedVariant.price}
                    </p>
                  )}

                  {/* QUANTITY */}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.productId, "dec")}
                      className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="px-3 py-1 border rounded text-sm">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.productId, "inc")}
                      className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 cursor-pointer"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-5">
            {/* 🚚 DELIVERY */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-medium mb-4">Delivery Area</h2>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={deliveryArea === "dhaka"}
                  onChange={() => setDeliveryArea("dhaka")}
                />
                Inside Dhaka (৳70)
              </label>

              <label className="flex items-center gap-3 cursor-pointer mt-2">
                <input
                  type="radio"
                  checked={deliveryArea === "outside"}
                  onChange={() => setDeliveryArea("outside")}
                />
                Outside Dhaka (৳120)
              </label>
            </div>

            {/* 💰 SUMMARY */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h2 className="font-bold text-lg mb-4 text-center">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>৳ {subtotal}</span>
              </div>

              <div className="flex justify-between text-sm text-green-600 mb-2">
                <span>Coupon / Discount</span>
                <span>৳ {discount}</span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>৳ {deliveryCharge}</span>
              </div>

              <div className="border-t my-3" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>৳ {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧾 MODALS */}
      <CheckoutModal
        open={open}
        onClose={() => setOpen(false)}
        successModal={successModal}
        setSuccessModal={setSuccessModal}
      />

      <CheckoutSuccessModal
        open={successModal}
        onClose={() => setSuccessModal(false)}
      />
    </div>
  );
}
