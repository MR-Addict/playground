import classNames from "classnames";
import { AiOutlineUnorderedList } from "react-icons/ai";

import style from "../ThreeDots.module.css";
import { DragButton, AddButton } from "../Buttons";

export default function MenuButton() {
  return (
    <div className={classNames(style.dots, "z-10")}>
      <button aria-label='menu button' type='button' className='p-1 rounded-full'>
        <AiOutlineUnorderedList />
      </button>

      <div className={classNames(style["dots-container"], "background")}>
        <AddButton />
        <DragButton />
      </div>
    </div>
  );
}
