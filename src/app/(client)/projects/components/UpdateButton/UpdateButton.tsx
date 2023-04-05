"use client";

import { useRouter } from "next/navigation";
import { BiRefresh } from "react-icons/bi";

import { Tooltip } from "@/components/server";
import { usePopupContext } from "@/contexts";
import { ProjectType } from "../ProjectForm/ProjectContextProvider";

export default function UpdateButton({ project }: { project: ProjectType }) {
  const router = useRouter();
  const { popup } = usePopupContext();

  function handleUpdate() {
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
        popup({ status: false, message: "Failed to insert project" });
      });
  }

  return (
    <Tooltip title='Refresh project'>
      <button type='button' aria-label='refresh project button' onClick={handleUpdate}>
        <BiRefresh size={17} />
      </button>
    </Tooltip>
  );
}
