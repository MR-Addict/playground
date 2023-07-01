"use client";

import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./ProjectForm.module.css";
import { usePopupContext } from "@/contexts";
import { useProjectContext } from "./ProjectContextProvider";
import { LoadingDots, OperationWindow } from "@/components/server";

export default function ProjectForm({ isOpenForm }: { isOpenForm: boolean }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { project, isInsertMode, setProject, openProjectForm } = useProjectContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const backupFormData = {
      ...(isInsertMode ? {} : { _id: project._id }),
      ...{ owner: project.owner, name: project.name }
    };

    fetch(isInsertMode ? "/api/project/insert" : "/api/project/update", {
      method: isInsertMode ? "POST" : "PUT",
      body: JSON.stringify(backupFormData),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
        if (result.status) openProjectForm(false);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: `Failed to ${isInsertMode ? "insert" : "update"} project` });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow aria-label="project form window" isOpenWindow={isOpenForm}>
      <form
        onSubmit={handleSubmit}
        className={classNames(style.form, "background", isOpenForm ? "scale-100" : "scale-0")}
      >
        <h1 className="font-bold text-3xl text-gray-700 border-b-4 border-b-green-600">Project</h1>

        <div className="w-full flex flex-col gap-3">
          <div className={style.inputgroup}>
            <label htmlFor="owner" className={style.label}>
              Owner
            </label>
            <input
              required
              id="owner"
              name="owner"
              maxLength={100}
              placeholder="Repository owner"
              value={project.owner}
              onChange={(e) => setProject({ ...project, [e.target.name]: e.target.value })}
              className={classNames(style.input, "background")}
            />
          </div>

          <div className={style.inputgroup}>
            <label htmlFor="name" className={style.label}>
              Name
            </label>
            <input
              required
              id="name"
              name="name"
              maxLength={100}
              placeholder="Repository name"
              value={project.name}
              onChange={(e) => setProject({ ...project, [e.target.name]: e.target.value })}
              className={classNames(style.input, "background")}
            />
          </div>
        </div>

        <div className="w-full flex flex-row gap-3 mt-2">
          <button
            type="button"
            onClick={() => openProjectForm(false)}
            className="w-full py-2 rounded-sm background border border-black duration-300 hover:shadow-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!project.name || !project.owner || isSubmitting}
            className={classNames(style.submitbtn, "bg-green-600")}
          >
            {isSubmitting ? <LoadingDots color="white" size={5} /> : <span>{isInsertMode ? "Submit" : "Update"}</span>}
          </button>
        </div>
      </form>
    </OperationWindow>
  );
}
