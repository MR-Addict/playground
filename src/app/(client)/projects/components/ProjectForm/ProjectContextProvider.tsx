"use client";

import ProjectForm from "./ProjectForm";
import { DatabaseProjectType } from "@/types/project";
import { createContext, useContext, useState } from "react";

export const defaultProject = { _id: "", owner: "", name: "" };

interface ProjectContextProps {
  project: DatabaseProjectType;
  isInsertMode: boolean;
  openProjectForm: (value: boolean) => void;
  setProject: (project: DatabaseProjectType) => void;
  setIsInsertMode: (value: boolean) => void;
}

const ProjectContext = createContext<ProjectContextProps>({
  isInsertMode: false,
  project: defaultProject,
  setProject: (project: DatabaseProjectType) => {},
  setIsInsertMode: (value: boolean) => {},
  openProjectForm: (value: boolean) => {},
});

export const ProjectContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [project, setProject] = useState<DatabaseProjectType>(defaultProject);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isInsertMode, setIsInsertMode] = useState(false);

  function openProjectForm(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <ProjectContext.Provider value={{ project, isInsertMode, setProject, openProjectForm, setIsInsertMode }}>
      <ProjectForm isOpenForm={isOpenForm} />
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
