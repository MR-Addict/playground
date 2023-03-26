import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

import { sendEmail } from "@/lib/blog";

function readProfileHtml() {
  const filePath = path.join(process.cwd(), "src/data/blog/profile.html");
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body || !req.body.email) return res.status(400).json({ status: false, message: "Bad request!" });

  const mailOptions = {
    from: process.env.MAILFROM || "",
    to: req.body.email,
    subject: "MR-Addict's Profile",
    text: "MR-Addict's Profile",
    html: readProfileHtml(),
  };

  const result = await sendEmail(mailOptions);
  return res.status(result.status ? 200 : 500).json(result);
}
