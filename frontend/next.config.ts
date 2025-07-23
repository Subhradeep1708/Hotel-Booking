import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'sincere-nurture-b2ce18c6cc.media.strapiapp.com',
        protocol: 'https',
      }
    ]
  }
};

export default nextConfig;
