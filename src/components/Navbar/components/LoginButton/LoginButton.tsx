"use client";

import { useSession, signOut } from "next-auth/react";

import { useLoginContext } from "@/components";

function Button({ title, callback }: { title: string; callback: Function }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='py-1 px-4 rounded-sm outline outline-1 outline-green-600 text-green-600 hover:bg-green-600 hover:text-white duration-300'
    >
      {title}
    </button>
  );
}

export default function LoginButton() {
  const { data: session } = useSession();
  const { openLoginForm } = useLoginContext();

  if (session) return <Button title='Logout' callback={signOut} />;
  else return <Button title='Login' callback={() => openLoginForm(true)} />;
}
