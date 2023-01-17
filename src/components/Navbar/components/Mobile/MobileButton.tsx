"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function Button({ title, callback }: { title: string; callback: Function }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='py-2 w-full rounded-md bg-green-600 text-white hover:bg-green-700 duration-300'
    >
      {title}
    </button>
  );
}

export default function MobileButton({ session }: { session: Session | null }) {
  if (session) return <Button title='Logout' callback={signOut} />;
  else return <Button title='Login' callback={signIn} />;
}
