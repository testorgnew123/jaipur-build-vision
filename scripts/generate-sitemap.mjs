// Generates public/sitemap.xml at build time (runs via npm "prebuild").
// Static routes are listed explicitly; dynamic project/blog slugs are read
// from the source data files. NOTE: blog posts are also served from the DB
// (/api/posts) — keep src/data/posts.ts in sync, or extend this script to
// fetch slugs from the live API for full coverage.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE = "https://singlestop.co.in";

// Public, indexable static routes (admin is intentionally excluded).
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/services", priority: "0.9", changefreq: "monthly" },
  { path: "/pricing", priority: "0.9", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "weekly" },
  { path: "/blog", priority: "0.7", changefreq: "weekly" },
  { path: "/live-tracking", priority: "0.6", changefreq: "monthly" },
  { path: "/careers", priority: "0.6", changefreq: "weekly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
];

const slugsFrom = (file) => {
  const src = readFileSync(resolve(root, file), "utf8");
  return [...src.matchAll(/slug:\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
};

const projectSlugs = slugsFrom("src/data/projects.ts");
const blogSlugs = slugsFrom("src/data/posts.ts");

const today = new Date().toISOString().slice(0, 10);

const url = (loc, { priority = "0.6", changefreq = "monthly" } = {}) =>
  `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

const entries = [
  ...staticRoutes.map((r) => url(r.path, r)),
  ...projectSlugs.map((s) => url(`/projects/${s}`, { priority: "0.6", changefreq: "monthly" })),
  ...blogSlugs.map((s) => url(`/blog/${s}`, { priority: "0.6", changefreq: "monthly" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${entries.length} urls (${projectSlugs.length} projects, ${blogSlugs.length} posts)`);
