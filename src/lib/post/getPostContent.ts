import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

const postsDir = path.join(process.cwd(), "src/data/posts");

export default async function getPostContent(id: string) {
  const filePath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const serializedMDX = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        remarkGfm,
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
  });

  return {
    title: data.title,
    date: data.date,
    tags: data.tags,
    markdown: content,
    serializedMDX,
  } as {
    title: string;
    date: string;
    tags: string[];
    markdown: string;
    serializedMDX: MDXRemoteSerializeResult;
  };
}
