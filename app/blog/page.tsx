import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Pramod Kumar Bindhani",
  description: "Notes on web development, learning, and building projects.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <p className="text-sm font-medium text-accent">Writing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-muted">
          Notes on web development, learning, and building projects.
        </p>
      </Reveal>

      <div className="mt-14">
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet. Check back soon.</p>
        ) : (
          posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <PostCard post={post} />
            </Reveal>
          ))
        )}
      </div>
    </div>
  );
}