"use client";

import { useProjectContext, defaultProject } from "../ProjectForm/ProjectContextProvider";

export default function AddButton() {
  const { setProject, openProjectForm, setIsInsertMode } = useProjectContext();

  return (
    <button
      type='button'
      onClick={() => {
        setProject(defaultProject);
        setIsInsertMode(true);
        openProjectForm(true);
      }}
    >
      Add
    </button>
  );
}
