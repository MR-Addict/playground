import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body.token || !req.body.path) return res.json({ status: false, message: "Needed request body is empty!" });

  if (req.body.token !== process.env.REVALIDATE_TOKEN) return res.json({ status: false, message: "Invalid token!" });

  try {
    await res.revalidate(req.body.path);
    return res.json({ status: true, message: "Revalidate success!" });
  } catch (err) {
    return res.json({ status: false, message: "Revalidate failed!" });
  }
}
