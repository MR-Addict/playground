import classNames from "classnames";
import { Session } from "next-auth";

import IDForm from "./IDForm";
import EmailForm from "./EmailForm";
import UsernameForm from "./UsernameForm";
import UserRoleForm from "./UserRoleForm";
import PasswordForm from "./PasswordForm";
import style from "./AccountForm.module.css";
import CreateTimeForm from "./CreateTimeForm";
import DeleteAccount from "./DeleteAccount";

export default function AccountForm({ session }: { session: Session }) {
  return (
    <section aria-label="account form" className="w-full flex flex-col gap-7">
      <div className={style["element-group"]}>
        <h1 className={style.title}>General</h1>

        <div className={style["inner-group"]}>
          <UsernameForm session={session} />
          <EmailForm session={session} />
          <PasswordForm session={session} />
        </div>
      </div>

      <div className={style["element-group"]}>
        <h1 className={style.title}>Information</h1>

        <div className={style["inner-group"]}>
          <UserRoleForm session={session} />
          <IDForm session={session} />
          <CreateTimeForm session={session} />
        </div>
      </div>

      <div className={classNames(style["element-group"], style.danger)}>
        <h1 className={style.title}>Danger Zone</h1>

        <DeleteAccount session={session} />
      </div>
    </section>
  );
}
