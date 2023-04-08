"use client";

import { AiOutlineDelete } from "react-icons/ai";

import { useDeletePopupContext } from "../DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ _id }: { _id: string }) {
  const { openDeletePopup, setUserId } = useDeletePopupContext();

  return (
    <button
      type='button'
      aria-label='delete user button'
      onClick={() => {
        setUserId(_id);
        openDeletePopup(true);
      }}
    >
      <AiOutlineDelete size={15} />
    </button>
  );
}
