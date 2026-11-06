import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function WhatsAppFloat() {
  const { language } = useLanguage();

  const msg = language === 'fr'
    ? "Bonjour, je souhaite obtenir des informations sur les démarches de nationalité et de rendez-vous."
    : language === 'en'
    ? "Hello, I would like information regarding nationality procedures and appointment scheduling."
    : language === 'es'
    ? "Hola, deseo información sobre los trámites de nacionalidad y agendamiento de citas."
    : "Olá! Gostaria de informações sobre o processo de naturalização e agendamento.";

  const aria = language === 'fr' ? 'Contacter sur WhatsApp' : language === 'en' ? 'Contact on WhatsApp' : language === 'es' ? 'Contactar por WhatsApp' : 'Falar no WhatsApp';

  return (
    <a 
      href={`https://wa.me/245957000555?text=${encodeURIComponent(msg)}`} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={aria}
      className="fixed right-[22px] bottom-[22px] z-[99] bg-[#25d366] text-white w-[58px] h-[58px] rounded-full flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.35)] hover:scale-108 hover:shadow-[0_10px_28px_rgba(37,211,102,0.45)] transition-all animate-pulse-whatsapp"
    >
      <svg className="w-[30px] h-[30px] fill-current" viewBox="0 0 32 32">
        <path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.3.6 4.4 1.7 6.3L3 29l7.4-1.9c1.8 1 3.9 1.5 6 1.5 6.9 0 12.6-5.6 12.6-12.5S22.9 3 16 3zm6.3 17.6c-.3.8-1.7 1.5-2.3 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.4-4.7-5.6-4.9-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.3.6.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.8.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.3 1-1.1 1.2-1.5.3-.4.5-.3.9-.2.4.2 2.3 1.1 2.7 1.3.4.2.6.3.7.4.1.2.1.8-.2 1.6z"/>
      </svg>
      <style>{`
        @keyframes pulse-whatsapp {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .animate-pulse-whatsapp {
          animation: pulse-whatsapp 2.5s infinite;
        }
      `}</style>
    </a>
  );
}
