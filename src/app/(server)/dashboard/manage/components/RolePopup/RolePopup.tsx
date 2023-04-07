"use client";

import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";

import style from "./RolePopup.module.css";
import { UserRoleType, roles } from "@/types/user";
import { usePopupContext } from "@/contexts";
import { LoadingDots, OperationWindow } from "@/components/server";

export default function RolePopup({
  _id,
  role,
  isOpenForm,
  openRolePopup,
}: {
  _id: string;
  role: UserRoleType;
  isOpenForm: boolean;
  openRolePopup: Function;
}) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [formData, setFormData] = useState(role);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    fetch("/api/user/update", {
      method: "PUT",
      body: JSON.stringify({ _id: _id, role: formData }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to update user role" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <OperationWindow aria-label='role popup window' isOpenWindow={isOpenForm}>
      <form
        onSubmit={handleSubmit}
        className={classNames(style.form, "background", isOpenForm ? "scale-100" : "scale-0")}
      >
        <label htmlFor='manageRole' className={style.label}>
          Update Role
        </label>

        <select
          required
          id='manageRole'
          value={formData}
          className={classNames(style.input, "background")}
          onChange={(e) => setFormData(e.target.value as UserRoleType)}
        >
          {roles.map((role) => (
            <option value={role}>{role}</option>
          ))}
        </select>

        <div className='w-full flex flex-row gap-3'>
          <button
            type='button'
            onClick={() => openRolePopup(false)}
            className='w-full py-2 rounded-sm border border-black duration-300 hover:shadow-md'
          >
            Cancel
          </button>
          <button
            type='submit'
            className={classNames(style.submitbtn, "bg-green-600")}
            disabled={!formData || isSubmitting}
          >
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
          </button>
        </div>
      </form>
    </OperationWindow>
  );
}
