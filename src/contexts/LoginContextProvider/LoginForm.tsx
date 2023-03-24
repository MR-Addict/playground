"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import style from "./LoginForm.module.css";
import { usePopupContext, useLoginContext } from "@/contexts";

export default function LoginForm({ isOpenForm }: { isOpenForm: boolean }) {
  const { popup } = usePopupContext();
  const { openLoginForm } = useLoginContext();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
      // @ts-expect-error
    }).then(({ ok, error }) => {
      if (ok) location.reload();
      else {
        console.log(error, "Error");
        popup({ status: false, message: "Username or Password Incorrect!" });
      }
    });
  };

  return (
    <div className={[isOpenForm ? "scale-100" : "scale-0", "frame", style.frame].join(" ")}>
      <form
        onSubmit={handleSubmit}
        className={[style.form, "background", isOpenForm ? "scale-100" : "scale-0"].join(" ")}
      >
        <h1 className='font-bold text-4xl text-center'>Login</h1>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='username' className='flex flex-row items-center gap-2 text-gray-700'>
              <FaUserAlt />
              <span>Username</span>
            </label>
            <input
              required
              type='text'
              id='username'
              name='username'
              maxLength={10}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={style.input}
            />
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='password' className='flex flex-row items-center gap-2 text-gray-700'>
              <FaLock />
              <span>Password</span>
            </label>
            <input
              required
              id='password'
              type='password'
              name='password'
              maxLength={100}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={style.input}
            />
          </div>

          <div className='w-full flex flex-row gap-3'>
            <button
              type='button'
              onClick={() => openLoginForm(false)}
              className='w-full py-2 rounded-sm outline outline-1 hover:shadow-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={formData.password === "" || formData.username === ""}
              className={[style.submitbtn, "bg-green-600"].join(" ")}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
