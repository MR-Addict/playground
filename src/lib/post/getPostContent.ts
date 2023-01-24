import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/data/posts");

export default async function getPostContent(id: string) {
  const filePath = path.join(postsDir, `${id}.md`);
  const content = fs.readFileSync(filePath, "utf8");

  const matterResult = matter(content);

  return {
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags,
    markdown: matterResult.content,
  } as {
    title: string;
    date: string;
    tags: string[];
    markdown: string;
  };
}
