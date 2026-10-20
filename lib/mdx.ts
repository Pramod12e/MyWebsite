import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

type MdxOptions = NonNullable<MDXRemoteProps["options"]>["mdxOptions"];

export const mdxOptions: MdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
  ],
};