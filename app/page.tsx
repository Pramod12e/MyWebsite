import Link from "next/link";
import Preloader from "@/components/Preloader";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import HeroBento from "@/components/HeroBento";
import HeroWaves from "@/components/HeroWaves";
import AboutNudge from "@/components/AboutNudge";
import Ticker from "@/components/Ticker";
import { projects } from "@/lib/projects";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";

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
  const recentPosts = getAllPosts().slice(0, 2);

  return (
    <>
      <Preloader />
      <AboutNudge />

      {/* Hero */}
      <section className="p-4">
        <div className="relative isolate flex items-center overflow-hidden rounded-4xl bg-linear-to-br from-sky-700 via-blue-700 to-indigo-700 text-white shadow-2xl shadow-blue-500/20 dark:from-slate-900 dark:via-slate-950 dark:to-black dark:shadow-black/40">
          {/* Decorative glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-500/15"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-500/15"
          />

          <HeroWaves />

          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-14">
            <div>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm">
                  Pramod Kumar Bindhani · Full-Stack Developer
                </p>
              </Reveal>

              <AnimatedHeadline />

              <Reveal delay={0.7}>
                <p className="mt-6 hidden max-w-lg text-lg leading-relaxed text-white/80 md:block">
                  From React interfaces and Node.js APIs to SQL and MongoDB
                  databases, I turn ideas into fast, reliable full-stack
                  products.
                </p>
              </Reveal>

              <Reveal delay={0.9} className="mt-8 hidden flex-wrap gap-4 md:flex">
                <Link
                  href="/projects"
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
                >
                  View projects
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white"
                >
                  Read the blog
                </Link>
              </Reveal>

              <Reveal delay={1.1} className="mt-8 hidden md:block">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to internships & opportunities
                </span>
              </Reveal>
            </div>

            <HeroBento />
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-y border-border py-8">
        <p className="mx-auto max-w-5xl px-6 text-sm font-medium text-muted">
          Tech I work with
        </p>
        <Ticker items={skills} />
      </section>

      {/* Personal introduction */}
      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <Reveal className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">A little about me</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Computer Science Engineering student.<br /><span className="text-accent">Full-Stack Developer by passion.</span></h2>
          </div>
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-linear-to-br from-cyan-500/[0.07] via-background to-fuchsia-500/[0.08] p-5 shadow-lg shadow-accent/5 sm:p-6">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 -z-10 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-8 -z-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="mx-auto h-40 w-40 shrink-0 sm:mx-0 sm:h-36 sm:w-36"><div className="intro-orb" aria-hidden="true"><span className="intro-orb__core" /><span className="intro-orb__ring intro-orb__ring--one" /><span className="intro-orb__ring intro-orb__ring--two" /><span className="intro-orb__ring intro-orb__ring--three" /><span className="intro-orb__satellite" /></div></div>
              <div className="relative">
                <p className="leading-relaxed text-muted sm:text-base">I build scalable digital products, explore AI/ML integrations, and contribute to open-source software.</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">Open to <strong className="font-semibold text-foreground">internships</strong>, <strong className="font-semibold text-foreground">freelance projects</strong>, and <strong className="font-semibold text-foreground">full-time engineering roles</strong>. If you&apos;re building something meaningful, I&apos;d love to be part of it.</p>
                <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground">More about me <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </Reveal>
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

      {/* Latest writing */}
      {recentPosts.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <Reveal className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-accent">Fresh from the blog</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Latest writing</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:block">
              All articles →
            </Link>
          </Reveal>
          <div className="mt-8 grid gap-x-7 gap-y-10 sm:grid-cols-2">
            {recentPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.1}>
                <PostCard post={post} index={index} />
              </Reveal>
            ))}
          </div>
          <Link href="/blog" className="mt-8 inline-block text-sm font-medium text-muted transition-colors hover:text-foreground sm:hidden">
            All articles →
          </Link>
        </section>
      )}

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
