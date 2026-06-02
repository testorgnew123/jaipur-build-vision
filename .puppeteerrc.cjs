const { join } = require("node:path");

// Cache Chromium inside node_modules so Netlify (which caches node_modules
// between builds) persists it — the postbuild prerender step launches it.
// The prerender script is fail-soft: if Chromium is unavailable the build
// still succeeds and pages fall back to client-side rendering.
module.exports = {
  cacheDirectory: join(__dirname, "node_modules", ".cache", "puppeteer"),
};
