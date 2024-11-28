import type { NextApiRequest, NextApiResponse } from "next";

import { getAllPostsProps } from "@/lib/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed!`);

  const base = "https://playground.mraddict.vercel.app/blog/";
  const result = getAllPostsProps().map((post) => ({ ...post, url: base + post.id }));
  return res.status(200).json(result.slice(0, 4));
}
