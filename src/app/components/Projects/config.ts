import { StaticImageData } from "next/image";

import vistalab from "./images/vistalab.png";
import linktree from "./images/linktree.png";
import publicapi from "./images/publicapi.png";

export interface projectType {
  title: string;
  img: StaticImageData;
  link: string;
  intro: string;
}

const projects: projectType[] = [
  {
    title: "Public APIs",
    img: publicapi,
    link: "https://github.com/mr-addict/public-apis-frontend",
    intro:
      "This is my first independent nextjs 13 project rather than learning or copy from Youtube videos or other platform. I spent a lot time debugging, especially css style. I should confess that I really lack innovation of design. But what actually importent is that I love it. I hope you can find an interesting but also free public api from my website.",
  },
  {
    title: "Vistalab",
    img: vistalab,
    link: "https://github.com/510Lab/vistalab-frontend",
    intro:
      "A project built for my scholl's laboratory I joined in when it reopen after many years faded outs it past glory. It's my winter vacation in 2022 december approaching 2023 when we built this project. I'm mostly reponsible for frontend, and my friend also laboratory reopen founder is responsible for backend. Hope this time it will lasts long.",
  },
  {
    title: "Linktree",
    img: linktree,
    link: "https://github.com/MR-Addict/linktree",
    intro:
      "In this project, I begin to use vercel to host my website, authenticate with next auth, and use mongodb as my database. Also, I have begun to deeply love these stacks after these projects. I appreciate vercel team create a so good, neaty, convenient but also powerfull framework. I love what nextjs featrues, sepecially giant break after version 13.",
  },
];

export default projects;
