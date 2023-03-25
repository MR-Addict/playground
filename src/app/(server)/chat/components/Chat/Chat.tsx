"use client";

import { MdSend } from "react-icons/md";

import style from "./Chat.module.css";

export default function Chat() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div aria-label='chat' className={style.chat}>
      <div>
        <h1>Hello world</h1>
      </div>
      <form onSubmit={handleSubmit} className={style.sendbox}>
        <textarea />
        <button type='submit'>
          <MdSend size={23} />
        </button>
      </form>
    </div>
  );
}
