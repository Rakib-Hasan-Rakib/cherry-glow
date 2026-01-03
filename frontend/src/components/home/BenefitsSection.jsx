"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Dermatologist Tested",
    description: "Formulated and approved by skin experts.",
    position: "top",
  },
  {
    title: "Natural Ingredients",
    description: "Powered by clean, plant-based extracts.",
    position: "right",
  },
  {
    title: "Cruelty Free",
    description: "Never tested on animals, always ethical.",
    position: "bottom",
  },
  {
    title: "Proven Results",
    description: "Visible improvement in weeks.",
    position: "left",
  },
];

const positionClasses = {
  top: "top-0 left-1/2 -translate-x-1/2",
  right: "-right-30 top-1/2 -translate-y-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2",
  left: "-left-30 top-1/2 -translate-y-1/2",
  "top-right": "top-10 right-10",
};

export default function WhyChooseUs() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-14 text-center text-3xl font-bold">
          Why Choose Cherry Glow
        </h2>

        {/* Desktop layout */}
        <div className="relative mx-auto hidden h-[420px] w-[420px] md:block">
          {/* Center Logo */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative h-36 w-36 overflow-hidden rounded-full shadow-xl">
              <Image
                src="/logo.png"
                alt="Cherry Glow"
                fill
                className="object-contain bg-white p-4"
              />
            </div>
          </motion.div>

          {/* Reasons */}
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`absolute ${positionClasses[reason.position]}`}
            >
              <div className="w-44 rounded-xl bg-white/80 p-4 text-center shadow-md backdrop-blur-md dark:bg-black/70">
                <h3 className="text-sm font-semibold">{reason.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="mt-10 grid gap-4 md:hidden">
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full shadow-lg">
            <Image
              src="/logo.png"
              alt="Cherry Glow"
              width={112}
              height={112}
              className="object-contain bg-white p-3"
            />
          </div>

          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white/80 p-4 text-center shadow-md backdrop-blur-md dark:bg-black/70"
            >
              <h3 className="text-sm font-semibold">{reason.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
