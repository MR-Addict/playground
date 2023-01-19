"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import LoginForm from "./LoginForm";

function Button({ title, callback }: { title: string; callback: Function }) {
  return (
    <button
      type='button'
      onClick={() => callback()}
      className='py-1 px-4 rounded-sm font-semibold bg-green-500 text-white hover:bg-green-700 duration-300'
    >
      {title}
    </button>
  );
}

export default function NormalButtons() {
  const { data: session } = useSession();
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
        <LoginForm isOpenForm={isOpenForm} setIsOpenForm={setIsOpenForm} />
      </>
    );
}
