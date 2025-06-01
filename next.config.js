/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ynrdtvlapgrwavoscsem.supabase.co",
        pathname: "**",
      },
    ],
  },
  // output: "standalone",
};

module.exports = nextConfig;
