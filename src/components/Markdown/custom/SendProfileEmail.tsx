import React, { useState } from "react";
import { usePopupContext } from "@/components";

export default function SendProfileEmail() {
  const { popup } = usePopupContext();
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
        popup({ status: false, message: "Sending email failed!" });
      });
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-start md:items-center gap-2'>
      <input
        required
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email address'
        className='w-full max-w-xs p-2 h-fit rounded-md outline outline-1 outline-gray-500 bg-gray-200 text-gray-700 peer focus:outline-blue-600'
      />
      <button
        type='submit'
        disabled={email === ""}
        className='bg-green-600 text-white font-semibold text-lg border-b-4 border-r-4 border-l-4 border-t-2 shadow-md border-green-700 py-1 px-2 rounded-md my-3 peer-invalid:cursor-not-allowed disabled:cursor-not-allowed hover:shadow-lg duration-300'
      >
        Send Me Email
      </button>
    </form>
  );
}
