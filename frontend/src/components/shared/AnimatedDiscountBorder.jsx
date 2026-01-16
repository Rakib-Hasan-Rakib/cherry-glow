"use client";

import { motion } from "framer-motion";

export default function AnimatedDiscountBorder({ children }) {
  return (
    <motion.div
      className="relative h-full rounded-xl p-[2px]"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(270deg, #ec4899, #f97316, #ec4899)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="h-full rounded-xl bg-white">{children}</div>
    </motion.div>
  );
}
