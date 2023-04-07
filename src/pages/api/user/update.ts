import z from "zod";
import type { NextApiRequest, NextApiResponse } from "next";

import { user } from "@/lib/mongodb";
import { UserRole } from "@/types/user";
import { checkPerm } from "@/lib/auth/checkPerm";
import { routerSession } from "@/lib/auth/serverSession";

const User = z.object({
  _id: z.string(),
  username: z.string().max(100).optional(),
  email: z.string().max(100).optional(),
  role: UserRole.optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.setHeader("Allow", ["PUT"]).end(`Method ${req.method} is not allowed!`);

  const parsedResult = User.safeParse(req.body);
  if (!parsedResult.success) return res.status(400).json({ status: false, message: "Bad request" });

  const session = await routerSession(req, res);
  if (!session) return res.status(401).json({ status: false, message: "Unauthorized" });

  if (!checkPerm(session.user.role, session.user.role))
    return res.status(403).json({ status: false, message: "Forbidden" });

  const parsedUser = parsedResult.data;
  const result = await user.update(parsedUser._id, {
    email: parsedUser.email,
    username: parsedUser.username,
    role: parsedUser.role,
  });
  return res.status(result.status ? 200 : 500).json(result);
}
