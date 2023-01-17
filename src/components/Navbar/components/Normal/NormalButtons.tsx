"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import Login from "../Login/Login";

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
  const [isOpenForm, setIsOpenForm] = useState(false);

  if (session) return <Button title='Logout' callback={signOut} />;
  else
    return (
      <>
        <Button
          title='Login'
          callback={() => {
            setIsOpenForm(true);
            document.body.style.overflow = "hidden";
          }}
        />
        <Login isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} />
      </>
    );
}
