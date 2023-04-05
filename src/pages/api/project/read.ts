import type { NextApiRequest, NextApiResponse } from "next";

import { project } from "@/lib/mongodb";
import { checkPerm } from "@/lib/auth/checkPerm";
import { routerSession } from "@/lib/auth/serverSession";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed`);

  // const session = await routerSession(req, res);
  // if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  // if (!checkPerm(session.user.role, "admin")) return res.status(403).json({ status: false, message: "Forbidden" });

  const result = await project.read();
  return res.status(result.status ? 200 : 500).json(result);
}
