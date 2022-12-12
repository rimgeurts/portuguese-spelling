/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/classroom",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = nextConfig;
