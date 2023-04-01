"use client";

import classNames from "classnames";

import style from "./LoginButton.module.css";
import { useLoginContext } from "@/contexts";
import { LoadingDots } from "@/components/server";

export default function LoginButton() {
  const { openLoginForm, isLoggingIn } = useLoginContext();

  return (
    <button
      type='button'
      disabled={isLoggingIn}
      onClick={() => openLoginForm(true)}
      className={classNames(style.btn, "bg-green-600")}
    >
      {isLoggingIn ? <LoadingDots color='white' size={5} /> : <span>Login</span>}
    </button>
  );
}
