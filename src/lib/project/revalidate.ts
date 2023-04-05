import { project } from "@/lib/mongodb";

export default async function revalidate() {
  const result = await project.read();
  if (!result.data) throw new Error(result.message);
  return Promise.all(result.data.map((item) => project.update(item._id.toString(), item.owner, item.name)));
}
