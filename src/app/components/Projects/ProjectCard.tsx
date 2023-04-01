import { projectType } from "./config";
import { TextCard, ImageCard, SplitLine } from "./components";

export default function ProjectCard({ project, isEven }: { project: projectType; isEven: boolean }) {
  if (isEven) {
    return (
      <div className='w-full flex flex-col md:flex-row justify-center gap-10'>
        <ImageCard project={project} />
        <SplitLine />
        <TextCard project={project} isEven={isEven} />
      </div>
    );
  }

  return (
    <>
      <div className='w-full hidden md:flex flex-col md:flex-row justify-center gap-10'>
        <TextCard project={project} isEven={isEven} />
        <SplitLine />
        <ImageCard project={project} />
      </div>
      <div className='w-full md:hidden flex flex-col md:flex-row justify-center gap-10'>
        <ImageCard project={project} />
        <SplitLine />
        <TextCard project={project} isEven={isEven} />
      </div>
    </>
  );
}
