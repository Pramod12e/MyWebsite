import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-32 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        Back to home
      </Link>
    </section>
  );
}