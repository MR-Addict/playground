import { formatDate } from "@/lib/utils";

export default async function LastUpdate() {
  const res = await fetch("https://api.github.com/repos/MR-Addict/Playground/commits/main", {
    headers: { Authorization: `token ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github.v3+json" },
  });
  if (!res.ok) throw new Error("Cannot fetch lastest github commit");

  const result = await res.json();
  const lastUpdate = formatDate(result.commit.committer.date);

  return <span>Last update {lastUpdate}.</span>;
}
