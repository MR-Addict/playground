import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/data/posts");

interface blogType {
  id: string;
  title: string;
  date: string;
  tags: string[];
  intro: string;
}

export default function getAllPostsProps() {
  const postsNames = fs.readdirSync(postsDir);

  const allPostsProps = postsNames.map((fileName) => {
    const filePath = path.join(postsDir, fileName);
    const content = fs.readFileSync(filePath, "utf8");
    const matterResult = matter(content).data;

    return {
      id: fileName.replace(/\.md$/, ""),
      ...matterResult,
    } as blogType;
  });

  return allPostsProps.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}
