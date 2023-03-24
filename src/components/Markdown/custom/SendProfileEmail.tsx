import React, { useState } from "react";
import { usePopupContext } from "@/contexts";

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
        popup({ status: false, message: "Failed to send email!" });
      });
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-start md:items-center gap-2'>
      <input
        required
        type='email'
        name='email'
        value={email}
        maxLength={500}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Your email address'
        className='w-full max-w-xs background p-2 h-fit rounded-md background outline outline-1 focus:outline-blue-600 peer'
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
