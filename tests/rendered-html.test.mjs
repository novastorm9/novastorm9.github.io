import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const productRoutes = [
  ["/products/utilities-coops", "Distribution Utilities &amp; Rural Cooperatives"],
  ["/products/embedded-engines", "Embedded Grid Engines"],
  ["/products/transmission-isos", "Transmission Operators &amp; ISOs/RTOs"],
  ["/products/energy-markets", "Energy Market Participants"],
  ["/products/flexible-loads", "Large Flexible Loads"],
];

const siteRoutes = [
  ["/platform", "A grid AI engine designed for operations"],
  ["/technology", "Zero-shot transfer with an operator-facing trust layer"],
  ["/validation", "Benchmarks focused on transfer"],
  ["/customers", "Built for grid teams"],
  ["/company", "Commercializing certifiable grid foundation models"],
  ["/contact", "Bring a real grid workflow"],
];

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Grid Agent landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Grid Agent \| Certifiable AI for Power Grid Control<\/title>/i,
  );
  assert.match(html, /Grid foundation model/);
  assert.match(html, /Certifiable AI for grid decisions/);
  assert.match(html, /Less dashboard\. More verified action\./);
  assert.match(html, /Utilities &amp; Co-ops/);
  assert.match(html, /Embedded Engines/);
  assert.match(html, /Transmission &amp; ISOs\/RTOs/);
  assert.match(html, /Energy Markets/);
  assert.match(html, /Flexible Loads/);
  assert.match(html, /\/products\/utilities-coops/);
  assert.match(html, /\/products\/embedded-engines/);
  assert.match(html, /\/products\/transmission-isos/);
  assert.match(html, /\/products\/energy-markets/);
  assert.match(html, /\/products\/flexible-loads/);
  assert.match(html, /\/platform/);
  assert.match(html, /\/technology/);
  assert.match(html, /\/validation/);
  assert.match(html, /\/customers/);
  assert.match(html, /\/company/);
  assert.match(html, /\/contact/);
  assert.match(html, /\/grid-foundation-model\.png/);
  assert.match(html, /\/grid-agent-cockpit\.png/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("server-renders supporting site pages", async () => {
  for (const [route, title] of siteRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.match(html, /Grid Agent/);
  }
});

test("server-renders each product page as a standalone page", async () => {
  for (const [route, productName] of productRoutes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.match(html, new RegExp(productName));
    assert.match(html, /Applications/);
    assert.match(html, /Why it matters/);
    assert.match(html, /All products/);
    assert.match(html, /\/products\/utilities-coops/);
    assert.match(html, /\/products\/embedded-engines/);
    assert.match(html, /\/products\/transmission-isos/);
    assert.match(html, /\/products\/energy-markets/);
    assert.match(html, /\/products\/flexible-loads/);
  }
});

test("removes the disposable starter preview surface", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
