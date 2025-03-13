import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$locci-red: #C02031;`,
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
