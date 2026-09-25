#!/usr/bin/env node
// Smoke test for a built Meridiana site (MER-016B).
//
//   node scripts/smoke.mjs                 → tests SMOKE_BASE_URL (default http://localhost:3100)
//   node scripts/smoke.mjs --serve         → starts `next start` on SMOKE_PORT, tests it, stops it
//   node scripts/smoke.mjs https://…       → tests a deployed URL
//
// Fails (exit 1) when a sitemap route is not 200 or renders an empty page, when an
// image/video/icon or internal link on a page does not load, or when an unknown route does
// not return a real 404 page. No dependencies beyond Node 18+.

import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const shouldServe = args.includes("--serve");
const PORT = Number(process.env.SMOKE_PORT ?? 3100);
const BASE_URL = (
  args.find((a) => /^https?:\/\//.test(a)) ??
  process.env.SMOKE_BASE_URL ??
  `http://localhost:${PORT}`
).replace(/\/$/, "");

const MIN_VISIBLE_CHARS = 200;
const NOT_FOUND_PATHS = ["/es/ruta-que-no-existe", "/en/route-that-does-not-exist"];
const SERVER_TIMEOUT_MS = 60_000;
const CONCURRENCY = 8;

const failures = [];
const fail = (message) => failures.push(message);

async function fetchStatus(url, init) {
  try {
    const res = await fetch(url, { redirect: "follow", ...init });
    return { res, status: res.status };
  } catch (error) {
    return { res: null, status: 0, error: error instanceof Error ? error.message : String(error) };
  }
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeAttr(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
}

function extractAssets(html) {
  const found = new Set();
  const patterns = [
    /<img\b[^>]*?\ssrc="([^"]+)"/gi,
    /<(?:source|video)\b[^>]*?\ssrc="([^"]+)"/gi,
    /<video\b[^>]*?\sposter="([^"]+)"/gi,
    /<link\b[^>]*?rel="(?:icon|apple-touch-icon|preload)"[^>]*?href="([^"]+)"/gi,
  ];
  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const src = decodeAttr(match[1]);
      if (src.startsWith("data:")) continue;
      found.add(src);
    }
  }
  return [...found];
}

function extractInternalLinks(html) {
  const found = new Set();
  for (const match of html.matchAll(/<a\b[^>]*?\shref="(\/[^"#]*)/gi)) {
    const href = decodeAttr(match[1]);
    if (href.startsWith("//")) continue;
    found.add(href);
  }
  return [...found];
}

async function getSitemapPaths() {
  const { res, status, error } = await fetchStatus(`${BASE_URL}/sitemap.xml`);
  if (!res || status !== 200) {
    throw new Error(`sitemap.xml → ${status || error}`);
  }
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (paths.length === 0) throw new Error("sitemap.xml has no <loc> entries");
  return [...new Set(paths)];
}

async function checkPage(path, assets, links) {
  const { res, status, error } = await fetchStatus(`${BASE_URL}${path}`);
  if (!res || status !== 200) {
    fail(`PAGE ${path} → ${status || error}`);
    return;
  }
  const html = await res.text();
  const text = visibleText(html);
  if (text.length < MIN_VISIBLE_CHARS) {
    fail(`PAGE ${path} → only ${text.length} visible characters (blank page?)`);
  }
  if (!/<h1[\s>]/i.test(html)) fail(`PAGE ${path} → no <h1>`);
  for (const src of extractAssets(html)) {
    if (!assets.has(src)) assets.set(src, path);
  }
  for (const href of extractInternalLinks(html)) {
    if (!links.has(href)) links.set(href, path);
  }
}

async function checkNotFound(path) {
  const { res, status, error } = await fetchStatus(`${BASE_URL}${path}`);
  if (!res || status !== 404) {
    fail(`404 ${path} → expected 404, got ${status || error}`);
    return;
  }
  const text = visibleText(await res.text());
  if (text.length < MIN_VISIBLE_CHARS / 2) {
    fail(`404 ${path} → blank not-found page (${text.length} visible characters)`);
  }
}

async function checkAsset(src, foundOn) {
  const url = new URL(src, `${BASE_URL}/`).toString();
  let { status, error } = await fetchStatus(url, { method: "HEAD" });
  // Some handlers (e.g. /_next/image) do not implement HEAD.
  if (status === 405 || status === 501) ({ status, error } = await fetchStatus(url));
  if (status !== 200) fail(`ASSET ${src} (on ${foundOn}) → ${status || error}`);
}

async function checkLink(href, foundOn) {
  const { status, error } = await fetchStatus(new URL(href, `${BASE_URL}/`).toString());
  if (status !== 200) fail(`LINK ${href} (on ${foundOn}) → ${status || error}`);
}

async function runPool(items, worker) {
  const queue = [...items];
  const runners = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) await worker(queue.shift());
  });
  await Promise.all(runners);
}

async function waitForServer() {
  const deadline = Date.now() + SERVER_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const { status } = await fetchStatus(`${BASE_URL}/sitemap.xml`);
    if (status === 200) return;
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`server at ${BASE_URL} did not answer within ${SERVER_TIMEOUT_MS / 1000}s`);
}

function startServer() {
  // A single command string keeps `shell` portable (npx is npx.cmd on Windows).
  const server = spawn(`npx next start -p ${PORT}`, { stdio: "ignore", shell: true });
  const stop = () => {
    if (server.exitCode !== null) return;
    if (process.platform === "win32") {
      spawn("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      server.kill("SIGTERM");
    }
  };
  return stop;
}

async function main() {
  const stopServer = shouldServe ? startServer() : null;
  try {
    await waitForServer();
    const paths = await getSitemapPaths();
    const assets = new Map();
    const links = new Map();

    await runPool(paths, (p) => checkPage(p, assets, links));
    await runPool(NOT_FOUND_PATHS, checkNotFound);
    await runPool([...assets.entries()], ([src, foundOn]) => checkAsset(src, foundOn));
    const unlistedLinks = [...links.entries()].filter(([href]) => !paths.includes(href));
    await runPool(unlistedLinks, ([href, foundOn]) => checkLink(href, foundOn));

    console.log(
      `smoke: ${paths.length} pages, ${NOT_FOUND_PATHS.length} not-found routes, ${assets.size} assets, ` +
        `${unlistedLinks.length} extra internal links checked on ${BASE_URL}`
    );
  } catch (error) {
    fail(`SETUP ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    stopServer?.();
  }

  if (failures.length > 0) {
    console.error(`smoke: ${failures.length} failure(s)`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
  console.log("smoke: OK");
}

main();
