import puppeteer from "puppeteer-core";

import chromium from "chrome-aws-lambda";

export default async function takeScreenshot(
  url: string,
  options: {
    type: "png" | "jpeg" | "webp";
    width: number;
    height: number;
    delay: number;
    timeout: number;
    fullPage: boolean;
    disableAnimations: boolean;
  }
) {
  const chromePath =
    process.env.VERCEL === undefined
      ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
      : await chromium.executablePath;

  const browser = await puppeteer.launch({
    headless: true,
    args: chromium.args,
    ignoreHTTPSErrors: true,
    executablePath: chromePath,
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(options.timeout * 1000);
  await page.setBypassCSP(true);
  await page.setJavaScriptEnabled(true);
  await page.setViewport({ width: options.width, height: options.height });
  await page.waitForTimeout(options.delay * 1000);

  if (options.disableAnimations) {
    await page.addStyleTag({
      content: "*,::before,::after{animation:initial !important;transition:initial !important;}",
    });
  }

  let base64;
  try {
    await page.goto(url, { waitUntil: "load" });
    const buffer = await page.screenshot({ type: options.type, fullPage: options.fullPage });
    base64 = buffer.toString("base64");
  } catch (error) {
    console.error(error);
  } finally {
    if (browser !== null) await browser.close();
  }
  return base64;
}
