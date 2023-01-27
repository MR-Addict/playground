import { formatDate, groupByDate } from "@/lib/utils";

async function fetchdata() {
  const repository = "MR-Addict/playground";
  const res = await fetch(`https://api.github.com/repos/${repository}/commits?per_page=100`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const result = await res.json();

  const shrinkedData: { date: string; message: string }[] = result.map((item: any) => ({
    date: formatDate(item.commit.committer.date),
    message: item.commit.message,
  }));
  return shrinkedData;
}

export default async function fetchCommits() {
  const res = await fetchdata();
  const result = groupByDate(res, (commit) => commit.date.split(" ")[0]);
  return result;
}
