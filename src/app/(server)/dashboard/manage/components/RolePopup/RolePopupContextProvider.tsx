"use client";

import { UserRoleType } from "@/types/user";
import RolePopup from "./RolePopup";
import { createContext, useContext, useState } from "react";
import { Session } from "next-auth";

interface UserIDRoleType {
  _id: string;
  role: UserRoleType;
}

const defaultUserIDRole: UserIDRoleType = { _id: "", role: "vistor" };

interface RolePopupContextProps {
  userIDRole: UserIDRoleType;
  setUserIDRole: (value: UserIDRoleType) => void;
  openRolePopup: (value: boolean) => void;
}

const RolePopupContext = createContext<RolePopupContextProps>({
  userIDRole: defaultUserIDRole,
  setUserIDRole: (value: UserIDRoleType) => {},
  openRolePopup: (value: boolean) => {}
});

export const RolePopupContextProvider = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [userIDRole, setUserIDRole] = useState(defaultUserIDRole);

  function openRolePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <RolePopupContext.Provider value={{ userIDRole, setUserIDRole, openRolePopup }}>
      <RolePopup isOpenForm={isOpenForm} session={session} />
      {children}
    </RolePopupContext.Provider>
  );
};

export const useRolePopupContext = () => useContext(RolePopupContext);
