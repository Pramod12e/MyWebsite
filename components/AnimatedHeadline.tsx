"use client";

import { motion } from "motion/react";

type Word = { t: string; gradient?: boolean };

const lines: Word[][] = [
  [{ t: "Hi," }, { t: "I’m" }, { t: "Pramod.", gradient: true }],
  [{ t: "I" }, { t: "build" }, { t: "for" }, { t: "the" }, { t: "web." }],
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const word = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function AnimatedHeadline() {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl"
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.map((w) => (
            <span
              key={w.t}
              className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
            >
              <motion.span
                variants={word}
                className={`inline-block ${
                  w.gradient
                    ? "text-shimmer bg-linear-to-r from-cyan-300 via-sky-500 to-cyan-300 bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {w.t}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}