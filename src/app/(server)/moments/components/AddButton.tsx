"use client";

import { BiPlusCircle } from "react-icons/bi";

import { Tooltip } from "@/components/server";
import { useMomentContext, defaultMoment } from "./MomentForm/MomentContextProvider";

export default function AddButton() {
  const { setMoment, openMomentForm, setIsInsertMode } = useMomentContext();

  return (
    <Tooltip title='Add moment'>
      <button
        type='button'
        aria-label='add moment button'
        onClick={() => {
          setIsInsertMode(true);
          setMoment(defaultMoment);
          openMomentForm(true);
        }}
        className='flex flex-row items-center text-gray-700'
      >
        <BiPlusCircle />
      </button>
    </Tooltip>
  );
}
