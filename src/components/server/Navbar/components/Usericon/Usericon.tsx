"use client";

import classNames from "classnames";
import { Session } from "next-auth";
import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineUser } from "react-icons/ai";

import style from "./Usericon.module.css";
import { ClientLink } from "@/components/client";
import { LoadingDots } from "@/components/server";
import { useWindowSize, useClickOutside } from "@/hooks";

export default function Usericon({ session }: { session: Session }) {
  const windowSize = useWindowSize();
  const dropmenuRef = useRef<HTMLDivElement>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useClickOutside(dropmenuRef, () => setIsActive(false));

  return (
    <div ref={dropmenuRef} className={style.usericon}>
      <button
        aria-label='user icon button'
        disabled={windowSize.width > 768}
        onClick={() => setIsActive(!isActive)}
        type='button'
      >
        <AiOutlineUser size={20} />
      </button>
      <div className={classNames(style.dropmenu, "background", isActive ? style.active : "")}>
        <div>
          <p>Hello, {session.user.username}.</p>
          <p className='text-sm text-gray-500'>{session.user.email}</p>
        </div>
        <hr />
        <ClientLink href='/' className='w-full hover:text-green-600'>
          Dashboard
        </ClientLink>
        <hr />
        <button
          type='button'
          disabled={isLoggingOut}
          onClick={() => {
            signOut();
            setIsLoggingOut(true);
          }}
          className='w-full bg-green-600 h-9 text-white rounded-sm flex flex-row items-center justify-center'
        >
          {isLoggingOut ? <LoadingDots color='white' size={5} /> : <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
