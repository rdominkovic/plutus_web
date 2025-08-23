import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['hr', 'en'],
  defaultLocale: 'hr'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(hr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};