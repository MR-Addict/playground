"use client";

import { RiWindow2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

import style from "./page.module.css";
import { Editor } from "./components";

export default function Page() {
  const [srcDoc, setSrcDoc] = useState("");
  const [activeTab, setActiveTab] = useState("html");
  const [input, setInput] = useState({
    html: "<h1>Hello world!</h1>",
    css: "body{color:white;font-family:monospace;}",
    js: "document.body.style.background='black';",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<style>${input.css}</style>${input.html}<script>${input.js}</script>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <main aria-label='html playground' className='frame w-full flex flex-col md:flex-row gap-1'>
      <section className={style.input}>
        <header>
          <button type='button' onClick={() => setActiveTab("html")} tab-active={String(activeTab === "html")}>
            <SiHtml5 />
            HTML
          </button>
          <button type='button' onClick={() => setActiveTab("css")} tab-active={String(activeTab === "css")}>
            <SiCss3 />
            CSS
          </button>
          <button type='button' onClick={() => setActiveTab("js")} tab-active={String(activeTab === "js")}>
            <SiJavascript />
            Javascript
          </button>
        </header>
        <div>
          <Editor
            value={input.html}
            language='html'
            isShowing={activeTab === "html"}
            onChange={(value) => setInput({ ...input, html: value })}
          />
          <Editor
            value={input.css}
            language='css'
            isShowing={activeTab === "css"}
            onChange={(value) => setInput({ ...input, css: value })}
          />
          <Editor
            value={input.js}
            language='javascript'
            isShowing={activeTab === "js"}
            onChange={(value) => setInput({ ...input, js: value })}
          />
        </div>
      </section>
      <section className={style.output}>
        <h1>
          <RiWindow2Fill />
          Output
        </h1>
        <iframe srcDoc={srcDoc} title='html playground' />
      </section>
    </main>
  );
}
