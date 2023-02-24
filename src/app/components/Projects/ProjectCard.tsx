import Image from "next/image";
import { MdRefresh } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { projectType } from "./config";

function ImageCard({ project }: { project: projectType }) {
  return (
    <div className='bg-white shadow-md rounded-md flex flex-col flex-1'>
      <div className='w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-300'>
        <div className='flex flex-row gap-1 w-fit'>
          <span className='bg-red-600 rounded-full w-3 h-3'></span>
          <span className='bg-yellow-600 rounded-full w-3 h-3'></span>
          <span className='bg-green-600 rounded-full w-3 h-3'></span>
        </div>
        <div className='flex flex-row items-center gap-2 text-gray-500 border border-gray-200 rounded-md px-2'>
          <IoIosInformationCircleOutline />
          <h1>localhost:3000</h1>
          <MdRefresh />
        </div>
        <div></div>
      </div>
      <Image
        src={project.img}
        alt='project'
        placeholder='blur'
        className='w-full object-left-top aspect-video object-cover rounded-b-md'
      />
    </div>
  );
}

function SplitLine() {
  return (
    <div className='flex flex-row md:flex-col items-center gap-2'>
      <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
      <div className='border-2 border-gray-500 w-3 h-3 rounded-full'></div>
      <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
    </div>
  );
}

function TextCard({ project, isEven }: { project: projectType; isEven: boolean }) {
  return (
    <div className={`flex flex-col items-start ${isEven ? "md:items-start" : "md:items-end"} justify-center gap-4`}>
      <h1 className='text-gray-700 font-bold text-3xl'>{project.title}</h1>
      <p className='w-full max-w-md text-xl text-gray-500'>{project.intro}</p>
      <a
        href={project.link}
        target='_blank'
        className='font-semibold text-xl duration-300 flex flex-row items-center gap-1 text-gray-500 hover:text-gray-700'
      >
        <span>Have a Look</span>
        <RiShareBoxLine />
      </a>
    </div>
  );
}

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
