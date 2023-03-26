import style from "./NormalUser.module.css";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";

import { useChatContext } from "../Chat/ChatProvider";

export default function NormalUser() {
  const { resetMessages, chatgptStatus, messages, setMessages, generateResponse } = useChatContext();

  return (
    <div aria-label='user setting' className={style.user}>
      <div className='w-full h-full flex flex-col justify-between'>
        <button
          onClick={resetMessages}
          disabled={chatgptStatus === "thinking"}
          className={[style.btn, "border border-gray-500"].join(" ")}
        >
          <AiOutlineClear size={20} />
          <span>Clear histroy</span>
        </button>

        <button
          aria-label='regenerate button'
          type='button'
          onClick={() => {
            const slicedMessages = messages.slice(0, -1);
            setMessages(slicedMessages);
            generateResponse(slicedMessages);
          }}
          className={[style.btn, "border border-gray-500"].join(" ")}
        >
          <BiRefresh size={20} />
          <span>Regnerate response</span>
        </button>
      </div>
    </div>
  );
}
