/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ['drive.google.com','source.unsplash.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
