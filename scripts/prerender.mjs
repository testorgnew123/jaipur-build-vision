// Build-time prerender: renders the SPA for crawlable static routes and writes
// the fully-rendered HTML (with <HeadContent /> meta + JSON-LD baked in) to
// dist/<route>/index.html. Non-JS crawlers and AI bots then get real content.
//
// Fail-soft: if Chromium can't launch, the build still succeeds (pages just
// fall back to client-side render). Runs via npm "postbuild".
//
// API-dependent routes (/blog, /blog/:slug, /careers) are intentionally skipped
// because their loaders call /api/* which isn't available at build time. They
// still get correct meta client-side via <HeadContent />.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");
const PORT = 4178;

const slugsFrom = (file) => {
  const src = readFileSync(resolve(root, file), "utf8");
  return [...src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
};

const routes = [
  "/",
  "/about",
  "/services",
  "/pricing",
  "/projects",
  "/live-tracking",
  "/contact",
  ...slugsFrom("src/data/projects.ts").map((s) => `/projects/${s}`),
];

const MIME = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".html": "text/html",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

// Minimal static server with SPA fallback to index.html.
const indexHtml = readFileSync(join(dist, "index.html"));
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const filePath = join(dist, urlPath);
  if (extname(filePath) && existsSync(filePath)) {
    res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
    res.end(readFileSync(filePath));
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(indexHtml);
  }
});

const run = async () => {
  const { default: puppeteer } = await import("puppeteer");
  await new Promise((r) => server.listen(PORT, r));

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  for (const route of routes) {
    const page = await browser.newPage();
    // Skip heavy assets we don't need for HTML output.
    await page.setRequestInterception(true);
    page.on("request", (r) => {
      const t = r.resourceType();
      if (t === "image" || t === "media" || t === "font") r.abort();
      else r.continue();
    });
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle2", timeout: 30000 });
      await page.waitForSelector("#root > *", { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 300)); // let HeadContent flush
      const html = "<!DOCTYPE html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));
      const outDir = route === "/" ? dist : join(dist, route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html);
      ok++;
      console.log(`prerendered ${route}`);
    } catch (e) {
      console.warn(`prerender skipped ${route}: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(`prerender: ${ok}/${routes.length} routes written`);
};

run().catch((e) => {
  console.warn(`prerender disabled (build continues): ${e.message}`);
  try { server.close(); } catch {}
  process.exit(0);
});
