/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  eslint: { ignoreDuringBuilds: true },
  staticPageGenerationTimeout: 300,
};

export default nextConfig;