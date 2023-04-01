"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";
import { checkPerm } from "@/lib/auth/checkPerm";
import { ClientLink } from "@/components/client";

export default function NormalNavbar() {
  const { data: session } = useSession();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <ul className='hidden lg:flex flex-row gap-4'>
      {navbarData
        .filter((item) => checkPerm(session?.user.role || "vistor", item.visibility))
        .map((item, index) => (
          <li key={index}>
            <ClientLink
              href={item.link}
              className={`${rootPath === item.link ? "text-green-600" : "text-gray-700 hover:text-green-600"} relative`}
            >
              {item.title}
            </ClientLink>
          </li>
        ))}
    </ul>
  );
}
