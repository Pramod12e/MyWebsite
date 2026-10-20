"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  char: "0" | "1";
};

const MAX_PARTICLES = 160;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let lastX: number | null = null;
    let lastY: number | null = null;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const root = document.documentElement;
      const dark = root.classList.contains("dark");
      const accent =
        getComputedStyle(root).getPropertyValue("--accent").trim() || "#22d3ee";
      const hot = dark ? "#ffffff" : accent;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;

        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }

        const drag = Math.max(0, 1 - 2.2 * dt);
        p.vx *= drag;
        p.vy = p.vy * drag - 35 * dt; // heat rises
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        const t = p.age / p.life;
        const color = t < 0.2 ? hot : accent;

        ctx.globalAlpha = Math.pow(1 - t, 1.5);
        ctx.fillStyle = color;
        ctx.shadowColor = accent;
        ctx.shadowBlur = dark ? 8 : 0;
        ctx.font = `${p.size * (1 - t * 0.35)}px ui-monospace, "Geist Mono", monospace`;
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (particles.length > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;

      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist < 3) return;

      const dirX = dx / dist;
      const dirY = dy / dist;
      const back = 40 + Math.min(dist, 50) * 3;
      const count = Math.min(4, Math.ceil(dist / 10));

      for (let k = 1; k <= count; k++) {
        particles.push({
          x: lastX + (dx * k) / count,
          y: lastY + (dy * k) / count,
          vx: -dirX * back + (Math.random() - 0.5) * 60,
          vy: -dirY * back + (Math.random() - 0.5) * 60,
          age: 0,
          life: 0.6 + Math.random() * 0.5,
          size: 10 + Math.random() * 6,
          char: Math.random() < 0.5 ? "0" : "1",
        });
      }

      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }

      lastX = x;
      lastY = y;
      start();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-70 h-screen w-screen"
    />
  );
}