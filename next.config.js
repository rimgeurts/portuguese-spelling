/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/myquizzes",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = nextConfig;
