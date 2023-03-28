import { apiSession } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.setHeader("Allow", ["DELETE"]).end(`Method ${req.method} is not allowed`);

  const session = await apiSession(req, res);
  if (!session) return res.status(401).json({ status: false, message: "Not authorized" });

  if (!req.body || !req.body._id) return res.status(400).json({ status: false, message: "Bad request" });

  const result = await moments.remove(req.body._id);
  return res.status(result.status ? 200 : 500).json(result);
}
