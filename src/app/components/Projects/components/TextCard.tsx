import { RiShareBoxLine } from "react-icons/ri";

import { projectType } from "../config";

export default function TextCard({ project, isEven }: { project: projectType; isEven: boolean }) {
  return (
    <div className={`flex flex-col items-start ${isEven ? "md:items-start" : "md:items-end"} justify-center gap-4`}>
      <h1 className='text-gray-800 font-bold text-3xl'>{project.title}</h1>
      <p className='w-full max-w-md text-xl text-gray-500'>{project.intro}</p>
      <div className='flex flex-row items-center gap-2 text-gray-700'>
        <a
          href={project.link}
          target='_blank'
          className='flex flex-row items-center gap-1 text-lg py-2 px-4 bg-black text-white rounded-xl duration-300 hover:shadow-xl'
        >
          Have a Look
          <RiShareBoxLine />
        </a>
      </div>
    </div>
  );
}
