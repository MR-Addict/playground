"use client";

import { useState } from "react";
import { MdSend } from "react-icons/md";

import { usePopupContext } from "@/components";

export default function FeedbackForm() {
  const { popup } = usePopupContext();

  const [feedback, setFeedback] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("/api/feedback/insert", {
      method: "POST",
      body: new URLSearchParams({ feedback }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status) {
          setFeedback("");
          popup({ status: true, message: "Thanks for your feedback!" });
        } else {
          popup({ status: false, message: "Submit your feedback failed!" });
          console.error(result.message);
        }
      })
      .catch((error) => {
        popup({ status: false, message: "Submit your feedback failed!" });
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-row justify-center'>
      <input
        required
        name='feedback'
        maxLength={500}
        value={feedback}
        placeholder="What's in your mind?"
        onChange={(e) => setFeedback(e.target.value)}
        className='flex-1 outline-none border-2 border-green-600 rounded-l-md w-full p-3 peer'
      />
      <button
        type='submit'
        className='bg-green-600 text-white rounded-r-md py-3 px-4 font-semibold text-lg flex flex-row items-center gap-1 hover:bg-green-700 group'
      >
        <span className='translate-x-2 group-hover:translate-x-0 duration-300'>Submit</span>
        <span className='opacity-0 translate-x-[100%] group-hover:opacity-100 group-hover:translate-x-0 duration-300'>
          <MdSend size={15} />
        </span>
      </button>
    </form>
  );
}
