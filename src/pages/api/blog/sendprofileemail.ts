import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/types/env";
import { sendEmail } from "@/lib/nodemailer";

function readProfileHtml() {
  const filePath = path.join(process.cwd(), "src/assets/utils/profile.html");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed`);

  if (!req.body?.email) return res.status(400).json({ status: false, message: "Bad request" });

  const mailOptions = {
    from: env.MAILFROM,
    to: req.body.email,
    subject: "MR-Addict's Profile",
    text: "MR-Addict's Profile",
    html: readProfileHtml(),
  };

  const result = await sendEmail(mailOptions);
  return res.status(result.status ? 200 : 500).json(result);
}
