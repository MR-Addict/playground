import z from "zod";
import type { NextApiRequest, NextApiResponse } from "next";

import { user } from "@/lib/mongodb";

const User = z.object({
  email: z.string().max(100),
  password: z.string().min(8).max(100),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  const parsedResult = User.safeParse(req.body);
  if (!parsedResult.success) return res.status(400).json({ status: false, message: "Bad request" });

  const parsedUser = parsedResult.data;
  const result = await user.signup(parsedUser.password, parsedUser.email, "subscriber");
  return res.status(result.status ? 201 : 500).json(result);
}
