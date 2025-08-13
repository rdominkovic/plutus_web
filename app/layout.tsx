import '../styles/globals.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://plutus.hr'),
  title: {
    default: 'Plutus | AI Optimization',
    template: '%s | Plutus',
  },
  description:
    'Plutus razvija AI agente, automatizacije i prilagođena softverska rješenja koja podižu učinkovitost poslovanja.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
    url: 'https://plutus.hr/',
    siteName: 'Plutus',
    title: 'Plutus | AI Optimization',
    description:
      'AI agenti, automatizacija procesa i prilagođeni softver — mjerljivi rezultati za vaše poslovanje.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plutus | AI Optimization',
    description:
      'AI agenti, automatizacija procesa i prilagođeni softver — mjerljivi rezultati za vaše poslovanje.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr" className="dark">
      <body className="bg-main-black text-main-white font-sans">
        {children}
        <Script id="ld-json-organization" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Plutus',
            url: 'https://plutus.hr/',
            sameAs: [],
            description:
              'AI agenti, automatizacija procesa i prilagođena softverska rješenja za optimizaciju poslovanja.',
          })}
        </Script>
      </body>
    </html>
  );
}