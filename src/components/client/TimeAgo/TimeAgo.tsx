"use client";

import { useEffect, useState } from "react";

import { timeAgo } from "@/lib/utils";

function useInterval(callback: Function, delay: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay || 1000);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

export default function TimeAgo({ date, ...rest }: { date: string } & React.ComponentProps<"span">) {
  const [result, setResult] = useState(timeAgo(date).timeago);

  useInterval(() => setResult(timeAgo(date).timeago), 1000);

  return (
    <span {...rest}>
      {result.value}
      {result.key} ago
    </span>
  );
}
