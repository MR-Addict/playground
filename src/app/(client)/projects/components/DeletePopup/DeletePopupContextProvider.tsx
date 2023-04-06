"use client";

import DeletePopup from "./DeletePopup";
import { DatabaseProjectType } from "@/types/project";
import { createContext, useContext, useState } from "react";
import { defaultProject } from "../ProjectForm/ProjectContextProvider";

interface DeletePopupContextProps {
  project: DatabaseProjectType;
  setProject: (value: DatabaseProjectType) => void;
  openDeletePopup: (value: boolean) => void;
}

const DeletePopupContext = createContext<DeletePopupContextProps>({
  project: defaultProject,
  setProject: (value: DatabaseProjectType) => {},
  openDeletePopup: (value: boolean) => {},
});

export const DeletePopupContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [project, setProject] = useState<DatabaseProjectType>(defaultProject);
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <DeletePopupContext.Provider value={{ project, setProject, openDeletePopup }}>
      <DeletePopup isOpenForm={isOpenForm} />
      {children}
    </DeletePopupContext.Provider>
  );
};

export const useDeletePopupContext = () => useContext(DeletePopupContext);
