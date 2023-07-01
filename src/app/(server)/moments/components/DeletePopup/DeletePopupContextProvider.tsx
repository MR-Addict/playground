"use client";

import DeletePopup from "./DeletePopup";
import { createContext, useContext, useState } from "react";

interface DeletePopupContextProps {
  momentId: string;
  setMomentId: (value: string) => void;
  openDeletePopup: (value: boolean) => void;
}

const DeletePopupContext = createContext<DeletePopupContextProps>({
  momentId: "",
  setMomentId: (value: string) => {},
  openDeletePopup: (value: boolean) => {}
});

export const DeletePopupContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [momentId, setMomentId] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <DeletePopupContext.Provider value={{ momentId, setMomentId, openDeletePopup }}>
      <DeletePopup isOpenForm={isOpenForm} />
      {children}
    </DeletePopupContext.Provider>
  );
};

export const useDeletePopupContext = () => useContext(DeletePopupContext);
