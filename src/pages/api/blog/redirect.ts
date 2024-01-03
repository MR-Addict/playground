import type { NextApiRequest, NextApiResponse } from "next";

import { getAllPostsProps } from "@/lib/blog";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.setHeader("Allow", ["GET"]).end(`Method ${req.method} is not allowed!`);

  const { index } = req.query;
  if (!index) return res.status(400).json({ status: false, message: "Missing index" });

  const posts = getAllPostsProps();
  if (typeof index !== "string" || isNaN(parseInt(index)) || parseInt(index) < 1 || parseInt(index) > posts.length)
    return res.status(400).json({ status: false, message: "Invalid index" });

  const post = posts.at(parseInt(index) - 1);
  if (post) return res.redirect("/blog/" + post.id);
  else return res.status(404).json({ status: false, message: "Post not found" });
}
