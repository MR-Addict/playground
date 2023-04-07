"use client";

import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

import style from "./SignupForm.module.css";
import { usePopupContext } from "@/contexts";
import { LoadingDots } from "@/components/server";

const defaultFormData = { email: "", password: "", confirmPassword: "" };

export default function SignupForm() {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      popup({ status: false, message: "Password confirmation does not match" });
      setFormData({ ...formData, confirmPassword: "" });
      setIsSubmitting(false);
      return;
    }

    fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) {
          setFormData(defaultFormData);
          router.push("/");
        } else console.error(result.message);
      })
      .catch((error) => {
        console.error(error);
        popup({ status: false, message: "Failed to signup" });
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form onSubmit={handleSubmit} className={classNames(style.form, "background")}>
      <h1 className='font-bold text-4xl text-center text-gray-700'>Signup</h1>

      <div className='flex flex-col gap-2'>
        <div className={style.inputgroup}>
          <label htmlFor='signupEmail' className={style.label}>
            <AiOutlineMail />
            <span>Email</span>
          </label>
          <input
            required
            id='signupEmail'
            type='email'
            name='email'
            autoComplete='off'
            maxLength={100}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className={classNames(style.input, "background")}
          />
        </div>

        <div className={style.inputgroup}>
          <label htmlFor='signupPassword' className={style.label}>
            <AiOutlineLock />
            <span>Password</span>
          </label>
          <input
            required
            id='signupPassword'
            type='password'
            name='password'
            autoComplete='off'
            minLength={8}
            maxLength={100}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className={classNames(style.input, "background")}
          />
        </div>

        <div className={style.inputgroup}>
          <label htmlFor='confirmPassword' className={style.label}>
            <AiOutlineUnlock />
            <span>Confirm Password</span>
          </label>
          <input
            required
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            autoComplete='off'
            minLength={8}
            maxLength={100}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className={classNames(style.input, "background")}
          />
        </div>

        <button
          type='submit'
          className={classNames(style.submitbtn, "bg-green-600")}
          disabled={!formData.password || !formData.email || !formData.confirmPassword || isSubmitting}
        >
          {isSubmitting ? <LoadingDots color='white' size={5} /> : <span>Signup</span>}
        </button>
      </div>
    </form>
  );
}
