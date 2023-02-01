"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { IoMdAddCircle } from "react-icons/io";

import MomentForm from "./MomentForm";
import { Tooltip } from "@/components";

export default function AddButton() {
  const { data: session } = useSession();
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <>
      {session && (
        <Tooltip title='Add moment'>
          <button
            type='button'
            aria-label='add moment button'
            onClick={() => {
              setIsOpenForm(true);
              document.body.style.overflow = "hidden";
            }}
            className='flex flex-row items-center gap-[1px] text-gray-500 md:hover:text-gray-700'
          >
            <IoMdAddCircle />
          </button>
          <MomentForm isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} />
        </Tooltip>
      )}
    </>
  );
}
