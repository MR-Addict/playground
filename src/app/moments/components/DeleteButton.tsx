"use client";

import { AiOutlineDelete } from "react-icons/ai";

import { Tooltip } from "@/components";
import { useDeletePopupContext } from "./DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ _id }: { _id: string }) {
  const { openDeletePopup, setMomentId } = useDeletePopupContext();

  return (
    <Tooltip title='Delete moment'>
      <button
        type='button'
        aria-label='delete moment button'
        onClick={() => {
          setMomentId(_id);
          openDeletePopup(true);
        }}
      >
        <AiOutlineDelete size={15} />
      </button>
    </Tooltip>
  );
}
