"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useSession } from "next-auth/react";

import MomentForm from "./MomentForm";
import { Tooltip } from "@/components";
import { MomentType } from "../config";

export default function EditButton({ moment }: { moment: MomentType }) {
  const { data: session } = useSession();
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <>
      {session && (
        <Tooltip title='Edit moment'>
          <button
            type='button'
            aria-label='edit moment button'
            onClick={() => {
              setIsOpenForm(true);
              document.body.style.overflow = "hidden";
            }}
            className='md:group-hover:opacity-100 md:opacity-0 duration-200'
          >
            <BiEditAlt size={15} />
          </button>
          <MomentForm isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} moment={moment} />
        </Tooltip>
      )}
    </>
  );
}
