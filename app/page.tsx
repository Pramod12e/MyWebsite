import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroBackground from "@/components/HeroBackground";
import Ticker from "@/components/Ticker";
import { projects } from "@/lib/projects";
import Hero3D from "@/components/Hero3D";


const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Tailwind CSS",
  "Git",
  "Java",
  "C",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-[#020b14] lg:items-center">
        <div className="absolute inset-0 -z-20 overflow-hidden lg:left-[18%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
                <HeroBackground />
                 <Hero3D />
              </div>

        {/* Dark overlay so the text stays readable */}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/30 to-transparent lg:bg-linear-to-r lg:from-black/85 lg:via-black/25 lg:to-transparent" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-14 pt-24 lg:py-24">
          <div className="max-w-md">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to internships & opportunities
              </span>
            </Reveal>

            <AnimatedHeadline />

            <Reveal delay={0.7}>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Full-stack developer and B.Tech CSE student. I build fast, modern web
                apps with React, Node.js, and the MERN stack.
              </p>
            </Reveal>

            <Reveal delay={0.9} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                View projects
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
              >
                Read the blog
              </Link>
            </Reveal>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <span className="scroll-line block h-10 w-px bg-white/50" />
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-border py-8">
        <p className="mx-auto max-w-5xl px-6 text-sm font-medium text-muted">
          Tech I work with
        </p>
        <Ticker items={skills} />
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-accent">Selected work</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Featured projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:block"
          >
            See all →
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <div className="rounded-3xl bg-foreground px-8 py-14 text-center text-background">
            <h2 className="text-3xl font-bold tracking-tight">
              Let&apos;s build something together
            </h2>
            <p className="mx-auto mt-3 max-w-md text-background/70">
              Have an idea, an opportunity, or just want to say hi?
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-80"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
