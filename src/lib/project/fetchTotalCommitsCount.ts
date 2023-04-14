import { env } from "@/types/env";

const query = `
query {
  repository(owner: "MR-Addict", name: "playground") {
    ref(qualifiedName: "main") {
      target {
        ... on Commit {
          history {
            totalCount
          }
        }
      }
    }
  }
}
`;

export default async function fetchTotalCommitsCount() {
  const result = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "force-cache",
    next: { revalidate: 60 },
  }).then((res) => res.json());

  const totalCount = Number(result.data.repository.ref.target.history.totalCount);
  return Math.ceil(totalCount / 30);
}
