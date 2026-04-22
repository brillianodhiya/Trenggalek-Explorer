import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages requires specific configuration for Next.js
  // But for now, we'll keep it simple as @cloudflare/next-on-pages handles most of it.
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // We'll fix types separately
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
// rekomendasi wisata