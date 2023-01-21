"use client";

import { useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='frame w-full flex flex-col items-center justify-center gap-3'>
      <button type='button' onClick={() => reset()} className='text-green-500 shadow-md hover:shadow-xl rounded-full'>
        <IoMdRefresh size={40} />
      </button>
      <p className='text-slate-700 font-semibold text-xl'>Error occurred while communicate with mongodb!</p>
    </div>
  );
}
