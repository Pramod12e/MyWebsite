import { aboutLinks } from "@/lib/about";

const items = [
  { label: "GitHub", href: aboutLinks.github, kind: "github" },
  { label: "LinkedIn", href: aboutLinks.linkedin, kind: "linkedin" },
  { label: "Email", href: aboutLinks.email ? `mailto:${aboutLinks.email}` : "", kind: "email" },
];

function BrandMark({ kind }: { kind: string }) {
  if (kind === "github") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.03.76 2.08v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  if (kind === "linkedin") return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.85H4.95V9.27h2.98v9.58ZM6.44 7.96a1.73 1.73 0 1 1 .02-3.46 1.73 1.73 0 0 1-.02 3.46Zm12.42 10.89h-2.98v-4.66c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.74H9.56V9.27h2.86v1.31h.04c.4-.75 1.37-1.55 2.82-1.55 3.02 0 3.58 1.99 3.58 4.58v5.24Z" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6" /></svg>;
}

export default function SocialLinks() {
  return <div className="flex flex-wrap items-center gap-3">
    {items.map((item) => {
      const className = `inline-flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm ring-1 ring-black/5 transition-all hover:-translate-y-0.5 hover:shadow-md ${item.kind === "github" ? "bg-[#24292f]" : item.kind === "linkedin" ? "bg-[#0a66c2]" : "bg-[#ea4335]"}`;
      const icon = <BrandMark kind={item.kind} />;
      return item.href ? <a key={item.label} href={item.href} target={item.label === "Email" ? undefined : "_blank"} rel={item.label === "Email" ? undefined : "noreferrer"} aria-label={item.label} title={item.label} className={className}>{icon}</a> : <span key={item.label} aria-label={`${item.label} link not set`} title={`${item.label} profile is not configured yet`} className={`${className} cursor-help opacity-75`}>{icon}</span>;
    })}
  </div>;
}
