import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Check, Info, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Requirements() {
  const { t, language } = useLanguage();

  const categories = language === 'fr' ? [
    {
      title: "Naturalisation par Résidence",
      price: "770.482 FCFA",
      desc: "Pour les résidents étrangers établis en Guinée-Bissau depuis plus de 5 ans.",
      sections: [
        {
          label: "Pièces du Pays d’Origine",
          items: [
            "Extrait d’Acte de Naissance du pays d’origine",
            "Casier Judiciaire du pays d’origine",
            "Acte de Mariage ou de Naissance portant mention marginale"
          ]
        },
        {
          label: "Pièces Délivrées en Guinée-Bissau",
          items: [
            "Casier Judiciaire Guinéen",
            "Certificat de Conformité - Migration et Frontières (DIC)",
            "Attestation de Résidence - Mairie de Bissau",
            "Certificat de Bonne Vie et Mœurs - Mairie de Bissau",
            "Attestation d’Intégration Culturelle - Ministère de la Culture",
            "Copie Certifiée du Passeport",
            "Copie de la Carte de Séjour"
          ]
        }
      ]
    },
    {
      title: "Nationalité par Mariage",
      price: "155.097 FCFA",
      desc: "Pour les conjoints de citoyen(ne)s bissau-guinéen(ne)s.",
      sections: [
        {
          label: "Pièces du Pays d’Origine",
          items: [
            "Extrait d’Acte de Naissance avec mention de mariage",
            "Casier Judiciaire du pays d’origine"
          ]
        },
        {
          label: "Pièces Délivrées en Guinée-Bissau",
          items: [
            "Casier Judiciaire Guinéen",
            "Attestation de Résidence - Migration et Frontières",
            "Attestation de Résidence - Mairie de Bissau",
            "Certificat de Moralité Civile - Mairie de Bissau",
            "Acte de Mariage Transcrit",
            "Copie de la Carte de Séjour",
            "Extrait de Naissance du conjoint guinéen",
            "Copie du Journal Officiel (si obtenu par naturalisation)",
            "Copie de la Carte d’Identité Nationale du conjoint"
          ]
        }
      ]
    }
  ] : language === 'en' ? [
    {
      title: "Naturalization by Residence",
      price: "770.482 FCFA",
      desc: "For foreign residents continuously settled in Guinea-Bissau for over 5 years.",
      sections: [
        {
          label: "Origin Country Documents",
          items: [
            "Original Birth Certificate from country of origin",
            "Police Clearance / Criminal Record from country of origin",
            "Marriage Certificate or Birth Certificate with official endorsement"
          ]
        },
        {
          label: "Documents Issued in Guinea-Bissau",
          items: [
            "Guinea-Bissau Criminal Clearance Certificate",
            "Compliance Declaration - Migration and Borders (DIC)",
            "Proof of Residence Certificate - Bissau City Council",
            "Moral & Civil Good Conduct Certificate - Bissau City Council",
            "Cultural Knowledge Endorsement - Ministry of Culture",
            "Certified Passport Photocopy",
            "Certified Residence Permit Photocopy"
          ]
        }
      ]
    },
    {
      title: "Nationality by Marriage",
      price: "155.097 FCFA",
      desc: "For lawful spouses of Guinea-Bissau citizens.",
      sections: [
        {
          label: "Origin Country Documents",
          items: [
            "Birth Certificate with official marriage endorsement",
            "Criminal Record / Police Clearance Certificate"
          ]
        },
        {
          label: "Documents Issued in Guinea-Bissau",
          items: [
            "Guinea-Bissau Criminal Clearance Certificate",
            "Residence Endorsement - Migration and Borders (DIC)",
            "Municipal Residence Certificate - Bissau City Council",
            "Moral Character Certificate - Bissau City Council",
            "Official Transcribed Marriage Certificate",
            "Certified Residence Card Copy",
            "Birth Certificate of Guinean Spouse",
            "Official Gazette Copy (if spouse naturalized)",
            "National Identity Card Copy of Guinean Spouse"
          ]
        }
      ]
    }
  ] : language === 'es' ? [
    {
      title: "Naturalización por Residencia",
      price: "770.482 FCFA",
      desc: "Para residentes extranjeros establecidos en Guinea-Bissau durante más de 5 años.",
      sections: [
        {
          label: "Documentos del País de Origen",
          items: [
            "Certificado de Nacimiento del país de origen",
            "Certificado de Antecedentes Penales del país de origen",
            "Certificado de Matrimonio o Nacimiento legalizado"
          ]
        },
        {
          label: "Documentos a Emitir en Guinea-Bissau",
          items: [
            "Certificado de Antecedentes Penales Guineano",
            "Declaración de Conformidad - Migración y Fronteras (DIC)",
            "Constancia de Fijación de Residencia - Alcaldía de Bissau",
            "Certificado de Conducta Moral y Civil - Alcaldía de Bissau",
            "Constancia de Conocimiento Cultural - Ministerio de Cultura",
            "Fotocopia Notariada de Pasaporte",
            "Fotocopia de Tarjeta de Residencia"
          ]
        }
      ]
    },
    {
      title: "Nacionalidad por Matrimonio",
      price: "155.097 FCFA",
      desc: "Para cónyuges de ciudadanos guineanos.",
      sections: [
        {
          label: "Documentos del País de Origen",
          items: [
            "Certificado de Nacimiento con inscripción de matrimonio",
            "Certificado de Antecedentes Penales"
          ]
        },
        {
          label: "Documentos a Emitir en Guinea-Bissau",
          items: [
            "Certificado de Antecedentes Penales Guineano",
            "Constancia de Residencia - Migración y Fronteras (DIC)",
            "Constancia de Residencia - Alcaldía de Bissau",
            "Certificado de Conducta Cívica - Alcaldía de Bissau",
            "Certificado de Matrimonio Transcrito",
            "Fotocopia de Tarjeta de Residencia",
            "Certificado de Nacimiento del cónyuge guineano",
            "Copia del Boletín Oficial (si el cónyuge es naturalizado)",
            "Copia del Carnet de Identidad del cónyuge"
          ]
        }
      ]
    }
  ] : [
    {
      title: "Naturalização por Residência",
      price: "770.482 FCFA",
      desc: "Para residentes estrangeiros que fixaram residência na Guiné-Bissau.",
      sections: [
        {
          label: "Documentos do País de Origem",
          items: [
            "Certidão de Nascimento do país de origem",
            "Certificado do Registo Criminal do país de origem",
            "Certidão de Casamento ou Nascimento com averbamento (se casado)"
          ]
        },
        {
          label: "País de Fixação de Residência (G-B)",
          items: [
            "Certificado do Registo Criminal",
            "Declaração de Conformidade - Migração e Fronteiras",
            "Atestado de Fixação de Residência - C. M. Bissau",
            "Atestado de Comportamento Moral e Civil - C. M. Bissau",
            "Declaração de Conhecimento da Cultura Guineense - Min. da Cultura",
            "Fotocópia do Passaporte",
            "Fotocópia do Cartão de Residência"
          ]
        }
      ]
    },
    {
      title: "Nacionalidade por Casamento",
      price: "155.097 FCFA",
      desc: "Para cônjuges de cidadãos guineenses.",
      sections: [
        {
          label: "Documentos do País de Origem",
          items: [
            "Certidão de Nascimento com averbamento do casamento",
            "Certificado do Registo Criminal"
          ]
        },
        {
          label: "País de Fixação de Residência (G-B)",
          items: [
            "Certificado do Registo Criminal",
            "Atestado de Fixação de Residência - Migração e Fronteiras",
            "Atestado de Fixação de Residência - C. M. Bissau",
            "Atestado de Comportamento Moral e Civil - C. M. Bissau",
            "Certidão de Casamento Transcrito",
            "Fotocópia do Cartão de Residência",
            "Certidão de Nascimento de quem dá a nacionalidade",
            "Cópia do B.O. (se quem dá obteve por naturalização)",
            "Cópia do B.I. de quem dá"
          ]
        }
      ]
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHeader 
        title={t.requirements.title} 
        subtitle={t.requirements.subtitle} 
      />
      
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <Reveal className="mb-12">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center shrink-0">
                <Landmark size={32} />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl text-primary-900 mb-1">
                  {language === 'fr' ? 'Taxes Légales du Trésor Public (Cofre da Justiça)' : language === 'en' ? 'Statutory Fees (General Justice Treasury)' : language === 'es' ? 'Tasas del Tesoro General de Justicia' : 'Taxas do Cofre Geral da Justiça'}
                </h2>
                <p className="text-neutral-500 max-w-2xl">
                  {language === 'fr' 
                    ? 'Les montants ci-dessous correspondent aux taxes régaliennes perçues par les autorités de Guinée-Bissau pour l’instruction des dossiers.'
                    : language === 'en'
                    ? 'The statutory amounts below correspond to official government fees charged by Guinea-Bissau authorities for application processing.'
                    : language === 'es'
                    ? 'Los montos indicados corresponden a las tasas oficiales cobradas por las autoridades guineanas para la tramitación de expedientes.'
                    : 'Os valores indicados abaixo correspondem às taxas oficiais cobradas pelas autoridades guineenses para a tramitação dos processos.'}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-2">
            {categories.map((cat, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="bg-white border border-neutral-200 border-t-8 rounded-2xl p-8 shadow-md flex flex-col h-full hover:shadow-xl transition-all" 
                  style={{ borderTopColor: idx === 0 ? '#7e22ce' : '#0e7349' }}>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl mb-1 text-primary-900">{cat.title}</h3>
                      <p className="text-neutral-500 text-sm">{cat.desc}</p>
                    </div>
                    <div className="bg-accent-100 text-accent-900 px-4 py-2 rounded-lg font-black text-sm whitespace-nowrap shadow-sm border border-accent-200">
                      {cat.price}
                    </div>
                  </div>
                  
                  <div className="space-y-8 flex-grow">
                    {cat.sections.map((section, sidx) => (
                      <div key={sidx}>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary-700 mb-4 flex items-center gap-2">
                          <div className="w-4 h-px bg-primary-700"></div>
                          {section.label}
                        </h4>
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex gap-3 items-start text-[0.9rem] text-neutral-600 leading-tight">
                              <div className="shrink-0 w-5 h-5 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mt-0.5">
                                <Check size={12} strokeWidth={4} />
                              </div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-neutral-100">
                    <a href="https://wa.me/245957000555" className="btn btn-institutional w-full justify-center">
                      {t.requirements.btnRequestGuide}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Ascending document order summary */}
          <Reveal delay={0.3} className="mt-14">
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
              <span className="text-accent-700 font-extrabold text-xs tracking-widest uppercase block mb-1">
                {language === 'fr' ? 'Séquence Documentaire Réglementaire' : language === 'en' ? 'Statutory Sequential Document Hierarchy' : language === 'es' ? 'Secuencia de Organización Documental' : 'Sequência de Organização Documental'}
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary-950 mb-2">
                {language === 'fr' ? 'Documents Organisés en Ordre Croissant Obligatoire' : language === 'en' ? 'Documents Organized in Lawful Ascending Order' : language === 'es' ? 'Documentos Organizados en Orden Ascendente' : 'Documentos Organizados em Ordem Crescente'}
              </h3>
              <p className="text-neutral-500 text-sm mb-6 max-w-2xl">
                {language === 'fr'
                  ? 'Pour garantir la recevabilité immédiate de votre dossier, chaque pièce doit s’articuler selon cet enchaînement légal :'
                  : language === 'en'
                  ? 'To prevent procedural returns and expedite ministerial approvals, files must be formatted in this exact sequential order:'
                  : language === 'es'
                  ? 'Para evitar devoluciones y agilizar la validación ministerial, el expediente debe estructurarse en esta secuencia:'
                  : 'Para evitar devoluções e agilizar a validação nos serviços ministeriais, o dossiê deve ser instruído nesta ordem sequencial:'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { n: '1º', name: language === 'fr' ? 'Extrait de Naissance' : language === 'en' ? 'Birth Record' : language === 'es' ? 'Cédula Personal' : 'Cédula Pessoal', sub: 'Assento' },
                  { n: '2º', name: language === 'fr' ? 'Casier Judiciaire' : language === 'en' ? 'Police Record' : language === 'es' ? 'Antecedentes Penales' : 'Registo Criminal', sub: 'Justiça' },
                  { n: '3º', name: language === 'fr' ? 'Carte d’Identité' : language === 'en' ? 'National ID (BI)' : language === 'es' ? 'Carnet de Identidad' : 'BI', sub: 'Identificação' },
                  { n: '4º', name: language === 'fr' ? 'Copie Passeport' : language === 'en' ? 'Passport Copy' : language === 'es' ? 'Copia Pasaporte' : 'Cópia Passaporte', sub: 'Viagem / Visto' },
                  { n: '5º', name: language === 'fr' ? 'Certificat ADN' : language === 'en' ? 'DNA Certificate' : language === 'es' ? 'Certificado ADN' : 'Certificado DNA', sub: 'Genética' },
                  { n: '6º', name: language === 'fr' ? 'Dossier Ancestral' : language === 'en' ? 'Ancestral History' : language === 'es' ? 'Historial Ancestral' : 'Histórico Ancestral', sub: 'Genealogia' }
                ].map((item, i) => (
                  <div key={i} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-center hover:bg-primary-50 hover:border-primary-300 transition-all">
                    <span className="text-xs font-mono font-black text-primary-700 block mb-1">{item.n} {language === 'fr' ? 'Étape' : language === 'en' ? 'Step' : language === 'es' ? 'Paso' : 'Passo'}</span>
                    <h5 className="font-bold text-xs text-primary-950">{item.name}</h5>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{item.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-8">
            <div className="bg-primary-950 text-white border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
              <Info className="shrink-0 text-accent-400 w-10 h-10" />
              <div className="relative z-10">
                <h4 className="text-xl font-serif font-bold text-white mb-2 uppercase tracking-wide">
                  {language === 'fr' ? 'Information Importante sur l’EMDPN-GB' : language === 'en' ? 'Important Notice Regarding EMDPN-GB' : language === 'es' ? 'Información Importante sobre el EMDPN-GB' : 'Importante sobre o EMDPN-GB'}
                </h4>
                <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl">
                  {language === 'fr'
                    ? 'L’EMDPN-GB intervient en tant que Partenaire d’État auprès des Ministères de la Justice et de l’Intérieur. Les montants mentionnés ci-dessus sont les taxes officielles du Trésor Public. Nos honoraires couvrent le suivi quotidien en présentiel à Bissau, les traductions assermentées et la conformité intégrale de votre dossier.'
                    : language === 'en'
                    ? 'EMDPN-GB serves as a trusted State Partner with the Ministry of Justice and Ministry of Interior. The amounts indicated above are sovereign statutory fees. Our fee schedule covers daily in-person tracking in Bissau, sworn certified translations, and rigorous legal instruction to achieve maximum velocity.'
                    : language === 'es'
                    ? 'El EMDPN-GB actúa como Socio de Estado ante los Ministerios de Justicia e Interior. Los valores anteriores son tasas oficiales públicas. Nuestros honorarios cubren el seguimiento presencial diario en Bissau, traducciones juradas y la instrucción rigurosa del expediente.'
                    : 'O EMDPN-GB atua como Parceiro de Estado e facilitador legal junto do Ministério da Justiça e do Interior. Os valores acima são taxas estatais oficiais. Cobramos honorários pelo acompanhamento presencial diário em Bissau, traduções juramentadas e instrução rigorosa do dossiê oficial, garantindo máxima celeridade.'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
