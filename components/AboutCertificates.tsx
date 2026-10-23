"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type Certificate = { number: string; issuer: string; title: string; detail: string };

export default function AboutCertificates({ entries }: { entries: Certificate[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? entries : entries.slice(0, 3);

  return <>
    <div className="mt-6 space-y-3">{visible.map((certificate, index) => <Reveal key={certificate.number} delay={index * 0.04}><article className="flex items-center gap-4 rounded-2xl border border-border bg-background/70 p-4 transition-colors hover:border-accent/40 sm:gap-5 sm:p-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-300">{certificate.number}</div><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-accent">{certificate.issuer}</p><h3 className="mt-1 font-semibold">{certificate.title}</h3><p className="mt-1 text-sm text-muted">{certificate.detail}</p></div><span aria-hidden="true" className="hidden text-xl text-muted sm:block">↗</span></article></Reveal>)}</div>
    {entries.length > 3 && <div className="mt-5 flex justify-center"><button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} className="rounded-full border border-border bg-background/70 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent/50 hover:text-accent">{expanded ? "Show fewer certificates ↑" : "View more certificates ↓"}</button></div>}
  </>;
}
