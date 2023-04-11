"use client";

import "./style/custom.scss";
import "./style/prism-atom-dark.scss";
import "./style/prism-line-numbers.scss";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { Youtube, Codepen } from "@/components/server";
import { KeyButton, SendProfileEmail } from "./custom";
import { Heading, Paragraph, List, Anchor, Code, Blockquote, Pre, Img } from "./components";

export default function Markdown({ serializedMDX }: { serializedMDX: MDXRemoteSerializeResult }) {
  const customComponents = { KeyButton, Youtube, SendProfileEmail, Codepen };

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

  return (
    <section className='w-full blog-markdown-container'>
      <MDXRemote {...serializedMDX} components={{ ...components, ...customComponents }} />
    </section>
  );
}
