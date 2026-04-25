"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import CheckoutModal from "@/components/CheckoutModal";
import ComboSelected from "./ComboSelected";
import ComboList from "./ComboList";
import { useAuth } from "@/context/AuthContext";
import FloatingSummary from "./FloatingSummary";

export default function ComboPage() {
  const [products, setProducts] = useState([]);
  const [combo, setCombo] = useState([]);
  const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);

  const router = useRouter();
  const API = `${process.env.NEXT_PUBLIC_API_URL}/products/allProduct/public`;

  // 🔥 Firebase user
//   useEffect(() => {
//     const auth = getAuth();
//     const unsub = onAuthStateChanged(auth, (u) => setUser(u));
//     return () => unsub();
    //   }, []);
    const {user} = useAuth();
    

  // 🔥 Load combo
  useEffect(() => {
    const stored = localStorage.getItem("combo");
    if (stored) setCombo(JSON.parse(stored));
  }, []);

  // 🔥 Fetch products
  useEffect(() => {
    axios.get(API).then((res) => setProducts(res.data || []));
  }, []);

  // 🔥 Sync listener (when ComboList updates localStorage)
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem("combo");
      setCombo(stored ? JSON.parse(stored) : []);
    };

    window.addEventListener("storage", sync);
    window.addEventListener("comboUpdated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("comboUpdated", sync);
    };
  }, []);

  // 🔥 Update variant
  const updateVariant = (id, variant) => {
    const updated = combo.map((p) =>
      p._id === id ? { ...p, selectedVariant: variant } : p,
    );
    localStorage.setItem("combo", JSON.stringify(updated));
    window.dispatchEvent(new Event("comboUpdated"));
  };

  // 🔥 Remove
  const removeFromCombo = (id) => {
    const updated = combo.filter((p) => p._id !== id);
    localStorage.setItem("combo", JSON.stringify(updated));
    window.dispatchEvent(new Event("comboUpdated"));
  };

  // 🔥 Pricing
  const subtotal = useMemo(() => {
    return combo.reduce((sum, p) => {
      if (!p.selectedVariant) return sum;
      return sum + p.selectedVariant.price;
    }, 0);
  }, [combo]);

  const discountRate = subtotal > 8000 ? 0.1 : subtotal > 4000 ? 0.05 : 0;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  // 🔥 Checkout
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    if (combo.length === 0) {
      toast.error("Select at least one product");
      return;
    }

    const missing = combo.find((p) => !p.selectedVariant);
    if (missing) {
      toast.error("Select variant for all products");
      return;
    }

    setOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 relative">
      <h1 className="text-3xl font-bold text-center">Make Your Own Combo</h1>

      <ComboSelected
        combo={combo}
        removeFromCombo={removeFromCombo}
        updateVariant={updateVariant}
      />

      <ComboList products={products} />

      {/* 🔥 FLOATING SUMMARY */}
      <FloatingSummary
        subtotal={subtotal}
        discount={discount}
        total={total}
        handleCheckout={handleCheckout}
      />

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
