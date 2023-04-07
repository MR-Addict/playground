"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import classNames from "classnames";
import style from "./DeletePopup.module.css";
import { usePopupContext } from "@/contexts";
import { LoadingDots, OperationWindow } from "@/components/server";

export default function DeletePopup({
  _id,
  isOpenForm,
  openDeletePopup,
}: {
  _id: string;
  isOpenForm: boolean;
  openDeletePopup: Function;
}) {
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleClick() {
    setIsSubmitting(true);

    fetch("/api/user/delete", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) signOut();
        else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to delete your account" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow aria-label='delete popup window' isOpenWindow={isOpenForm}>
      <div className={classNames(style.popup, "background", isOpenForm ? "scale-100" : "scale-0")}>
        <h1 className='font-bold text-3xl text-center text-gray-700'>Delete your account?</h1>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => openDeletePopup(false)}
            className='w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button type='button' onClick={handleClick} className={classNames(style.submitbtn, "bg-green-600")}>
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </OperationWindow>
  );
}
