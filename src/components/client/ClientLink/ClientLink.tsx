"use client";

import Link from "next/link";

import { useProgressbarContext } from "@/contexts";

type Props = {
  disabled?: boolean;
} & React.ComponentProps<typeof Link>;

export default function ClientLink({ href, disabled, children, onClick, ...rest }: Props) {
  const { setIsLoading } = useProgressbarContext();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (disabled) return;
    const { pathname, search, hash } = window.location;
    if (href !== pathname + search + hash) setIsLoading(true);
    if (onClick) onClick(event);
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
