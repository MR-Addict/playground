import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import serializeMDX from "./serializeMDX";

const postsDir = path.join(process.cwd(), "src/assets/posts");

export default async function getPostContent(id: string) {
  const filePath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const serializedMDX = await serializeMDX(content);

  return {
    title: data.title,
    date: data.date,
    tags: data.tags,
    markdown: content,
    serializedMDX
  } as {
    title: string;
    date: string;
    tags: string[];
    markdown: string;
    serializedMDX: MDXRemoteSerializeResult;
  };
}
