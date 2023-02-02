export default async function fetchPages(per_page: number) {
  const res = await fetch(`https://api.github.com/repos/MR-Addict/playground/commits?per_page=${per_page}&page=1`, {
    headers: { Authorization: "Basic " + Buffer.from(`MR-Addict:${process.env.GITHUB_TOKEN}`).toString("base64") },
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  const headers: any = res.headers;
  const keys = headers.keys();
  let header = keys.next();
  while (header.value) {
    if (header.value === "link") {
      return Number(
        headers
          .get(header.value)
          .match(/&page=[0-9]+/g)[1]
          .split("=")[1]
      );
    }
    header = keys.next();
  }
  return 1;
}
