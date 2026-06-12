// Generates public/og-default.png — the self-hosted, branded 1200x630 social
// share image used as the sitewide default og:image / twitter:image.
//
// Reuses puppeteer (already a dependency via scripts/prerender.mjs) to screenshot
// an inline HTML template, so no image library (sharp/canvas) is needed. Run on
// demand via `npm run og` and commit the resulting PNG — it rarely changes, so
// it is intentionally NOT part of the build pipeline.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Embed the logo as a data URI so the template has no network dependency.
const logo = readFileSync(resolve(root, "public/logo.png")).toString("base64");
const logoUri = `data:image/png;base64,${logo}`;

// Brand tokens mirror src/styles.css: ink near-black gradient, brand blue #0066A6.
const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@500;600&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    display: flex; flex-direction: column; justify-content: center;
    padding: 88px 96px;
    background: radial-gradient(1200px 600px at 78% 12%, rgba(0,102,166,0.35), transparent 60%),
                linear-gradient(180deg, #1f2326, #0c0e10);
    color: #fff; font-family: "Inter", system-ui, sans-serif;
    position: relative; overflow: hidden;
  }
  .bar { width: 84px; height: 8px; border-radius: 999px; background: #0066A6; margin-bottom: 40px; }
  .logo-chip { display: inline-flex; align-self: flex-start; background: #fff; padding: 18px 28px;
               border-radius: 18px; margin-bottom: 56px; box-shadow: 0 18px 50px -18px rgba(0,102,166,0.45); }
  .logo { height: 52px; display: block; }
  h1 {
    font-family: "Manrope", sans-serif; font-weight: 800; font-size: 86px;
    line-height: 1.02; letter-spacing: -0.02em; max-width: 940px;
  }
  h1 .accent { color: #4aa3e0; }
  p.sub { margin-top: 32px; font-size: 30px; font-weight: 500; color: rgba(255,255,255,0.72); letter-spacing: 0.01em; }
  .url { position: absolute; bottom: 64px; left: 96px; font-size: 26px; font-weight: 600; color: rgba(255,255,255,0.55); }
  .badge { position: absolute; bottom: 60px; right: 96px; display: flex; gap: 14px; align-items: center;
           font-size: 22px; font-weight: 600; color: rgba(255,255,255,0.7); }
  .dot { width: 10px; height: 10px; border-radius: 999px; background: #2D8A4F; }
</style></head>
<body>
  <div class="logo-chip"><img class="logo" src="${logoUri}" alt="SingleStop"></div>
  <div class="bar"></div>
  <h1>Build smarter.<br><span class="accent">Live luxuriously.</span></h1>
  <p class="sub">Premium construction in Jaipur · Planning · Construction · PMC · Interiors</p>
  <div class="url">singlestop.co.in</div>
</body></html>`;

const run = async () => {
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
  writeFileSync(resolve(root, "public/og-default.png"), buf);
  await browser.close();
  console.log("og-default.png: 1200x630 written to public/");
};

run().catch((e) => {
  console.error(`og generation failed: ${e.message}`);
  process.exit(1);
});
