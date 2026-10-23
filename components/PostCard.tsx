import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blog-types";

const cardAccents = [
  ["#251044", "#12264a", "#171338"],
  ["#07334a", "#102c58", "#132043"],
  ["#4a1b1b", "#492241", "#22204a"],
  ["#073b38", "#12324d", "#142449"],
];

export default function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  const palette = cardAccents[index % cardAccents.length];

  return (
    <article className="group min-w-0">
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full overflow-hidden rounded-3xl border border-white/10 text-white shadow-xl shadow-slate-950/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/25"
        style={{
          background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 52%, ${palette[2]} 100%)`,
        }}
      >
        <div className="relative flex min-h-44 items-center justify-center overflow-hidden border-b border-white/10 px-6 py-8 sm:min-h-52 sm:px-8">
          <div aria-hidden="true" className="absolute -right-12 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl transition-transform duration-500 group-hover:scale-125" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="relative max-w-lg text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-200 backdrop-blur sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              {post.category}
            </span>
            <h2 className="mt-4 line-clamp-3 font-serif text-2xl font-semibold italic leading-snug tracking-tight text-white sm:text-3xl">
              {post.title}
            </h2>
          </div>
        </div>

        <div className="px-6 py-5 sm:px-8 sm:py-6">
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-200/85 sm:text-base">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-slate-300/75 sm:text-xs">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} read</span>
            <span className="ml-auto font-sans font-semibold text-cyan-200 transition-transform group-hover:translate-x-1">Read article →</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
