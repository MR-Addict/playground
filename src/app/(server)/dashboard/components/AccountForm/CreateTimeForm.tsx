"use client";

import classNames from "classnames";
import { Session } from "next-auth";

import style from "./AccountForm.module.css";
import { usePopupContext } from "@/contexts";
import { copyToClipboard, formatDate } from "@/lib/utils";

export default function CreateTimeForm({ session }: { session: Session }) {
  const { popup } = usePopupContext();

  return (
    <section className={style["input-element"]}>
      <label htmlFor="accountCreateTime" className={style.label}>
        Create Time
      </label>

      <div className="w-full flex flex-row">
        <input
          disabled
          id="accountCreateTime"
          value={formatDate(session.user.create_time)}
          className={classNames(style.input, "background")}
        />
        <button
          type="button"
          className={classNames(style.submitbtn, "bg-green-600 text-white")}
          onClick={() => {
            copyToClipboard(session.user.create_time.toString());
            popup({ status: true, message: "Create time copied" });
          }}
        >
          Copy
        </button>
      </div>
    </section>
  );
}
