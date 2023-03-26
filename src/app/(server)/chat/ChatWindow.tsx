"use client";

import style from "./ChatWindow.module.css";
import { NormalUser, Chat, MobileUser } from "./components";

export default function ChatWindow() {
  return (
    <section aria-label='chat window' className={[style.window].join(" ")}>
      <NormalUser />
      <MobileUser />
      <Chat />
    </section>
  );
}
