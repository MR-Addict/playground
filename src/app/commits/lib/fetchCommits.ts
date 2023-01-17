interface commitType {
  name: string;
  date: string;
  sha: string;
  message: string;
}

function formateDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleString("zh-cn", { timeZone: "Asia/Shanghai" }).replaceAll("/", "-");
}

async function fetchdata() {
  const repository = "MR-Addict/playground";
  const res = await fetch(`https://api.github.com/repos/${repository}/commits`);
  if (!res.ok) throw new Error("Cannot fetch commits data");
  const data = await res.json();

  // @ts-expect-error
  const shrinkedData: commitType[] = data.map((item) => {
    return {
      name: item.commit.committer.name,
      date: formateDate(item.commit.committer.date),
      sha: item.sha,
      message: item.commit.message,
    };
  });
  return { status: true, data: shrinkedData };
}

function groupData(data: commitType[]) {
  const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
      (acc[predicate(value, index, array)] ||= []).push(value);
      return acc;
    }, {} as { [key: string]: T[] });

  const groups = groupBy(data, (commit) => commit.date.split(" ")[0]);

  const groupArrays = Object.keys(groups).map((date) => {
    return {
      date,
      count: groups[date].length,
      data: groups[date],
    };
  });
  return groupArrays;
}

export default async function fetchCommits() {
  const res = await fetchdata();
  const data = groupData(res.data);
  return data;
}
