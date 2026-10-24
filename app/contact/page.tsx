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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <section className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-cyan-500/[0.08] via-background to-indigo-500/[0.08] p-5 sm:p-8 lg:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/[0.07] blur-3xl" />

        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Get in touch
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s make something <span className="text-accent">meaningful.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Have a project, opportunity, or question? Send me a message. I&apos;m always happy to talk about technology and ideas worth building.
          </p>
        </Reveal>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border/80 bg-background/70 p-5 shadow-sm backdrop-blur sm:p-6">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-muted">Find me online</p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight">Let&apos;s connect.</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">I usually reply as soon as I can. You can also find my work and updates through these profiles.</p>
              <div className="mt-5"><SocialLinks /></div>
              {aboutLinks.email && <a href={`mailto:${aboutLinks.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground">{aboutLinks.email} <span aria-hidden="true">↗</span></a>}
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Open to</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Internships", "Freelance", "Full-time roles"].map((item) => <span key={item} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted">{item}</span>)}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="rounded-3xl border border-border bg-background p-5 shadow-xl shadow-black/5 sm:p-7">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">Send a message</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Tell me what you&apos;re thinking.</h2>
              <p className="mb-6 mt-2 text-sm text-muted">I&apos;ll get back to you as soon as possible.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
