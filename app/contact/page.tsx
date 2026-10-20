import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Pramod Kumar Bindhani",
  description: "Get in touch with Pramod Kumar Bindhani.",
};

const socials = [
  { label: "GitHub", href: "https://github.com/your-username" },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-username" },
  { label: "Email", href: "mailto:your-email@example.com" },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium text-accent">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s talk.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Have a project, an opportunity, or a question? Send me a message
            and I&apos;ll get back to you.
          </p>

          <ul className="mt-8 space-y-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-accent"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}