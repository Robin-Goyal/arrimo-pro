/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: false,
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    mongoURI: process.env.MONGODB_URI,
  }
}

module.exports = nextConfig
