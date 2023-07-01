"use client";

import { DatabaseProjectType } from "@/types/project";
import { useProjectContext } from "../ProjectForm/ProjectContextProvider";

export default function EditButton({ project }: { project: DatabaseProjectType }) {
  const { setProject, openProjectForm, setIsInsertMode } = useProjectContext();

  return (
    <button
      type="button"
      onClick={() => {
        setProject(project);
        setIsInsertMode(false);
        openProjectForm(true);
      }}
    >
      Edit
    </button>
  );
}
