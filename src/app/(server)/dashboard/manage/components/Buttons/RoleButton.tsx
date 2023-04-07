"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";

import RolePopup from "../RolePopup/RolePopup";
import { UserRoleType } from "@/types/user";

export default function RoleButton({ _id, role }: { _id: string; role: UserRoleType }) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openRolePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <>
      <RolePopup isOpenForm={isOpenForm} _id={_id} role={role} openRolePopup={openRolePopup} />
      <button type='button' onClick={() => openRolePopup(true)}>
        <BiEditAlt size={15} />
      </button>
    </>
  );
}
