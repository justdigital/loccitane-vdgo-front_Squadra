import type { Metadata } from "next";
import { Raleway } from 'next/font/google';
import localFont from 'next/font/local';
import { GoogleTagManager } from '@next/third-parties/google'
import "./globals.css";
import { AppProvider } from "@/contexts/app.context";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '../../src/styles/drupal/drupalGlobals.css';

const ralewayfont = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const loccitaneSans = Raleway({
  variable: "--font-loccitane-sans",
  subsets: ["latin"],
});

const ernestEmily = localFont({
  src: '../../public/assets/fonts/Ernest_Emily_Solid.woff2',
  variable: '--font-ernest-emily',
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/node/17`);
    const data = await response.json();
    
    return {
      title: data.site_name || "L'Occitane Brasil",
      description: "L'Occitane Brasil",
      icons: {
        icon: data.favicon || '/default-favicon.ico',
      },
    };
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return {
      title: "L'Occitane Brasil",
      description: "L'Occitane Brasil",
      icons: {
        icon: '/default-favicon.ico',
      },
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const sourcesAllowed = process.env.NEXT_ALLOWED_DOMAINS_SOURCE?.split(',').map((domain) => {
    return `${domain.trim()} *.${domain.trim()}`;
  }
  ).join(' ');
  return (
    <html lang="pt_BR">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}modules/custom/custom_ckeditor_styles/css/editor-styles.css`} />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
            script-src 'self' 'unsafe-eval' *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app; 
            worker-src 'self' blob:; 
            child-src 'self' blob:;
            style-src 'self' 'unsafe-inline' ${sourcesAllowed} *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app;
            font-src 'self' data: https://fonts.gstatic.com *.acesso.io *.unico.run *.unico.io *.unico.app;
            img-src 'self' data: blob: ${sourcesAllowed} *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app bsnonprodvdgobrsa.blob.core.windows.net bsprodvdgobrsa.blob.core.windows.net;
            media-src 'self' data: ${sourcesAllowed} *.acesso.io *.unico.run *.unico.io *.unico.app vdgo-cms-dev.squadra.com.br;
            object-src 'self' blob: data:;
            script-src-elem 'self' 'unsafe-inline' blob: ${sourcesAllowed} *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app
          `}
        />
      </head>
      <body
        className={`${ralewayfont.className} ${ralewayfont.variable} ${loccitaneSans.variable} ${ernestEmily.variable} antialiased`}
      >
        <AppRouterCacheProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AppRouterCacheProvider>
        {/* Google Tag Manager */}
        {process.env.NEXT_GTM_CODE && (
          <GoogleTagManager gtmId={process.env.NEXT_GTM_CODE} />
        )}
      </body>
    </html>
  );
}
