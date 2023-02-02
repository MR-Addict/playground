"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiOutlineDelete } from "react-icons/ai";

import DeletePopup from "./DeletePopup";
import { Tooltip, usePopupContext } from "@/components";

export default function DeleteButton({ _id }: { _id: string }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { data: session } = useSession();
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
        console.error(error);
      });
  }

  return (
    <>
      {session && (
        <Tooltip title='Delete moment'>
          <button
            type='button'
            aria-label='delete moment button'
            onClick={() => {
              setIsOpenForm(true);
              document.body.style.overflow = "hidden";
            }}
            className='md:group-hover:opacity-100 md:opacity-0 duration-200'
          >
            <AiOutlineDelete size={15} />
          </button>
          <DeletePopup isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} handleClick={handleClick} />
        </Tooltip>
      )}
    </>
  );
}
