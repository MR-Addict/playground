"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import classNames from "classnames";
import style from "./DeletePopup.module.css";
import { usePopupContext } from "@/contexts";
import { LoadingDots, OperationWindow } from "@/components/server";
import { useDeletePopupContext } from "./DeletePopupContextProvider";

export default function DeletePopup({ isOpenForm }: { isOpenForm: boolean }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { momentId, openDeletePopup } = useDeletePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClick() {
    setIsSubmitting(true);

    fetch("/api/moment/delete", {
      method: "DELETE",
      body: new URLSearchParams({ _id: momentId }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) {
          openDeletePopup(false);
          router.refresh();
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to delete moment" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow aria-label='delete popup window' isOpenWindow={isOpenForm}>
      <div className={classNames(style.popup, "background", isOpenForm ? "scale-100" : "scale-0")}>
        <h1 className='font-bold text-3xl text-center text-gray-700'>Delete Moment?</h1>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => openDeletePopup(false)}
            className='w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button type='button' onClick={() => handleClick()} className={classNames(style.submitbtn, "bg-green-600")}>
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </OperationWindow>
  );
}
