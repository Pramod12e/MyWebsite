import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Image from "next/image";

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
        <div className="absolute inset-0 -z-20 lg:left-[18%] lg:[mask-image:linear-gradient(to_right,transparent,black_30%)]">
          <Image
            src="/hero.png"
            alt="Pramod Kumar Bindhani"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[56%_center]"
          />
        </div>

        {/* Dark overlay so the text stays readable */}
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/90 via-black/30 to-transparent lg:bg-linear-to-r lg:from-black/85 lg:via-black/25 lg:to-transparent" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-14 pt-24 lg:py-24">
          <div className="max-w-md">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Open to internships &amp; opportunities
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Hi, I&apos;m{" "}
                <span className="bg-linear-to-r from-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  Pramod
                </span>
                .
                <br />
                I build for the web.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                Full-stack developer and B.Tech CSE student. I build fast, modern web
                apps with React, Node.js, and the MERN stack.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
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
      </section>

      {/* Skills */}
      <section className="border-y border-border">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Reveal>
            <p className="text-sm font-medium text-muted">Tech I work with</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
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
