import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed!`);
  }

  return res.json({ start: "2023-01-17T07:00:19Z" });
}
