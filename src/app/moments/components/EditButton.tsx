"use client";

import { BiEditAlt } from "react-icons/bi";
import { useSession } from "next-auth/react";

import { Tooltip } from "@/components";
import { MomentType } from "../config";
import { useMomentContext } from "./MomentContextProvider";

export default function EditButton({ moment }: { moment: MomentType }) {
  const { data: session } = useSession();
  const { setMoment, setIsOpenForm, setIsInsertMode } = useMomentContext();

  return (
    <>
      {session && (
        <Tooltip title='Edit moment'>
          <button
            type='button'
            aria-label='edit moment button'
            onClick={() => {
              setMoment(moment);
              setIsOpenForm(true);
              setIsInsertMode(false);
              document.body.style.overflow = "hidden";
            }}
          >
            <BiEditAlt size={15} />
          </button>
        </Tooltip>
      )}
    </>
  );
}
