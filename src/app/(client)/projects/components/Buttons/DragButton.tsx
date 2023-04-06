"use client";

import { useProjectContext } from "../ProjectForm/ProjectContextProvider";

export default function DragButton() {
  const { openDragPopup } = useProjectContext();

  return (
    <button type='button' onClick={() => openDragPopup(true)}>
      Reorder
    </button>
  );
}
