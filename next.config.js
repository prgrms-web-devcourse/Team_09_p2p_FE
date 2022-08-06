/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['devcourse-f-s3-storage.s3.ap-northeast-2.amazonaws.com']
  }
};

module.exports = nextConfig;
