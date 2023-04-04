"use client";

import classNames from "classnames";
import { useState } from "react";
import { MdSend } from "react-icons/md";

import style from "./FeedbackForm.module.css";
import { usePopupContext } from "@/contexts";
import { LoadingDots } from "@/components/server";

export default function FeedbackForm() {
  const { popup } = usePopupContext();

  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function revalidatePage() {
    fetch(`/api/feedback/revalidate`)
      .then((res) => res.json())
      .then((result) => {
        if (!result.status) console.error(result.message);
      })
      .catch((error) => console.error(error));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("/api/feedback/insert", {
      method: "POST",
      body: new URLSearchParams({ feedback }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) {
          setFeedback("");
          revalidatePage();
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to send your feedback" });
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <input
        required
        type='text'
        name='feedback'
        maxLength={1000}
        value={feedback}
        placeholder='Thanks for your feedback'
        onChange={(e) => setFeedback(e.target.value)}
        className='w-full background outline-none border p-3 flex-1 border-green-600 rounded-l-md'
      />
      <button type='submit' disabled={!feedback || isSubmitting} className={classNames(style.btn, "bg-green-600")}>
        {isSubmitting ? (
          <LoadingDots color='white' size={5} />
        ) : (
          <>
            <span className={style.btntext}>Submit</span>
            <span className={style.btnicon}>
              <MdSend size={15} />
            </span>
          </>
        )}
      </button>
    </form>
  );
}
