"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

import navbarData from "../../config";

export default function MobileNavbar({ children }: { children: React.ReactNode }) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div>
      <button type='button' onClick={() => setIsExpand(!isExpand)}>
        {isExpand ? <RxCross1 size={17} /> : <AiOutlineMenu size={17} />}
      </button>
      <div
        className={`z-10 w-full flex flex-col items-start gap-2 py-5 px-5 md:px-48 absolute left-0 top-[69px] rounded-b-lg bg-white shadow-md duration-500 ${
          isExpand ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        {navbarData.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={() => setIsExpand(false)}
            className={`w-full font-semibold hover:text-green-600 flex flex-row gap-2 items-center justify-start border-b-2 p-2 rounded-md duration-300 ${
              usePathname() === item.link ? "text-green-600" : "text-slate-700"
            }`}
          >
            <span>{item.title}</span>
          </Link>
        ))}
        {children}
      </div>
    </div>
  );
}