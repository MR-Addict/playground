import { formatDate } from "@/lib/utils";

interface CommitType {
  date: string;
  message: string;
}

export default async function fetchOnePage(per_page: number, page: number) {
  const res = await fetch(
    `https://api.github.com/repos/MR-Addict/playground/commits?per_page=${per_page}&page=${page}`,
    { headers: { Authorization: "Basic " + Buffer.from(`MR-Addict:${process.env.GITHUB_TOKEN}`).toString("base64") } }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  const result = await res.json();

  const shrinkedData: CommitType[] = result.map((item: any) => ({
    date: formatDate(item.commit.committer.date),
    message: item.commit.message,
  }));
  return shrinkedData;
}
