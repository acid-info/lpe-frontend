/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.cdn.unbody.io',
      'image.simplecastcdn.com',
      'img.youtube.com',
    ],
    // loader: 'imgix',
    // path: 'https://images.cdn.unbody.io',
  },
}

module.exports = nextConfig
