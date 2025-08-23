import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config goes here
};
 
const configWithIntl = withNextIntl(nextConfig);
 
export default {
  ...configWithIntl,
  allowedDevOrigins: ["192.168.1.17"],
};