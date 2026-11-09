import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Calendar, Lock, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getCustomImages, DEFAULT_IMAGES, syncImagesFromSupabase } from '../services/imageService';

export function Footer() {
  const { t, language } = useLanguage();
  const [customImages, setCustomImages] = useState(getCustomImages());

  useEffect(() => {
    syncImagesFromSupabase().then(imgs => setCustomImages(imgs));
    const handleUpdate = () => setCustomImages(getCustomImages());
    window.addEventListener('emdpn_images_updated', handleUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleUpdate);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-neutral-900 to-neutral-950 text-neutral-400 py-14 pb-20 text-[0.92rem]">
      <div className="max-w-[1160px] mx-auto px-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Col 1: About & Logo */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-transparent drop-shadow-sm">
              <img 
                src={DEFAULT_IMAGES.logo} 
                alt={t.nav.emblemAlt}
                className="w-full h-full object-contain filter drop-shadow" 
              />
            </div>
            <h4 className="text-white font-serif text-lg font-bold uppercase leading-tight">
              EMDPN-GB
            </h4>
          </div>
          <p className="leading-relaxed text-xs opacity-80 mb-4">
            {language === 'fr' 
              ? 'Cabinet de Facilitation Documentaire et Naturalisation en Guinée-Bissau. Accompagnement de la diaspora et des requérants de citoyenneté en totale légalité.'
              : language === 'en'
              ? 'Bureau of Civil Documentation and Naturalization Procedures in Guinea-Bissau. Assisting diaspora and citizenship applicants with 100% legal integrity.'
              : language === 'es'
              ? 'Gabinete de Gestión Documental y Procesos de Naturalización en Guinea-Bissau. Asistencia a la diáspora y solicitantes de ciudadanía con total legalidad.'
              : 'Escritório de Movimentação de Documentos e Processos de Naturalização na Guiné-Bissau. Apoiamos a diáspora e requerentes de cidadania com 100% de legalidade.'}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-accent-400 bg-white/5 p-2 rounded-lg border border-white/10">
            <ShieldCheck size={14} className="shrink-0" />
            <span>{language === 'fr' ? 'Taxes perçues au Trésor de la Justice' : language === 'en' ? 'Fees paid into the Justice Treasury' : language === 'es' ? 'Tasas depositadas en el Tesoro de Justicia' : 'Taxas recolhidas no Cofre da Justiça'}</span>
          </div>
        </div>
        
        {/* Col 2: Official Contacts */}
        <div>
          <h4 className="text-white mb-3.5 font-serif text-lg font-bold">
            {language === 'fr' ? 'Contacts Officiels' : language === 'en' ? 'Official Contacts' : language === 'es' ? 'Contactos Oficiales' : 'Contactos Oficiais'}
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex gap-2.5 items-start">
              <MapPin size={16} className="text-accent-500 mt-0.5 shrink-0" />
              <span>{t.footer.locationValue}</span>
            </li>
            <li className="flex gap-2.5 items-start">
              <Phone size={16} className="text-accent-500 mt-0.5 shrink-0" />
              <a href="https://wa.me/245957000555" className="text-neutral-200 hover:text-accent-400 font-mono">
                +245 957000555
              </a>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail size={16} className="text-accent-500 mt-0.5 shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-accent-400">{t.footer.officialEmailTitle}</span>
                <a href="mailto:infor.ciesemdpngb@gmail.com" className="text-neutral-200 hover:text-accent-400 font-mono break-all">
                  infor.ciesemdpngb@gmail.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <h4 className="text-white mb-3.5 font-serif text-lg font-bold">
            {language === 'fr' ? 'Navigation' : language === 'en' ? 'Navigation' : language === 'es' ? 'Navegación' : 'Navegação'}
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="text-neutral-300 hover:text-accent-400">{t.nav.home}</Link></li>
            <li><Link to="/agendamento" className="text-accent-400 hover:text-accent-300 font-bold flex items-center gap-1.5"><Calendar size={13} /> {t.nav.book}</Link></li>
            <li><Link to="/sobre" className="text-neutral-300 hover:text-accent-400">{t.nav.about}</Link></li>
            <li><Link to="/servicos" className="text-neutral-300 hover:text-accent-400">{t.nav.services}</Link></li>
            <li><Link to="/requisitos" className="text-neutral-300 hover:text-accent-400">{t.nav.requirements}</Link></li>
            <li><Link to="/downloads" className="text-neutral-300 hover:text-accent-400">{t.nav.forms}</Link></li>
            <li><Link to="/faq" className="text-neutral-300 hover:text-accent-400">{t.nav.faq}</Link></li>
            <li><Link to="/contactos" className="text-neutral-300 hover:text-accent-400">{t.nav.contact}</Link></li>
          </ul>
        </div>

        {/* Col 4: Direção & Segurança */}
        <div>
          <h4 className="text-white mb-3.5 font-serif text-lg font-bold">
            {language === 'fr' ? 'Direction du Cabinet' : language === 'en' ? 'Bureau Management' : language === 'es' ? 'Dirección del Gabinete' : 'Direção do Escritório'}
          </h4>
          <div className="text-xs space-y-2 text-neutral-300 mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
            <div>
              <span className="text-[10px] text-accent-400 block font-bold uppercase">{language === 'fr' ? 'Directeur Général :' : language === 'en' ? 'Managing Director:' : language === 'es' ? 'Director Gerente:' : 'Diretor Gerente:'}</span>
              <span>Cláudio Hortiz Altip</span>
            </div>
            <div>
              <span className="text-[10px] text-accent-400 block font-bold uppercase">{language === 'fr' ? 'Adjoint Administratif :' : language === 'en' ? 'Administrative Officer:' : language === 'es' ? 'Auxiliar Administrativo:' : 'Auxiliar Administrativo:'}</span>
              <span>Valdano Amoná</span>
            </div>
            <div>
              <span className="text-[10px] text-accent-400 block font-bold uppercase">{language === 'fr' ? 'Secrétaire Générale :' : language === 'en' ? 'Secretary General:' : language === 'es' ? 'Secretaria General:' : 'Secretária-Geral:'}</span>
              <span>Isabel Sambé</span>
            </div>
          </div>
          <p className="flex items-center gap-2 text-[11px] text-neutral-400">
            <Lock size={14} className="shrink-0 text-accent-400" />
            {language === 'fr' ? 'Actes traités avec une stricte confidentialité notariée.' : language === 'en' ? 'Records handled with absolute notary confidentiality.' : language === 'es' ? 'Documentos tratados con estricta confidencialidad notarial.' : 'Documentos tratados com confidencialidade absoluta.'}
          </p>
        </div>
      </div>
      
      {/* Bottom disclaimer bar */}
      <div className="mt-12 pt-6 border-t border-white/5 text-center px-6 max-w-[1160px] mx-auto text-neutral-500 text-xs leading-relaxed">
        &copy; {new Date().getFullYear()} EMDPN-GB. {t.footer.rights} {t.footer.legalNote}
      </div>
    </footer>
  );
}
