import { formatDate } from "@/lib/utils";

export default async function LastUpdate() {
  const res = await fetch(`https://api.github.com/repos/MR-Addict/playground/commits`, {
    headers: { Authorization: "Basic " + Buffer.from(`MR-Addict:${process.env.GITHUB_TOKEN}`).toString("base64") },
  });

  if (!res.ok) throw new Error("Failed to fetch data");
  const result = await res.json();

  if (result.length === 0) throw new Error("Failed to fetch data");
  const lastUpdate = formatDate(result[0].commit.committer.date);

  return <span>Last update {lastUpdate}.</span>;
}
