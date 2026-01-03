"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "Skincare", image: "/categories/skin_care.jpg" },
  { id: 2, name: "Makeup", image: "/categories/makeup.jpg" },
  { id: 3, name: "Hair Care", image: "/categories/hair_care.jpg" },
  { id: 4, name: "Fragrance", image: "/categories/fragrance.jpg" },
  { id: 5, name: "Body Care", image: "/categories/body_care.jpg" },
];

export default function CategoryMarquee() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Shop by Category
        </h2>

        {/* Hover container */}
        <div className="group relative overflow-hidden">
          {/* Moving track */}
          <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused]">
            {[...categories, ...categories].map((cat, index) => (
              <div
                key={index}
                className="flex w-[140px] flex-col items-center gap-3"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg">
                  <Link
                    key={cat}
                    href={`/products?category=${encodeURIComponent(cat?.name)}`}
                    className="cursor-pointer rounded bg-pink-100 px-4 py-2 hover:bg-pink-200"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </Link>
                </div>

                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
