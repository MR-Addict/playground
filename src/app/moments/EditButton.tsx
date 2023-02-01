"use client";

import { BiEditAlt } from "react-icons/bi";
import { useSession } from "next-auth/react";

import { Tooltip } from "@/components";
import { MomentType } from "./fetchMoments";

export default function EditButton({ moment }: { moment: MomentType }) {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <button type='button' className='group-hover:opacity-100 opacity-0 duration-200 cursor-pointer'>
          <Tooltip title='Edit'>
            <BiEditAlt />
          </Tooltip>
        </button>
      )}
    </>
  );
}
