import { unstable_getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { moments } from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") return res.setHeader("Allow", ["PUT"]).end(`Method ${req.method} is not allowed!`);

  if (!req.body || !req.body._id || !req.body.moment || !req.body.weather)
    return res.json({ status: false, message: "Needed request body is empty!" });

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return res.json({ status: false, message: "You have no access!" });

  const response = await moments.update(req.body._id, req.body.weather, req.body.moment);
  return res.json(response);
}
