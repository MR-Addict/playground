"use client";

import style from "./Chat.module.css";
import { NormalSettings, ChatWindow, MobileSettings } from "./components";

export default function Chat() {
  return (
    <section aria-label='chat window' className={[style.window].join(" ")}>
      <NormalSettings />
      <MobileSettings />
      <ChatWindow />
    </section>
  );
}
