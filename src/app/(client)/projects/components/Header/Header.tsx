import classNames from "classnames";
import { AiOutlineUnorderedList } from "react-icons/ai";

import style from "../ThreeDots.module.css";
import { DragButton, AddButton } from "../Buttons";

export default function Header() {
  return (
    <header className='flex flex-row items-end justify-between gap-2 z-10'>
      <h1 className='text-gray-700 font-bold text-3xl'>Projects</h1>

      <div className={style.dots}>
        <button aria-label='menu button' type='button' className='p-1 rounded-full'>
          <AiOutlineUnorderedList />
        </button>

        <div className={classNames(style["dots-container"], "background")}>
          <AddButton />
          <DragButton />
        </div>
      </div>
    </header>
  );
}
