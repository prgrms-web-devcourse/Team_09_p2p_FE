/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_URL]
  }
};

module.exports = nextConfig;
