"use client";

import { BiEditAlt } from "react-icons/bi";

import { Tooltip } from "@/components";
import { MomentType } from "../config";
import { useMomentContext } from "./MomentContextProvider";

export default function EditButton({ moment }: { moment: MomentType }) {
  const { setMoment, isOpenForm, setIsOpenForm, setIsInsertMode } = useMomentContext();

  return (
    <Tooltip title='Edit moment'>
      <button
        type='button'
        disabled={isOpenForm}
        aria-label='edit moment button'
        onClick={() => {
          setMoment(moment);
          setIsInsertMode(false);
          setIsOpenForm(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <BiEditAlt size={15} />
      </button>
    </Tooltip>
  );
}
