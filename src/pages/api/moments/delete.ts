import type { NextApiRequest, NextApiResponse } from "next";

import { routerSession } from "@/lib/auth/serverSession";
import { checkUserPermission } from "@/lib/auth/checkUserPermission";

import { moments } from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.setHeader("Allow", ["DELETE"]).end(`Method ${req.method} is not allowed`);

  const session = await routerSession(req, res);
  if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  if (!checkUserPermission(session.user.role, "admin"))
    return res.status(403).json({ status: false, message: "Forbidden" });

  if (!req.body || !req.body._id) return res.status(400).json({ status: false, message: "Bad request" });

  const result = await moments.remove(req.body._id);
  return res.status(result.status ? 200 : 500).json(result);
}
