import { StaticImageData } from "next/image";

import punch from "./images/punch.jpeg";
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
    title: "值班笔记",
    img: punch,
    link: "https://github.com/MR-Addict/punch-next",
    intro:
      "南京工业大学校大学生科协技术开发部成员的每日值班笔记，允许任何人查看，每学期的内容都自动归档生成本地json文件托管在GitHub上，另外数据库使用了SSR和ISR技术使得访问极其快速。"
  },
  {
    title: "远景实验室主页",
    img: vistalab,
    link: "https://github.com/510Lab/vistalab-frontend",
    intro:
      "南京工业大学远景实验室的主页，实验室成员可以注册登录查看一些实验室的信息，包括成员信息，实验室项目，实验室设备等等，还可以在线提交发票方便统一管理。"
  },
  {
    title: "Public APIs frontend",
    img: publicapi,
    link: "https://github.com/mr-addict/public-apis-frontend",
    intro:
      "This is my first independent nextjs 13 project rather than learning or copying from Youtube videos or other platforms. I spent a lot of time debugging, especially css style. I should confess that I lack innovation in design. Even though I still like it. I'm sure that you can find free and interesting public apis from this app."
  },
  {
    title: "Linktree",
    img: linktree,
    link: "https://github.com/MR-Addict/linktree",
    intro:
      "In this project, I begin to use vercel to host my website, authenticate with next auth, and use mongodb as my database. Also this time, I begin to deeply love these stacks. I appreciate vercel team creates a so good, neat, convenient but also powerful framework. I love what next.js features, especially the giant break after version 13. I think it's the best frontend framework ever."
  }
];

export default projects;
