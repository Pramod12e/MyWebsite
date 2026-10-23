import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Pramod Kumar Bindhani",
  description: "Notes on web development, learning, and building projects.",
};

export default function Blog() {
  const posts = getAllPosts();
  return <BlogIndex posts={posts} />;
}
