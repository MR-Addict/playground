import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/feedback");
    return res.json({ status: true, message: "Revalidate success!" });
  } catch (err) {
    return res.json({ status: false, message: "Revalidate failed!" });
  }
}
