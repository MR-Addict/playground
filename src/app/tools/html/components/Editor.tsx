import CodeMirror from "@uiw/react-codemirror";

import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function Editor({
  language,
  value,
  isShowing,
  onChange,
}: {
  language: string;
  value: string;
  isShowing: boolean;
  onChange: (value: string) => void;
}) {
  let extensions = html();
  if (language === "css") extensions = css();
  else if (language === "javascript") extensions = javascript({ jsx: true });
  return (
    <CodeMirror
      value={value}
      height='70dvh'
      theme={vscodeDark}
      onChange={onChange}
      extensions={[extensions, EditorView.lineWrapping]}
      style={{ display: isShowing ? "block" : "none" }}
    />
  );
}
