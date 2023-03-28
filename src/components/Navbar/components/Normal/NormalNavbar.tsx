"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";
import { checkUserPermission } from "@/lib/auth/checkUserPermission";

export default function NormalNavbar() {
  const { data: session } = useSession();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className='hidden lg:flex flex-row gap-4'>
      {navbarData
        .filter((item) => checkUserPermission(session?.user.role || "vistor", item.visibility))
        .map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className={`${rootPath === item.link ? "text-green-600" : "text-gray-700 hover:text-green-600"}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
