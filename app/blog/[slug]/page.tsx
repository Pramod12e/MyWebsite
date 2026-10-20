import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDate, getAllPosts, getPost } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Pramod Kumar Bindhani`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← All posts
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <ul className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </header>

      <div className="prose prose-lg mt-12 max-w-none">
        <MDXRemote source={post.content} options={{ mdxOptions }} />
      </div>
    </article>
  );
}