"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutSuccessModal({ open, onClose }) {
  const DURATION = 5; // seconds
  const [timeLeft, setTimeLeft] = useState(DURATION);

  useEffect(() => {
    if (!open) return;

    setTimeLeft(DURATION);

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      onClose();
    }, DURATION * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, onClose]);

  const progress = (timeLeft / DURATION) * 100;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[320px] rounded-xl bg-white p-6 text-center shadow-xl dark:bg-gray-900"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>

            {/* Circular Timer */}
            <div className="relative mx-auto mb-4 h-24 w-24">
              <svg className="h-full w-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={251}
                  strokeDashoffset={251 - (251 * progress) / 100}
                  className="text-pink-500 transition-all duration-1000"
                />
              </svg>

              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-pink-600">
                {timeLeft}
              </span>
            </div>

            {/* Message */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Order Confirmed
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              We will call you within a minutes.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
