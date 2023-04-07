"use client";

import classNames from "classnames";
import { useState } from "react";
import { Session } from "next-auth";

import style from "./AccountForm.module.css";
import DeletePopup from "../DeletePopup/DeletePopup";

export default function DeleteAccount({ session }: { session: Session }) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <section className={classNames(style["input-element"], style.danger)}>
      <DeletePopup isOpenForm={isOpenForm} openDeletePopup={openDeletePopup} _id={session.user._id.toString()} />

      <p className={style.label}>Delete Your Account</p>

      <div className='w-full flex flex-col items-end gap-3'>
        <p className='text-lg text-gray-500'>
          Permanently remove your personal account and all of its contents. This action is not reversible, so please
          continue with caution.
        </p>

        <button
          type='button'
          onClick={() => openDeletePopup(true)}
          className={classNames(style.submitbtn, "text-white")}
        >
          Delete
        </button>
      </div>
    </section>
  );
}
