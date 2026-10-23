import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import SocialLinks from "@/components/SocialLinks";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default async function Footer() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-linear-to-br from-accent/10 via-background to-cyan-500/5">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 pb-6 pt-12 sm:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight">Pramod<span className="text-accent">.</span></Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">Curious about technology. Focused on thoughtful, useful digital experiences.</p>
            <div className="mt-5"><SocialLinks /></div>
          </div>
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Explore</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 text-sm">{links.map((link) => <li key={link.href}><Link href={link.href} className="text-muted transition-colors hover:text-accent">{link.label}</Link></li>)}</ul>
          </nav>
          <div className="flex flex-col items-start gap-5 sm:col-span-2 sm:flex-row sm:items-end sm:justify-between lg:col-span-1 lg:flex-col lg:items-start lg:justify-start">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Have a project in mind?</p><Link href="/contact" className="mt-2 inline-flex items-center gap-2 font-medium transition-colors hover:text-accent">Let&apos;s talk <span aria-hidden="true">↗</span></Link></div>
            <BackToTop />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-xs text-muted sm:flex-row"><p>© {year} Pramod Kumar Bindhani</p><p>Designed with care.</p></div>
      </div>
    </footer>
  );
}
