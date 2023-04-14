import { useEffect, useRef, useState } from "react";

import style from "./Pre.module.css";
import CopyButton from "./CopyButton";

export default function Pre(props: React.ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className={style.container}>
      <CopyButton text={preRef} className={style["copy-btn"]} />
      <pre {...props} ref={preRef}>
        {props.children}
      </pre>
    </div>
  );
}
