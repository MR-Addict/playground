"use client";

import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import style from "./RolePopup.module.css";
import { roles } from "@/types/user";
import { usePopupContext } from "@/contexts";
import { LoadingDots, OperationWindow } from "@/components/server";
import { useRolePopupContext } from "./RolePopupContextProvider";
import { Session } from "next-auth";

export default function RolePopup({ isOpenForm, session }: { isOpenForm: boolean; session: Session }) {
  const router = useRouter();
  const updateSession = useSession();
  const { popup } = usePopupContext();
  const { userIDRole, setUserIDRole, openRolePopup } = useRolePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const backupSession = { ...session };
    backupSession.user.role = userIDRole.role;
    const result = await updateSession.update(backupSession);

    // TODO:
    // Implement better way to check update result.

    setIsSubmitting(false);
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
          name='role'
          value={userIDRole.role}
          className={classNames(style.input, "background")}
          onChange={(e) => setUserIDRole({ ...userIDRole, [e.target.name]: e.target.value })}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
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
          <button type='submit' className={classNames(style.submitbtn, "bg-green-600")} disabled={isSubmitting}>
            {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
          </button>
        </div>
      </form>
    </OperationWindow>
  );
}
