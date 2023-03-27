"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./DeletePopup.module.css";
import { LoadingDots } from "@/components";
import { usePopupContext } from "@/contexts";
import { useDeletePopupContext } from "./DeletePopupContextProvider";

export default function DeletePopup({ isOpenForm }: { isOpenForm: boolean }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { momentId, openDeletePopup } = useDeletePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClick() {
    setIsSubmitting(true);

    fetch("/api/moments/delete", {
      method: "DELETE",
      body: new URLSearchParams({ _id: momentId }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
        if (result.status) openDeletePopup(false);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to delete moment" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <section
      aria-label='delete moment popup'
      className={[style.frame, "frame", isOpenForm ? "scale-100" : "scale-0"].join(" ")}
    >
      <div className={[style.popup, "background", isOpenForm ? "scale-100" : "scale-0"].join(" ")}>
        <h1 className='font-bold text-3xl text-center text-gray-700'>Delete Moment?</h1>

        <div className='w-full flex flex-row gap-3 mt-3'>
          <button
            type='button'
            onClick={() => openDeletePopup(false)}
            className='w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button type='button' onClick={() => handleClick()} className={[style.submitbtn, "bg-green-600"].join(" ")}>
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </section>
  );
}
