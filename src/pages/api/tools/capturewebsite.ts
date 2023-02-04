import captureWebsite from "capture-website";
import type { NextApiRequest, NextApiResponse } from "next";

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

  let response;

  await captureWebsite
    .base64(req.body.url, {
      type: req.body.type,
      width: Number(req.body.width),
      height: Number(req.body.height),
      delay: Number(req.body.delay),
      timeout: Number(req.body.timeout),
      fullPage: Boolean(req.body.fullPage),
      disableAnimations: Boolean(req.body.disableAnimations),
    })
    .then((res) => (response = { status: true, base64: res, type: req.body.type }))
    .catch(() => (response = { status: false, message: `Cannot capture ${req.body.url} page!` }));
  return res.json(response);
}
