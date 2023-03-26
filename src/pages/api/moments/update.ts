import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.setHeader("Allow", ["PUT"]).end(`Method ${req.method} is not allowed`);

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ status: false, message: "Not authorized" });

  if (!req.body || !req.body._id || !req.body.moment || !req.body.weather)
    return res.status(400).json({ status: false, message: "Bad request" });

  const result = await moments.update(req.body._id, req.body.weather, req.body.moment);
  return res.status(result.status ? 200 : 500).json(result);
}
