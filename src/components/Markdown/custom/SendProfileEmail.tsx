import React, { useState } from "react";

import style from "./custom.module.css";
import { LoadingDots } from "@/components";
import { usePopupContext } from "@/contexts";

export default function SendProfileEmail() {
  const { popup } = usePopupContext();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const backupEmail = email;
    setEmail("");
    fetch("/api/blog/sendprofileemail", {
      method: "POST",
      body: new URLSearchParams({ email: backupEmail }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) console.error(result.message);
        popup(result);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to send email!" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        required
        type='email'
        name='email'
        value={email}
        maxLength={100}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email address'
        className='w-full max-w-xs background p-2 h-fit rounded-md background outline-none border border-black focus:border-blue-600'
      />
      <button
        type='submit'
        disabled={email === "" || isSubmitting}
        className={[style.submitbtn, "bg-green-600 border-green-700 text-white"].join(" ")}
      >
        {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Send Me Email</span>}
      </button>
    </form>
  );
}
