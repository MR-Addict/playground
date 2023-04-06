"use client";

import { useDeletePopupContext } from "../DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ _id }: { _id: string }) {
  const { openDeletePopup, setProjectId } = useDeletePopupContext();

  return (
    <button
      type='button'
      onClick={() => {
        setProjectId(_id);
        openDeletePopup(true);
      }}
    >
      Delete
    </button>
  );
}
