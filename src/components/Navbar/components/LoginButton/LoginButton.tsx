"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import style from "./LoginButton.module.css";
import { LoadingDots } from "@/components";
import { useLoginContext } from "@/contexts";

export default function LoginButton() {
  const { data: session } = useSession();
  const { openLoginForm, isLoggingIn } = useLoginContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (session) {
    return (
      <button
        type='button'
        disabled={isLoggingOut}
        onClick={() => {
          signOut();
          setIsLoggingOut(true);
        }}
        className={[style.btn, "bg-green-600"].join(" ")}
      >
        {isLoggingOut ? <LoadingDots color='white' size={5} /> : <span>Logout</span>}
      </button>
    );
  } else {
    return (
      <button
        type='button'
        disabled={isLoggingIn}
        onClick={() => openLoginForm(true)}
        className={[style.btn, "bg-green-600"].join(" ")}
      >
        {isLoggingIn ? <LoadingDots color='white' size={5} /> : <span>Login</span>}
      </button>
    );
  }
}
