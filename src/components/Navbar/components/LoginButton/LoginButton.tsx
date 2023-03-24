"use client";

import { useSession, signOut } from "next-auth/react";

import { useLoginContext } from "@/contexts";

function Button({ title, callback }: { title: string; callback: Function }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='py-1 px-4 rounded-sm duration-300 text-white bg-green-600 hover:bg-green-700'
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
