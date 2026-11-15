/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pre-render every page to static HTML at build time: fastest possible first load,
  // and the output folder (out/) can be hosted on any static host.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export has no image optimisation server, so next/image serves files as-is.
  images: { unoptimized: true },
};

export default nextConfig;
