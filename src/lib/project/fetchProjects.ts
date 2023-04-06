import query from "./query";
import { env } from "@/types/env";
import { project } from "@/lib/mongodb";
import { ProjectType } from "@/types/project";
import { languageColors } from "./languageColors";

export default async function fetchProjects() {
  const result = await project.read();
  if (!result.data) throw new Error(result.message);
  const queries = query(
    result.data.map((item) => {
      return { owner: item.owner, name: item.name };
    })
  );

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: queries }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();
  return Object.values(data.data).map((item: any) => {
    const databaseProject = result.data.find((item1) => item1.name === item.name);
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
    } = item;

    return {
      ...databaseProject,
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
  });
}
