import type { NextApiRequest, NextApiResponse } from "next";

import { feedback } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);
  }

  if (!req.body.feedback) return res.json({ status: false, message: "Needed request body is empty!" });

  const response = await feedback.insert(req.body.feedback);
  return res.json(response);
}
