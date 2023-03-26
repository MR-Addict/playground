import { MdSend } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";

import style from "./Chat.module.css";
import { LoadingDots } from "@/components";
import { useChatContext } from "./ChatProvider";

export default function Chat() {
  const { userInput, setUserInput, messages, setMessages, chatgptStatus, generateResponse } = useChatContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserInput("");
    generateResponse(messages);
  }

  return (
    <div aria-label='chat' className={style.chatwindow}>
      <div className={style.chatwindowframe}>
        <div className={style.messages}>
          {messages.map((item, index) =>
            item.role === "user" ? (
              <div key={index} className='flex flex-row justify-end'>
                <p className='bg-indigo-600 text-white w-fit px-4 py-2 rounded-lg'>{item.content}</p>
              </div>
            ) : (
              <div key={index} className='flex flex-row justify-start'>
                <article className='bg-green-600 text-white w-fit px-4 py-2 rounded-lg whitespace-pre-wrap'>
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
          <input
            required
            type='text'
            id='weather'
            name='weather'
            value={userInput}
            maxLength={2000}
            autoComplete='off'
            placeholder='Ask anything!'
            onChange={(e) => setUserInput(e.target.value)}
            className={[style.input, "background"].join(" ")}
          />

          <button
            aria-label='send message button'
            onClick={() => {
              setMessages([...messages, { role: "user", content: userInput }]);
            }}
            disabled={userInput === "" || chatgptStatus === "thinking"}
            type='submit'
          >
            <MdSend size={23} />
          </button>
        </div>
      </form>
    </div>
  );
}
