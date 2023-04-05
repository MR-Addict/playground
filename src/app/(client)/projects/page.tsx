import { project } from "@/lib/mongodb";
import { setMetadata } from "@/lib/utils";
import { PageWrapper } from "@/components/client";

import ProjectCard from "./ProjectCard";

export const metadata = setMetadata("Projects");

export default async function Page() {
  const result = await project.read();
  if (!result.data) throw new Error(result.message);

  return (
    <PageWrapper className='w-full frame flex flex-col gap-3'>
      <h1 className='text-gray-700 font-bold text-3xl'>Projects</h1>

      <ul aria-label='projects' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {result.data.map((project) => (
          <ProjectCard key={project._id?.toString()} project={project} />
        ))}
      </ul>
    </PageWrapper>
  );
}
