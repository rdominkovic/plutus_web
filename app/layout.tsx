import '../styles/globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Plutus | AI Optimization',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-main-black text-main-white font-sans">
        {children}
      </body>
    </html>
  );
} 