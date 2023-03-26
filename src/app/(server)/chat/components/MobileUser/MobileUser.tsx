"use client";

import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import style from "./MobileUser.module.css";
import Settings from "../Settings/Settings";
import { useChatContext } from "../Chat/ChatProvider";

export default function MobileUser() {
  const { resetMessages, chatgptStatus } = useChatContext();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div aria-label='user setting' className={style.user}>
      <button
        onClick={resetMessages}
        aria-label='clear history'
        disabled={chatgptStatus === "thinking"}
        className={[style.btn].join(" ")}
      >
        <AiOutlineClear size={20} />
      </button>

      <button
        onClick={() => setOpenSettings(!openSettings)}
        type='button'
        className={[style.hamburger, openSettings ? style.active : ""].join(" ")}
        aria-label='mobile nav button to toggle menu'
      >
        <div></div>
        <div></div>
      </button>

      {openSettings && (
        <div className='absolute left-0 w-full -bottom-[27rem] z-10 text-white'>
          <Settings />
        </div>
      )}
    </div>
  );
}
