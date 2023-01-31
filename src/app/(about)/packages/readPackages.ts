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
];

export default async function readPackages() {
  const jsonPath = path.join(process.cwd(), "/package.json");
  const rawPackageJson = await fsPromises.readFile(jsonPath, "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  const result = packages.map((item) => {
    const category = item.package.category;
    const name = item.package.name;
    return { ...item, version: packageJson[category][name].replace("^", "") };
  });

  return result;
}
