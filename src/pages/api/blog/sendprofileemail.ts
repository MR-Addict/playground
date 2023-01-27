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

  if (!req.body.email) return res.json({ status: false, message: "Needed request body is empty!" });

  const mailOptions = {
    from: process.env.MAILFROM || "",
    to: req.body.email,
    subject: "MR-Addict's Profile",
    text: "MR-Addict's Profile",
    html: readProfileHtml(),
  };
  const response = await sendEmail(mailOptions);
  return res.json(response);
}
