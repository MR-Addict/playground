export interface linkItemType {
  title: string;
  link: string;
  external: boolean;
}

export const links: {
  head: string;
  data: linkItemType[];
}[] = [
  {
    head: "Frameworks",
    data: [
      {
        title: "Next.js 13",
        link: "https://beta.nextjs.org/docs/",
        external: true,
      },
      {
        title: "Typescript",
        link: "https://www.typescriptlang.org/",
        external: true,
      },
      {
        title: "Tailwindcss",
        link: "https://tailwindcss.com/",
        external: true,
      },
      {
        title: "NextAuth.js",
        link: "https://next-auth.js.org/",
        external: true,
      },
    ],
  },
  {
    head: "Resources",
    data: [
      {
        title: "Vercel",
        link: "https://vercel.com/",
        external: true,
      },
      {
        title: "Turbopack",
        link: "https://turbo.build/",
        external: true,
      },
      {
        title: "Mongodb Atlas",
        link: "https://www.mongodb.com/atlas/database",
        external: true,
      },
      {
        title: "Github Repository",
        link: "https://github.com/MR-Addict/playground",
        external: true,
      },
    ],
  },
  {
    head: "About",
    data: [
      {
        title: "Resume",
        link: "/resume.pdf",
        external: false,
      },
      {
        title: "Feedback",
        link: "/feedback",
        external: false,
      },
      {
        title: "Commits",
        link: "/commits/1",
        external: false,
      },
      {
        title: "Packages",
        link: "/packages",
        external: false,
      },
    ],
  },
];
