"use client";

import { useSession } from "next-auth/react";
import { BiPlusCircle } from "react-icons/bi";

import { Tooltip } from "@/components";
import { useMomentContext } from "./MomentContextProvider";

export default function AddButton() {
  const { data: session } = useSession();
  const { setMoment, setIsOpenForm, setIsInsertMode } = useMomentContext();

  return (
    <>
      {session && (
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
            className='flex flex-row items-center gap-[1px] text-gray-700'
          >
            <BiPlusCircle />
          </button>
        </Tooltip>
      )}
    </>
  );
}
