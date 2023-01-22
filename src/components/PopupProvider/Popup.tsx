"use client";

import { MdError } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { BsCheckCircleFill } from "react-icons/bs";

export default function Popup({
  popupData,
  isPopup,
  setIsPopup,
}: {
  popupData: { status: boolean; message: string };
  isPopup: boolean;
  setIsPopup: Function;
}) {
  return (
    <div
      className={`w-full px-5 drop-shadow-lg z-20 fixed flex flex-col items-center -top-20 left-[50%] translate-x-[-50%] duration-500 ${
        isPopup ? "translate-y-28" : "translate-y-0"
      }`}
    >
      {popupData.status ? (
        <div className='w-full max-w-md flex flex-row items-center justify-between rounded-md bg-green-100 pr-3'>
          <div className='py-3 px-3 text-white bg-green-700 rounded-l-md'>
            <BsCheckCircleFill size={18} />
          </div>
          <h1 className='w-full font-semibold whitespace-nowrap text-green-700 pl-3'>{popupData.message}</h1>
          <button
            type='button'
            onClick={() => setIsPopup(false)}
            className='bg-green-700 text-white p-1 rounded-full w-fit h-fit'
          >
            <RxCross1 size={10} />
          </button>
        </div>
      ) : (
        <div className='w-full max-w-md flex flex-row items-center justify-between rounded-md bg-red-100 pr-3'>
          <div className='py-3 px-3 text-white bg-red-700 rounded-l-md'>
            <MdError size={18} />
          </div>
          <h1 className='w-full font-semibold whitespace-nowrap text-red-700 pl-3'>{popupData.message}</h1>
          <button
            type='button'
            onClick={() => setIsPopup(false)}
            className='bg-red-700 text-white p-1 rounded-full w-fit h-fit'
          >
            <RxCross1 size={10} />
          </button>
        </div>
      )}
    </div>
  );
}
