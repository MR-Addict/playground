import captureWebsite from "capture-website";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const start = Date.now();
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
      width: JSON.parse(req.body.width),
      height: JSON.parse(req.body.height),
      delay: JSON.parse(req.body.delay),
      timeout: JSON.parse(req.body.timeout),
      fullPage: JSON.parse(req.body.fullPage),
      disableAnimations: JSON.parse(req.body.disableAnimations),
    });
    const end = Date.now();

    return res.json({
      status: true,
      data: { base64, url: req.body.url, type: req.body.type, runtime: (end - start) / 1000 },
    });
  } catch (error) {
    return res.json({ status: false, message: `Website ${req.body.url} unaccessible!` });
  }
}
