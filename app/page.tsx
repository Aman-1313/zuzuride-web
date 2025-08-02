"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function Home() {
  const word = "Zuzuride Soon";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < word.length) {
      const timeout = setTimeout(() => setCurrentIndex((i) => i + 1), 250);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, word.length]);

  return (
    <div className="font-sans bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col justify-between">
      <main className="flex flex-col items-center sm:items-center text-center sm:text-left px-6 sm:px-12 md:px-24 py-20 max-w-4xl mx-auto gap-10">
        {/* Typing Animation */}
        <div className="flex gap-[2px] sm:gap-[4px] text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
          {word.split("").map((char, i) => (
            <motion.span
              key={i}
              initial="hidden"
              animate={i < currentIndex ? "visible" : "hidden"}
              variants={fadeUp}
              className="relative"
            >
              {char}
              {/* Show cursor on current letter */}
              {i === currentIndex - 1 && (
                <motion.span
                  className="absolute -right-3 top-0 text-blue-600"
                  style={{ fontWeight: "bold" }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  |
                </motion.span>
              )}
            </motion.span>
          ))}
          {/* Show cursor if typing just started */}
          {currentIndex === 0 && (
            <motion.span
              className="ml-1 text-blue-600"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              |
            </motion.span>
          )}
        </div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: word.length * 0.15 + 0.3 }}
          className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight"
        >
          Affordable Intercity Rides with Zuzuride
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: word.length * 0.15 + 0.6 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          Ditch expensive buses. Join Alberta’s growing carpool network. Travel
          from Red Deer to Calgary or Edmonton for as low as <strong>$10</strong>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: word.length * 0.15 + 0.9 }}
          className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
        >
          <Link
            href="/download"
            className="inline-block rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-medium px-6 py-3 shadow-md transition-transform hover:scale-105"
          >
            Download the App
          </Link>
          <Link
            href="/how-it-works"
            className="inline-block rounded-full border border-gray-300 dark:border-gray-700 text-base font-medium px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            How It Works
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100 dark:border-zinc-800 text-sm text-center text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/safety" className="hover:underline">
            Safety
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <a
            href="https://zuzuride.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            zuzuride.com →
          </a>
        </div>
      </footer>
    </div>
  );
}
