"use client";

import DeletePopup from "./DeletePopup";
import { createContext, useContext, useState } from "react";

interface DeletePopupContextProps {
  userId: string;
  setUserId: (value: string) => void;
  openDeletePopup: (value: boolean) => void;
}

const DeletePopupContext = createContext<DeletePopupContextProps>({
  userId: "",
  setUserId: (value: string) => {},
  openDeletePopup: (value: boolean) => {},
});

export const DeletePopupContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState("");
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <DeletePopupContext.Provider value={{ userId, setUserId, openDeletePopup }}>
      <DeletePopup isOpenForm={isOpenForm} />
      {children}
    </DeletePopupContext.Provider>
  );
};

export const useDeletePopupContext = () => useContext(DeletePopupContext);
