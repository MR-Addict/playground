"use client";

import classNames from "classnames";
import { Session } from "next-auth";

import style from "./AccountForm.module.css";
import { usePopupContext } from "@/contexts";
import { copyToClipboard } from "@/lib/utils";

export default function UserRoleForm({ session }: { session: Session }) {
  const { popup } = usePopupContext();

  return (
    <section className={style["input-element"]}>
      <label htmlFor="accountRole" className={style.label}>
        Your Role
      </label>

      <div className="w-full flex flex-row">
        <input disabled id="accountRole" value={session.user.role} className={classNames(style.input, "background")} />
        <button
          type="button"
          className={classNames(style.submitbtn, "bg-green-600 text-white")}
          onClick={() => {
            copyToClipboard(session.user.role);
            popup({ status: true, message: "Your role copied" });
          }}
        >
          Copy
        </button>
      </div>
    </section>
  );
}
