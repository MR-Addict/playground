import path from "path";
import fsPromises from "fs/promises";

import zod from "./images/zod.png";
import sharp from "./images/sharp.png";
import nextjs from "./images/nextjs.png";
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
    package: {
      category: "dependencies",
      name: "next",
    },
    img: nextjs,
  },
  {
    name: "React.js",
    package: {
      category: "dependencies",
      name: "react",
    },
    img: reactjs,
  },
  {
    name: "NextAuth.js",
    package: {
      category: "dependencies",
      name: "next-auth",
    },
    img: nextauthjs,
  },
  {
    name: "Typescript",
    package: {
      category: "devDependencies",
      name: "typescript",
    },
    img: typescript,
  },
  {
    name: "Mongodb",
    package: {
      category: "dependencies",
      name: "mongodb",
    },
    img: mongodb,
  },
  {
    name: "Tailwindcss",
    package: {
      category: "devDependencies",
      name: "tailwindcss",
    },
    img: tailwindcss,
  },
  {
    name: "Zod",
    package: {
      category: "dependencies",
      name: "zod",
    },
    img: zod,
  },
  {
    name: "Sharp",
    package: {
      category: "dependencies",
      name: "sharp",
    },
    img: sharp,
  },
  {
    name: "React Icons",
    package: {
      category: "devDependencies",
      name: "react-icons",
    },
    img: reacticons,
  },
  {
    name: "Bcrypt",
    package: {
      category: "dependencies",
      name: "bcryptjs",
    },
    img: bcryptjs,
  },
  {
    name: "Nodemailer",
    package: {
      category: "dependencies",
      name: "nodemailer",
    },
    img: nodemailer,
  },
  {
    name: "Codemirror",
    package: {
      category: "devDependencies",
      name: "@uiw/react-codemirror",
    },
    img: codemirror,
  },
];

export default async function readPackages() {
  const jsonPath = path.join(process.cwd(), "package.json");
  const rawPackageJson = await fsPromises.readFile(jsonPath, "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  const result = packages.map((item) => {
    const img = item.img;
    const name = item.package.name;
    const category = item.package.category;
    const version: string = packageJson[category][name].replace("^", "");

    return { name, version, img };
  });

  return result;
}
