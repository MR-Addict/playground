"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiRefresh } from "react-icons/bi";

import style from "./UpdateButton.module.css";
import { Tooltip } from "@/components/server";
import { usePopupContext } from "@/contexts";
import { ProjectType } from "../ProjectForm/ProjectContextProvider";
import classNames from "classnames";

export default function UpdateButton({ project }: { project: ProjectType }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isUpdating, setIsUpdating] = useState(false);

  function handleUpdate() {
    setIsUpdating(true);

    fetch("/api/project/update", {
      method: "PUT",
      body: new URLSearchParams({ ...project }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to update project" });
      })
      .finally(() => setIsUpdating(false));
  }

  return (
    <Tooltip title='Update project'>
      <button
        type='button'
        disabled={isUpdating}
        onClick={handleUpdate}
        className={classNames(style.btn, isUpdating ? style.active : "")}
        aria-label='update project button'
      >
        <BiRefresh size={18} />
      </button>
    </Tooltip>
  );
}
