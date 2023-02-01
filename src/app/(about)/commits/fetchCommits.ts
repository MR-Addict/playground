import { formatDate, groupBy } from "@/lib/utils";

const per_page = 30;

interface CommitType {
  date: string;
  message: string;
}

function chunk(array: CommitType[], size: number) {
  var results = [];
  while (array.length) results.push(array.splice(0, size));
  return results;
}

async function fetchData() {
  let page = 1;
  const data: any[] = [];

  async function fetchOnePage() {
    const res = await fetch(
      `https://api.github.com/repos/MR-Addict/playground/commits?per_page=${per_page}&page=${page}`,
      { headers: { Authorization: "Basic " + Buffer.from(`MR-Addict:${process.env.GITHUB_TOKEN}`).toString("base64") } }
    );
    if (!res.ok) throw new Error("Failed to fetch data");
    const result: any[] = await res.json();
    return result;
  }

  while (true) {
    const result = await fetchOnePage();
    data.push(...result);
    if (result.length < per_page) {
      if (result.length === 0) --page;
      break;
    }
    page++;
  }

  const shrinkedData: CommitType[] = data.map((item: any) => ({
    date: formatDate(item.commit.committer.date),
    message: item.commit.message,
  }));
  return shrinkedData;
}

export default async function fetchCommits() {
  const res = await fetchData();

  return groupBy(res, (commit) => commit.date.split(" ")[0]);
}
