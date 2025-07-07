import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_ADDRESS: process.env.API_URL,
  },
};

export default nextConfig;
