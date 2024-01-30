/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            '127.0.0.1',
            'image.simplecastcdn.com',
            'img.youtube.com',
            'cms-press.logos.co'
        ],
    },
}

module.exports = nextConfig
