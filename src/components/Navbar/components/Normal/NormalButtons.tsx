"use client";

import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

function Button({ title, callback }: { title: string; callback: Function }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='py-1 px-4 rounded-sm font-semibold bg-green-600 text-white hover:bg-green-700 duration-300'
    >
      {title}
    </button>
  );
}

export default function NormalButtons({ session }: { session: Session | null }) {
  if (session) return <Button title='Logout' callback={signOut} />;
  else return <Button title='Login' callback={signIn} />;
}
