import z from "zod";

import { setMetadata } from "@/lib/utils";
import { fetchProjects } from "@/lib/project";
import { checkPerm } from "@/lib/auth/checkPerm";
import { DatabaseProject } from "@/types/project";
import { pageSession } from "@/lib/auth/serverSession";
import { ProjectCard, DragPopup } from "./components";

export const metadata = setMetadata("Projects");

export default async function Page() {
  const session = await pageSession();
  const projects = await fetchProjects();
  const permission = checkPerm(session?.user.role || "vistor", "admin");
  const databaseProjects = z.array(DatabaseProject).parse(projects);

  return (
    <>
      {permission && <DragPopup databaseProjects={databaseProjects} />}
      <ol aria-label='projects' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {projects.map((project) => (
          <ProjectCard key={project._id} permission={permission} project={project} />
        ))}
      </ol>
    </>
  );
}
