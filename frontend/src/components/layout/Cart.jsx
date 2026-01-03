"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
    const { totalItems } = useCart();
    console.log("Total items in cart:", totalItems);

  return (
    <>
      <Link href="/cart" className="relative">
        <ShoppingCart size={24} />
        {<span
            className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {totalItems}
          </span>
        }
      </Link>
    </>
  );
}
