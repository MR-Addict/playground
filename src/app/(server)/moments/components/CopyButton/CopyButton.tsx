"use client";

import { MdContentCopy } from "react-icons/md";

import { Tooltip } from "@/components/server";
import { copyToClipboard } from "@/lib/utils";
import { usePopupContext } from "@/contexts";

export default function CopyButton({ moment }: { moment: string }) {
  const { popup } = usePopupContext();

  return (
    <Tooltip title='Copy moment'>
      <button
        type='button'
        aria-label='copy moment button'
        onClick={() => {
          copyToClipboard(moment);
          popup({ status: true, message: "Moment copied" });
        }}
        className='flex flex-row items-center text-gray-800'
      >
        <MdContentCopy size={13} />
      </button>
    </Tooltip>
  );
}
