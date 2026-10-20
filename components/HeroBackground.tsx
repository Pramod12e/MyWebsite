"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function HeroBackground() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const { scrollY } = useScroll();
  const scrollOffset = useTransform(scrollY, [0, 600], [0, 40]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const onMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * -24);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * -16);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  return (
    <motion.div style={{ y: scrollOffset }} className="absolute inset-0">
      <motion.div style={{ x, y }} className="absolute -inset-8">
        <Image
          src="/hero.png"
          alt="Pramod Kumar Bindhani"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[56%_center]"
        />
      </motion.div>
    </motion.div>
  );
}