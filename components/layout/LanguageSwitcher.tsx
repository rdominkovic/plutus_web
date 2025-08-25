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
    <>
      {/* Desktop verzija - prikazuje oba jezika horizontalno */}
      <div className="hidden md:flex items-center space-x-2 font-mono text-sm uppercase tracking-wide">
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

              {/* Mobilna verzija - prikazuje oba jezika vertikalno */}
        <div className="md:hidden flex flex-col items-center space-y-1 font-mono text-sm uppercase tracking-wide">
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
        <span className="text-gray-400 w-8 h-px bg-gray-400"></span>
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
    </>
  );
};

export default LanguageSwitcher;
