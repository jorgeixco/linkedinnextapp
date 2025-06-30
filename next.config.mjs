/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/a1aa/image/**',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  output: 'standalone',
};

export default nextConfig;