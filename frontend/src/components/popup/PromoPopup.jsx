"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";

export default function PromoPopup() {
  const [banner, setBanner] = useState(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const API = `${process.env.NEXT_PUBLIC_API_URL}/banners/promo-banner`;

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(API);

        // ⚠️ Handle both cases: array OR single object
        const data = Array.isArray(res.data)
          ? res.data.find((b) => b.isActive)
          : res.data;

        if (data && data.isActive && data.image) {
          setBanner(data);
          setOpen(true); // show modal every visit
        }
      } catch (err) {
        console.error("Banner fetch failed:", err);
      }
    };

    fetchBanner();
  }, [API]);

  if (!open || !banner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-[90%] max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <Button
          onClick={() => setOpen(false)}
          variant="destructive"
          className="absolute top-2 right-2 z-10 bg-white px-3 py-2 rounded-full shadow bg-pink-500 text-white hover:bg-pink-600 transition"
        >
          ✕
        </Button>

        {/* Banner Image */}
        <Image
          src={banner.image}
          alt={banner.title || "Promo"}
          width={800}
          height={600}
          className="w-full h-[75vh] object-contain"
          priority
        />

        {/* CTA */}
        <div className="p-4 flex justify-center">
          <Button
            onClick={() => {
              setOpen(false);
              router.push("/products");
            }}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
}
