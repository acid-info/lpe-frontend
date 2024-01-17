/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'image.simplecastcdn.com',
      'img.youtube.com',
    ],
  },
}

module.exports = nextConfig
