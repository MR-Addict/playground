import { formatDate } from "@/lib/utils";

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
  const data = await res.json();

  const shrinkedData: commitType[] = data.map((item: any) => {
    return {
      name: item.commit.committer.name,
      date: formatDate(item.commit.committer.date),
      sha: item.sha,
      url: item.html_url,
      message: item.commit.message,
    };
  });
  return shrinkedData;
}

function groupData(data: commitType[]) {
  const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
      (acc[predicate(value, index, array)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: T[] });

  const groups = groupBy(data, (commit) => commit.date.split(" ")[0]);
  let totalCount = 0;

  const groupArrays = Object.keys(groups).map((date) => {
    totalCount += groups[date].length;
    return {
      date,
      count: groups[date].length,
      data: groups[date],
    };
  });
  return { totalCount: totalCount, data: groupArrays };
}

export default async function fetchCommits() {
  const res = await fetchdata();
  // console.log(res);
  const data = groupData(res);
  return data;
}
