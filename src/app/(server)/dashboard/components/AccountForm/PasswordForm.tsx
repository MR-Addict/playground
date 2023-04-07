"use client";

import classNames from "classnames";
import { useState } from "react";
import { Session } from "next-auth";

import style from "./AccountForm.module.css";
import { LoadingDots } from "@/components/server";
import { usePopupContext } from "@/contexts";

export default function PasswordForm({ session }: { session: Session }) {
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    fetch("/api/user/update", {
      method: "PUT",
      body: JSON.stringify({ _id: session.user._id, password: formData }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) setFormData("");
        else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to update your password" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit} className={style["input-element"]}>
      <label htmlFor='accountPassword' className={style.label}>
        New Password
      </label>

      <div className='w-full flex flex-row'>
        <input
          required
          type='password'
          name='password'
          id='accountPassword'
          placeholder='***************'
          value={formData}
          maxLength={100}
          className={classNames(style.input, "background")}
          onChange={(e) => setFormData(e.target.value)}
        />
        <button
          type='submit'
          disabled={!formData || isSubmitting}
          className={classNames(style.submitbtn, "bg-black text-white")}
        >
          {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Update</span>}
        </button>
      </div>
    </form>
  );
}
