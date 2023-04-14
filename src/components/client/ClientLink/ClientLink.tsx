"use client";

import Link from "next/link";

import { useProgressbarContext } from "@/contexts";

type Props = {
  disabled?: boolean;
} & React.ComponentProps<typeof Link> &
  React.ComponentProps<"div">;

export default function ClientLink({ href, disabled, children, onClick, ...rest }: Props) {
  const { startProgress } = useProgressbarContext();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    const { pathname, search, hash } = window.location;
    if (href !== pathname + search + hash) startProgress();
    if (onClick) onClick(event);
  }

  if (disabled) return <div {...rest}>{children}</div>;

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
