"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import navbarData from "../../config";

export default function NormalNavbar() {
  return (
    <div className='flex flex-row gap-4'>
      {navbarData.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`${
            usePathname() === item.link ? "text-green-600" : "text-black"
          } font-semibold hover:text-green-600`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
