import { formatDate } from "@/lib/utils";

interface CommitType {
  date: string;
  message: string;
}

function pairHeader(headers: Headers) {
  const keys = headers.keys();
  let header = keys.next();
  let pairedHeader = { isPrev: false, isNext: false };
  while (header.value) {
    if (header.value === "link") {
      const isPrev = headers.get(header.value)?.includes("prev") || false;
      const isNext = headers.get(header.value)?.includes("next") || false;
      pairedHeader = { isPrev, isNext };
      break;
    }
    header = keys.next();
  }
  return pairedHeader as { isPrev: boolean; isNext: boolean };
}

export default async function fetchOnePage(page: number) {
  const res = await fetch(`https://api.github.com/repos/MR-Addict/playground/commits?per_page=30&page=${page}`, {
    headers: { Authorization: "Basic " + Buffer.from(`MR-Addict:${process.env.GITHUB_TOKEN}`).toString("base64") },
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const result = await res.json();

  if (result.length === 0) throw new Error("Failed to fetch data");

  const shrinkedData: CommitType[] = result.map((item: any) => ({
    date: formatDate(item.commit.committer.date),
    message: item.commit.message,
  }));
  return { status: true, data: shrinkedData, ...pairHeader(res.headers) };
}
