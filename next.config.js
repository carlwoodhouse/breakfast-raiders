const isProd = process.env.NODE_ENV === "production";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? "/banshee-gg/" : "",

  images: {
    loader: 'imgix',
    path: 'https://noop',
  },
}

module.exports = nextConfig