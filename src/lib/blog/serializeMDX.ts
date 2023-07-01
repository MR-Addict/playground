import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default async function serializeMDX(markdown: string) {
  return await serialize(markdown, {
    mdxOptions: {
      rehypePlugins: [
        remarkGfm,
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }]
      ]
    }
  });
}
