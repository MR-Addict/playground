"use client";

import "./style/customCss.css";
import "./style/prism-atom-dark.css";
import "./style/prism-line-numbers.css";

import { CusKeyButton } from "./custom";
import { Heading, Paragraph, List, Anchor, Code, Blockquote, Pre, Img } from "./components";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function Markdown({ serializedMDX }: { serializedMDX: MDXRemoteSerializeResult }) {
  const customComponents = { CusKeyButton };

  const components = {
    h1: Heading.H1,
    h2: Heading.H2,
    h3: Heading.H3,
    h4: Heading.H4,
    h5: Heading.H5,
    h6: Heading.H6,
    p: Paragraph,
    li: List,
    a: Anchor,
    code: Code,
    blockquote: Blockquote,
    pre: Pre,
    img: Img,
  };

  return <MDXRemote {...serializedMDX} components={{ ...components, ...customComponents }} />;
}
