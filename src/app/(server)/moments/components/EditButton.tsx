"use client";

import { BiEditAlt } from "react-icons/bi";

import { Tooltip } from "@/components";
import { MomentType } from "../config";
import { useMomentContext } from "./MomentForm/MomentContextProvider";

export default function EditButton({ moment }: { moment: MomentType }) {
  const { setMoment, openMomentForm, setIsInsertMode } = useMomentContext();

  return (
    <Tooltip title='Edit moment'>
      <button
        type='button'
        aria-label='edit moment button'
        onClick={() => {
          setMoment(moment);
          setIsInsertMode(false);
          openMomentForm(true);
        }}
      >
        <BiEditAlt size={15} />
      </button>
    </Tooltip>
  );
}
