import path from "path";
import fsPromises from "fs/promises";

import zod from "./images/zod.png";
import sass from "./images/sass.png";
import sharp from "./images/sharp.png";
import sanity from "./images/sanity.png";
import nextjs from "./images/nextjs.png";
import framer from "./images/framer.png";
import mongodb from "./images/mongodb.png";
import reactjs from "./images/reactjs.png";
import bcryptjs from "./images/bcryptjs.png";
import reacticons from "./images/reacticons.png";
import codemirror from "./images/codemirror.png";
import nodemailer from "./images/nodemailer.png";
import typescript from "./images/typescript.png";
import nextauthjs from "./images/nextauthjs.png";
import tailwindcss from "./images/tailwindcss.png";

const packages = [
  {
    name: "Next.js",
    packageName: "next",
    devDependency: false,
    img: nextjs,
  },
  {
    name: "React.js",
    packageName: "react",
    devDependency: false,
    img: reactjs,
  },
  {
    name: "NextAuth.js",
    packageName: "next-auth",
    devDependency: false,
    img: nextauthjs,
  },
  {
    name: "Typescript",
    packageName: "typescript",
    devDependency: true,
    img: typescript,
  },
  {
    name: "Mongodb",
    packageName: "mongodb",
    devDependency: false,
    img: mongodb,
  },
  {
    name: "Tailwindcss",
    packageName: "tailwindcss",
    devDependency: true,
    img: tailwindcss,
  },
  {
    name: "Zod",
    packageName: "zod",
    devDependency: false,
    img: zod,
  },
  {
    name: "Sharp",
    packageName: "sharp",
    devDependency: false,
    img: sharp,
  },
  {
    name: "React Icons",
    packageName: "react-icons",
    devDependency: true,
    img: reacticons,
  },
  {
    name: "Bcrypt",
    packageName: "bcryptjs",
    devDependency: false,
    img: bcryptjs,
  },
  {
    name: "Nodemailer",
    packageName: "nodemailer",
    devDependency: false,
    img: nodemailer,
  },
  {
    name: "Codemirror",
    packageName: "@uiw/react-codemirror",
    devDependency: true,
    img: codemirror,
  },
  {
    name: "Framer Motion",
    packageName: "framer-motion",
    devDependency: true,
    img: framer,
  },
  {
    name: "Sass",
    packageName: "sass",
    devDependency: true,
    img: sass,
  },
  {
    name: "Sanity",
    packageName: "next-sanity-client",
    devDependency: false,
    img: sanity,
  },
];

export default async function readPackages() {
  const jsonPath = path.join(process.cwd(), "package.json");
  const rawPackageJson = await fsPromises.readFile(jsonPath, "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  const result = packages.map((item) => {
    const img = item.img;
    const name = item.name;

    const packageName = item.packageName;
    const category = item.devDependency ? "devDependencies" : "dependencies";
    const version: string = packageJson[category][packageName].replace("^", "");

    return { name, version, img, packageName, devDependency: item.devDependency };
  });

  return result;
}
