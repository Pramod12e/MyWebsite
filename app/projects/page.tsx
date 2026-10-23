import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Pramod Kumar Bindhani",
  description: "Full-stack projects built by Pramod Kumar Bindhani.",
};

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium text-accent">Work</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Things I&apos;ve built while learning and exploring full-stack
          development.
        </p>
      </Reveal>


      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.1}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}