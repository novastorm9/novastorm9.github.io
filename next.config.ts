import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files, so emit a fully static site into `out/`.
  output: "export",
  // Each route becomes `<route>/index.html`, which Pages resolves directly.
  trailingSlash: true,
  // No image optimization server exists on Pages.
  images: { unoptimized: true },
};

export default nextConfig;
