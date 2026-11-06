import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Send, FileText, Building, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Send className="w-5.5 h-5.5" />,
      title: t.process.step1Title,
      desc: t.process.step1Desc
    },
    {
      icon: <FileText className="w-5.5 h-5.5" />,
      title: t.process.step2Title,
      desc: t.process.step2Desc
    },
    {
      icon: <Building className="w-5.5 h-5.5" />,
      title: t.process.step3Title,
      desc: t.process.step3Desc
    },
    {
      icon: <CheckCircle className="w-5.5 h-5.5" />,
      title: t.process.step4Title,
      desc: t.process.step4Desc
    }
  ];

  return (
    <div>
      <PageHeader 
        title={t.process.title} 
        subtitle={t.process.subtitle} 
      />
      
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex gap-6 items-start relative">
                  {idx !== steps.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-[-32px] w-[2px] bg-neutral-200 hidden md:block"></div>
                  )}
                  
                  <div className="shrink-0 w-14 h-14 rounded-full bg-primary-700 text-white flex items-center justify-center border-4 border-accent-400 shadow-md relative z-10">
                    {step.icon}
                  </div>
                  
                  <div className="bg-white border border-neutral-200 rounded-lg p-7 shadow-sm hover:shadow-md transition-all flex-grow">
                    <h3 className="text-xl mb-2">{step.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal delay={0.5} className="mt-16 text-center">
            <div className="bg-white border-2 border-primary-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-md">
              <span className="text-accent-700 font-extrabold text-xs uppercase tracking-widest block mb-1">
                {t.process.timelineBadge}
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary-950 mb-3">{t.process.timelineTitle}</h3>
              <p className="text-neutral-600 mb-6 text-sm leading-relaxed">
                {t.process.timelineDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link 
                  to="/processo/justificativa" 
                  className="btn btn-primary text-xs sm:text-sm py-3 px-6 shadow-sm w-full sm:w-auto justify-center"
                >
                  {t.process.btnDelayJustification}
                </Link>
                <a 
                  href="https://wa.me/245957000555" 
                  className="btn btn-institutional text-xs sm:text-sm py-3 px-6 w-full sm:w-auto justify-center"
                >
                  {t.process.btnEstimateCase}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
