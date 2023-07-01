"use client";

import MomentForm from "./MomentForm";
import { MomentType } from "../config";
import { createContext, useContext, useState } from "react";

export const defaultMoment = { _id: "", date: "", weather: "", moment: "" };

interface MomentContextProps {
  moment: MomentType;
  isInsertMode: boolean;
  openMomentForm: (value: boolean) => void;
  setMoment: (moment: MomentType) => void;
  setIsInsertMode: (value: boolean) => void;
}

const MomentContext = createContext<MomentContextProps>({
  isInsertMode: false,
  moment: defaultMoment,
  setMoment: (moment: MomentType) => {},
  setIsInsertMode: (value: boolean) => {},
  openMomentForm: (value: boolean) => {}
});

export const MomentContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [moment, setMoment] = useState<MomentType>(defaultMoment);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isInsertMode, setIsInsertMode] = useState(false);

  function openMomentForm(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <MomentContext.Provider value={{ moment, isInsertMode, setMoment, openMomentForm, setIsInsertMode }}>
      <MomentForm isOpenForm={isOpenForm} />
      {children}
    </MomentContext.Provider>
  );
};

export const useMomentContext = () => useContext(MomentContext);
