/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/roster",
        headers: [
          {
            key: "Cache-Control",
            value: "nocache",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig