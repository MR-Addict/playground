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
      .then((data) => {
        if (data.status) {
          setFeedback("");
          popup({ status: true, message: "Thanks for your feedback!" });
        } else {
          popup({ status: false, message: "Submit your feedback failed!" });
          console.error(data.message);
        }
      })
      .catch((error) => {
        popup({ status: false, message: "Submit your feedback failed!" });
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-row justify-center'>
      <div className='flex-1 p-3 border-2 border-green-600 rounded-l-md relative'>
        <input
          required
          name='feedback'
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          maxLength={500}
          className='outline-none peer w-full'
        />
        <p className='absolute peer-valid:bg-white text-gray-500 top-3 left-3 pointer-events-none peer-valid:text-sm peer-valid:text-blue-600 peer-valid:-top-3 duration-300'>
          What's in your mind?
        </p>
      </div>
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
