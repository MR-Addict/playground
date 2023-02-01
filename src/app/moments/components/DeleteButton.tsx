"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiOutlineDelete } from "react-icons/ai";

import revalidatePage from "./revalidatePage";
import { Tooltip, usePopupContext } from "@/components";

export default function DeleteButton({ _id }: { _id: string }) {
  const router = useRouter();
  const { popup } = usePopupContext();
  const { data: session } = useSession();

  function handleClick(_id: string) {
    fetch("/api/moments/delete", {
      method: "DELETE",
      body: new URLSearchParams({ _id }),
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((res) => res.json())
      .then((result) => {
        popup(result);
        if (result.status) revalidatePage(router);
        else console.error(result.message);
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
            onClick={() => handleClick(_id)}
            className='md:group-hover:opacity-100 md:opacity-0 duration-200'
          >
            <AiOutlineDelete />
          </button>
        </Tooltip>
      )}
    </>
  );
}
