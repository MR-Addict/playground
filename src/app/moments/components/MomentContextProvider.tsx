"use client";

import MomentForm from "./MomentForm";
import { MomentType } from "../config";
import { createContext, useContext, useState } from "react";

interface MomentContextProps {
  moment: MomentType;
  isOpenForm: boolean;
  isInsertMode: boolean;
  setMoment: (moment: MomentType) => void;
  setIsOpenForm: (value: boolean) => void;
  setIsInsertMode: (value: boolean) => void;
}

const MomentContext = createContext<MomentContextProps>({
  isOpenForm: false,
  isInsertMode: false,
  moment: { _id: "", date: "", weather: "", moment: "" },
  setMoment: (moment: MomentType) => {},
  setIsOpenForm: (value: boolean) => {},
  setIsInsertMode: (value: boolean) => {},
});

export const MomentContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [moment, setMoment] = useState<MomentType>({ _id: "", date: "", weather: "", moment: "" });
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isInsertMode, setIsInsertMode] = useState(false);

  return (
    <MomentContext.Provider value={{ isOpenForm, moment, isInsertMode, setMoment, setIsOpenForm, setIsInsertMode }}>
      <MomentForm />
      {children}
    </MomentContext.Provider>
  );
};

export const useMomentContext = () => useContext(MomentContext);
