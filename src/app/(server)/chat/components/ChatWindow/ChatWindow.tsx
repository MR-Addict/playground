"use client";

import classNames from "classnames";
import { MdSend } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";

import style from "./ChatWindow.module.css";
import { useChatContext } from "./ChatProvider";
import { LoadingDots } from "@/components/server";

export default function ChatWindow() {
  const { userInput, setUserInput, messages, setMessages, chatgptStatus, generateResponse } = useChatContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserInput("");
    generateResponse(messages);
  }

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setUserInput(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  return (
    <section aria-label='chat window' className={style.chatwindow}>
      <div className={style.chatwindowframe}>
        <div className={style.messages}>
          {messages.map((item, index) =>
            item.role === "user" ? (
              <div key={index} className='flex flex-row justify-end'>
                <p className='bg-indigo-600 text-white w-fit px-4 py-2 rounded-lg whitespace-pre-wrap'>
                  {item.content}
                </p>
              </div>
            ) : (
              <div key={index} className='flex flex-row justify-start'>
                <article className='bg-gray-300 text-gray-700 w-fit px-4 py-2 rounded-lg whitespace-pre-wrap'>
                  {item.content}
                </article>
              </div>
            )
          )}

          {chatgptStatus === "thinking" && (
            <div className='ml-2'>
              <LoadingDots color='gray' size={5} />
            </div>
          )}

          {chatgptStatus === "error" && (
            <div className='w-fit px-4 py-2 rounded-lg bg-red-600 text-white flex flex-row items-center gap-1'>
              <span>
                <MdErrorOutline size={20} />
              </span>
              <p>ChatGPT failed to response!</p>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className='w-full relative'>
          <div className='w-full py-2.5 pl-4 border border-gray-200 rounded-md shadow-lg'>
            <textarea
              required
              value={userInput}
              maxLength={2000}
              onChange={handleInput}
              placeholder='Ask anything!'
              className={classNames(style.input, "background")}
            />
          </div>

          <button
            aria-label='send message button'
            onClick={() => setMessages([...messages, { role: "user", content: userInput }])}
            disabled={!userInput || chatgptStatus === "thinking"}
            type='submit'
          >
            <MdSend size={23} />
          </button>
        </div>
      </form>
    </section>
  );
}
