"use client";

import { useState } from "react";
import { MdSend } from "react-icons/md";

import style from "./Chat.module.css";
import { Message, MessageType } from "@/types/chatgpt";

const defaultMessages: MessageType[] = [];

export default function Chat() {
  const [userInput, setUserInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState(defaultMessages);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserInput("");
    setIsSubmitting(true);

    fetch("/api/openai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-3.5-turbo", messages }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.status) console.error(result.message);
        else {
          const message = Message.parse(result.data.choices[0].message);
          setMessages([...messages, message]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div aria-label='chat' className={style.chat}>
      <div>
        {messages.map((item, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <h1>{item.role}</h1>
            <p>{item.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={style.sendbox}>
        <textarea
          required
          id='weather'
          name='weather'
          value={userInput}
          maxLength={2000}
          onChange={(e) => setUserInput(e.target.value)}
          className={[style.textarea, "background"].join(" ")}
        />
        <button
          onClick={() => setMessages([...messages, { role: "user", content: userInput }])}
          disabled={userInput === "" || isSubmitting}
          type='submit'
        >
          <MdSend size={23} />
        </button>
      </form>
    </div>
  );
}
