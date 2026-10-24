import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import AboutPhoto from "@/components/AboutPhoto";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import AboutCertificates from "@/components/AboutCertificates";
import SketchbookGallery from "@/components/SketchbookGallery";
import AboutVisitMarker from "@/components/AboutVisitMarker";
import { aboutLinks, certificationEntries, educationEntries, portraitArtworks, skillGroups } from "@/lib/about";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About | Pramod Kumar Bindhani",
  description: "Meet Pramod Kumar Bindhani, a computer science student and software developer focused on building user-centered web experiences.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16 md:py-20">
      <AboutVisitMarker />
      <section className="grid items-center gap-x-12 gap-y-6 md:grid-cols-[1.15fr_0.85fr] md:gap-y-5">
        <Reveal className="order-1 md:col-start-1 md:row-start-1">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="font-serif italic tracking-[-0.045em]">Pramod Kumar Bindhani</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="order-2 mx-auto w-full max-w-sm md:col-start-2 md:row-span-3 md:row-start-1 md:max-w-none"><AboutPhoto /></Reveal>

        <div className="order-3 md:col-start-1 md:row-start-2">
          <Reveal delay={0.12} className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>I&apos;m a Computer Science Engineering student with a passion for technology and web development. Alongside my studies, I work as a software developer, building seamless, efficient, and user-centered digital experiences across front-end and back-end technologies.</p>
            <p>I enjoy taking an idea from its first sketch to a working product, with thoughtful interfaces, dependable APIs, and clean, maintainable code.</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="order-4 flex flex-wrap items-center gap-4 border-t border-border pt-5 md:col-start-1 md:row-start-3 sm:gap-6">
          <p className="font-serif text-2xl italic font-semibold tracking-tight text-accent">Follow me</p>
          <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80">Download resume <span aria-hidden="true">↓</span></a>
          <SocialLinks />
        </Reveal>
      </section>

      <section className="mt-16 sm:mt-20" id="tech-stack">
        <Reveal><SectionHeading eyebrow="Tech stack" title="Tools I use to build" /></Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => <Reveal key={group.title} delay={index * 0.05}><div className="h-full rounded-2xl border border-border bg-background/70 p-5 transition-colors hover:border-accent/50"><h3 className="font-semibold">{group.title}</h3><ul className="mt-4 flex flex-wrap gap-2">{group.items.map((item) => <li key={item} className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] leading-5 text-muted sm:text-[11px]">{item}</li>)}</ul></div></Reveal>)}
        </div>
      </section>

      <section className="mt-16 sm:mt-20" id="projects">
        <Reveal className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="Selected work" title="Projects I&apos;ve built" /><Link href="/projects" className="pb-1 text-sm font-medium text-muted transition-colors hover:text-accent">View project details →</Link></Reveal>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 3).map((project, index) => <Reveal key={project.slug} delay={index * 0.06}><ProjectCard project={project} /></Reveal>)}</div>
      </section>

      <section className="mt-16 sm:mt-20" id="certifications">
        <Reveal><SectionHeading eyebrow="Certifications" title="Courses and certificates" /></Reveal>
        <AboutCertificates entries={certificationEntries} />
      </section>

      <section className="mt-16 sm:mt-20" id="education">
        <Reveal><SectionHeading eyebrow="Education" title="Where I learned" /></Reveal>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">Each card has space for a school or college logo when you have the image.</p>
        <div className="mt-6 space-y-4">{educationEntries.map((education, index) => <Reveal key={education.level} delay={index * 0.06}><article className="flex items-center gap-4 rounded-2xl border border-border bg-background/70 p-4 sm:gap-5 sm:p-5"><div aria-label="Institution logo placeholder" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-border bg-foreground/[0.02] text-[10px] font-medium uppercase tracking-wide text-muted">Logo</div><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-accent">{education.level}</p><h3 className="mt-1 font-semibold leading-snug">{education.program}</h3><p className="mt-1 text-sm text-muted">{education.institution}</p><p className="mt-1 font-mono text-xs text-muted sm:hidden">{education.period}</p></div><p className="hidden shrink-0 text-right font-mono text-xs text-muted sm:block">{education.period}</p></article></Reveal>)}</div>
      </section>

      <section className="mt-16 sm:mt-20" id="github-activity">
        <Reveal className="flex flex-wrap items-end justify-between gap-4"><SectionHeading eyebrow="GitHub activity" title="Contributions over time" /><a href={aboutLinks.github} target="_blank" rel="noreferrer" className="pb-1 text-sm font-medium text-accent transition-colors hover:text-foreground">View GitHub profile ↗</a></Reveal>
        <Reveal delay={0.08}><div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background/70 p-5 sm:p-6"><p className="text-sm text-muted">Contribution graph placeholder — connect your GitHub history here when ready.</p><div aria-hidden="true" className="mt-5 overflow-x-auto pb-2"><div className="grid w-max grid-flow-col grid-rows-7 gap-1">{Array.from({ length: 364 }, (_, index) => <span key={index} className="h-2.5 w-2.5 rounded-[3px] border border-border/70 bg-foreground/[0.035] sm:h-3 sm:w-3" />)}</div></div><div className="mt-3 flex items-center justify-between text-xs text-muted"><span>Less</span><div className="flex gap-1">{["bg-foreground/5", "bg-emerald-500/25", "bg-emerald-500/45", "bg-emerald-500/70", "bg-emerald-500"].map((color) => <span key={color} className={`h-2.5 w-2.5 rounded-[3px] ${color}`} />)}</div><span>More</span></div></div></Reveal>
      </section>

      <section className="mt-16 sm:mt-20" id="hobbies">
        <Reveal><SectionHeading eyebrow="Beyond the screen" title="A few things I enjoy" /></Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal><SketchbookGallery artworks={portraitArtworks} /></Reveal>
          {[
            { icon: "▤", title: "Reading books", detail: "Always learning" },
            { icon: "文", title: "Learning languages", detail: "One phrase at a time" },
            { icon: "🏸", title: "Playing badminton", detail: "A little friendly competition" },
          ].map((hobby, index) => <Reveal key={hobby.title} delay={(index + 1) * 0.05}><article className="h-full rounded-2xl border border-border bg-background/70 p-5 transition-all hover:-translate-y-1 hover:border-accent/40"><span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent">{hobby.icon}</span><h3 className="mt-4 font-semibold">{hobby.title}</h3><p className="mt-1 text-sm text-muted">{hobby.detail}</p></article></Reveal>)}
        </div>
      </section>

      <section className="mt-16 sm:mt-20" id="contact">
        <Reveal><div className="rounded-3xl bg-foreground px-6 py-9 text-background sm:px-10 sm:py-12"><p className="text-sm font-medium text-accent">Get in touch</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Let&apos;s talk technology.</h2><p className="mt-4 max-w-3xl leading-relaxed text-background/75">I&apos;m always open to discussing new opportunities, freelance projects, or just having a chat about technology. Connect with me using the links below, and I&apos;ll get back to you as soon as possible.</p><div className="mt-6"><SocialLinks /></div></div></Reveal>
      </section>
    </div>
  );
}
