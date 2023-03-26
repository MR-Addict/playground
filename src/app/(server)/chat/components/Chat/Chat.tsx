import { MdSend } from "react-icons/md";
import { BiRefresh } from "react-icons/bi";
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
                <p className='bg-gray-300 w-fit px-4 py-2 rounded-lg'>{item.content}</p>
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
        {messages.length !== 0 && chatgptStatus !== "thinking" && (
          <div className='w-full flex flex-row justify-center items-center'>
            <button
              type='button'
              onClick={() => {
                const slicedMessages = messages.slice(0, -1);
                setMessages(slicedMessages);
                generateResponse(slicedMessages);
              }}
              className='flex flex-row items-center gap-1 px-4 py-2 background border border-gray-300 rounded-md text-gray-700'
            >
              <BiRefresh size={20} />
              <p>Regenerate response</p>
            </button>
          </div>
        )}

        <div className='w-full relative'>
          <textarea
            required
            id='weather'
            name='weather'
            value={userInput}
            maxLength={2000}
            placeholder='Ask anything!'
            onChange={(e) => setUserInput(e.target.value)}
            className={[style.input, "background"].join(" ")}
          />

          <button
            aria-label='send message button'
            onClick={() => {
              setMessages([...messages, { role: "user", content: userInput }]);
            }}
            disabled={userInput === "" || chatgptStatus !== "idle"}
            type='submit'
          >
            <MdSend size={23} />
          </button>
        </div>
      </form>
    </div>
  );
}
