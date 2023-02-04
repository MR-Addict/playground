"use client";

import { useEffect, useState } from "react";

import { timeAgo } from "@/lib/utils";

function useInterval(callback: Function, delay: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay || 1000);
    return () => clearInterval(interval);
  }, [callback, delay]);
}

export default function TimeAgo({ date }: { date: string }) {
  const [result, setResult] = useState(timeAgo(date).firstNoneZero);

  useInterval(() => setResult(timeAgo(date).firstNoneZero), 1000);

  return (
    <span>
      {result.value} {result.key} ago
    </span>
  );
}
