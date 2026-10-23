import Link from "next/link";
import BackToTop from "@/components/BackToTop";

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
    <footer className="relative overflow-hidden border-t border-border bg-linear-to-b from-transparent to-accent/5 dark:to-accent/10">
      <div className="mx-auto max-w-5xl px-6 pt-16">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-xs">
            <p className="text-lg font-bold tracking-tight">
              Pramod<span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Full-stack developer building fast, reliable web products with
              React, Node.js, and the MERN stack.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <BackToTop />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-border py-6 text-xs text-muted sm:flex-row">
          <p>© {year} Pramod Kumar Bindhani</p>
          <p>Built with Next.js, TypeScript & Tailwind</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[3vw] select-none text-center text-[22vw] font-bold leading-[0.8] tracking-tighter text-foreground/[0.04] sm:text-[16vw]"
      >
        PRAMOD
      </p>
    </footer>
  );
}