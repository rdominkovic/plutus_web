import localFont from 'next/font/local';

export const telegraf = localFont({
  src: [
    {
      path: '../public/fonts/PPTelegraf-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPTelegraf-Ultrabold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-telegraf',
  display: 'swap',
});

export const fraktion = localFont({
  src: [
    {
      path: '../public/fonts/PPFraktionMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/PPFraktionMono-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-fraktion',
  display: 'swap',
});
