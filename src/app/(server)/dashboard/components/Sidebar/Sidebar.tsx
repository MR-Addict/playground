"use client";

import Link from "next/link";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import style from "./Sidebar.module.css";
import { links } from "./config";
import { checkPerm } from "@/lib/auth/checkPerm";

export default function Sidebar() {
  const { data: session } = useSession();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <section aria-label='sidebar' className='w-1/6 h-full'>
      <ul className='flex flex-col'>
        {links
          .filter((item) => checkPerm(session?.user.role || "vistor", item.visibility))
          .map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={classNames(style.link, rootPath === link.path ? style.active : "")}
            >
              {link.name}
            </Link>
          ))}
      </ul>
    </section>
  );
}
