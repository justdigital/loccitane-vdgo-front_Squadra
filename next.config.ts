import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
      $locci-red: #C02031;
      $locci-snow: #FFFAFA;
      $locci-coffee: #552E0D; //	Cor terrosa, reminiscente de café.
      $locci-mist: #A09999; // Cinza suave, como névoa.
      $locci-midnight: #001022; // Azul escuro profundo, como céu noturno.
      $locci-ivory: #F7E4D2; //Bege claro, marfim.
      $locci-blush: #D86276; //	Rosa avermelhado, como blush.
    `
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
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'loccitane-vdgo-cms.lndo.site',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'http',
        hostname: 'vdgo-cms-dev.squadra.com.br',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'vdgo-cms-dev.squadra.com.br',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
