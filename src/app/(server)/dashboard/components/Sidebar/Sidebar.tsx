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
    <section aria-label="sidebar" className="md:w-48 h-full md:top-0 md:sticky">
      <ul className="flex flex-row md:flex-col gap-2 md:gap-1">
        {links
          .filter((item) => checkPerm(session?.user.role || "vistor", item.visibility))
          .map((link) => (
            <li key={link.path}>
              <ClientLink
                href={link.path}
                className={classNames(style.link, rootPath === link.path ? style.active : "")}
              >
                <span>{<link.icon />}</span>
                <span>{link.name}</span>
              </ClientLink>
            </li>
          ))}
      </ul>
    </section>
  );
}
