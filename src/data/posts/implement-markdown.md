---
title: "Implement Markdown to Your Project"
date: "2023-01-25 16:02"
tags: ["markdown", "mdx", "prism", "plugins"]
intro: "Teach you how to implement markdown to your project."
---

## 1. Introduction

After I finished two tools page of this webistes, I want to create a new blog page. In other way, when I first learn nextjs, [my first project](https://mr-addict.github.io/nextjs-blog/) was nextjs offical example about creating a personal blog.

So I think I could do it.

## 2. Blueprint

After doing some research, I think there are for steps we need to create a blog based on markdown.

- Get markdown `front matter` data(such as title, date, tags and other information).
- Get `raw markdown` content(which we will used to convert to html).
- Compile raw markdown content to html(including code block compiling such as `syntax highlight` and `copy button`).
- Styling(especially syntax highlight)
- Plugins(such as `autolinkHeadings`, `codeTitles`, `GFM` and other plugins)

## 3. Front Matter

I think the most popular front matter parser is [gray-matter](https://www.npmjs.com/package/gray-matter).

Here is the code I get all posts front matter data in nextjs:

```ts:lib/post/getAllPostsProps.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "src/data/posts");

interface blogType {
  id: string;
  title: string;
  date: string;
  tags: string[];
  intro: string;
}

export default function getAllPostsProps() {
  const postsNames = fs.readdirSync(postsDir);

  const allPostsProps = postsNames.map((fileName) => {
    const filePath = path.join(postsDir, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return { id: fileName.replace(/\.md$/, ""), ...data } as blogType;
  });

  return allPostsProps.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}
```

## 4. Raw Markdown

Then we need to get markdown raw content, here I still using gray-matter.

```ts:lib/post/getPostContent.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import serializeMDX from "./serializeMDX";

const postsDir = path.join(process.cwd(), "src/data/posts");

export default async function getPostContent(id: string) {
  const filePath = path.join(postsDir, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);
  const serializedMDX = await serializeMDX(content);

  return {
    title: data.title,
    date: data.date,
    tags: data.tags,
    markdown: content,
    serializedMDX,
  } as {
    title: string;
    date: string;
    tags: string[];
    markdown: string;
    serializedMDX: MDXRemoteSerializeResult;
  };
}
```

As you can see, I get markdown and and serialiedMDX which needed for [MDXRemote](https://www.npmjs.com/package/next-mdx-remote) in next step.

## 5. Compile and Plugins

You can use so many packages to compile your markdown component, such as:

- [Unified](https://www.npmjs.com/package/unified)
- [Remark](https://www.npmjs.com/package/remark)
- [MDX-JS](https://www.npmjs.com/package/@mdx-js/mdx)
- [MDX-Bundler](https://www.npmjs.com/package/mdx-bundler)
- [Next-MDX-Remote](https://www.npmjs.com/package/next-mdx-remote)

These compilers also support many remark or rehype plugins.

Because I'm using Next.js, so I gonna use `next-mdx-remote`. But there is a problem that above compiler cannot convert `table`, `tasklist`, `footnote`, `autololink` and some other marks github features. So I need to use [remark-gfm](https://www.npmjs.com/package/remark-gfm) plugin to solve this problem.

Except `remarkGfm`, I gonna use below plugins as well while compiling:

- [remarkGfm](https://www.npmjs.com/package/remark-gfm)
- [rehypeSlug](https://www.npmjs.com/package/rehype-slug)
- [rehypePrism](https://www.npmjs.com/package/rehype-prism-plus)
- [rehypeCodeTitles](https://www.npmjs.com/package/rehype-code-titles)
- [rehypeAutolinkHeadings](https://www.npmjs.com/package/rehype-autolink-headings)

Here is the code I compile my raw markdown content:

```ts:lib/post/serializeMDX.ts
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default async function serializeMDX(markdown: string) {
  return await serialize(markdown, {
    mdxOptions: {
      rehypePlugins: [
        remarkGfm,
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
      ],
    },
  });
}
```

## 6. Display Compiled Markdown

I'm using next-mdx-remote, so it's very easy to display compiled result after serializing markdown.

Here is the code:

```ts:components/Markdown/Markdown.tsx
"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function Markdown({ serializedMDX }: { serializedMDX: MDXRemoteSerializeResult }) {
  return <MDXRemote {...serializedMDX} />;
}
```

> Wraning:
>
> Becase next-mdx-remote is a client side component, so you need to add `use client` at the top of the page if you are using Next.js 13.

## 7. Styling

Because I'm using next-mdx-remote, I can easily replace some component with custom component, such as `img` tag, `a` tag, `blockquote` and many other tags.

Here is the update code of above `Markdown.tsx`:

```ts:components/Markdown/Markdown.tsx
"use client";

import { Heading, Paragraph, List, Anchor, Code, Blockquote, Pre, Img } from "./components";

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
    pre: Pre,
    img: Img,
  };

  return <MDXRemote {...serializedMDX} components={components} />;
}
```

I update some frequently used components.

Below is the custom `Blockquote` component:

```ts:components/Markdown/components/Blockquote.tsx
export default function Blockquote(
  props: React.DetailedHTMLProps<React.BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
) {
  return (
    <blockquote
      {...props}
      className='my-3 text-base text-gray-700 border-l-4 border-gray-300 bg-gray-200 pl-5 py-[1px]'
    >
      {props.children}
    </blockquote>
  );
}
```

## 8. Custom Styling and Syntax Highlight

But there are still some components we cannot replace, such as table. So we need to style it with `css` manually. And we also need to highlight syntax that prism has generated for us.

So we need to import below three css files to above `Markdown.tsx` component like this:

```ts:components/Markdown/Markdown.tsx
"use client";

import "./style/customCss.css";
import "./style/prism-atom-dark.css";
import "./style/prism-line-numbers.css";

import { Heading, Paragraph, List, Anchor, Code, Blockquote, Pre, Img } from "./components";

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
    pre: Pre,
    img: Img,
  };

  return <MDXRemote {...serializedMDX} components={components} />;
}
```

> Css file are too long, you can find source code of this project on my gihtub:
>
> - [https://github.com/MR-Addict/playground](https://github.com/MR-Addict/playground)

## 9. Copy button

It would be great if there's copy button on our code block, I found a solution on [this blog](https://ithelp.ithome.com.tw/articles/10302397).

The solution is we use `React useRef` hook to get block `innerText`, even if there are syntax highligh. We only need to replace `pre tag` with `custom Pre component`.

We have done this before when we styling.

And here is my custom Pre component:

```ts:components/Markdown/components/Pre.tsx
import { useEffect, useRef, useState } from "react";

import { copyToClipboard } from "@/lib/utils";

export default function Pre(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleClick() {
    if (preRef.current?.innerText) {
      copyToClipboard(preRef.current.innerText);
      setCopied(true);
    }
  }

  return (
    <div className='relative group'>
      <pre {...props} ref={preRef}>
        <button
          type='button'
          disabled={copied}
          onClick={handleClick}
          aria-label='Copy to Clipboard'
          className='absolute space-x-2 top-0 right-0 m-2 hidden transition bg-transparent border rounded-md p-2 focus:outline-none group-hover:flex disabled:flex fade-in'
        >
          <svg
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 pointer-events-none'
          >
            {copied ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
              />
            )}
          </svg>
        </button>
        {props.children}
      </pre>
    </div>
  );
}
```

And here is the copyToClipboard function:

```ts:lib/utils/copyToClipboard.ts
export default function copyToClipboard(text: string) {
  return new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      const cb = navigator.clipboard;
      cb.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector("body");

        const textarea = document.createElement("textarea");
        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand("copy");

        body?.removeChild(textarea);

        resolve(0);
      } catch (e) {
        reject(e);
      }
    }
  });
}
```

## 10. Useful links

- [MDX blog with Next.js 13](https://blog.kfirfitousi.com/posts/web-dev/mdx-nextjs-13)
- [Nexjs offical markdown tutorial](https://nextjs.org/blog/markdown)
- [EasonChang blog about adding copy button to markdown](https://ithelp.ithome.com.tw/articles/10302397)
- [Philstainer blog about how add copy button to code block](https://philstainer.io/blog/copy-code-button-markdown)
- [MDX-JS issue about how to add copy buttoon to code block](https://github.com/mdx-js/mdx/discussions/1948)
- [Prism Themes](https://github.com/PrismJS/prism-themes)
- [Prism Code title](https://ithelp.ithome.com.tw/articles/10301271)