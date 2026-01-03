"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SnowParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map(() => ({
      size: Math.random() * 2 + 5, // 1–3px
      left: Math.random() * 100, // %
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));

    setParticles(generated);
  }, []);

  // Prevent SSR/client mismatch
  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          className="absolute top-0 rounded-full bg-white"
        />
      ))}
    </div>
  );
}
