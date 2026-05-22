import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/big-feels-botanical.firebasestorage.app/**',
      },
    ],
  },
}

export default nextConfig
