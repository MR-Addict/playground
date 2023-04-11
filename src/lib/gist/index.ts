import z from "zod";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";

import { env } from "@/types/env";

const GistFile = z.object({
  content: z.string(),
  filename: z.string(),
  type: z.string(),
  language: z.string(),
  raw_url: z.string(),
  size: z.number(),
});

const Gist = z.object({
  id: z.string(),
  html_url: z.string(),
  description: z.union([z.string(), z.null()]),
  created_at: z.string(),
  updated_at: z.string(),
  files: z.record(z.string(), GistFile),
});

export default async function serializeGist(id: string) {
  const result = await fetch("https://api.github.com/gists/" + id, {
    method: "GET",
    cache: "no-store",
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
  }).then((res) => res.json());

  const parsedResult = Gist.parse(result);

  const files = [];
  for (const file of Object.values(parsedResult.files)) {
    const content = file.content;
    const markdown = `\`\`\`${file.language}:${file.filename}\n${content}${content.endsWith("\n") ? "" : "\n"}\`\`\``;

    const serializedMDX = await serialize(markdown, {
      mdxOptions: { rehypePlugins: [rehypeCodeTitles, [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]] },
    });

    files.push({ ...file, markdown, serializedMDX });
  }

  return { ...parsedResult, files };
}
