"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const INTRO_KEY = "intro-seen";
const ABOUT_KEY = "about-visited-v2";
const SHOW_DELAY_MS = 600; // delay after the intro finishes

function read(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function markAboutVisited() {
  try {
    sessionStorage.setItem(ABOUT_KEY, "1");
  } catch {
    /* ignore */
  }
}

const faces: [string, string][] = [
  ["A", "rotateY(0deg)"],
  ["B", "rotateY(90deg)"],
  ["O", "rotateY(180deg)"],
  ["U", "rotateY(-90deg)"],
  ["T", "rotateX(90deg)"],
  ["→", "rotateX(-90deg)"],
];

function NudgeCard() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 16 });
  const sy = useSpring(py, { stiffness: 150, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Glow */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0.5 }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.35, 0.75, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1 rounded-3xl bg-linear-to-r from-cyan-400 via-blue-500 to-fuchsia-500 blur-lg"
        />

        <div className="relative flex items-center gap-4 rounded-2xl border border-white/15 bg-neutral-950/90 p-4 pr-10 text-white shadow-2xl backdrop-blur-xl">
          {/* 3D cube + orbit ring */}
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-cyan-300/50 motion-reduce:animate-none"
            />
            <div className="h-10 w-10 [perspective:220px]">
              <div className="mini-cube relative h-full w-full [transform-style:preserve-3d]">
                {faces.map(([label, rotation]) => (
                  <div
                    key={label}
                    className="absolute inset-0 flex items-center justify-center rounded-md border border-cyan-200/60 bg-cyan-300/15 font-mono text-sm font-bold"
                    style={{ transform: `${rotation} translateZ(20px)` }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
              A quick hello
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug">
              Curious who built this?
            </p>
            <Link
              href="/about"
              onClick={markAboutVisited}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black transition-transform hover:scale-105"
            >
              Meet me
              <motion.span
                aria-hidden="true"
                animate={reduce ? undefined : { x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                →
              </motion.span>
            </Link>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AboutNudge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (read(ABOUT_KEY)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let waited = 0;
    let started = false;

    function show() {
      if (read(ABOUT_KEY)) return;
      setVisible(true);
    }

    function start() {
      if (started) return;
      started = true;
      timers.push(window.setTimeout(show, SHOW_DELAY_MS));
    }

    // Wait for the intro to finish (checks every 100 ms, gives up after 15 s).
    const poll = window.setInterval(() => {
      waited += 100;
      if (read(INTRO_KEY) === "1" || reduced || waited >= 15000) {
        window.clearInterval(poll);
        start();
      }
    }, 100);

    return () => {
      window.clearInterval(poll);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Tell the navbar to glow its About link while the card is showing.
  useEffect(() => {
    if (!visible) return;
    const root = document.documentElement;
    root.dataset.nudge = "about";
    return () => {
      delete root.dataset.nudge;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="about-nudge"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-80"
        >
          <NudgeCard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
