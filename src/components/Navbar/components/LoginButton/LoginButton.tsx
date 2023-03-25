"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import style from "./LoginButton.module.css";
import { LoadingDots } from "@/components";
import { useLoginContext } from "@/contexts";

export default function LoginButton() {
  const { data: session } = useSession();
  const { openLoginForm } = useLoginContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (session) {
    return (
      <button
        type='button'
        onClick={() => {
          signOut();
          setIsLoggingOut(true);
        }}
        className={style.btn}
      >
        {isLoggingOut ? <LoadingDots color='white' size={5} /> : <span>Logout</span>}
      </button>
    );
  } else {
    return (
      <button type='button' onClick={() => openLoginForm(true)} className={style.btn}>
        Login
      </button>
    );
  }
}
