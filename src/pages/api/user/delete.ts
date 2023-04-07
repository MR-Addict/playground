import type { NextApiRequest, NextApiResponse } from "next";

import { user } from "@/lib/mongodb";
import { checkPerm } from "@/lib/auth/checkPerm";
import { routerSession } from "@/lib/auth/serverSession";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.setHeader("Allow", ["DELETE"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body?._id) return res.status(400).json({ status: false, message: "Bad request" });

  const session = await routerSession(req, res);
  if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  if (!checkPerm(session.user.role, session.user.role))
    return res.status(403).json({ status: false, message: "Forbidden" });

  const result = await user.remove(req.body._id);
  return res.status(result.status ? 200 : 500).json(result);
}
