import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body.weather || !req.body.moment)
    return res.json({ status: false, message: "Needed request body is empty!" });

  const response = await moments.insert(req.body.weather, req.body.moment);
  return res.json(response);
}
