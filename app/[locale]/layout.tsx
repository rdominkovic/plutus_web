// path: app/[locale]/layout.tsx
import { ReactNode } from "react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import Header from "@/components/layout/Header";
import { telegraf, fraktion } from "@/app/fonts"; // Import fonts
import "@/styles/globals.css";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "hr" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await import(`../../messages/${locale}.json`);
  const t = (key: string) => messages.Metadata[key] || key;

  return {
    metadataBase: new URL("https://www.plutus.hr"),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    authors: [{ name: "Robert Dominković" }],
    creator: "Robert Dominković",
    publisher: "Plutus",
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "[https://www.plutus.hr](https://www.plutus.hr)",
      siteName: "Plutus",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      creator: "@rdominkovic",
      images: ["/og-image.jpg"],
    },
  };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body
        className={`${telegraf.variable} ${fraktion.variable} font-sans bg-black text-white antialiased`} // Add font variables here
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}