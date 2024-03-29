import type { NextApiRequest, NextApiResponse } from "next";

import { getAllPostsProps } from "@/lib/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed!`);

  const posts = getAllPostsProps();
  const result = posts.map((post) => ({ ...post, url: "https://playground.mraddict.top/blog/" + post.id }));
  return res.status(200).json(result.slice(0, 4));
}
