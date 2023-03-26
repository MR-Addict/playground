import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/feedback");
    return res.status(200).json({ status: true, message: "Revalidate succeeded" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "Revalidate failed" });
  }
}
