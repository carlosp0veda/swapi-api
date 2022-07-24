/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['vignette.wikia.nocookie.net', 'static-mh.content.disney.io', 'download.logo.wine', 'upload.wikimedia.org', 'www.salonlfc.com', 'lumiere-a.akamaihd.net'],
  },
}

module.exports = nextConfig
