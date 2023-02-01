import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed!`);

  const response = await moments.read();
  return res.json(response);
}
