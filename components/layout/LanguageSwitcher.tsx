'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../navigation';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: 'hr' | 'en') => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="flex items-center space-x-2 font-mono text-sm uppercase tracking-wide">
      <button
        onClick={() => handleLanguageChange('hr')}
        className={`transition-colors duration-200 ${
          locale === 'hr'
            ? 'text-main-white cursor-default'
            : 'text-gray-400 hover:text-main-white cursor-pointer'
        }`}
        disabled={locale === 'hr'}
      >
        HR
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`transition-colors duration-200 ${
          locale === 'en'
            ? 'text-main-white cursor-default'
            : 'text-gray-400 hover:text-main-white cursor-pointer'
        }`}
        disabled={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
