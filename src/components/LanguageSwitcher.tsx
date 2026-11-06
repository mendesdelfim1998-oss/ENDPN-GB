import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language, LANGUAGES } from '../i18n/translations';

// Crisp, professional vector flag badges
export const FlagIcon: React.FC<{ code: Language; className?: string }> = ({ code, className = "w-5 h-3.5" }) => {
  switch (code) {
    case 'pt':
      // Guinea-Bissau National Flag
      return (
        <svg viewBox="0 0 600 300" className={`${className} inline-block rounded-xs shadow-xs border border-black/10 shrink-0`} aria-label="Português (Guiné-Bissau)">
          <rect width="200" height="300" fill="#ce1126" />
          <rect x="200" width="400" height="150" fill="#fcd116" />
          <rect x="200" y="150" width="400" height="150" fill="#007a3d" />
          {/* Black Star */}
          <polygon points="100,85 119,144 70,107 130,107 81,144" fill="#000000" />
        </svg>
      );
    case 'fr':
      // French Republic Flag
      return (
        <svg viewBox="0 0 900 600" className={`${className} inline-block rounded-xs shadow-xs border border-black/10 shrink-0`} aria-label="Français">
          <rect width="300" height="600" fill="#002395" />
          <rect x="300" width="300" height="600" fill="#ffffff" />
          <rect x="600" width="300" height="600" fill="#ed2939" />
        </svg>
      );
    case 'en':
      // United States Flag (Stars and Stripes) for English (US)
      return (
        <svg viewBox="0 0 190 100" className={`${className} inline-block rounded-xs shadow-xs border border-black/10 shrink-0`} aria-label="English (USA)">
          <defs>
            <polygon
              id="us-star"
              points="0,-2.2 0.65,-0.7 2.1,-0.7 0.9,0.2 1.3,1.6 0,0.8 -1.3,1.6 -0.9,0.2 -2.1,-0.7 -0.65,-0.7"
              fill="#FFFFFF"
            />
          </defs>
          {/* 13 Alternating Red and White Stripes */}
          <rect width="190" height="100" fill="#B22234" />
          <rect y="7.69" width="190" height="7.69" fill="#FFFFFF" />
          <rect y="23.08" width="190" height="7.69" fill="#FFFFFF" />
          <rect y="38.46" width="190" height="7.69" fill="#FFFFFF" />
          <rect y="53.85" width="190" height="7.69" fill="#FFFFFF" />
          <rect y="69.23" width="190" height="7.69" fill="#FFFFFF" />
          <rect y="84.62" width="190" height="7.69" fill="#FFFFFF" />
          {/* Blue Canton (Union) */}
          <rect width="76" height="53.85" fill="#3C3B6E" />
          {/* Star pattern in Canton */}
          {/* Row 1 */}
          <use href="#us-star" x="6.3" y="5.4" />
          <use href="#us-star" x="19" y="5.4" />
          <use href="#us-star" x="31.6" y="5.4" />
          <use href="#us-star" x="44.3" y="5.4" />
          <use href="#us-star" x="57" y="5.4" />
          <use href="#us-star" x="69.6" y="5.4" />
          {/* Row 2 */}
          <use href="#us-star" x="12.6" y="10.8" />
          <use href="#us-star" x="25.3" y="10.8" />
          <use href="#us-star" x="38" y="10.8" />
          <use href="#us-star" x="50.6" y="10.8" />
          <use href="#us-star" x="63.3" y="10.8" />
          {/* Row 3 */}
          <use href="#us-star" x="6.3" y="16.2" />
          <use href="#us-star" x="19" y="16.2" />
          <use href="#us-star" x="31.6" y="16.2" />
          <use href="#us-star" x="44.3" y="16.2" />
          <use href="#us-star" x="57" y="16.2" />
          <use href="#us-star" x="69.6" y="16.2" />
          {/* Row 4 */}
          <use href="#us-star" x="12.6" y="21.5" />
          <use href="#us-star" x="25.3" y="21.5" />
          <use href="#us-star" x="38" y="21.5" />
          <use href="#us-star" x="50.6" y="21.5" />
          <use href="#us-star" x="63.3" y="21.5" />
          {/* Row 5 */}
          <use href="#us-star" x="6.3" y="26.9" />
          <use href="#us-star" x="19" y="26.9" />
          <use href="#us-star" x="31.6" y="26.9" />
          <use href="#us-star" x="44.3" y="26.9" />
          <use href="#us-star" x="57" y="26.9" />
          <use href="#us-star" x="69.6" y="26.9" />
          {/* Row 6 */}
          <use href="#us-star" x="12.6" y="32.3" />
          <use href="#us-star" x="25.3" y="32.3" />
          <use href="#us-star" x="38" y="32.3" />
          <use href="#us-star" x="50.6" y="32.3" />
          <use href="#us-star" x="63.3" y="32.3" />
          {/* Row 7 */}
          <use href="#us-star" x="6.3" y="37.7" />
          <use href="#us-star" x="19" y="37.7" />
          <use href="#us-star" x="31.6" y="37.7" />
          <use href="#us-star" x="44.3" y="37.7" />
          <use href="#us-star" x="57" y="37.7" />
          <use href="#us-star" x="69.6" y="37.7" />
          {/* Row 8 */}
          <use href="#us-star" x="12.6" y="43.1" />
          <use href="#us-star" x="25.3" y="43.1" />
          <use href="#us-star" x="38" y="43.1" />
          <use href="#us-star" x="50.6" y="43.1" />
          <use href="#us-star" x="63.3" y="43.1" />
          {/* Row 9 */}
          <use href="#us-star" x="6.3" y="48.5" />
          <use href="#us-star" x="19" y="48.5" />
          <use href="#us-star" x="31.6" y="48.5" />
          <use href="#us-star" x="44.3" y="48.5" />
          <use href="#us-star" x="57" y="48.5" />
          <use href="#us-star" x="69.6" y="48.5" />
        </svg>
      );
    case 'es':
      // Spanish Flag
      return (
        <svg viewBox="0 0 750 500" className={`${className} inline-block rounded-xs shadow-xs border border-black/10 shrink-0`} aria-label="Español">
          <rect width="750" height="125" fill="#AA151B" />
          <rect y="125" width="750" height="250" fill="#F1BF00" />
          <rect y="375" width="750" height="125" fill="#AA151B" />
          {/* Subtle crest indication for official gravitas */}
          <circle cx="200" cy="250" r="45" fill="#AA151B" opacity="0.85" />
          <circle cx="200" cy="250" r="35" fill="#F1BF00" />
          <rect x="185" y="235" width="30" height="30" fill="#AA151B" opacity="0.9" />
        </svg>
      );
  }
};

