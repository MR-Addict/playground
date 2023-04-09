"use client";

import classNames from "classnames";
import { useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import style from "./AccountForm.module.css";
import { LoadingDots } from "@/components/server";
import { usePopupContext } from "@/contexts";

export default function UsernameForm({ session }: { session: Session }) {
  const router = useRouter();
  const updateSession = useSession();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(session.user.username);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const backupSession = { ...session };
    backupSession.user.username = formData;
    const result = await updateSession.update(backupSession);

    // TODO:
    // Implement better way to check update result.

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className={style["input-element"]}>
      <label htmlFor='accountUsername' className={style.label}>
        Your Username
      </label>

      <div className='w-full flex flex-row'>
        <input
          required
          type='text'
          name='username'
          id='accountUsername'
          placeholder='Username'
          value={formData}
          maxLength={100}
          className={classNames(style.input, "background")}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button
          type='submit'
          disabled={!formData || isSubmitting}
          className={classNames(style.submitbtn, "bg-green-600 text-white")}
        >
          {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
        </button>
      </div>
    </form>
  );
}
