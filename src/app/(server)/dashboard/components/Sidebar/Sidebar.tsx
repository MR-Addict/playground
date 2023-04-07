"use client";

import classNames from "classnames";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

import style from "./Sidebar.module.css";
import { links } from "./config";
import { checkPerm } from "@/lib/auth/checkPerm";
import { ClientLink } from "@/components/client";

export default function Sidebar({ session }: { session: Session }) {
  const rootPath = (usePathname() || "/").split("/").slice(0, 3).join("/");

  return (
    <section aria-label='sidebar' className='md:w-1/6 h-full'>
      <ul className='flex flex-row md:flex-col gap-2 md:gap-1'>
        {links
          .filter((item) => checkPerm(session?.user.role || "vistor", item.visibility))
          .map((link) => (
            <ClientLink
              key={link.path}
              href={link.path}
              className={classNames(style.link, rootPath === link.path ? style.active : "")}
            >
              {link.name}
            </ClientLink>
          ))}
      </ul>
    </section>
  );
}
