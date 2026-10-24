"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PortraitArtwork } from "@/lib/about";

export default function SketchbookGallery({ artworks }: { artworks: PortraitArtwork[] }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return <>
    <motion.button
      type="button"
      onClick={() => setOpen(true)}
      whileHover={reduceMotion ? undefined : { y: -5, rotateX: 4, rotateY: -4 }}
      whileTap={{ scale: 0.985 }}
      style={{ transformPerspective: 800 }}
      className="group relative h-full w-full overflow-hidden rounded-2xl border border-fuchsia-400/30 bg-linear-to-br from-indigo-500/10 via-background to-fuchsia-500/10 p-5 text-left shadow-lg shadow-indigo-500/5 transition-shadow hover:border-fuchsia-400/60 hover:shadow-xl hover:shadow-fuchsia-500/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <motion.span aria-hidden="true" className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-400/15 blur-3xl" animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
      <span className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-300/25 bg-linear-to-br from-indigo-500/20 to-fuchsia-500/20 text-2xl text-fuchsia-500 dark:text-fuchsia-200">✎</span>
        <span className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">Sketchbook</span>
      </span>
      <span className="relative mt-5 block text-lg font-semibold tracking-tight">Portrait sketching</span>
      <span className="relative mt-1 block text-sm text-muted">A little art beyond the screen</span>
      <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">Open gallery <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span></span>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-4 font-serif text-5xl italic text-fuchsia-500/[0.08] dark:text-fuchsia-200/[0.1]">✧</span>
    </motion.button>

    <AnimatePresence>
      {open && <motion.div
        role="presentation"
        onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
      >
        <motion.section
          role="dialog" aria-modal="true" aria-labelledby="sketchbook-title"
          initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background p-5 shadow-2xl sm:p-7"
        >
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">The sketchbook</p><h2 id="sketchbook-title" className="mt-1 text-2xl font-semibold">Portrait studies</h2><p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">A few pencil lines, expressions, and faces I&apos;ve enjoyed bringing to life.</p></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close sketchbook" className="rounded-full border border-border px-3 py-2 text-sm text-muted transition-colors hover:text-foreground">✕</button>
          </div>
          {artworks.length ? <div className="mt-6 grid grid-cols-2 gap-4 [perspective:1000px] sm:grid-cols-3">{artworks.map((artwork, index) => <motion.figure key={artwork.src} initial={{ opacity: 0, y: 18, rotateY: -10 }} animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -3, 0], rotateY: 0 }} transition={{ opacity: { delay: index * 0.07 }, y: { duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" }, rotateY: { duration: 0.45 } }} whileHover={reduceMotion ? undefined : { rotateY: 5, rotateX: -3, scale: 1.035 }} style={{ transformStyle: "preserve-3d" }} className="overflow-hidden rounded-2xl border border-border bg-background shadow-lg shadow-accent/10"><Image src={artwork.src} alt={artwork.title} width={600} height={700} className="aspect-[4/5] w-full object-cover" /><figcaption className="px-3 py-2.5"><span className="block truncate text-sm font-medium">{artwork.title}</span>{artwork.medium && <span className="mt-0.5 block truncate text-xs text-muted">{artwork.medium}</span>}</figcaption></motion.figure>)}</div> : <div className="mt-6 overflow-hidden rounded-2xl border border-dashed border-border bg-linear-to-br from-indigo-500/[0.06] to-fuchsia-500/[0.08] p-6 sm:p-8">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-fuchsia-300/30 bg-background/70 shadow-inner shadow-fuchsia-500/10">
                <motion.span aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute inset-3 rounded-full border border-dashed border-indigo-400/40" />
                <svg aria-hidden="true" viewBox="0 0 96 96" className="h-20 w-20 fill-none stroke-current text-muted/70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M29 37c1-13 9-21 20-21 12 0 20 9 20 23v9c0 15-9 26-21 26-11 0-19-9-20-23"/><path d="M36 43c3-2 6-2 9 0m12 0c3-2 6-2 9 0M43 57c4 3 8 3 12 0m-10-5 4-2 4 2m-20-8-7 3m38-3 7 3M24 82c5-10 13-15 24-15s20 5 25 15"/><path d="M25 31c5-14 16-21 29-19 10 1 17 7 20 18" strokeDasharray="2 3"/></svg>
              </div>
              <p className="mt-5 font-semibold">Sketches are on the way</p>
              <p className="mt-1 text-sm text-muted">My portrait drawings will appear here soon.</p>
            </div>
          </div>}
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </>;
}
