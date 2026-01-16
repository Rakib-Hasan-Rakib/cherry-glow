"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "CLEANSER", image: "/categories/skin_care.jpg" },
  { id: 2, name: "TONER", image: "/categories/makeup.jpg" },
  { id: 3, name: "SERUM", image: "/categories/hair_care.jpg" },
  { id: 4, name: "EYE CARE", image: "/categories/fragrance.jpg" },
  { id: 5, name: "MOISTURIZER", image: "/categories/body_care.jpg" },
  { id: 6, name: "SUNSCREEN", image: "/categories/skin_care.jpg" },
  { id: 7, name: "MASK", image: "/categories/makeup.jpg" },
  { id: 8, name: "OIL", image: "/categories/hair_care.jpg" },
];

export default function CategoryMarquee() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Shop by Category
        </h2>

        <div className="group relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 group-hover:[animation-play-state:paused]">
            {[...categories, ...categories].map((cat, index) => (
              <div
                key={`${cat.id}-${index}`}
                className="flex w-[140px] flex-col items-center gap-3"
              >
                <Link
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                  />
                </Link>

                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
