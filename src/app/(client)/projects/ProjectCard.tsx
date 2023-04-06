import classNames from "classnames";
import { GrBook } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";

import style from "./ProjectCard.module.css";
import { TimeAgo } from "@/components/client";
import { ProjectType } from "@/types/project";
import { DeleteButton, EditButton } from "./components";

export default function ProjectCard({ project, permission }: { project: ProjectType; permission: boolean }) {
  return (
    <li className={style.card}>
      <div className={classNames(style["flex-row-1"], "flex-wrap justify-between")}>
        <div className={style["flex-row-1"]}>
          <GrBook size={13} />
          <a href={project.url} target='_blank' className='text-blue-600 text-lg hover:underline'>
            {project.name}
          </a>
        </div>

        {permission && (
          <button className={style.dots}>
            <HiOutlineDotsVertical />
            <div className={style["dots-container"]}>
              <EditButton project={{ _id: project._id, owner: project.owner, name: project.name }} />
              <DeleteButton _id={project._id} />
            </div>
          </button>
        )}
      </div>

      {project.homepageUrl && (
        <div className={style["flex-row-1"]}>
          <a href={project.homepageUrl} target='_blank' className='text-blue-600 hover:underline whitespace-pre-wrap'>
            {project.homepageUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        </div>
      )}

      {project.intro && <div className='text-gray-500 text-sm'>{project.intro}</div>}

      {project.topics.length !== 0 && (
        <ul className={classNames(style["flex-row-1"], "flex-wrap")}>
          {project.topics.map((topic) => (
            <li key={topic}>
              <a
                target='_blank'
                href={`https://github.com/topics/${topic}`}
                className='block text-xs bg-blue-100 text-blue-600 py-0.5 px-1.5 rounded-md hover:text-white hover:bg-blue-600 duration-100'
              >
                {topic}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className='flex flex-row items-center gap-4'>
        {project.langColor && (
          <div className={style["flex-row-1"]}>
            <span style={{ background: project.langColor }} className='w-3 h-3 block rounded-full'></span>
            <span className='text-sm'>{project.lang}</span>
          </div>
        )}

        {project.stars !== 0 && (
          <a
            target='_blank'
            href={`https://github.com/${project.owner}/${project.name}/stargazers`}
            className={classNames(style["flex-row-1"], "hover:text-blue-600 duration-100 text-sm")}
          >
            <AiOutlineStar />
            <span>{project.stars}</span>
          </a>
        )}

        {project.forks !== 0 && (
          <a
            target='_blank'
            href={`https://github.com/${project.owner}/${project.name}/forks`}
            className={classNames(style["flex-row-1"], "hover:text-blue-600 duration-100 text-sm")}
          >
            <AiOutlineFork />
            <span>{project.forks}</span>
          </a>
        )}

        {project.lastUpdate && (
          <a
            target='_blank'
            href={`https://github.com/${project.owner}/${project.name}/commits/main`}
            className={classNames(style["flex-row-1"], "hover:text-blue-600 duration-100")}
          >
            <FaRegClock size={12} />
            <TimeAgo className='text-sm' date={project.lastUpdate.toString()} />
          </a>
        )}
      </div>
    </li>
  );
}
