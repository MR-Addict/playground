"use client";

import classNames from "classnames";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { GrBook } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { RxDragHandleDots2 } from "react-icons/rx";

import style from "./DragPopup.module.css";
import { usePopupContext } from "@/contexts";
import { useDragContext } from "./DragContext";
import { LoadingDots, OperationWindow } from "@/components/server";
import { useProjectContext } from "../ProjectForm/ProjectContextProvider";

export default function DragPopup() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { projects, setProjects } = useDragContext();
  const { isDragMode, openDragPopup } = useProjectContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const newProjects = projects.map((project, index) => {
      return { ...project, index };
    });
    fetch("/api/project/reorder", {
      method: "PUT",
      body: JSON.stringify(newProjects),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) {
          openDragPopup(false);
          router.refresh();
          setProjects(newProjects);
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to reorder project" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow aria-label='drag popup' isOpenWindow={isDragMode}>
      <form
        onSubmit={handleSubmit}
        className={classNames(style.form, "background", isDragMode ? "scale-100" : "scale-0")}
      >
        <div className={style.dragWrapper}>
          <Reorder.Group as='ol' axis='y' values={projects} onReorder={setProjects} className='w-full'>
            {projects.map((project) => (
              <Reorder.Item value={project} key={project._id} className={style["drag-item"]}>
                <span className='flex flex-row items-center gap-1'>
                  <GrBook size={13} />
                  <span>{project.name}</span>
                </span>

                <button type='button' className='cursor-grab'>
                  <RxDragHandleDots2 />
                </button>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        <div className='w-full flex flex-row gap-2'>
          <button type='button' className={style.btn} onClick={() => openDragPopup(false)}>
            Cancel
          </button>

          <button
            type='submit'
            disabled={isSubmitting}
            className={classNames(style.btn, style.submitbtn, "bg-green-600")}
          >
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Reorder</span>}
          </button>
        </div>
      </form>
    </OperationWindow>
  );
}
