/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // The site lives under /en and /th. English is the default.
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
