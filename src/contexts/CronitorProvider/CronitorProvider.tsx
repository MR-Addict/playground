"use client";

import { useCronitor } from "@cronitorio/cronitor-rum-nextjs";

interface Props {
  children: React.ReactNode;
  cronitorToken: string | undefined;
}

export default function CronitorProvider({ children, cronitorToken }: Props) {
  if (!cronitorToken) throw new Error("Please add CRONITOR_TOKEN to env");

  useCronitor(cronitorToken, { debug: false });

  return <>{children}</>;
}
