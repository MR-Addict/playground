"use client";

import "./style/customCss.css";
import "./style/prism-atom-dark.css";
import "./style/prism-line-numbers.css";

import { Heading, Paragraph, List, Anchor, Code, Blockquote } from "./components";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function Markdown({ serializedMDX }: { serializedMDX: MDXRemoteSerializeResult }) {
  const components = {
    h1: Heading.H1,
    h2: Heading.H2,
    h3: Heading.H3,
    h4: Heading.H4,
    h5: Heading.H5,
    p: Paragraph,
    li: List,
    a: Anchor,
    code: Code,
    blockquote: Blockquote,
  };

  return <MDXRemote {...serializedMDX} components={{ ...components }} />;
}
