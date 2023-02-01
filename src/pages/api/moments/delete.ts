import { unstable_getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.setHeader("Allow", ["DELETE"]).end(`Method ${req.method} is not allowed!`);

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.json({ status: false, message: "You have no access!" });

  if (!req.body._id) return res.json({ status: false, message: "Needed request body is empty!" });

  const response = await moments.remove(req.body._id);
  return res.json(response);
}
