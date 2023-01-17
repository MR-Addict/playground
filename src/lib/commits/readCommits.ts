import fs from "fs";
import path from "path";
import { commitType } from ".";

export default async function readJson() {
  const jsonDir = path.join(process.cwd(), "src/data");
  const fullPath = path.join(jsonDir, "commits.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data: { date: string; count: number; data: commitType[] }[] = JSON.parse(fileContents);
  return data;
}
