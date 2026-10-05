// Static media in public/ is served by Vercel with max-age=0 by default, so
// every repeat visit revalidates it. A week is long enough to spare the quota
// and short enough that a replaced file under the same name still rolls out.
const MEDIA_CACHE = "public, max-age=604800, stale-while-revalidate=86400";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Fewer widths = fewer transformations counted against the Vercel quota.
    deviceSizes: [640, 828, 1200, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days
  },
  async rewrites() {
    return [{ source: "/status", destination: "/status.html" }];
  },
  async headers() {
    return [
      {
        source: "/status.json",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
      },
      {
        source: "/fondo_redefinimos.:ext(mp4|webm)",
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
