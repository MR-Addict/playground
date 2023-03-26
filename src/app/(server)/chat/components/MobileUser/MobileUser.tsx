import { AiOutlineClear } from "react-icons/ai";

import style from "./MobileUser.module.css";
import { useChatContext } from "../Chat/ChatProvider";

export default function MobileUser() {
  const { resetMessages, chatgptStatus } = useChatContext();

  return (
    <div aria-label='user setting' className={style.user}>
      <button onClick={resetMessages} disabled={chatgptStatus === "thinking"} className={[style.btn].join(" ")}>
        <AiOutlineClear size={20} />
      </button>

      <button type='button' className={[style.hamburger].join(" ")} aria-label='mobile nav button to toggle menu'>
        <div></div>
        <div></div>
      </button>
    </div>
  );
}
