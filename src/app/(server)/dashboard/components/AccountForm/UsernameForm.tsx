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
  const [formData, setFormData] = useState(session.user);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const backupSession = { ...session };
    backupSession.user.username = formData.username;
    updateSession.update(backupSession);

    fetch("/api/user/update", {
      method: "PUT",
      body: JSON.stringify({ _id: formData._id, username: formData.username }),
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
        popup({ status: false, message: "Failed to update profile" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit} className={style["input-element"]}>
      <label htmlFor='accountUsername' className={style.label}>
        Username
      </label>

      <div className='w-full flex flex-row'>
        <input
          required
          type='text'
          name='username'
          id='accountUsername'
          placeholder='Username'
          value={formData.username}
          maxLength={100}
          className={classNames(style.input, "background")}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
        <button
          type='submit'
          disabled={!formData.username}
          className={classNames(style.submitbtn, "bg-black text-white")}
        >
          {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
        </button>
      </div>
    </form>
  );
}
