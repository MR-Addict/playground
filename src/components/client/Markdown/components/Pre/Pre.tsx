import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

import style from "./Pre.module.css";
import CopyButton from "./CopyButton";
import { HiOutlineChevronDoubleDown } from "react-icons/hi2";

export default function Pre(props: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const [isSpand, setIsSpand] = useState(false);
  const [showSpandBtn, setShowSpandBtn] = useState(false);

  useEffect(() => setShowSpandBtn((preRef.current?.getElementsByClassName("code-line").length || 0) > 30), []);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={classNames(style.container, isSpand ? style.active : "")}>
      <CopyButton text={preRef} className={style["copy-btn"]} />
      <pre {...props} ref={preRef}>
        {showSpandBtn && (
          <button
            type='button'
            onClick={() => setIsSpand(!isSpand)}
            aria-label='spand code button'
            className={style["spand-btn"]}
          >
            <HiOutlineChevronDoubleDown />
          </button>
        )}
        {props.children}
      </pre>
    </div>
  );
}
