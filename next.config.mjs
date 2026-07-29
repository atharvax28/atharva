import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  // Pin the workspace root: there are stray lockfiles further up the drive that
  // Turbopack would otherwise infer as the root.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
