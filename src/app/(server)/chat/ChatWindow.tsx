"use client";

import style from "./ChatWindow.module.css";
import { NormalUser, MobileUser, Chat, ChatContextProvider } from "./components";

export default function ChatWindow() {
  return (
    <section aria-label='chat window' className={[style.window].join(" ")}>
      <ChatContextProvider>
        <NormalUser />
        <MobileUser />
        <Chat />
      </ChatContextProvider>
    </section>
  );
}
