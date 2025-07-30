/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: { 
    unoptimized: true,
    domains: [
      'imagedelivery.net', // Cloudflare Images
      'pub-*.r2.dev', // Cloudflare R2
      '*.r2.cloudflarestorage.com' // Cloudflare R2 custom domain
    ]
  },
  
  // Handle 3D assets properly with Cloudflare CDN
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, HEAD' },
          { key: 'Access-Control-Allow-Headers', value: 'Range' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
  
  // Ensure proper routing
  trailingSlash: false,
  experimental: { 
    appDir: true,
    optimizeCss: true,
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three']
  },
  
  // Vercel optimization
  output: 'standalone',
  poweredByHeader: false,
  
  // Webpack optimization for 3D assets
  webpack: (config, { isServer }) => {
    // Handle GLB/GLTF files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/assets/[name].[hash][ext]'
      }
    })
    
    // Handle HDR files
    config.module.rules.push({
      test: /\.(hdr|exr)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/assets/[name].[hash][ext]'
      }
    })
    
    // Optimize Three.js bundle
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three': require.resolve('three')
      }
    }
    
    return config
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Compression
  compress: true,
  
  // Security headers
  async rewrites() {
    return [
      {
        source: '/cdn/:path*',
        destination: '/api/cdn/:path*',
      },
    ]
  },
}

export default nextConfig
