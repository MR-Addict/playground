import path from "path";
import fsPromises from "fs/promises";

import nextjs from "./images/nextjs.png";
import mongodb from "./images/mongodb.png";
import reactjs from "./images/reactjs.png";
import typescript from "./images/typescript.png";
import nextauthjs from "./images/nextauthjs.png";
import tailwindcss from "./images/tailwindcss.png";

const packages = [
  {
    name: "Next.js",
    version: "13.1.2",
    package: {
      category: "dependencies",
      name: "next",
    },
    img: nextjs,
  },
  {
    name: "React.js",
    version: "18.2.0",
    package: {
      category: "dependencies",
      name: "react",
    },
    img: reactjs,
  },
  {
    name: "NextAuth.js",
    version: "4.18.8",
    package: {
      category: "dependencies",
      name: "next-auth",
    },
    img: nextauthjs,
  },
  {
    name: "Typescript",
    version: "4.9.4",
    package: {
      category: "dependencies",
      name: "typescript",
    },
    img: typescript,
  },
  {
    name: "Mongodb",
    version: "4.13.0",
    package: {
      category: "dependencies",
      name: "mongodb",
    },
    img: mongodb,
  },
  {
    name: "Tailwindcss",
    version: "3.2.4",
    package: {
      category: "devDependencies",
      name: "tailwindcss",
    },
    img: tailwindcss,
  },
];

export default async function readPackages() {
  const jsonDir = path.join(process.cwd(), "/");
  const fullPath = path.join(jsonDir, "package.json");
  const rawPackageJson = await fsPromises.readFile(fullPath, "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  const result = packages.map((item) => {
    const category = item.package.category;
    const name = item.package.name;
    return { ...item, version: packageJson[category][name].replace("^", "") };
  });

  return result;
}
