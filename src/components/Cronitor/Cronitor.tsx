"use client";

import { useCronitor } from "@cronitorio/cronitor-rum-nextjs";

export default function Cronitor({ cronitorToken }: { cronitorToken: string }) {
  useCronitor(cronitorToken);

  return <></>;
}
