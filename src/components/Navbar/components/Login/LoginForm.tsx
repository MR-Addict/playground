"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

import style from "./LoginForm.module.css";
import { usePopupContext } from "@/components";

export default function LoginForm({ isOpenForm, setIsOpenForm }: { isOpenForm: boolean; setIsOpenForm: Function }) {
  const { popup } = usePopupContext();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    });
    if (res && !res.ok) {
      popup({ status: false, message: "Username or Password Incorrect!" });
    } else {
      location.reload();
    }
  };

  return (
    <div
      className={`${
        isOpenForm ? "scale-100" : "scale-0"
      } z-10 fixed top-0 left-0 frame w-full h-full flex flex-col items-center justify-center bg-black/40`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          isOpenForm ? "scale-100" : "scale-0"
        } duration-200 w-full md:max-w-xs flex flex-col gap-4 rounded-md background p-5 md:p-7`}
      >
        <h1 className='font-bold text-4xl text-center'>Login</h1>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='username' className='flex flex-row items-center gap-2 text-gray-700 font-semibold'>
              <FaUserAlt />
              <span>Username</span>
            </label>
            <input
              required
              type='text'
              id='username'
              name='username'
              maxLength={500}
              placeholder='Username'
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={[style.input, "background"].join(" ")}
            />
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='password' className='flex flex-row items-center gap-2 text-gray-700 font-semibold'>
              <FaLock />
              <span>Password</span>
            </label>
            <input
              required
              id='password'
              type='password'
              name='password'
              maxLength={500}
              placeholder='Password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              className={[style.input, "background"].join(" ")}
            />
          </div>

          <div className='w-full flex flex-row gap-3'>
            <button
              type='button'
              onClick={() => {
                setIsOpenForm(false);
                document.body.style.overflow = "auto";
              }}
              className='w-full py-2 rounded-sm background outline outline-1 hover:shadow-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={formData.password === "" || formData.username === ""}
              className='w-full py-2 rounded-sm outline outline-1 outline-black duration-300 bg-green-600 hover:bg-green-700 text-white disabled:cursor-not-allowed'
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
