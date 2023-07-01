import CodeMirror from "@uiw/react-codemirror";

import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function Editor({
  language,
  value,
  isShowing,
  onChange
}: {
  language: string;
  value: string;
  isShowing: boolean;
  onChange: (value: string) => void;
}) {
  let extensions = html();
  if (language === "css") extensions = css();
  else if (language === "js") extensions = javascript({ jsx: true });
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={vscodeDark}
      onChange={onChange}
      extensions={[extensions]}
      style={{ display: isShowing ? "block" : "none" }}
    />
  );
}
