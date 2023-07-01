"use client";

import classNames from "classnames";

import style from "./Button.module.css";
import { UserRoleType } from "@/types/user";
import { useDeletePopupContext } from "../DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ _id, role }: { _id: string; role: UserRoleType }) {
  const { openDeletePopup, setUserId } = useDeletePopupContext();

  return (
    <button
      type="button"
      aria-label="delete user button"
      className={classNames(style.btn, "bg-red-600")}
      onClick={() => {
        setUserId(_id);
        openDeletePopup(true);
      }}
    >
      Delete
    </button>
  );
}
