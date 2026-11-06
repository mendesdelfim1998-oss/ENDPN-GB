import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
  flag: string;
}

const STORAGE_KEY = 'emdpn_gb_language';
const FLAG_STORAGE_KEY = 'emdpn_gb_flag';

// Strictly maps each language to its official country flag
export const LANGUAGE_FLAGS: Record<Language, string> = {
  pt: 'GW', // Guiné-Bissau
  fr: 'FR', // France
  en: 'US', // United States of America
  es: 'ES'  // Spain
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = (
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('locale') ||
        localStorage.getItem('lang') ||
        localStorage.getItem('language')
      ) as Language;
      if (saved && (saved === 'pt' || saved === 'fr' || saved === 'en' || saved === 'es')) {
        return saved;
      }
    } catch {
      // ignore localStorage errors
    }

    try {
      const browserLang = (navigator.language || '').toLowerCase();
      if (browserLang.startsWith('fr')) return 'fr';
      if (browserLang.startsWith('es')) return 'es';
      if (browserLang.startsWith('en')) return 'en';
    } catch {
      // ignore navigator errors
    }

    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const flag = LANGUAGE_FLAGS[lang];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(FLAG_STORAGE_KEY, flag);
      localStorage.setItem('locale', lang);
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.setAttribute('data-language', lang);
      document.documentElement.setAttribute('data-flag', flag);
      window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang, flag } }));
    } catch {
      // ignore localStorage errors
    }
  };

  useEffect(() => {
    const flag = LANGUAGE_FLAGS[language];
    try {
      localStorage.setItem(STORAGE_KEY, language);
      localStorage.setItem(FLAG_STORAGE_KEY, flag);
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-language', language);
      document.documentElement.setAttribute('data-flag', flag);
    } catch {
      // ignore localStorage errors
    }

    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === STORAGE_KEY || e.key === 'locale' || e.key === 'lang') && e.newValue) {
        if (e.newValue === 'pt' || e.newValue === 'fr' || e.newValue === 'en' || e.newValue === 'es') {
          setLanguageState(e.newValue as Language);
        }
      }
    };

    const handleCustomLanguageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ language: Language }>;
      if (customEvent.detail?.language && customEvent.detail.language !== language) {
        setLanguageState(customEvent.detail.language);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languagechange', handleCustomLanguageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languagechange', handleCustomLanguageChange);
    };
  }, [language]);

  const activeTranslations = translations[language] || translations.pt;
  const activeFlag = LANGUAGE_FLAGS[language] || 'GW';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: activeTranslations, flag: activeFlag }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
