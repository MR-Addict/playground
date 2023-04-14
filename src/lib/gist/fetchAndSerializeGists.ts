import z from "zod";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";

import { Gist } from "@/types/gist";
import sanityClient from "@/lib/sanity";

export default async function fetchAndSerializeGists() {
  const result = await sanityClient.fetch({
    query: '*[_type == "gist"]',
    config: { cache: "force-cache", next: { revalidate: 60 } },
  });
  const parsedResult = z.array(Gist).parse(result);

  const gists = [];
  for (const gist of parsedResult) {
    const files = [];
    for (const file of gist.files) {
      const content = file.code;
      const markdown = `\`\`\`${file.language}:${file.filename}\n${content}${content.endsWith("\n") ? "" : "\n"}\`\`\``;

      const serializedMDX = await serialize(markdown, {
        mdxOptions: {
          rehypePlugins: [rehypeCodeTitles, [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]],
        },
      });

      files.push({ ...file, markdown, serializedMDX });
    }
    gists.push({ ...gist, files });
  }

  return gists.sort(({ _createdAt: a }, { _createdAt: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}
