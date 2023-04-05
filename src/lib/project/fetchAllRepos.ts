import fetchOneRepo from "./fetchOneRepo";
import { project } from "@/lib/mongodb";

export default async function fetchRepos() {
  const result = await project.read();
  if (!result.data) throw new Error(result.message);

  const projects = await Promise.all(result.data.map((item) => fetchOneRepo(item.owner, item.name)));
  return projects.map((project) => {
    const _id = result.data.find((item) => item.name === project.name)?._id.toString() || "";
    return { _id, ...project };
  });
}
