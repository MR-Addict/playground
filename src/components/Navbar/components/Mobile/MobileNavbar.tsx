"use client";

import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";
import style from "./Hamburger.module.css";
import { checkUserPermission } from "@/lib/auth/checkUserPermission";

export default function MobileNavbar() {
  const { data: session } = useSession();
  const [isExpand, setIsExpand] = useState(false);
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className='lg:hidden flex flex-row items-center'>
      <button
        type='button'
        className={classNames(style.hamburger, isExpand ? style.active : "")}
        onClick={() => setIsExpand(!isExpand)}
        aria-label='mobile nav button to toggle menu'
      >
        <div></div>
        <div></div>
      </button>
      <div
        style={{ transform: `translateX(${isExpand ? "0" : "-100%"})` }}
        className='z-10 w-full flex flex-col items-start gap-4 py-5 px-5 md:px-48 absolute left-0 top-16 rounded-b-lg background shadow-md duration-500'
      >
        <ul className='w-full flex flex-col gap-1'>
          {navbarData
            .filter((item) => checkUserPermission(session?.user.role || "vistor", item.visibility))
            .map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  onClick={() => setIsExpand(false)}
                  className={`w-full flex flex-row gap-2 items-center justify-start border-b-2 p-2 rounded-md ${
                    rootPath === item.link ? "text-green-600" : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
