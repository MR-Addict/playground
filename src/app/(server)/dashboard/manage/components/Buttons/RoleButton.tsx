"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";

import { UserRoleType } from "@/types/user";
import { useRolePopupContext } from "../RolePopup/RolePopupContextProvider";

export default function RoleButton({ _id, role }: { _id: string; role: UserRoleType }) {
  const { openRolePopup, setUserIDRole } = useRolePopupContext();

  return (
    <button
      aria-label='update user role button'
      type='button'
      onClick={() => {
        setUserIDRole({ _id, role });
        openRolePopup(true);
      }}
    >
      <BiEditAlt size={15} />
    </button>
  );
}
