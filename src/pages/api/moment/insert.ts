import type { NextApiRequest, NextApiResponse } from "next";

import { moment } from "@/lib/mongodb";
import { routerSession } from "@/lib/auth/serverSession";
import { checkUserPermission } from "@/lib/auth/checkUserPermission";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed`);

  const session = await routerSession(req, res);
  if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  if (!checkUserPermission(session.user.role, "admin"))
    return res.status(403).json({ status: false, message: "Forbidden" });

  if (!req.body?.weather || !req.body?.moment) return res.status(400).json({ status: false, message: "Bad request" });

  const result = await moment.insert(req.body.moment, req.body.weather);
  return res.status(result.status ? 200 : 500).json(result);
}