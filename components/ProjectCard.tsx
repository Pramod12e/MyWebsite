import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <h3 className="text-xl font-semibold tracking-tight">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-block text-muted transition-all group-hover:translate-x-1 group-hover:text-foreground"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between text-sm font-medium">
        <div className="flex gap-5">
          <a href={project.live} className="transition-colors hover:text-accent">
            Live demo ↗
          </a>
          <a href={project.github} className="transition-colors hover:text-accent">
            GitHub ↗
          </a>
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="text-muted transition-colors hover:text-foreground"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
