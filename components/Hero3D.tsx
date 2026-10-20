"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";

// Loaded only in the browser, so Three.js never slows the first paint.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function useMedia(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const small = useMedia("(max-width: 767px)");

  // Pause rendering when the hero is scrolled out of view.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fade-in pointer-events-none absolute inset-0 -z-15"
    >
      <HeroScene small={small} active={visible} />
    </div>
  );
}