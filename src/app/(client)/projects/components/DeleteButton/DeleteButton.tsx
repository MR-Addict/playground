"use client";

import { AiOutlineDelete } from "react-icons/ai";

import { Tooltip } from "@/components/server";
import { useDeletePopupContext } from "../DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ _id }: { _id: string }) {
  const { openDeletePopup, setProjectId } = useDeletePopupContext();

  return (
    <Tooltip title='Delete project'>
      <button
        type='button'
        aria-label='delete project button'
        onClick={() => {
          setProjectId(_id);
          openDeletePopup(true);
        }}
      >
        <AiOutlineDelete size={15} />
      </button>
    </Tooltip>
  );
}