interface LanguageSwitcherProps {
  variant?: 'header' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'header', className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (variant === 'mobile') {
    return (
      <div className={`pt-2 ${className}`}>
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 px-1">
          Idioma / Language / Langue
        </div>
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                type="button"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left border ${
                  isSelected
                    ? 'bg-primary-50 border-primary-300 text-primary-950 font-semibold shadow-xs'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300'
                }`}
              >
                <FlagIcon code={item.code} className="w-5 h-3.5 shrink-0" />
                <span className="truncate">{item.nativeName}</span>
                {isSelected && <Check size={14} className="ml-auto text-primary-700 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white/90 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-all hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-xs"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Selecionar idioma"
      >
        <FlagIcon code={activeOption.code} className="w-5 h-3.5 shadow-2xs" />
        <span className="uppercase tracking-wider font-bold text-[11px] text-neutral-700">
          {activeOption.code}
        </span>
        <ChevronDown size={13} className={`text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-[150] animate-in fade-in zoom-in-95 duration-150"
          role="listbox"
        >
          <div className="px-3 py-1.5 border-b border-neutral-100 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
            Selecionar Idioma
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-primary-50/70 text-primary-950 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <FlagIcon code={item.code} className="w-5 h-3.5 shrink-0" />
                <div className="flex flex-col flex-1 leading-tight">
                  <span className="text-xs font-medium text-neutral-900">{item.nativeName}</span>
                  <span className="text-[10px] text-neutral-400 font-normal">{item.countryName}</span>
                </div>
                {isSelected && (
                  <Check size={14} className="text-primary-700 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
