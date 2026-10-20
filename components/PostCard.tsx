import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-border py-8 first:pt-0">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="mt-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{post.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}