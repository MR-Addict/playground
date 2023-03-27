import style from "./OperationWindow.module.css";

interface Props {
  children: React.ReactNode;
  isOpenWindow: boolean;
}

export default function OperationWindow({ children, isOpenWindow }: Props) {
  return (
    <section
      aria-label='operation window'
      className={[style.window, "frame", isOpenWindow ? style.active : ""].join(" ")}
    >
      {children}
    </section>
  );
}
