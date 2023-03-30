import Settings from "../Settings/Settings";
import style from "./NormalSettings.module.css";

export default function NormalSettings() {
  return (
    <section aria-label='normal setting' className={style.settings}>
      <Settings />
    </section>
  );
}
