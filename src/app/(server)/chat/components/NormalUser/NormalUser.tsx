import style from "./NormalUser.module.css";

import Settings from "../Settings/Settings";

export default function NormalUser() {
  return (
    <div aria-label='user setting' className={style.user}>
      <Settings />
    </div>
  );
}
