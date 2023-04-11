"use client";

import "./style/prism-vscode-light.scss";
import "./style/prism-line-numbers.scss";
import "./style/rehype-code-title.scss";

import { useRef } from "react";

import style from "./Pre.module.css";
import CopyButton from "./CopyButton";

export default function Pre(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);

  return (
    <div className={style.container}>
      <CopyButton text={ref} className={style["copy-btn"]} />
      <pre {...props} ref={ref}>
        {props.children}
      </pre>
    </div>
  );
}
