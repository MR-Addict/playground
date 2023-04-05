import query from "./query";
import { env } from "@/types/env";
import { ProjectType } from "@/types/project";
import { languageColors } from "./languageColors";

export default async function fetchOneRepo(user: string, repo: string) {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: query(user, repo) }),
    });

    if (!res.ok) throw new Error("Failed to fetch data");
    const result = await res.json();

    const {
      name,
      url,
      homepageUrl,
      createdAt,
      description,
      stargazers,
      forks,
      primaryLanguage,
      repositoryTopics,
      ref,
    } = result.data.repository;

    return {
      owner: user,
      name,
      stars: Number(stargazers.totalCount),
      forks: Number(forks.totalCount),
      lang: primaryLanguage.name,
      langColor: languageColors[primaryLanguage.name].color,
      url,
      homepageUrl,
      intro: description,
      createdAt: new Date(createdAt),
      lastUpdate: new Date(ref.target.history.edges[0].node.committedDate),
      topics: repositoryTopics.edges.map((item: any) => item.node.topic.name),
    } as ProjectType;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
}
