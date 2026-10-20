export default async function Footer() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted sm:flex-row">
        <p>© {year} Pramod Kumar Bindhani</p>
        <p>Built with Next.js, TypeScript & Tailwind</p>
      </div>
    </footer>
  );
}