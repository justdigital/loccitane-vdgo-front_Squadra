import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$locci-red: #C02031;`,
  },
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
  },
  eslint: {
    // Ignora erros de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de checagem de tipos durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
