import style from "./NormalUser.module.css";
import { AiOutlineClear } from "react-icons/ai";

import { useChatContext } from "../Chat/ChatProvider";

export default function NormalUser() {
  const { resetMessages, chatgptStatus } = useChatContext();

  return (
    <div aria-label='user setting' className={style.user}>
      <div className='w-full flex flex-col'>
        <button
          onClick={resetMessages}
          disabled={chatgptStatus === "thinking"}
          className={[style.btn, "border border-gray-500"].join(" ")}
        >
          <AiOutlineClear size={20} />
          <span>Clear histroy</span>
        </button>
      </div>
    </div>
  );
}
