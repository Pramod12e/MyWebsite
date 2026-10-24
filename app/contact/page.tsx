import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import { aboutLinks } from "@/lib/about";

export const metadata: Metadata = {
  title: "Contact | Pramod Kumar Bindhani",
  description: "Get in touch with Pramod Kumar Bindhani.",
};

export default function Contact() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-4 py-8 sm:px-6 sm:py-10">
      <section className="relative isolate grid w-full items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-cyan-500/[0.08] via-background to-indigo-500/[0.08] p-5 sm:p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10 lg:gap-14 lg:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.07] blur-3xl" />

        <Reveal className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Get in touch
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s make something <span className="text-accent">meaningful.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Have a project, opportunity, or question? Send me a message. I&apos;m always happy to talk about technology and ideas worth building.
          </p>
          <div className="mt-7 border-t border-border/70 pt-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Find me online</p>
            <div className="mt-4"><SocialLinks /></div>
            <a href={`mailto:${aboutLinks.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground">{aboutLinks.email}<span aria-hidden="true">↗</span></a>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="rounded-3xl border border-border/80 bg-background/85 p-5 shadow-2xl shadow-black/10 backdrop-blur sm:p-7 lg:p-8">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">Send a message</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tell me what you&apos;re thinking.</h2>
            <p className="mb-6 mt-2 text-sm text-muted">I&apos;ll get back to you as soon as possible.</p>
            <ContactForm />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
