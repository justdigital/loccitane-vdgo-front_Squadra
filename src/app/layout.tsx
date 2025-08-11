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

const ernestEmilyCaps = localFont({
  src: '../../public/assets/fonts/ErnestandEmilyCaps.woff2',
  variable: '--font-ErnestandEmilyCaps',
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/api/node/17`);
    const data = await response.json();
    
    return {
      title: data.site_name || "L'Occitane au Brésil",
      description: "L'Occitane au Brésil",
      icons: {
        icon: data.favicon || '/default-favicon.ico',
      },
    };
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return {
      title: "L'Occitane au Brésil",
      description: "L'Occitane au Brésil",
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
            script-src 'self' 'unsafe-eval' *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app *.metaffiliation.com *.doubleclick.net;
            worker-src 'self' blob:;
            child-src 'self' blob:;
            frame-src 'self' blob: about: https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com https://gsdbr-reve.loccitaneaubresil.com https://www.facebook.com;
            style-src 'self' 'unsafe-inline' ${sourcesAllowed} *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app;
            font-src 'self' data: https://fonts.gstatic.com *.acesso.io *.unico.run *.unico.io *.unico.app;
            img-src 'self' data: blob: ${sourcesAllowed} https://kvn.br.loccitane.com *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app bsnonprodvdgobrsa.blob.core.windows.net bsprodvdgobrsa.blob.core.windows.net stbrazilsouthloccitane.blob.core.windows.net *.pdf *.google-analytics.com https://analytics.google.com *.doubleclick.net *.google.com *.google.com.br;
            media-src 'self' data: ${sourcesAllowed} *.acesso.io *.unico.run *.unico.io *.unico.app vdgo-cms-dev.squadra.com.br *.pdf;
            object-src 'self' blob: data: *.pdf;
            script-src-elem 'self' 'unsafe-inline' blob: ${sourcesAllowed} *.googletagmanager.com *.googleapis.com *.acesso.io *.unico.run *.unico.io *.unico.app *.metaffiliation.com *.doubleclick.net;
        `}
        />
      </head>
      <body
        className={`${ralewayfont.className} ${ralewayfont.variable} ${loccitaneSans.variable} ${ernestEmily.variable} ${ernestEmilyCaps.variable} antialiased`}
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
