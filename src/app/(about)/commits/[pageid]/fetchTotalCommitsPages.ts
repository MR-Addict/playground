import { env } from "@/types/env";

function pairHeader(headers: Headers) {
  const keys = headers.keys();
  let header = keys.next();

  const regex = new RegExp('(?<=per_page=1&page=)([0-9]+)(?=>; rel="last")', "g");

  while (header.value) {
    if (header.value === "link") return Number(String(headers.get(header.value)).match(regex)?.at(0)) || 1;

    header = keys.next();
  }
  return 1;
}

export default async function fetchTotalCommitsPages() {
  const res = await fetch(`https://api.github.com/repos/MR-Addict/playground/commits?per_page=1`, {
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
    cache: "force-cache",
  });

  return Math.ceil(pairHeader(res.headers) / 50);
}
