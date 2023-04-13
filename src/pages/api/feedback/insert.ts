import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/types/env";
import { feedback } from "@/lib/mongodb";
import { sendEmail } from "@/lib/nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed`);

  if (!req.body?.feedback) return res.status(400).json({ status: false, message: "Bad request" });

  sendEmail({
    from: env.MAILFROM,
    to: env.MAILFROM,
    subject: "New feedback",
    text: req.body.feedback,
  });

  const result = await feedback.insert(req.body.feedback);
  return res.status(result.status ? 201 : 500).json(result);
}
