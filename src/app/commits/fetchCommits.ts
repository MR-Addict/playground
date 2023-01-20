import { formatDate, groupBy } from "@/lib/utils";

interface commitType {
  name: string;
  date: string;
  sha: string;
  url: string;
  message: string;
}

async function fetchdata() {
  const repository = "MR-Addict/playground";
  const res = await fetch(`https://api.github.com/repos/${repository}/commits`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const result = await res.json();

  const shrinkedData: commitType[] = result.map((item: any) => ({
    name: item.commit.committer.name,
    date: formatDate(item.commit.committer.date),
    sha: item.sha,
    url: item.html_url,
    message: item.commit.message,
  }));
  return shrinkedData;
}

export default async function fetchCommits() {
  const res = await fetchdata();
  const result = groupBy(res, (commit) => commit.date.split(" ")[0]);
  return result;
}
