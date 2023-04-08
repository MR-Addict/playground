"use client";

import classNames from "classnames";

import style from "./Button.module.css";
import { UserRoleType } from "@/types/user";
import { useRolePopupContext } from "../RolePopup/RolePopupContextProvider";

export default function RoleButton({ _id, role }: { _id: string; role: UserRoleType }) {
  const { openRolePopup, setUserIDRole } = useRolePopupContext();

  return (
    <button
      type='button'
      aria-label='update user role button'
      className={classNames(style.btn, "bg-blue-600")}
      onClick={() => {
        setUserIDRole({ _id, role });
        openRolePopup(true);
      }}
    >
      Edit
    </button>
  );
}
