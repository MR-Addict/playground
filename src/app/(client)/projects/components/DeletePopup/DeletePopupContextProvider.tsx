"use client";

import DeletePopup from "./DeletePopup";
import { createContext, useContext, useState } from "react";

interface DeletePopupContextProps {
  projectId: string;
  setProjectId: (value: string) => void;
  openDeletePopup: (value: boolean) => void;
}

const DeletePopupContext = createContext<DeletePopupContextProps>({
  projectId: "",
  setProjectId: (value: string) => {},
  openDeletePopup: (value: boolean) => {},
});

export const DeletePopupContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [projectId, setProjectId] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <DeletePopupContext.Provider value={{ projectId, setProjectId, openDeletePopup }}>
      <DeletePopup isOpenForm={isOpenForm} />
      {children}
    </DeletePopupContext.Provider>
  );
};

export const useDeletePopupContext = () => useContext(DeletePopupContext);
