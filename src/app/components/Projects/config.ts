import { StaticImageData } from "next/image";

import signup from "./images/signup.png";
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
    title: "Public APIs frontend",
    img: publicapi,
    link: "https://github.com/mr-addict/public-apis-frontend",
    intro:
      "This is my first independent nextjs 13 project rather than learning or copying from Youtube videos or other platforms. I spent a lot of time debugging, especially css style. I should confess that I lack innovation in design. Even though I still like it. I'm sure that you can find free and interesting public apis from this app.",
  },
  {
    title: "Vistalab",
    img: vistalab,
    link: "https://github.com/510Lab/vistalab-frontend",
    intro:
      "A project we built for the organization I joined in my university. We built this website after many years that it almost faded out its past glory. It's my winter vacation in 2022 december approaching 2023 when we built this project. I'm reponsible for frontend, and my friend also laboratory reopen founder is responsible for backend. Hope this time it will glory again.",
  },
  {
    title: "Linktree",
    img: linktree,
    link: "https://github.com/MR-Addict/linktree",
    intro:
      "In this project, I begin to use vercel to host my website, authenticate with next auth, and use mongodb as my database. Also this time, I begin to deeply love these stacks. I appreciate vercel team creates a so good, neat, convenient but also powerful framework. I love what next.js features, especially the giant break after version 13. I think it's the best frontend framework ever.",
  },
  {
    title: "Vistalab Lego activity",
    img: signup,
    link: "https://github.com/MR-Addict/signup-form",
    intro:
      "Our Lego activity is designed for everyone, regardless of age, background, or experience level. The goal of the activity is to work together to build a structure using Lego blocks, while also learning about the principles of engineering and design. We believe that this activity will be a fun and creative way to spend time with others. And I'm glad to be the frontend development of this project.",
  },
];

export default projects;
