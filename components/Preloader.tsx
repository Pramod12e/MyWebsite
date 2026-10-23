"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import dynamic from "next/dynamic";
import { useMedia } from "@/lib/useMedia";

const PreloaderScene = dynamic(() => import("./PreloaderScene"), { ssr: false });

const STORAGE_KEY = "intro-seen";
const DURATION = 3000; // ms: length of the story
const HOLD = 800; // ms: pause on the handshake at 100%
const FADE = 2000; // ms: slow fade out

const logs = [
  { at: 2, kind: "war", text: "conflict detected: human vs ai" },
  { at: 18, kind: "war", text: "exchanging blows: data leaking" },
  { at: 36, kind: "war", text: "analysis: no winner possible" },
  { at: 52, kind: "peace", text: "ceasefire proposed" },
  { at: 68, kind: "peace", text: "trust protocol: approach" },
  { at: 84, kind: "peace", text: "handshake: human + ai" },
  { at: 96, kind: "peace", text: "ready. welcome." },
];

function subscribe() {
  return () => {};
}

function getSeen() {
  try {
    // Open the site with ?intro to replay the animation.
    if (new URLSearchParams(window.location.search).has("intro")) return false;
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function Preloader() {
  const seen = useSyncExternalStore(subscribe, getSeen, () => false);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const small = useMedia("(max-width: 767px)");

  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  const progressRef = useRef(0);
  const exitingRef = useRef(false);
  const finishingRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const skip = seen || reduced || done;

  const startExit = useCallback((delay: number) => {
    timersRef.current.push(
      window.setTimeout(() => {
        exitingRef.current = true;
        setExiting(true);
        document.documentElement.style.overflow = "";
      }, delay),
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* ignore */
        }
        setDone(true);
      }, delay + FADE + 100)
    );
  }, []);

  useEffect(() => {
    if (skip) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";

    let loaded = document.readyState === "complete";
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    // Safety: never wait forever for the load event.
    const forceLoad = window.setTimeout(() => {
      loaded = true;
    }, DURATION + 3000);

    const start = performance.now();
    let raf = 0;
    let shown = -1;

    const tick = (now: number) => {
      if (finishingRef.current) return;

      const t = Math.min((now - start) / DURATION, 1);
      const value = Math.min(t, loaded ? 1 : 0.92);
      progressRef.current = value;

      const rounded = Math.round(value * 100);
      if (rounded !== shown) {
        shown = rounded;
        setProgress(rounded);
      }

      if (value >= 1) {
        finishingRef.current = true;
        startExit(HOLD);
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(forceLoad);
      window.removeEventListener("load", onLoad);
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
      root.style.overflow = "";
    };
  }, [skip, startExit]);

  const handleSkip = () => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    progressRef.current = 1;
    setProgress(100);
    startExit(0);
  };

  if (skip) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-100 overflow-hidden bg-[#020b14] text-white transition-opacity duration-[2000ms] ease-in-out ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="sr-only">Loading portfolio</span>

      <div aria-hidden="true" className="absolute inset-0">
        <PreloaderScene small={small} progress={progressRef} exiting={exitingRef} />
      </div>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#020b14_90%)]"
      />

      {/* Name tag */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-white/70 sm:left-10 sm:top-8"
      >
        Pramod<span className="text-cyan-300">.</span>dev
      </div>

      {/* Versus label */}
      <p
        aria-hidden="true"
        className="absolute inset-x-0 top-16 text-center font-mono text-xs uppercase tracking-[0.4em] text-white/60 sm:top-8"
      >
        <span className="text-amber-400">Human</span>{" "}
        <span className="text-white">{progress < 56 ? "vs" : "+"}</span>{" "}
        <span className="text-cyan-300">AI</span>
      </p>

      {/* Skip */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-medium backdrop-blur transition-colors hover:border-white sm:right-10 sm:top-8"
      >
        Skip
      </button>

      {/* Terminal log + counter */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-10"
      >
        <div className="font-mono text-xs leading-6 text-white/80 sm:text-sm">
          <p className="mb-2 text-white/50">pramod@portfolio:~$ ./make-peace --human --ai</p>
          {logs
            .filter((entry) => progress >= entry.at)
            .slice(-4)
            .map((entry) => (
              <p key={entry.text}>
                <span className={entry.kind === "war" ? "text-amber-400" : "text-emerald-400"}>
                  {entry.kind === "war" ? "!" : "✓"}
                </span>{" "}
                {entry.text}
              </p>
            ))}
          <span className="inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />
        </div>

        <p className="font-mono text-5xl font-bold tabular-nums sm:text-7xl">
          {String(progress).padStart(3, "0")}
          <span className="text-2xl text-cyan-300 sm:text-3xl">%</span>
        </p>
      </div>

      {/* Progress bar */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-linear-to-r from-amber-400 to-cyan-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}