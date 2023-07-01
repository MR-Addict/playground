"use client";

import ProjectForm from "./ProjectForm";
import { DatabaseProjectType } from "@/types/project";
import { createContext, useContext, useState } from "react";

export const defaultProject = { _id: "", owner: "", name: "", index: 0 };

interface ProjectContextProps {
  project: DatabaseProjectType;
  isDragMode: boolean;
  isInsertMode: boolean;
  openDragPopup: (value: boolean) => void;
  setIsInsertMode: (value: boolean) => void;
  openProjectForm: (value: boolean) => void;
  setProject: (project: DatabaseProjectType) => void;
}

const ProjectContext = createContext<ProjectContextProps>({
  isDragMode: false,
  isInsertMode: false,
  project: defaultProject,
  openDragPopup: (value: boolean) => {},
  setIsInsertMode: (value: boolean) => {},
  openProjectForm: (value: boolean) => {},
  setProject: (project: DatabaseProjectType) => {}
});

export const ProjectContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [project, setProject] = useState<DatabaseProjectType>(defaultProject);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isDragMode, setIsDragMode] = useState(false);
  const [isInsertMode, setIsInsertMode] = useState(false);

  function openProjectForm(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  function openDragPopup(status: boolean) {
    setIsDragMode(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <ProjectContext.Provider
      value={{ project, isDragMode, isInsertMode, setProject, openDragPopup, openProjectForm, setIsInsertMode }}
    >
      <ProjectForm isOpenForm={isOpenForm} />
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
