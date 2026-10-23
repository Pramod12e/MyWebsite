import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/lib/blog-types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parsePost(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "Engineering",
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => parsePost(file.replace(/\.mdx$/, "")))
    .filter((post): post is Post => post !== null)
    .map(({ content: _content, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return parsePost(slug);
}

export type { Post, PostMeta } from "@/lib/blog-types";
