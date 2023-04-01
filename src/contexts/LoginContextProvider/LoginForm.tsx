"use client";

import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

import style from "./LoginForm.module.css";
import { usePopupContext, useLoginContext } from "@/contexts";
import { LoadingDots, OperationWindow } from "@/components/server";

export default function LoginForm({ isOpenForm }: { isOpenForm: boolean }) {
  const { popup } = usePopupContext();
  const { openLoginForm, isLoggingIn, setIsLoggingIn } = useLoginContext();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggingIn(true);

    await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    })
      // @ts-expect-error
      .then(({ ok, error }) => {
        if (ok) location.reload();
        else {
          console.error(error);
          setIsLoggingIn(false);
          popup({ status: false, message: "Username or password incorrect" });
        }
      });
  };

  return (
    <OperationWindow isOpenWindow={isOpenForm}>
      <form
        onSubmit={handleSubmit}
        className={classNames(style.form, "background", isOpenForm ? "scale-100" : "scale-0")}
      >
        <h1 className='font-bold text-4xl text-center'>Login</h1>

        <div className='flex flex-col gap-6'>
          <div className={style.inputgroup}>
            <label htmlFor='loginUsername' className={style.label}>
              <AiOutlineUser />
              <span>Username</span>
            </label>
            <input
              required
              type='text'
              id='loginUsername'
              name='username'
              maxLength={10}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={classNames(style.input, "background")}
            />
          </div>

          <div className={style.inputgroup}>
            <label htmlFor='loginPassword' className={style.label}>
              <AiOutlineLock />
              <span>Password</span>
            </label>
            <input
              required
              id='loginPassword'
              type='password'
              name='password'
              maxLength={100}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={classNames(style.input, "background")}
            />
          </div>

          <div className='w-full flex flex-row gap-3'>
            <button
              type='button'
              onClick={() => openLoginForm(false)}
              className='w-full py-2 rounded-sm border border-black duration-300 hover:shadow-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className={classNames(style.submitbtn, "bg-green-600")}
              disabled={!formData.username || !formData.password || isLoggingIn}
            >
              {isLoggingIn ? <LoadingDots color='white' size={5} /> : <span>Login</span>}
            </button>
          </div>

          <div className='flex flex-row justify-center gap-2'>
            <span>Getting started?</span>
            <Link href='/signup' onClick={() => openLoginForm(false)} className='text-blue-600 hover:underline'>
              Signup
            </Link>
          </div>
        </div>
      </form>
    </OperationWindow>
  );
}
