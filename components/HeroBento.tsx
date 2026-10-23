"use client";

import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMedia } from "@/lib/useMedia";

/* ---------- Shared pieces ---------- */

function Tile({
  children,
  className = "p-4",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2, delay: 0 } }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={`rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
      {children}
    </p>
  );
}

/* ---------- Tile 1: typing code window ---------- */

type Seg = [string, string];

const W = "text-white/70";
const K = "text-sky-300";
const S = "text-emerald-300";

const code: Seg[] = [
  ["const ", "text-pink-300"], ["pramod", K], [" = {\n", W],
  ["  role", K], [": ", W], ['"Full-Stack Developer"', S], [",\n", W],
  ["  stack", K], [": [", W], ['"React"', S], [", ", W], ['"Node"', S], [", ", W], ['"MongoDB"', S], ["],\n", W],
  ["  learning", K], [": [", W], ['"Next.js"', S], [", ", W], ['"TypeScript"', S], ["],\n", W],
  ["  openToWork", K], [": ", W], ["true", "text-amber-300"], [",\n", W],
  ["};", W],
];

const fullText = code.map(([text]) => text).join("");
const TOTAL = fullText.length;
const HOLD = 90; // extra ticks to pause on the finished code
const starts = code.reduce<number[]>((acc, _segment, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + code[i - 1][0].length);
  return acc;
}, []);

function CodeTile() {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setCount((c) => (c >= TOTAL + HOLD ? 0 : c + 1));
    }, 24);
    return () => window.clearInterval(id);
  }, [reduced]);

  const shown = reduced ? TOTAL : Math.min(count, TOTAL);
  

  return (
    <Tile className="col-span-2 p-0" delay={0.1}>
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-[10px] text-white/50">profile.ts</span>
      </div>

      <div className="relative p-4 font-mono text-[10px] leading-5 sm:text-xs">
        {/* Invisible full text keeps the height fixed while typing */}
        <pre aria-hidden="true" className="invisible whitespace-pre">
          {fullText}
        </pre>

        <pre className="absolute inset-4 whitespace-pre">
          {code.map(([text, cls], i) => (
            <span key={i} className={cls}>
              {text.slice(0, Math.max(0, shown - starts[i]))}
            </span>
          ))}
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-cyan-300" />
          <div className="relative overflow-hidden p-4 font-mono text-[10px] leading-5 sm:text-xs"></div>
        </pre>
      </div>
    </Tile>
  );
}

/* ---------- Tile 2: 3D cube ---------- */

const faces: [string, string][] = [
  ["React", "rotateY(0deg)"],
  ["Node", "rotateY(90deg)"],
  ["SQL", "rotateY(180deg)"],
  ["Mongo", "rotateY(-90deg)"],
  ["Git", "rotateX(90deg)"],
  ["JS", "rotateX(-90deg)"],
];

function CubeTile() {
  return (
    <Tile className="flex items-center justify-center p-4" delay={0.25}>
      <div className="h-20 w-20 [perspective:500px]">
        <div className="cube relative h-full w-full [transform-style:preserve-3d]">
          {faces.map(([label, rotation]) => (
            <div
              key={label}
              className="absolute inset-0 flex items-center justify-center rounded-lg border border-cyan-200/50 bg-cyan-300/10 font-mono text-xs font-semibold text-white"
              style={{ transform: `${rotation} translateZ(40px)` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </Tile>
  );
}

/* ---------- Tile 3: what I'm learning ---------- */

const learning = ["Next.js", "TypeScript", "Tailwind CSS", "MDX"];

function LearningTile() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((value) => (value + 1) % learning.length),
      2000
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <Tile className="p-3" delay={0.35}>
      <Label>Learning now</Label>
      <div className="relative mt-1 h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={learning[index]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 text-base font-semibold"
          >
            {learning[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </Tile>
  );
}

/* ---------- Tile 4: live clock ---------- */

function ClockTile() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const tick = () => setTime(format.format(new Date()));

    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <Tile className="p-3" delay={0.4}>
      <Label>My time · IST</Label>
      <p className="mt-1 font-mono text-base font-semibold tabular-nums">{time}</p>
    </Tile>
  );
}

/* ---------- Tile 5: request flow ---------- */

function Connector({ delay }: { delay: number }) {
  const dot =
    "flow-dot absolute -top-0.5 h-[5px] w-[5px] rounded-full bg-cyan-200 shadow-[0_0_8px_2px_rgba(165,243,252,0.8)]";

  return (
    <div className="relative h-px flex-1 bg-white/25">
      <span className={dot} style={{ animationDelay: `${delay}s` }} />
      <span className={dot} style={{ animationDelay: `${delay + 1.2}s` }} />
    </div>
  );
}

const nodes = ["React", "Node API", "MongoDB"];

function FlowTile() {
  return (
    <Tile className="col-span-2 p-4" delay={0.5}>
      <Label>Request flow</Label>
      <div className="mt-3 flex items-center gap-2">
        {nodes.map((node, i) => (
          <Fragment key={node}>
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[11px]">
              {node}
            </span>
            {i < nodes.length - 1 && <Connector delay={i * 0.6} />}
          </Fragment>
        ))}
      </div>
    </Tile>
  );
}

/* ---------- Grid ---------- */

export default function HeroBento() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      <CodeTile />
      <CubeTile />
      <div className="grid grid-rows-2 gap-3 sm:gap-4">
        <LearningTile />
        <ClockTile />
      </div>
      <FlowTile />
    </div>
  );
}