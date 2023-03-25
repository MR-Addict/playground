import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import style from "./NormalUser.module.css";

export default function NormalUser() {
  return (
    <div aria-label='user setting' className={style.user}>
      <div className='w-full flex flex-col'>
        <button className={[style.btn, "border border-gray-500"].join(" ")}>
          <AiOutlinePlus size={20} />
          <span>New chat</span>
        </button>
      </div>

      <div className='flex flex-col gap-3 pt-3'>
        <button className={style.btn}>
          <RiDeleteBin5Line />
          <span>Clear all chats</span>
        </button>
      </div>
    </div>
  );
}
