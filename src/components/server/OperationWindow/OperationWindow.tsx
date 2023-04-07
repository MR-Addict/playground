import classNames from "classnames";
import style from "./OperationWindow.module.css";

type Props = {
  isOpenWindow: boolean;
} & React.ComponentProps<"section">;

export default function OperationWindow({ children, isOpenWindow, ...rest }: Props) {
  return (
    <section {...rest} className={classNames(style.window, "frame", isOpenWindow ? style.active : "")}>
      {children}
    </section>
  );
}
