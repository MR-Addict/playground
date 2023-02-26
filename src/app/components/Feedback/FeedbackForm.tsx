"use client";

import { useState } from "react";
import { MdSend } from "react-icons/md";

import { usePopupContext } from "@/components";

export default function FeedbackForm() {
  const { popup } = usePopupContext();

  const [feedback, setFeedback] = useState("");

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
    const backupFeedback = feedback;
    setFeedback("");
    fetch("/api/feedback/insert", {
      method: "POST",
      body: new URLSearchParams({ feedback: backupFeedback }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) revalidatePage();
        else console.error(result.message);
      })
      .catch((error) => {
        popup({ status: false, message: "Failed to send feedback!" });
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-row justify-center rounded-md shadow-md'>
      <input
        required
        type='text'
        name='feedback'
        maxLength={500}
        value={feedback}
        placeholder='Any words is ok!'
        onChange={(e) => setFeedback(e.target.value)}
        className='w-full background outline-none p-3 flex-1 border-2 border-green-600 rounded-l-md peer'
      />
      <button
        type='submit'
        disabled={feedback === ""}
        className='bg-green-600 text-white rounded-r-md py-3 px-4 font-semibold text-lg flex flex-row items-center gap-1 hover:bg-green-700 disabled:cursor-not-allowed group'
      >
        <span className='translate-x-2 group-hover:translate-x-0 duration-300'>Submit</span>
        <span className='opacity-0 translate-x-[100%] group-hover:opacity-100 group-hover:translate-x-0 duration-300'>
          <MdSend size={15} />
        </span>
      </button>
    </form>
  );
}
