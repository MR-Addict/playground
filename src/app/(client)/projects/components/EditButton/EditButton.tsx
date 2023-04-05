"use client";

import { BiEditAlt } from "react-icons/bi";

import { Tooltip } from "@/components/server";
import { useProjectContext, ProjectType } from "../ProjectForm/ProjectContextProvider";

export default function EditButton({ project }: { project: ProjectType }) {
  const { setProject, openProjectForm, setIsInsertMode } = useProjectContext();

  return (
    <Tooltip title='Edit project'>
      <button
        type='button'
        aria-label='edit project button'
        onClick={() => {
          setProject(project);
          setIsInsertMode(false);
          openProjectForm(true);
        }}
      >
        <BiEditAlt size={15} />
      </button>
    </Tooltip>
  );
}
