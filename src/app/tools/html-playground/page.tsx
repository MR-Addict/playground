"use client";

import { RiWindow2Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { SiHtml5, SiCss3, SiJavascript } from "react-icons/si";

import style from "./page.module.css";
import { Editor } from "./components";

export default function Page() {
  const [srcDoc, setSrcDoc] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [activeTab, setActiveTab] = useState({ html: true, css: false, js: false, result: true });
  const [input, setInput] = useState({
    html: "<h1>Hello world!</h1>",
    css: "body{font-family:monospace;color:white;}",
    js: "document.body.style.background='black';",
  });

  function handleClickTab(tab: "html" | "css" | "js" | "result") {
    if (isSmallScreen) setActiveTab({ html: false, css: false, js: false, result: false, [tab]: !activeTab[tab] });
    else if (tab === "html") setActiveTab({ html: !activeTab.html, css: false, js: false, result: activeTab.result });
    else if (tab === "css") setActiveTab({ html: false, css: !activeTab.css, js: false, result: activeTab.result });
    else if (tab === "js") setActiveTab({ html: false, css: false, js: !activeTab.js, result: activeTab.result });
    else if (tab === "result") setActiveTab({ ...activeTab, result: !activeTab.result });
  }

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen === true) setActiveTab({ html: false, css: false, js: false, result: true });
    else setActiveTab({ html: true, css: false, js: false, result: true });
  }, [isSmallScreen]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`<style>${input.css}</style>${input.html}<script>${input.js}</script>`);
    }, 250);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <main aria-label='html playground' className='frame w-full flex flex-col'>
      <header className={style.header}>
        <div>
          <button type='button' onClick={() => handleClickTab("html")} tab-active={String(activeTab.html)}>
            <SiHtml5 />
            HTML
          </button>
          <button type='button' onClick={() => handleClickTab("css")} tab-active={String(activeTab.css)}>
            <SiCss3 />
            CSS
          </button>
          <button type='button' onClick={() => handleClickTab("js")} tab-active={String(activeTab.js)}>
            <SiJavascript />
            Js
          </button>
        </div>
        <div>
          <button type='button' onClick={() => handleClickTab("result")} tab-active={String(activeTab.result)}>
            <RiWindow2Fill />
            Result
          </button>
        </div>
      </header>
      <section className={style.output}>
        <Editor
          value={input.html}
          language='html'
          isShowing={activeTab.html}
          onChange={(value) => setInput({ ...input, html: value })}
        />
        <Editor
          value={input.css}
          language='css'
          isShowing={activeTab.css}
          onChange={(value) => setInput({ ...input, css: value })}
        />
        <Editor
          value={input.js}
          language='js'
          isShowing={activeTab.js}
          onChange={(value) => setInput({ ...input, js: value })}
        />
        <iframe style={{ display: activeTab.result ? "block" : "none" }} srcDoc={srcDoc} title='html playground' />
      </section>
    </main>
  );
}
