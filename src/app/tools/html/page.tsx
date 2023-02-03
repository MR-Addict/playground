"use client";

import { useState, useRef, useEffect } from "react";
import style from "./page.module.css";

import { RiWindow2Fill } from "react-icons/ri";
import { SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

export default function Page() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState("html");
  const [input, setInput] = useState({ html: "", css: "", js: "" });

  useEffect(() => {
    if (iframeRef.current) {
      console.log(input);
      const iframe = iframeRef.current.contentDocument;
      if (!iframe) return;
      iframe.head.innerHTML = `<style>${input.css}</style>`;
      iframe.body.innerHTML = input.html + `<script>${input.js}</script>`;
    }
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
          <textarea
            style={{ display: activeTab === "html" ? "block" : "none" }}
            onChange={(e) => setInput({ ...input, html: e.target.value })}
          />
          <textarea
            style={{ display: activeTab === "css" ? "block" : "none" }}
            onChange={(e) => setInput({ ...input, css: e.target.value })}
          />
          <textarea
            style={{ display: activeTab === "js" ? "block" : "none" }}
            onChange={(e) => setInput({ ...input, js: e.target.value })}
          />
        </div>
      </section>
      <section className={style.output}>
        <h1>
          <RiWindow2Fill />
          Output
        </h1>
        <iframe title='html, css playground' ref={iframeRef} />
      </section>
    </main>
  );
}
