"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Papiya Akter Popy",
    date: "March 12, 2026",
    message:
      "এতদিন অরিজিনাল কোরিয়ান স্কিনকেয়ার খুঁজে পাওয়া ছিল সবচেয়ে বড় চ্যালেঞ্জ। কিন্তু এখান থেকে প্রোডাক্ট নেওয়ার পর বুঝেছি—অথেন্টিক জিনিস এখনো পাওয়া যায়। ধন্যবাদ সবসময় অরিজিনাল প্রোডাক্ট দেওয়ার জন্য। এখন থেকে নির্ভয়ে এখান থেকেই শপিং করব।",
    rating: 5,
    image: "https://i.ibb.co/Q7XNs2BP/popy.jpg",
  },
  {
    id: 2,
    name: "Sohana Islam",
    date: "March 27, 2026",
    message:
      "আমি ব্যবহার করছি make p:rem Low-Irritant & Mild Acid Foam Cleanser এবং honestly এটা sensitive skin friendly একটা amazing cleanser 💚",
    rating: 5,
    image: "https://i.ibb.co/mrcbsxR1/sohana.jpg",
  },
  {
    id: 3,
    name: "Md Saddam Hossain",
    date: "April 18, 2026",
    message:
      "যারা স্কিন কেয়ার নিয়ে কনফিউজড, তাদের জন্য Cherry Glow Korea হতে পারে একটা ট্রাস্টেড অপশন, আমি অবশ্যই আবার অর্ডার করবো! এত ভালো সার্ভিস আর অরিজিনাল প্রোডাক্টের জন্য ধন্যবাদ।",
    rating: 5,
    image: "https://i.ibb.co/8LVQ598q/saddam.jpg",
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
