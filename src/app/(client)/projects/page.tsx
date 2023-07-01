import z from "zod";

import { setMetadata } from "@/lib/utils";
import { fetchProjects } from "@/lib/project";
import { checkPerm } from "@/lib/auth/checkPerm";
import { DatabaseProject } from "@/types/project";
import { MenuButton } from "./components/Buttons";
import { pageSession } from "@/lib/auth/serverSession";
import { ProjectCard, DragPopup } from "./components";

export const metadata = setMetadata("Projects");

export default async function Page() {
  const [session, projects] = await Promise.all([pageSession(), fetchProjects()]);
  const permission = checkPerm(session?.user.role || "vistor", "admin");
  const databaseProjects = z.array(DatabaseProject).parse(projects);

  return (
    <section className="w-full flex flex-col items-end gap-1">
      {permission && <MenuButton />}
      {permission && <DragPopup databaseProjects={databaseProjects} />}

      <ol aria-label="projects" className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project._id} permission={permission} project={project} />
        ))}
      </ol>
    </section>
  );
}
