import projects from "./config";
import ProjectCard from "./ProjectCard";
import style from "./Projects.module.css";

export default function Projects() {
  return (
    <div className='frame w-full flex flex-col items-center justify-center gap-10 bg-gray-100'>
      <h1 className='text-3xl md:text-5xl font-bold text-gray-700'>My Next.js Projects</h1>
      <div className='flex flex-col items-center justify-center gap-10 md:gap-28 bg-gray-100'>
        <div className='bg-gray-700 rounded-xl flex flex-col w-full max-w-lg h-40'>
          <div className='w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-500'>
            <div className='flex flex-row gap-1 w-fit'>
              <span className='bg-red-600 rounded-full w-3 h-3'></span>
              <span className='bg-yellow-600 rounded-full w-3 h-3'></span>
              <span className='bg-green-600 rounded-full w-3 h-3'></span>
            </div>
            <h1 className='text-gray-300'>Bash</h1>
            <span className='w-3 h-3'></span>
          </div>
          <div className='w-full flex flex-col gap-1 py-3 px-5'>
            <h1 className='text-gray-100'>cael@nextjs:~$ npm run build</h1>
            <div className='flex flex-row items-center gap-2'>
              <h1 className='text-gray-100'>cael@nextjs:~$ npm run start</h1>
              <div className={style.blinkcursor}></div>
            </div>
          </div>
        </div>
        {projects.map((item, index) => (
          <ProjectCard key={index} project={item} isEven={(index + 1) % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
