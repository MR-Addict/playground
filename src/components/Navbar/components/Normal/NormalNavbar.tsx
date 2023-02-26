"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import navbarData from "../../config";

export default function NormalNavbar() {
  const { data: session } = useSession();
  const rootPath = (usePathname() || "/").split("/").slice(0, 2).join("/");

  return (
    <div className='hidden lg:flex flex-row gap-4'>
      {navbarData
        .filter((item) => item.public || session)
        .map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={`${
              rootPath === item.link ? "text-green-600" : "text-gray-700 hover:text-green-600"
            } font-semibold`}
          >
            {item.title}
          </Link>
        ))}
    </div>
  );
}
