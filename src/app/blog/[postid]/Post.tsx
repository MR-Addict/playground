import Markdown from "markdown-to-jsx";

import "./markdown.css";

export default function Post({ markdown }: { markdown: string }) {
  return <Markdown className='markdown'>{markdown}</Markdown>;
}
