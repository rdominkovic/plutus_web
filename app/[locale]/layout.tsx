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
      'link[rel="preload"][href="/video/portfolio/Digital_data_miner.mp4"][as="video"][type="video/mp4"]': '',
      'link[rel="preload"][href="/images/portfolio/optiflow.webp"][as="image"][type="image/webp"]': '',
      'link[rel="preload"][href="/images/portfolio/ai_chatbot.png"][as="image"][type="image/png"]': '',
      'link[rel="preload"][href="/images/portfolio/SmartWorkMonitor.png"][as="image"][type="image/png"]': '',
      'link[rel="preload"][href="/fonts/PPTelegraf-Ultrabold.otf"][as="font"][type="font/otf"][crossOrigin="anonymous"]': '',
      'link[rel="preload"][href="/fonts/PPFraktionMono-Regular.otf"][as="font"][type="font/otf"][crossOrigin="anonymous"]': '',
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