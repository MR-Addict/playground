"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import Pre from "./Pre/Pre";

export default function Gist({ serializedMDX }: { serializedMDX: MDXRemoteSerializeResult }) {
  return (
    <article className="w-full gist-pre-container">
      <MDXRemote {...serializedMDX} components={{ pre: Pre }} />
    </article>
  );
}
