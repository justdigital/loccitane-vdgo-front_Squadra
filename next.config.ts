import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$locci-red: #C02031;`,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  }
};

export default nextConfig;
