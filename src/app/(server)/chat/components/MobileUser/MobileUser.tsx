import style from "./MobileUser.module.css";

export default function MobileUser() {
  return (
    <div aria-label='user setting' className={style.user}>
      <button type='button' className={[style.hamburger].join(" ")} aria-label='mobile nav button to toggle menu'>
        <div></div>
        <div></div>
      </button>
    </div>
  );
}
