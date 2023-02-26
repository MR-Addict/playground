import type { NextApiRequest, NextApiResponse } from "next";

import { sendEmail } from "@/lib/blog";
import { feedback } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body || !req.body.feedback) return res.json({ status: false, message: "Needed request body is empty!" });

  sendEmail({
    from: "MR-Addict@qq.com",
    to: "MR-Addict@qq.com",
    subject: "New feedback",
    text: req.body.feedback,
  });
  const response = await feedback.insert(req.body.feedback);
  return res.json(response);
}
