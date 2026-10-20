import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const pages = ["", "/about", "/projects", "/blog", "/contact"].map((path) => ({
    url: `${base}${path}`,
  }));

  const projectPages = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
  }));

  const postPages = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [...pages, ...projectPages, ...postPages];
}