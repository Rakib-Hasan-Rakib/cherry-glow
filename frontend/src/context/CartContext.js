"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage (client only)
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
    setHydrated(true);
  }, []);

  // Save to localStorage (after hydration)
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hydrated]);


  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === product._id);

      if (exists) {
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: Math.min(p.quantity + 1, p.stock) }
            : p
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;

        const qty =
          type === "inc"
            ? Math.min(item.quantity + 1, item.stock)
            : Math.max(item.quantity - 1, 1);

        return { ...item, quantity: qty };
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
