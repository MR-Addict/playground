"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-label='reset button' className='frame w-full flex flex-col items-center justify-center gap-3'>
      <button
        type='button'
        aria-label='reset button'
        onClick={() => reset()}
        className='text-green-600 shadow-md hover:shadow-xl rounded-full'
      >
        <IoMdRefresh size={40} />
      </button>
      <p className='text-slate-700 font-semibold text-xl'>Something went wrong!</p>
    </section>
  );
}
