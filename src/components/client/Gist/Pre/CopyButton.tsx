"use client";

import { BiCheck } from "react-icons/bi";
import { VscCopy } from "react-icons/vsc";
import { useEffect, useState } from "react";

import { copyToClipboard } from "@/lib/utils";

type Props = {
  text: React.RefObject<HTMLPreElement> | string;
} & React.ComponentProps<"button">;

export default function CopyButton({ text, ...rest }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleClick() {
    if (typeof text === "string") copyToClipboard(text);
    else copyToClipboard(text.current?.innerText || "");

    setCopied(true);
  }

  return (
    <button {...rest} type="button" disabled={copied} onClick={handleClick} aria-label="Copy to Clipboard">
      {copied ? <BiCheck size={16} /> : <VscCopy size={16} />}
    </button>
  );
}
