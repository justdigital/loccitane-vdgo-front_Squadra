import type { NextConfig } from "next";

// const allowedSources = process.env.NEXT_ALLOWED_DOMAINS_SOURCE || '';
const allowedSources = "loccitane-vdgo-cms.lndo.site,vdgo-cms-dev.squadra.com.br,revehml.squadra.com.br,revehml.loccitaneaubresil.com,reve.loccitaneaubresil.com";

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
      $locci-brightpink: #FF8AAF;
      $locci-black: #000000;
    `
  },
  env: {
    NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    NEXT_CREDILINK_UNICO_HOSTNAME: process.env.NEXT_CREDILINK_UNICO_HOSTNAME,
    NEXT_CREDILINK_UNICO_HOSTKEY: process.env.NEXT_CREDILINK_UNICO_HOSTKEY,
    NEXT_LINK_PORTAL_TSHIELD: process.env.NEXT_LINK_PORTAL_TSHIELD,
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
    remotePatterns: allowedSources.split(',').reduce((acc, domain) => {
      const obj = {
        hostname: domain.trim(),
        pathname: '/**'
      };
      (acc as any[]).push(
        {...obj, protocol: 'http'},
        {...obj, protocol: 'https'}
      );

      return acc;
    }, []),
  },
};

export default nextConfig;
