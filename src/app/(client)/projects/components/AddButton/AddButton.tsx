"use client";

import { BiPlusCircle } from "react-icons/bi";

import { useProjectContext, defaultProject } from "../ProjectForm/ProjectContextProvider";

export default function AddButton() {
  const { setProject, openProjectForm, setIsInsertMode } = useProjectContext();

  return (
    <button
      type='button'
      aria-label='add project button'
      onClick={() => {
        setIsInsertMode(true);
        setProject(defaultProject);
        openProjectForm(true);
      }}
      className='flex flex-row items-center text-sm gap-0.5 text-gray-700'
    >
      <span>添加</span>
      <BiPlusCircle />
    </button>
  );
}
