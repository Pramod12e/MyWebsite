"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/blog-types";

const PAGE_SIZE = 6;
const CATEGORY_GROUPS = ["Engineering", "Career & Journey"] as const;

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        const target = event.target;
        if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
        event.preventDefault();
        setSearchOpen(true);
        document.getElementById("blog-search")?.focus();
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const searchable = `${post.title} ${post.description} ${post.category} ${post.tags.join(" ")}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, posts, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visiblePosts = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function chooseCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  const firstItem = filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastItem = Math.min(page * PAGE_SIZE, filtered.length);

  return (
    <>
      <section className="blog-hero-shell px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="blog-hero relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border/70 bg-linear-to-br from-cyan-200 via-indigo-200 to-orange-100 shadow-xl shadow-accent/15 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 px-5 pb-9 pt-8 sm:rounded-[2.5rem] sm:px-10 sm:pb-11 sm:pt-11 lg:px-16 lg:pt-12">
          <div className="blog-hero-glow blog-hero-glow-one" aria-hidden="true" />
          <div className="blog-hero-glow blog-hero-glow-two" aria-hidden="true" />
          <div className="blog-hero-glow blog-hero-glow-three" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="blog-kicker inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm backdrop-blur-md dark:border-white/20 dark:bg-black/25 dark:text-white/85 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
              Writing <span className="text-accent">·</span> Ideas <span className="text-accent">·</span> Lessons
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-[-0.06em] text-foreground sm:mt-5 sm:text-6xl lg:text-7xl">
              The blog<span className="blog-title-dot" style={{ color: "transparent", backgroundImage: "linear-gradient(135deg, #06b6d4, #6366f1 55%, #d946ef)", backgroundClip: "text", WebkitBackgroundClip: "text" }}>.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-800/85 dark:text-white/80 sm:text-base lg:text-lg">
              Notes on web development, learning, and the things I build along the way.
            </p>

            <div className="mt-5 w-full max-w-xl sm:mt-6">
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <div className={`blog-search-box flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left shadow-lg shadow-black/5 transition-all sm:px-5 ${searchOpen ? "border-accent/60 ring-4 ring-accent/10" : "border-white/70 dark:border-white/15"}`}>
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></svg>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onFocus={() => setSearchOpen(true)}
                  onBlur={() => setSearchOpen(false)}
                  onChange={(event) => updateQuery(event.target.value)}
                  placeholder="Search articles..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted sm:text-base"
                />
                {!query && <kbd className="hidden shrink-0 rounded-lg border border-border/80 bg-background/70 px-2 py-1 font-mono text-[10px] text-muted sm:inline">Ctrl K</kbd>}
                {query && <button type="button" onClick={() => updateQuery("")} className="shrink-0 text-xs font-medium text-muted hover:text-foreground">Clear</button>}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Filter posts by category">
              {["All", ...CATEGORY_GROUPS].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => chooseCategory(item)}
                  aria-pressed={category === item}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-200 sm:px-5 sm:py-2 sm:text-sm ${category === item ? "border-slate-950 bg-slate-950 text-white shadow-md shadow-black/15 dark:border-white dark:bg-white dark:text-slate-950" : "border-indigo-300/80 bg-white/70 text-slate-800 hover:-translate-y-0.5 hover:border-indigo-500 hover:bg-white dark:border-white/25 dark:bg-black/25 dark:text-white/85 dark:hover:bg-black/40"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <svg aria-hidden="true" className="blog-wave absolute bottom-0 left-0 h-10 w-full sm:h-12" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path className="fill-indigo-700/20 dark:fill-cyan-300/20" d="M0,64 C180,110 330,20 520,55 C710,90 850,110 1040,58 C1220,10 1330,32 1440,60 L1440,120 L0,120 Z" />
            <path d="M0,82 C170,35 320,105 500,78 C690,48 830,36 1010,75 C1190,115 1320,75 1440,88 L1440,120 L0,120 Z" style={{ fill: "var(--background)" }} />
          </svg>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-6 sm:pb-16 sm:pt-8" aria-label="Articles">
        {visiblePosts.length ? (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:gap-x-9 lg:gap-y-14">
            {visiblePosts.map((post, index) => <PostCard key={post.slug} post={post} index={(page - 1) * PAGE_SIZE + index} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-lg font-semibold">No articles found</p>
            <p className="mt-2 text-sm text-muted">Try another search or choose a different category.</p>
          </div>
        )}

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-border pt-7 sm:flex-row">
          <p className="text-sm text-muted">Showing <span className="font-medium text-foreground">{firstItem}–{lastItem}</span> of <span className="font-medium text-foreground">{filtered.length}</span> articles <span aria-hidden="true">·</span> Page {page} of {pageCount}</p>
          <nav aria-label="Blog pagination" className="flex items-center gap-2">
            <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={page === 1} className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-40">← Previous</button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
              <button key={number} type="button" onClick={() => setPage(number)} aria-label={`Page ${number}`} aria-current={page === number ? "page" : undefined} className={`h-10 min-w-10 rounded-full border px-3 text-sm ${page === number ? "border-foreground bg-foreground text-background" : "border-border text-muted hover:text-foreground"}`}>{number}</button>
            ))}
            <button type="button" onClick={() => setPage((value) => Math.min(pageCount, value + 1))} disabled={page === pageCount} className="rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-foreground/40 disabled:cursor-not-allowed disabled:opacity-40">Next →</button>
          </nav>
        </div>
      </section>
    </>
  );
}
