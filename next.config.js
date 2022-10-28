/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quiz',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}
console.log(process.env)
module.exports = nextConfig
