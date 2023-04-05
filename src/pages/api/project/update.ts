import type { NextApiRequest, NextApiResponse } from "next";

import { project } from "@/lib/mongodb";
import { checkPerm } from "@/lib/auth/checkPerm";
import { routerSession } from "@/lib/auth/serverSession";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT")
    return res.status(405).setHeader("Allow", ["PUT"]).end(`Method ${req.method} is not allowed`);

  // const session = await routerSession(req, res);
  // if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  // if (!checkPerm(session.user.role, "admin")) return res.status(403).json({ status: false, message: "Forbidden" });

  if (!req.body?._id || !req.body?.user || !req.body?.repo)
    return res.status(400).json({ status: false, message: "Bad request" });

  const result = await project.update(req.body._id, req.body.user, req.body.repo);
  return res.status(result.status ? 200 : 500).json(result);
}
