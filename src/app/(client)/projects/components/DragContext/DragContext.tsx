"use client";

import DragPopup from "./DragPopup";
import { DatabaseProjectType } from "@/types/project";
import { createContext, useContext, useEffect, useState } from "react";
import { useProjectContext } from "../ProjectForm/ProjectContextProvider";

interface DragContextProps {
  projects: DatabaseProjectType[];
  setProjects: (project: DatabaseProjectType[]) => void;
}

const DragContext = createContext<DragContextProps>({
  projects: [],
  setProjects: (project: DatabaseProjectType[]) => {},
});

export const DragContextProvider = ({
  children,
  databaseProjects,
}: {
  children: React.ReactNode;
  databaseProjects: DatabaseProjectType[];
}) => {
  const { isDragMode } = useProjectContext();
  const [projects, setProjects] = useState<DatabaseProjectType[]>(databaseProjects);

  useEffect(() => {
    if (!isDragMode) setProjects(databaseProjects);
  }, [databaseProjects, isDragMode]);

  return (
    <DragContext.Provider value={{ projects, setProjects }}>
      <DragPopup />
      {children}
    </DragContext.Provider>
  );
};

export const useDragContext = () => useContext(DragContext);
