"use client";

import { BiPlusCircle } from "react-icons/bi";

import { Tooltip } from "@/components";
import { useMomentContext } from "./MomentContextProvider";

export default function AddButton() {
  const { setMoment, setIsOpenForm, setIsInsertMode } = useMomentContext();

  return (
    <Tooltip title='Add moment'>
      <button
        type='button'
        aria-label='add moment button'
        onClick={() => {
          setIsOpenForm(true);
          setIsInsertMode(true);
          setMoment({ _id: "", date: "", weather: "", moment: "" });
          document.body.style.overflow = "hidden";
        }}
        className='flex flex-row items-center text-gray-700'
      >
        <BiPlusCircle />
      </button>
    </Tooltip>
  );
}
