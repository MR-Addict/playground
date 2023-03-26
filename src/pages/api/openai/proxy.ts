import { getServerSession } from "next-auth/next";
import type { NextApiRequest, NextApiResponse } from "next";

import { ChatRequest } from "@/types/chatgpt";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed`);

  const request = ChatRequest.safeParse(req.body);
  if (!request.success) return res.send("Bad Request");

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ status: false, message: "Not authorized" });

  try {
    const url = "https://nextjstemplate.mraddict.one/api/openai/chat";
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: process.env.OPENAI_TOKEN, ...request.data }),
    }).then((res) => res.json());

    return res.status(result.status ? 200 : 500).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "ChatGPT failed to response" });
  }
}
