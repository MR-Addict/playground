import ProjectCard from "./ProjectCard";
import { project } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";
import { checkPerm } from "@/lib/auth/checkPerm";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Projects");

export default async function Page() {
  const result = await project.read();
  if (!result.data) throw new Error(result.message);

  const session = await pageSession();
  const permission = checkPerm(session?.user.role || "vistor", "admin");

  return (
    <ul aria-label='projects' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {result.data.map((project) => (
        <ProjectCard key={project._id?.toString()} permission={permission} project={project} />
      ))}
    </ul>
  );
}
