"use client";

import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useSession } from "next-auth/react";

import MomentForm from "./MomentForm";
import { Tooltip } from "@/components";
import { MomentType } from "./fetchMoments";

export default function EditButton({ moment }: { moment: MomentType }) {
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
            className='md:group-hover:opacity-100 md:opacity-0 duration-200'
          >
            <Tooltip title='Edit'>
              <BiEditAlt />
            </Tooltip>
          </button>
          <MomentForm isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} moment={moment} />
        </>
      )}
    </>
  );
}
