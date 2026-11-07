import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { 
  Building2, 
  FileText, 
  ShieldCheck, 
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function DelayJustification() {
  const { t, language } = useLanguage();
  const dj = t.delayJustification;

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <PageHeader 
        title={dj.title} 
        subtitle={dj.subtitle} 
      />

      <div className="max-w-[1160px] mx-auto px-6 pt-10">
        
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            to="/processo" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900 transition-colors"
          >
            <ArrowLeft size={16} /> {dj.backLink}
          </Link>
        </div>

        {/* Executive summary banner */}
        <Reveal>
          <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-850 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-primary-800 mb-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <span className="text-accent-400 text-xs font-bold uppercase tracking-widest block mb-2">
                  {dj.bannerBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                  {dj.bannerTitle}
                </h2>
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                  {dj.bannerDesc}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center shrink-0 w-full lg:w-auto">
                <span className="text-xs uppercase text-accent-300 font-bold block mb-1">{dj.averageTitle}</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-white block font-mono">{dj.averageValue}</span>
                <span className="text-[11px] text-neutral-300 block mt-1">{dj.averageDesc}</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The Two Main Causes of Delay */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-accent-700 font-extrabold text-xs tracking-widest uppercase block mb-1">
              {dj.factorsBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-950">
              {dj.factorsTitle}
            </h3>
            <p className="text-neutral-500 text-sm mt-2">
              {dj.factorsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Cause 1: Por Conta do Estado */}
            <Reveal delay={0.1}>
              <div className="bg-white rounded-2xl border-2 border-primary-200 p-8 shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neutral-100">
                  <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-primary-700 uppercase tracking-wider block">
                      {dj.cause1Badge}
                    </span>
                    <h4 className="text-xl font-bold text-primary-950">
                      {dj.cause1Title}
                    </h4>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  {dj.cause1Desc}
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 flex-grow">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">1</div>
                    <span><strong>{dj.cause1Point1Title}</strong> {dj.cause1Point1Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">2</div>
                    <span><strong>{dj.cause1Point2Title}</strong> {dj.cause1Point2Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">3</div>
                    <span><strong>{dj.cause1Point3Title}</strong> {dj.cause1Point3Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">4</div>
                    <span><strong>{dj.cause1Point4Title}</strong> {dj.cause1Point4Desc}</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-neutral-100 bg-primary-50/50 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-primary-900 block mb-1">{dj.cause1ActionTitle}</span>
                  <p className="text-xs text-neutral-600">
                    {dj.cause1ActionDesc}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Cause 2: Por Conta do Andamento dos Documentos */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-2xl border-2 border-accent-300 p-8 shadow-md hover:shadow-lg transition-all h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-neutral-100">
                  <div className="w-14 h-14 rounded-xl bg-accent-100 text-accent-900 flex items-center justify-center shrink-0">
                    <FileText size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-accent-800 uppercase tracking-wider block">
                      {dj.cause2Badge}
                    </span>
                    <h4 className="text-xl font-bold text-primary-950">
                      {dj.cause2Title}
                    </h4>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  {dj.cause2Desc}
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 flex-grow">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">1</div>
                    <span><strong>{dj.cause2Point1Title}</strong> {dj.cause2Point1Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">2</div>
                    <span><strong>{dj.cause2Point2Title}</strong> {dj.cause2Point2Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">3</div>
                    <span><strong>{dj.cause2Point3Title}</strong> {dj.cause2Point3Desc}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-accent-100 text-accent-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">4</div>
                    <span><strong>{dj.cause2Point4Title}</strong> {dj.cause2Point4Desc}</span>
                  </li>
                </ul>

                <div className="mt-6 pt-4 border-t border-neutral-100 bg-accent-50/50 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-accent-900 block mb-1">{dj.cause2ActionTitle}</span>
                  <p className="text-xs text-neutral-600">
                    {dj.cause2ActionDesc}
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>

        {/* Professional Commitment & Contact */}
        <Reveal delay={0.4}>
          <div className="bg-primary-950 text-white rounded-2xl p-8 sm:p-10 border border-primary-900 text-center max-w-3xl mx-auto shadow-xl">
            <ShieldCheck size={40} className="text-accent-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              {language === 'fr' 
                ? 'Notre Engagement de Transparence' 
                : language === 'en' 
                ? 'Our Commitment to Transparency' 
                : language === 'es' 
                ? 'Nuestro Compromiso de Transparencia' 
                : 'O Nosso Compromisso de Transparência'}
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed mb-6">
              {language === 'fr'
                ? 'L’EMDPN-GB agit strictement en tant que Partenaire d’État et facilitateur juridique. Nous ne faisons pas de fausses promesses, mais garantissons la plus grande célérité permise par la loi de la République de Guinée-Bissau.'
                : language === 'en'
                ? 'EMDPN-GB operates strictly as an official State Partner and legal facilitator. We make no false timeline promises, but ensure the highest processing speed permitted by the laws of Guinea-Bissau.'
                : language === 'es'
                ? 'El EMDPN-GB actúa estrictamente como Socio de Estado y facilitador legal. No prometemos plazos falsos, pero garantizamos la máxima celeridad procesal permitida por la legislación de Guinea-Bissau.'
                : 'O EMDPN-GB atua estritamente como Parceiro de Estado e facilitador legal. Não prometemos prazos falsos, mas garantizamos a máxima velocidade processual permitida pela legislação da República da Guiné-Bissau.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/agendamento" className="btn btn-primary text-sm px-6 py-3">
                {language === 'fr' 
                  ? 'Planifier une Consultation' 
                  : language === 'en' 
                  ? 'Schedule Consultation' 
                  : language === 'es' 
                  ? 'Agendar Consulta de Seguimiento' 
                  : 'Agendar Consulta de Acompanhamento'}
              </Link>
              <a 
                href="https://wa.me/245957000555" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp text-sm px-6 py-3"
              >
                {language === 'fr' 
                  ? 'Contacter sur WhatsApp' 
                  : language === 'en' 
                  ? 'Chat on WhatsApp' 
                  : language === 'es' 
                  ? 'Consultar por WhatsApp' 
                  : 'Tirar Dúvidas no WhatsApp'}
              </a>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
