"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import SnowParticles from "./SnowParticles";

const slides = [
  {
    id: 1,
    title: "Glow Naturally",
    description: "Clean beauty products crafted to enhance your natural glow.",
    image: "/hero-1.jpg",
    primary: "Shop Now",
    secondary: "Explore",
  },
  {
    id: 2,
    title: "Beauty That Cares",
    description: "Dermatologically tested skincare made for every skin type.",
    image: "/hero-2.jpg",
    primary: "View Products",
    secondary: "Learn More",
  },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, 60]);

  const slide = slides[index];

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Parallax Image */}
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* <SnowParticles/> */}

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto max-w-7xl px-4">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-white"
              >
                <h1 className="text-4xl md:text-5xl font-bold">
                  {slide.title}
                </h1>

                <p className="mt-4 text-lg opacity-90">{slide.description}</p>

                <div className="mt-8 flex gap-4">
                  <Button
                    size="lg"
                    className="md:text-lg bg-pink-400 hover:bg-pink-500 text-white"
                  >
                    <Link href="/products">{slide.primary}</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="md:text-lg bg-white/30 text-pink-500 border-pink/30 hover:bg-pink/20"
                  >
                    <Link href="/about">{slide.secondary}</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
      >
        ‹
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
