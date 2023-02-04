import captureWebsite from "capture-website";
import type { NextApiRequest, NextApiResponse } from "next";

interface optionsType {
  type: "png" | "jpeg" | "webp";
  delay: number;
  timeout: number;
  width: number;
  height: number;
  disableAnimations: boolean;
  fullPage: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.setHeader("Allow", ["POST"]).end(`Method ${req.method} is not allowed!`);

  if (
    !req.body.url ||
    !req.body.type ||
    !req.body.width ||
    !req.body.height ||
    !req.body.delay ||
    !req.body.timeout ||
    !req.body.fullPage ||
    !req.body.disableAnimations
  )
    return res.json({ status: false, message: "Needed request body is empty!" });
  try {
    const base64 = await captureWebsite.base64(req.body.url, {
      type: req.body.type,
      width: Number(req.body.width),
      height: Number(req.body.height),
      delay: Number(req.body.delay),
      timeout: Number(req.body.timeout),
      fullPage: Boolean(req.body.fullPage),
      disableAnimations: Boolean(req.body.disableAnimations),
    });
    return res.json({ status: true, base64, type: req.body.type });
  } catch (error) {
    console.error(error);
    return { status: false };
  }
}
