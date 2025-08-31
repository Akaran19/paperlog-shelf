/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable app directory
    appDir: true,
  },
  // Optimize images
  images: {
    domains: ['images.unsplash.com'],
  },
  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure redirects for SEO
  async redirects() {
    return [
      // Redirect old paths if needed
    ];
  },
};

module.exports = nextConfig;