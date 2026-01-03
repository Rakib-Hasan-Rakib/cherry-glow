"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/products/hero-1.png", "/products/hero-2.png", "/products/hero-3.png"];

export default function HeroImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center relative h-72 w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Beauty Products"
          className="max-h-72 absolute width-full object-contain"
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.98 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
