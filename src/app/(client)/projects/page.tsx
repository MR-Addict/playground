import ProjectCard from "./ProjectCard";
import { setMetadata } from "@/lib/utils";
import { fetchAllRepos } from "@/lib/project";
import { checkPerm } from "@/lib/auth/checkPerm";
import { pageSession } from "@/lib/auth/serverSession";

export const metadata = setMetadata("Projects");

export default async function Page() {
  const session = await pageSession();
  const projects = await fetchAllRepos();
  const permission = checkPerm(session?.user.role || "vistor", "admin");

  return (
    <ul aria-label='projects' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {projects.map((project) => (
        <ProjectCard key={project._id} permission={permission} project={project} />
      ))}
    </ul>
  );
}
