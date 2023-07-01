import Image from "next/image";
import { MdRefresh } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { projectType } from "../config";

export default function ImageCard({ project }: { project: projectType }) {
  return (
    <div className="bg-white shadow-md rounded-md flex flex-col flex-1">
      <div className="w-full flex flex-row items-center justify-between px-5 py-2 border-b border-b-gray-300">
        <div className="flex flex-row gap-1 w-fit">
          <span className="bg-red-600 rounded-full w-3 h-3"></span>
          <span className="bg-yellow-600 rounded-full w-3 h-3"></span>
          <span className="bg-green-600 rounded-full w-3 h-3"></span>
        </div>
        <div className="flex flex-row items-center gap-2 text-gray-500 border border-gray-300 rounded-md px-2">
          <IoIosInformationCircleOutline />
          <h1>localhost:3000</h1>
          <MdRefresh />
        </div>
        <div></div>
      </div>
      <Image
        src={project.img}
        alt="project"
        placeholder="blur"
        className="w-full object-left-top aspect-video object-cover rounded-b-md"
      />
    </div>
  );
}
