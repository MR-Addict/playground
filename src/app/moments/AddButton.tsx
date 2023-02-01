"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { IoMdAddCircle } from "react-icons/io";

import MomentForm from "./MomentForm";

export default function AddButton() {
  const { data: session } = useSession();
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <>
      {session && (
        <>
          <button
            type='button'
            onClick={() => {
              setIsOpenForm(true);
              document.body.style.overflow = "hidden";
            }}
            className='flex flex-row items-center gap-[1px] md:text-gray-700 md:hover:text-gray-900'
          >
            <IoMdAddCircle />
            <p>Add</p>
          </button>
          <MomentForm isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} />
        </>
      )}
    </>
  );
}
