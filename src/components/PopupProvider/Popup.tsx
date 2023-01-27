"use client";

import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

export default function Popup({
  popupData,
  isPopup,
}: {
  popupData: { status: boolean; message: string };
  isPopup: boolean;
}) {
  return (
    <div
      className={`w-full px-5 z-20 fixed flex flex-col items-center -top-20 left-[50%] translate-x-[-50%] duration-500 ${
        isPopup ? "translate-y-28" : "translate-y-0"
      }`}
    >
      {popupData.status ? (
        <div className='w-full max-w-md flex flex-row gap-3 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md'>
          <div className='mt-2 text-teal-500'>
            <BsCheckCircle size={23} />
          </div>
          <div className='flex flex-col'>
            <p className='font-bold'>Success</p>
            <p>{popupData.message}</p>
          </div>
        </div>
      ) : (
        <div className='w-full max-w-md flex flex-row gap-3 bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md'>
          <div className='mt-2 text-red-500'>
            <MdErrorOutline size={23} />
          </div>
          <div className='flex flex-col'>
            <p className='font-bold'>Error</p>
            <p>{popupData.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}
