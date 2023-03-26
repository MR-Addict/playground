import type { NextApiRequest, NextApiResponse } from "next";

import { ChatRequest } from "@/types";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({ apiKey: process.env.OPENAI_TOKEN });
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  console.log(req.body);

  if (req.body.token !== process.env.OPENAI_TOKEN) return res.send("Not authorized");

  const request = ChatRequest.safeParse(req.body);
  if (!request.success) return res.send("Bad Request");

  console.log(request);

  const completion = await openai.createChatCompletion(request.data);
  return res.json(completion);

  // return res.send(request);
}
