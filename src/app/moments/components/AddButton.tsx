"use client";

import { BiPlusCircle } from "react-icons/bi";

import { Tooltip } from "@/components";
import { useMomentContext, defaultMoment } from "./MomentContextProvider";

export default function AddButton() {
  const { setMoment, isOpenForm, setIsOpenForm, setIsInsertMode } = useMomentContext();

  return (
    <Tooltip title='Add moment'>
      <button
        type='button'
        disabled={isOpenForm}
        aria-label='add moment button'
        onClick={() => {
          setIsOpenForm(true);
          setIsInsertMode(true);
          setMoment(defaultMoment);
          document.body.style.overflow = "hidden";
        }}
        className='flex flex-row items-center text-gray-700'
      >
        <BiPlusCircle />
      </button>
    </Tooltip>
  );
}
