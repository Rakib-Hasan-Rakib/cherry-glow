"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(null);

  // Load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));

    // 🔥 simulate user-specific coupon (later from API)
    const userCoupon = {
      type: "percentage", // or "flat"
      value: 10,
    };

    setCoupon(userCoupon);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Add to cart (NO variant required)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.productId === product._id);

      if (exists) {
        return prev.map((i) =>
          i.productId === product._id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.image || null,
          variants: product.variants,
          selectedVariant: null, // 🔥 important
          quantity: 1,
        },
      ];
    });

    toast.success("Added to cart");
  };

  // ✅ Select variant in cart
  const selectVariant = (productId, variant) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedVariant: variant,
              quantity: 1, // reset for safety
            }
          : item,
      ),
    );
  };

  // ✅ Quantity
  const updateQuantity = (productId, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;

        if (!item.selectedVariant) return item;

        const stock = item.selectedVariant.stock;

        let qty =
          type === "inc"
            ? Math.min(item.quantity + 1, stock)
            : Math.max(item.quantity - 1, 1);

        return { ...item, quantity: qty };
      }),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        selectVariant,
        updateQuantity,
        removeFromCart,
        coupon,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
