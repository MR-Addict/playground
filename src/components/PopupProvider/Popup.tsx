"use client";

import { BsCheckCircle } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";

import style from "./Popup.module.css";

export default function Popup({
  popupData,
  isPopup,
}: {
  popupData: { status: boolean; message: string };
  isPopup: boolean;
}) {
  return (
    <section aria-label='popup window' popup-isactive={String(isPopup)} className={style.popupwindow}>
      <div popup-status={String(popupData.status)} className={style.popupbody}>
        <div className='mt-2'>{popupData.status ? <BsCheckCircle size={23} /> : <MdErrorOutline size={23} />}</div>
        <div className='flex flex-col'>
          <p className='font-bold'>{popupData.status ? "Success" : "Error"}</p>
          <p>{popupData.message}</p>
        </div>
      </div>
    </section>
  );
}
