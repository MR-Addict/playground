import fs from "fs";
import path from "path";

async function fetchCommits() {
  function formateDate(date) {
    const newDate = new Date(date);
    const year = newDate.toLocaleString("default", { year: "numeric" });
    const month = newDate.toLocaleString("default", { month: "2-digit" });
    const day = newDate.toLocaleString("default", { day: "2-digit" });
    const hour = newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours();
    const minute = newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes();
    const second = newDate.getSeconds() < 10 ? "0" + newDate.getSeconds() : newDate.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
  }

  async function fetchdata() {
    const repository = "MR-Addict/linktree";
    const res = await fetch(`https://api.github.com/repos/${repository}/commits`);
    if (!res.ok) {
      return { status: false, message: "Cannot fetch data." };
    }
    const data = await res.json();
    const formatedData = data.map((item) => {
      return {
        name: item.commit.committer.name,
        date: formateDate(item.commit.committer.date),
        sha: item.sha,
        message: item.commit.message,
      };
    });
    return { status: true, data: formatedData };
  }

  function groupData(data) {
    const groups = data.reduce((groups, commit) => {
      const date = commit.date.split(" ")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(commit);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        count: groups[date].length,
        data: groups[date],
      };
    });
    return groupArrays;
  }

  function saveData(data) {
    const dir = path.join(process.cwd(), "src/data");
    const fullPath = path.join(dir, `commits.json`);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 4));
  }

  const res = await fetchdata();
  if (res.status) {
    const data = groupData(res.data);
    saveData(data);
    console.log("Commits converted!");
  } else {
    console.error(res.message);
  }
}

await fetchCommits();
