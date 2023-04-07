"use client";

import classNames from "classnames";
import { Session } from "next-auth";

import style from "./AccountForm.module.css";
import { usePopupContext } from "@/contexts";
import { copyToClipboard } from "@/lib/utils";

export default function IDForm({ session }: { session: Session }) {
  const { popup } = usePopupContext();

  return (
    <section className={style["input-element"]}>
      <label htmlFor='accountID' className={style.label}>
        Your ID
      </label>

      <div className='w-full flex flex-row'>
        <input
          disabled
          id='accountID'
          value={session.user._id.toString()}
          className={classNames(style.input, "background")}
        />
        <button
          type='button'
          className={classNames(style.submitbtn, "bg-green-600 text-white")}
          onClick={() => {
            copyToClipboard(session.user._id.toString());
            popup({ status: true, message: "Your ID copied" });
          }}
        >
          Copy
        </button>
      </div>
    </section>
  );
}
