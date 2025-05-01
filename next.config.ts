/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourdomain.com'],
    // This allows using Image Optimization for images hosted on yourdomain.com
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/specialties/:specialty',
        destination: '/specialties/:specialty',
      },
    ];
  },
  // Configure sitemaps for better SEO
  async generateSitemap() {
    // Add custom logic here
    return {
      siteUrl: process.env.SITE_URL || 'https://yourdomain.com',
      changefreq: 'daily',
      priority: 0.7,
      sitemapSize: 5000,
      generateRobotsTxt: true,
      exclude: ['/admin', '/private'],
    };
  },
};

module.exports = nextConfig;