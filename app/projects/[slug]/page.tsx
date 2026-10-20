import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getProject, projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Pramod Kumar Bindhani`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <Link
          href="/projects"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {project.longDescription}
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-4">
          <a
            href={project.live}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Live demo ↗
          </a>
          <a
            href={project.github}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-foreground"
          >
            GitHub ↗
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="mt-16 text-2xl font-bold tracking-tight">Key features</h2>
        <ul className="mt-6 space-y-3">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}
