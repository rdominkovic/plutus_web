// path: app/[locale]/layout.tsx
import '../../styles/globals.css';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages({ locale });
  const metadataMessages = (messages as any)?.Metadata as Record<string, string> | undefined;
  const t = (key: string) => metadataMessages?.[key] ?? key;

  return {
    title: t('title'),
    description: t('description'),
    icons: '/favicon/favicon.ico',
    other: {
      // Uklanjamo preload direktive. Next/image s 'priority' propom
      // i ispravna strategija učitavanja fontova su bolji pristup.
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className="bg-main-black text-main-white font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}