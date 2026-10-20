import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import AboutPhoto from "@/components/AboutPhoto";
import SectionHeading from "@/components/SectionHeading";
import { skillGroups } from "@/lib/about";

export const metadata: Metadata = {
  title: "About | Pramod Kumar Bindhani",
  description: "Learn more about Pramod Kumar Bindhani, full-stack developer.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      {/* Intro: photo first on mobile */}
      <section className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-x-12 md:gap-y-8">
        {/* Photo */}
        <Reveal className="mx-auto w-full max-w-sm md:col-start-2 md:row-span-2 md:row-start-1 md:h-full md:max-w-none">
          <AboutPhoto />
        </Reveal>

        {/* Intro text */}
        <div className="md:col-start-1 md:row-start-1">
          <Reveal>
            <p className="text-sm font-medium text-accent">About me</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Developer, learner, builder.
            </h1>
          </Reveal>

          <Reveal
            delay={0.1}
            className="mt-8 space-y-5 text-lg leading-relaxed text-muted"
          >
            <p>
              I&apos;m Pramod, a Computer Science Engineering student who loves
              turning ideas into working web products. I build full-stack apps
              with the MERN stack and care about clean code and smooth user
              experiences.
            </p>
            <p>
              My projects include a property listing platform, a telemedicine
              platform with real-time video consultations, and an admin
              dashboard with user management. Right now I&apos;m leveling up
              with TypeScript and Next.js.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-8">
            <a
              href="/resume.pdf"
              download
              className="inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              Download resume ↓
            </a>
          </Reveal>
        </div>

        {/* Education */}
        <Reveal delay={0.2} className="md:col-start-1 md:row-start-2">
          <div className="flex items-center gap-4 rounded-2xl border border-border p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10 12 5 2 10l10 5 10-5z" />
                <path d="M6 12v5c3 2 9 2 12 0v-5" />
              </svg>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Education
              </p>
              <h3 className="mt-1 font-semibold leading-snug">
                B.Tech in Computer Science Engineering
              </h3>
              <p className="mt-0.5 text-sm text-muted">
                Government College of Engineering, Keonjhar
              </p>
              <p className="mt-2 font-mono text-xs text-accent">
                Graduating 2028
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mt-20 md:mt-24">
        <Reveal>
          <SectionHeading eyebrow="Skills" title="What I work with" />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border p-6 transition-colors hover:border-accent/50">
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
