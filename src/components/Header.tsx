import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, Calendar, ShieldCheck, Search } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { authService } from '../services/authService';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { QuickSearchModal } from './QuickSearchModal';
import { getCustomImages, DEFAULT_IMAGES, syncImagesFromSupabase } from '../services/imageService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [customImages, setCustomImages] = useState(getCustomImages());
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const { t } = useLanguage();

  useEffect(() => {
    syncImagesFromSupabase().then(imgs => setCustomImages(imgs));
    const handleUpdate = () => setCustomImages(getCustomImages());
    window.addEventListener('emdpn_images_updated', handleUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Multilingual navigation links
  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.about, path: '/sobre' },
    { name: t.nav.services, path: '/servicos' },
    { name: t.nav.requirements, path: '/requisitos' },
    { name: t.nav.process, path: '/processo' },
    { name: t.nav.forms, path: '/downloads' },
    { name: t.nav.faq, path: '/faq' },
    { name: t.nav.news, path: '/noticias' },
    { name: t.nav.contact, path: '/contactos' },
  ];

  return (
    <>
      <header className={cn(
        "sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300",
        isScrolled && "shadow-md border-primary-100"
      )}>
        <div className="max-w-[1240px] mx-auto px-5 sm:px-7 flex items-center justify-between py-2.5 transition-all duration-300">
          
          {/* Brand matching reference image: República da [Emblema] Guiné-Bissau */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 py-1">
            <span className="font-serif italic font-bold text-xs sm:text-base text-primary-950 tracking-tight whitespace-nowrap">
              {t.hero.republicPrefix}
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-transparent group-hover:scale-105 transition-transform duration-300 drop-shadow-sm shrink-0">
              <img 
                src={DEFAULT_IMAGES.logo} 
                alt="Emblema Nacional da República da Guiné-Bissau" 
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>
            <span className="font-serif italic font-bold text-xs sm:text-base text-primary-950 tracking-tight whitespace-nowrap">
              {t.hero.republicSuffix}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 ml-auto mr-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[0.86rem] font-semibold transition-all duration-200 relative whitespace-nowrap",
                    isActive 
                      ? "text-primary-950 bg-primary-100/80 shadow-sm" 
                      : (link as any).highlight
                        ? "text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 font-bold"
                        : "text-neutral-700 hover:text-primary-800 hover:bg-neutral-100/80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 ml-2 text-neutral-600 hover:text-primary-800 hover:bg-neutral-100/80 rounded-lg transition-all"
              aria-label="Procurar Agendamento"
              title="Pesquisar Agendamento"
            >
              <Search size={18} />
            </button>
          </nav>

          {/* Action Buttons: Language Switcher, Agendar & Entrar */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher />

            <Link
              to="/agendamento"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-accent-500 text-neutral-950 rounded-lg font-bold text-xs hover:bg-accent-400 hover:-translate-y-0.5 transition-all shadow-sm whitespace-nowrap"
            >
              <Calendar size={15} />
              {t.nav.book}
            </Link>

            <Link 
              to={isAuthenticated ? "/admin" : "/login"} 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary-700 text-white rounded-lg font-bold text-xs tracking-wide hover:bg-primary-800 hover:-translate-y-0.5 transition-all shadow-sm whitespace-nowrap"
            >
              {isAuthenticated ? <ShieldCheck size={15} /> : <LogIn size={15} />}
              {isAuthenticated ? t.nav.admin : t.nav.login}
            </Link>
          </div>

          {/* Mobile Header Right */}
          <div className="flex items-center gap-1.5 xl:hidden">
            <LanguageSwitcher />
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2 text-primary-900 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Pesquisar Agendamento"
              title="Pesquisar Agendamento"
            >
              <Search size={17} />
            </button>
            <Link
              to="/agendamento"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-accent-500 text-neutral-950 rounded-md font-bold text-xs shadow-sm"
            >
              <Calendar size={13} /> {t.nav.book}
            </Link>
            <button 
              className="p-2 text-primary-900 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              onClick={() => setIsOpen(true)}
              aria-label="Abrir Menu de Navegação"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <QuickSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Full-Screen Translucent Glassmorphic Mobile Menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-neutral-950/90 backdrop-blur-2xl text-white flex flex-col justify-between p-5 sm:p-7 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal de navegação"
        >
          {/* Top Row: Brand & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 group"
            >
              <span className="font-serif italic font-bold text-xs text-white tracking-tight whitespace-nowrap">
                {t.hero.republicPrefix}
              </span>
              <div className="w-8 h-8 flex items-center justify-center bg-transparent drop-shadow shrink-0">
                <img 
                  src={DEFAULT_IMAGES.logo} 
                  alt="Emblema da República da Guiné-Bissau" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="font-serif italic font-bold text-xs text-accent-300 tracking-tight whitespace-nowrap">
                {t.hero.republicSuffix}
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-accent-400"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Middle Body: Languages + Nav Links */}
          <div className="my-auto py-5 flex flex-col gap-5">
            {/* Multilingual Selector inside Fullscreen Menu */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Escolha o Seu Idioma / Choose Language
              </span>
              <LanguageSwitcher variant="mobile" className="!pt-0" />
            </div>

            {/* Navigation Links Grid */}
            <nav className="grid sm:grid-cols-2 gap-1.5" aria-label="Navegação em ecrã inteiro">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all",
                      isActive 
                        ? "bg-accent-500/20 text-accent-300 border border-accent-400/40 shadow-sm" 
                        : (link as any).highlight
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60 font-bold"
                          : "text-neutral-200 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span>{link.name}</span>
                      {(link as any).highlight && (
                        <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Novo
                        </span>
                      )}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accent-400 shadow-sm"></span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions & Contact Info */}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3 shrink-0">
            <Link
              to="/agendamento"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-accent-500 hover:bg-accent-400 text-neutral-950 rounded-xl font-bold text-sm tracking-wide shadow-lg uppercase transition-all"
            >
              <Calendar size={18} />
              {t.nav.scheduleOnline}
            </Link>

            <a
              href="https://wa.me/245957000555?text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20e%20agendamento%20sobre%20o%20processo%20de%20naturaliza%C3%A7%C3%A3o."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm tracking-wide shadow-lg uppercase transition-all"
            >
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'%3E%3Cpath d='M17.6 6.32A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.82 7.82 0 0 0 1.06 3.95L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.93 7.9 7.9 0 0 0-2.4-5.65z'/%3E%3C/svg%3E" 
                alt="WhatsApp" 
                className="w-4.5 h-4.5" 
              />
              Falar no WhatsApp (+245)
            </a>

            <div className="flex items-center justify-between pt-2 text-[11px] text-neutral-400">
              <span>📍 Safim Centro / Reino · Bissau</span>
              <Link 
                to={isAuthenticated ? "/admin" : "/login"}
                onClick={() => setIsOpen(false)}
                className="text-neutral-300 hover:text-white underline font-medium"
              >
                {isAuthenticated ? t.nav.admin : t.nav.adminAccess}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
