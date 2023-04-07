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
    backupSession.user.email = formData.email;
    updateSession.update(backupSession);

    fetch("/api/user/update", {
      method: "PUT",
      body: JSON.stringify({ _id: formData._id, email: formData.email }),
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
        popup({ status: false, message: "Failed to update your email" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit} className={style["input-element"]}>
      <label htmlFor='accountEmail' className={style.label}>
        Your Email
      </label>

      <div className='w-full flex flex-row'>
        <input
          required
          type='email'
          name='email'
          id='accountEmail'
          placeholder='Email'
          value={formData.email}
          maxLength={100}
          className={classNames(style.input, "background")}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
        <button
          type='submit'
          disabled={!formData.email || isSubmitting}
          className={classNames(style.submitbtn, "bg-green-600 text-white")}
        >
          {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
        </button>
      </div>
    </form>
  );
}
