"use client";

import { DatabaseProjectType } from "@/types/project";
import { useDeletePopupContext } from "../DeletePopup/DeletePopupContextProvider";

export default function DeleteButton({ project }: { project: DatabaseProjectType }) {
  const { openDeletePopup, setProject } = useDeletePopupContext();

  return (
    <button
      type='button'
      onClick={() => {
        setProject(project);
        openDeletePopup(true);
      }}
    >
      Delete
    </button>
  );
}
