"use client";

import { useProjectContext } from "../ProjectForm/ProjectContextProvider";

export default function DragButton() {
  const { setIsDragMode } = useProjectContext();

  return (
    <button type='button' onClick={() => setIsDragMode(true)}>
      Layout
    </button>
  );
}
