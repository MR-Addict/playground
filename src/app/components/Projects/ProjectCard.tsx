import Image from "next/image";
import { MdRefresh } from "react-icons/md";
import { RiShareBoxLine } from "react-icons/ri";

export default function ProjectCard({ project, isEven }: { project: any; isEven: boolean }) {
  if (isEven) {
    return (
      <div className='w-full flex flex-col md:flex-row justify-center gap-10'>
        <div className='bg-white drop-shadow-lg rounded-xl flex flex-col flex-1'>
          <div className='w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-300'>
            <div className='flex flex-row gap-1 w-fit'>
              <span className='bg-red-600 rounded-full w-3 h-3'></span>
              <span className='bg-yellow-600 rounded-full w-3 h-3'></span>
              <span className='bg-green-600 rounded-full w-3 h-3'></span>
            </div>
            <div className='flex flex-row items-center gap-2 text-gray-500 border border-gray-200 rounded-md px-2'>
              <h1>localhost:3000</h1>
              <MdRefresh />
            </div>
            <span className='w-3 h-3'></span>
          </div>
          <Image
            src={project.img}
            alt='project'
            placeholder='blur'
            className='w-full object-left-top aspect-video object-cover rounded-b-xl'
          />
        </div>
        <div className='flex flex-row md:flex-col items-center gap-2'>
          <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
          <div className='bg-purple-600 w-3 h-3 rounded-full'></div>
          <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
        </div>
        <div className='flex flex-col items-start justify-center gap-4'>
          <a
            href={project.link}
            target='_blank'
            className='text-gray-500 border-gray-300 hover:text-gray-800 duration-300 border p-1 rounded-md'
          >
            <RiShareBoxLine size={25} />
          </a>
          <h1 className='text-gray-700 font-bold text-3xl'>{project.title}</h1>
          <p className='w-full max-w-md text-xl text-gray-500'>{project.intro}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col md:flex-row justify-center gap-10'>
      <div className='flex flex-col items-start md:items-end justify-center gap-4'>
        <a
          href={project.link}
          target='_blank'
          className='text-gray-500 border-gray-300 hover:text-gray-800 duration-300 border p-1 rounded-md'
        >
          <RiShareBoxLine size={25} />
        </a>
        <h1 className='text-gray-700 font-bold text-3xl'>{project.title}</h1>
        <p className='w-full max-w-md text-xl text-gray-500'>{project.intro}</p>
      </div>
      <div className='flex flex-row md:flex-col items-center gap-2'>
        <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
        <div className='bg-purple-600 w-3 h-3 rounded-full'></div>
        <div className='flex-1 border-t-2 md:border-l-2 border-dashed border-gray-500'></div>
      </div>
      <div className='bg-white drop-shadow-lg rounded-xl flex flex-col flex-1'>
        <div className='w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-300'>
          <div className='flex flex-row gap-1 w-fit'>
            <span className='bg-red-600 rounded-full w-3 h-3'></span>
            <span className='bg-yellow-600 rounded-full w-3 h-3'></span>
            <span className='bg-green-600 rounded-full w-3 h-3'></span>
          </div>
          <div className='flex flex-row items-center gap-2 text-gray-500 border border-gray-200 rounded-md px-2'>
            <h1>localhost:3000</h1>
            <MdRefresh />
          </div>
          <span className='w-3 h-3'></span>
        </div>
        <Image
          src={project.img}
          alt='project'
          placeholder='blur'
          className='w-full object-left-top aspect-video object-cover rounded-b-xl'
        />
      </div>
    </div>
  );
}
