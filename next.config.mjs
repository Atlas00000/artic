/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Handle 3D assets properly
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ]
  },
  // Ensure proper routing
  trailingSlash: false,
  experimental: {
    appDir: true,
  },
  // Optimize for different platforms
  output: process.env.VERCEL ? 'standalone' : 'export',
  poweredByHeader: false,
  // Asset optimization
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable telemetry
  telemetry: false,
}

export default nextConfig
