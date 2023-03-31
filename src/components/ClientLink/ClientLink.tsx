"use client";

import Link from "next/link";
import { UrlObject } from "url";

import { useProgressbarContext } from "@/contexts";

interface Props {
  href: string | UrlObject;
  children: React.ReactNode;
  [key: string]: any;
}

export default function ClientLink({ href, children, ...rest }: Props) {
  const { setIsLoading } = useProgressbarContext();

  return (
    <Link
      href={href}
      onClick={() => {
        const { pathname, search, hash } = window.location;
        if (href !== pathname + search + hash) setIsLoading(true);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
