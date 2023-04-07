"use client";

import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { DeletePopup } from "../../../components";

export default function DeleteButton({ _id }: { _id: string }) {
  const [isOpenForm, setIsOpenForm] = useState(false);

  function openDeletePopup(status: boolean) {
    setIsOpenForm(status);
    document.body.style.overflow = status ? "hidden" : "auto";
  }

  return (
    <>
      <DeletePopup isOpenForm={isOpenForm} openDeletePopup={openDeletePopup} _id={_id} />
      <button aria-label='delete button' type='button' onClick={() => openDeletePopup(true)}>
        <AiOutlineDelete size={15} />
      </button>
    </>
  );
}
