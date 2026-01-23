import nextPWA from "@ducanh2912/next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: false,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: {},
  turbopack: {},
});

export default nextConfig;
