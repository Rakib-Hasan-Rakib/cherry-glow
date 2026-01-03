"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Rahman",
    date: "March 12, 2025",
    message:
      "Cherry Glow has transformed my skincare routine. My skin feels smoother, brighter, and healthier.",
    rating: 5,
    image: "/hero-1.jpg",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    date: "April 2, 2025",
    message:
      "The products feel premium and gentle. I love how natural and effective they are.",
    rating: 5,
    image: "/hero-2.jpg",
  },
  {
    id: 3,
    name: "Farhan Ahmed",
    date: "April 18, 2025",
    message:
      "Amazing quality and beautiful packaging. Cherry Glow truly stands out.",
    rating: 4,
    image: "/hero-1.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">What our customers say</h2>
          <p className="mt-2 text-muted-foreground">
            Honest feedback from people who trust Cherry Glow
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-200/60 via-rose-200/40 to-orange-100/60 p-6 shadow-lg backdrop-blur-md dark:from-pink-900/40 dark:via-rose-900/30 dark:to-orange-900/40"
            >
              {/* Top row */}
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/40">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>

              {/* Message */}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                “{item.message}”
              </p>

              {/* Stars */}
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < item.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
