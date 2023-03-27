"use client";

import { useState } from "react";
import { AiOutlineClear } from "react-icons/ai";

import Settings from "../Settings/Settings";
import style from "./MobileSettings.module.css";
import { useChatContext } from "../ChatWindow/ChatProvider";

export default function MobileSettings() {
  const { resetMessages, chatgptStatus } = useChatContext();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <section aria-label='mobile setting' className={style.user}>
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
        <div className='absolute left-0 w-full -bottom-[28.5rem] z-10 text-white'>
          <Settings />
        </div>
      )}
    </section>
  );
}
