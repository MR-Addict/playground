"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";

import { Tooltip } from "@/components";
import DeletePopup from "./DeletePopup";
import { usePopupContext } from "@/contexts";

export default function DeleteButton({ _id }: { _id: string }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const [isOpenForm, setIsOpenForm] = useState(false);

  function handleClick() {
    fetch("/api/moments/delete", {
      method: "DELETE",
      body: new URLSearchParams({ _id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) router.refresh();
        else console.error(result.message);
        setIsOpenForm(false);
        document.body.style.overflow = "auto";
      })
      .catch((error) => {
        popup({ status: false, message: "Failed to delete moment!" });
        console.error(error);
      });
  }

  return (
    <Tooltip title='Delete moment'>
      <button
        type='button'
        aria-label='delete moment button'
        onClick={() => {
          setIsOpenForm(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <AiOutlineDelete size={15} />
      </button>
      <DeletePopup isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} handleClick={handleClick} />
    </Tooltip>
  );
}
