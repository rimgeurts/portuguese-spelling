/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/student/quizzes",
        permanent: true,
      },
      {
        source: "/teacher",
        destination: "/teacher/quizzes",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};
module.exports = nextConfig;
