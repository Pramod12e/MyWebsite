export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & { content: string };

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
