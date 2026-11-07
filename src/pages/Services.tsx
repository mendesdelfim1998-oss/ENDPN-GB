import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { FileText, Shield, Globe, ClipboardCheck, FileCheck2, Smartphone, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: t.services.serviceDiaspora,
      desc: t.services.serviceDiasporaDesc,
      points: language === 'fr'
        ? ["Recherche généalogique", "Certificat ADN et lignée ancestrale", "Assistance consulaire et transcriptions"]
        : language === 'en'
        ? ["Genealogical lineage research", "DNA and ancestral certification", "Consular support and registrations"]
        : language === 'es'
        ? ["Investigación genealógica", "Certificado de ADN y ascendencia", "Apoyo consular y transcripciones"]
        : ["Pesquisa genealógica", "Certificado de DNA e ancestralidade", "Apoio consular e transcrições"]
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: t.services.serviceDocChain,
      desc: t.services.serviceDocChainDesc,
      points: language === 'fr'
        ? ["Extrait d’Acte et Casier Judiciaire", "Carte Nationale d’Identité (BI)", "Passeport Biométrique"]
        : language === 'en'
        ? ["Birth Certificate & Criminal Record", "National Identity Card (BI)", "Biometric Passport"]
        : language === 'es'
        ? ["Cédula Personal y Antecedentes Penales", "Carnet de Identidad (BI)", "Pasaporte Biométrico"]
        : ["Cédula Pessoal e Registo Criminal", "Bilhete de Identidade (BI)", "Passaporte Biométrico"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: t.services.serviceTranslation,
      desc: t.services.serviceTranslationDesc,
      points: language === 'fr'
        ? ["Traduction assermentée", "Apostille et légalisation notariée", "Authentification consulaire"]
        : language === 'en'
        ? ["Official sworn translation", "Apostille and notary seals", "Consular authentications"]
        : language === 'es'
        ? ["Traducción jurada oficial", "Apostilla y notariado", "Legalización consular"]
        : ["Tradução juramentada", "Apostila e Notariado", "Legalização Consular"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t.services.serviceRepresentation,
      desc: t.services.serviceRepresentationDesc,
      points: language === 'fr'
        ? ["Dépôt de requête officielle", "Suivi quotidien des visas d’approbation", "Remise sécurisée des actes"]
        : language === 'en'
        ? ["Official statutory filing", "Daily monitoring of decree signatures", "Secure document handover"]
        : language === 'es'
        ? ["Presentación de solicitud formal", "Supervisión diaria de decretos", "Entrega segura de documentos"]
        : ["Submissão de requerimento", "Monitorização de despacho", "Entrega segura do documento"]
    }
  ];

  // Documentos em ordem crescente obrigatória
  const ascendingDocuments = [
    {
      step: '01',
      name: language === 'fr' ? 'Extrait d’Acte de Naissance (Cédula)' : language === 'en' ? 'Birth Record (Cédula Pessoal)' : language === 'es' ? 'Cédula Personal de Nacimiento' : 'Cédula Pessoal',
      desc: language === 'fr' ? 'Acte d’état civil originel et acte de naissance. Base juridique indispensable pour toute la chaîne d’identité.' : language === 'en' ? 'Primary birth certificate and origin civil record. Indispensable statutory foundation for the identification chain.' : language === 'es' ? 'Acta de nacimiento y certificado de origen. Base jurídica fundamental para toda la cadena de identidad.' : 'Assento de nascimento e certidão de nascimento de origem. Documento base fundamental para toda a cadeia de identificação civil.',
      tag: language === 'fr' ? '1ère Étape' : language === 'en' ? 'Step 1' : language === 'es' ? 'Paso 1' : '1º Passo'
    },
    {
      step: '02',
      name: language === 'fr' ? 'Casier Judiciaire' : language === 'en' ? 'Criminal Record Certificate' : language === 'es' ? 'Certificado de Antecedentes Penales' : 'Registo Criminal',
      desc: language === 'fr' ? 'Certificat de casier judiciaire guinéen et du pays de résidence attestant de l’honorabilité morale.' : language === 'en' ? 'Guinea-Bissau and residence country criminal clearance certificate certifying good moral character.' : language === 'es' ? 'Certificado de antecedentes penales guineano y del país de residencia que acredita honorabilidad moral.' : 'Certificado de Registo Criminal guineense e do país de residência atestando idoneidade moral perante a Justiça.',
      tag: language === 'fr' ? '2ème Étape' : language === 'en' ? 'Step 2' : language === 'es' ? 'Paso 2' : '2º Passo'
    },
    {
      step: '03',
      name: language === 'fr' ? 'Carte d’Identité Nationale (BI)' : language === 'en' ? 'National Identity Card (BI)' : language === 'es' ? 'Carnet de Identidad Nacional (BI)' : 'Bilhete de Identidade (BI)',
      desc: language === 'fr' ? 'Pièce d’identité nationale officielle émise par les services de l’Identification Civile à Bissau.' : language === 'en' ? 'Sovereign national citizenship identification card issued by Civil Identification services in Bissau.' : language === 'es' ? 'Documento nacional de identificación ciudadana emitido por los servicios oficiales en Bissau.' : 'Documento nacional de identificação de cidadania emitido pelos serviços oficiais de Identificação Civil em Bissau.',
      tag: language === 'fr' ? '3ème Étape' : language === 'en' ? 'Step 3' : language === 'es' ? 'Paso 3' : '3º Passo'
    },
    {
      step: '04',
      name: language === 'fr' ? 'Copie du Passeport' : language === 'en' ? 'Passport Copy & Verifications' : language === 'es' ? 'Copia de Pasaporte' : 'Cópia de Passaporte',
      desc: language === 'fr' ? 'Copie certifiée conforme du passeport biométrique international et visas de séjour.' : language === 'en' ? 'Notarized certified copy of international biometric passport and immigration mobility visas.' : language === 'es' ? 'Copia autenticada y verificada de pasaporte biométrico internacional y visados de residencia.' : 'Cópia autenticada e verificada de passaporte biométrico internacional e vistos de residência para mobilidade.',
      tag: language === 'fr' ? '4ème Étape' : language === 'en' ? 'Step 4' : language === 'es' ? 'Paso 4' : '4º Passo'
    },
    {
      step: '05',
      name: language === 'fr' ? 'Certificat ADN' : language === 'en' ? 'DNA Ancestry Certificate' : language === 'es' ? 'Certificado de ADN' : 'Certificado de DNA',
      desc: language === 'fr' ? 'Rapport génétique d’ascendance biologique pour la diaspora guinéenne et les retours aux racines.' : language === 'en' ? 'Genetic lineage test report validating African heritage and lineage roots in Guinea-Bissau for diaspora members.' : language === 'es' ? 'Dictamen genético de ascendencia y linaje biológico para los miembros de la diáspora.' : 'Laudo genético de ancestralidade e linhagem biológica para membros da diáspora e programas de retorno.',
      tag: language === 'fr' ? '5ème Étape' : language === 'en' ? 'Step 5' : language === 'es' ? 'Paso 5' : '5º Passo'
    },
    {
      step: '06',
      name: language === 'fr' ? 'Historique Ancestral' : language === 'en' ? 'Ancestral Family History Dossier' : language === 'es' ? 'Historial Ancestral y Genealógico' : 'Histórico Ancestral',
      desc: language === 'fr' ? 'Dossier généalogique certifiant des liens familiaux et racines originelles en République de Guinée-Bissau.' : language === 'en' ? 'Genealogical dossier and family lineage affidavits proving historical ties to Guinea-Bissau.' : language === 'es' ? 'Expediente genealógico y actas de ascendencia que comprueban el linaje familiar en Guinea-Bissau.' : 'Dossiê genealógico e certidões de ascendência comprobatórias de linhagem e raiz familiar na República da Guiné-Bissau.',
      tag: language === 'fr' ? '6ème Étape' : language === 'en' ? 'Step 6' : language === 'es' ? 'Paso 6' : '6º Passo'
    },
    {
      step: '07',
      name: language === 'fr' ? 'Lettre de Pétition' : language === 'en' ? 'Petition Letter' : language === 'es' ? 'Carta de Petición' : 'Carta de Petição',
      desc: language === 'fr' ? 'Requête formelle adressée aux autorités compétentes pour l’initiation de la procédure administrative.' : language === 'en' ? 'Formal request addressed to the competent authorities to initiate the administrative procedure.' : language === 'es' ? 'Solicitud formal dirigida a las autoridades competentes para el inicio del procedimiento administrativo.' : 'Requerimento formal dirigido às autoridades competentes para a instrução e início do procedimento administrativo.',
      tag: language === 'fr' ? '7ème Étape' : language === 'en' ? 'Step 7' : language === 'es' ? 'Paso 7' : '7º Passo'
    },
    {
      step: '08',
      name: language === 'fr' ? 'Procuration' : language === 'en' ? 'Power of Attorney' : language === 'es' ? 'Procuración' : 'Procuração',
      desc: language === 'fr' ? 'Document notarié autorisant le cabinet à représenter légalement le requérant dans ses démarches.' : language === 'en' ? 'Notarized document authorizing the firm to legally represent the applicant in their proceedings.' : language === 'es' ? 'Documento notariado que autoriza al gabinete a representar legalmente al solicitante en sus gestiones.' : 'Documento notariado que confere poderes ao gabinete para representar legalmente o requerente junto às instituições.',
      tag: language === 'fr' ? '8ème Étape' : language === 'en' ? 'Step 8' : language === 'es' ? 'Paso 8' : '8º Passo'
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHeader 
        title={t.services.title} 
        subtitle={t.services.subtitle} 
      />
      
      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent-700 font-extrabold text-xs tracking-widest uppercase block mb-1">
              {t.services.catalogBadge}
            </span>
            <h2 className="text-3xl font-serif font-bold text-primary-950">{t.services.catalogTitle}</h2>
            <p className="text-neutral-500 text-sm mt-2">
              {t.services.catalogDesc}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="bg-white border border-neutral-200 hover:border-primary-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-700 group-hover:text-white transition-all shadow-sm">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-950 mb-3">{service.title}</h3>
                  <p className="text-neutral-600 text-[0.94rem] leading-relaxed mb-6">{service.desc}</p>
                  <ul className="mt-auto space-y-2 pt-6 border-t border-neutral-100">
                    {service.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs font-semibold text-primary-900">
                        <CheckCircle size={14} className="text-success-700 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ascending Document Order Section */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-accent-700 font-extrabold text-xs tracking-widest uppercase block mb-1">
              {language === 'fr' ? 'Hiérarchie Légale Obligatoire' : language === 'en' ? 'Mandatory Statutory Order' : language === 'es' ? 'Jerarquía Legal Obligatoria' : 'Hierarquia Legal Obrigatória'}
            </span>
            <h2 className="text-3xl font-serif font-bold text-primary-950">
              {t.services.ascendingTitle}
            </h2>
            <p className="text-neutral-500 text-sm mt-2">
              {t.services.ascendingSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ascendingDocuments.map((doc, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border-2 border-neutral-200 hover:border-primary-400 bg-neutral-50/50 hover:bg-white transition-all shadow-sm flex flex-col h-full relative group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-mono font-black text-primary-700 bg-primary-100/60 w-12 h-12 rounded-xl flex items-center justify-center">
                      {doc.step}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-700 bg-accent-100 px-2.5 py-0.5 rounded">
                      {doc.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-primary-950 mb-2">{doc.name}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed flex-grow">{doc.desc}</p>
                  <div className="mt-4 pt-3 border-t border-neutral-200/60 text-[11px] font-bold text-primary-700 flex items-center gap-1">
                    <FileCheck2 size={13} /> {language === 'fr' ? `Séquence Officielle ${doc.step} sur 06` : language === 'en' ? `Official Sequence ${doc.step} of 06` : language === 'es' ? `Secuencia Oficial ${doc.step} de 06` : `Sequência Oficial ${doc.step} de 06`}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/downloads" className="btn btn-institutional px-8 py-3.5 text-sm">
              {language === 'fr' ? 'Consulter les Modèles de ces Documents →' : language === 'en' ? 'View Official Forms & Templates →' : language === 'es' ? 'Ver Modelos de estos Documentos →' : 'Ver Formulários e Modelos Destes Documentos →'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-900 text-white">
        <div className="max-w-[1160px] mx-auto px-7">
          <div className="grid md:grid-cols-[1fr,auto] gap-8 items-center">
            <Reveal>
              <h2 className="text-white text-3xl mb-4">{t.services.commitmentTitle}</h2>
              <p className="text-primary-100 opacity-80 max-w-2xl text-lg font-light leading-relaxed">
                {t.services.commitmentDesc}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <a href="https://wa.me/245957000555" className="btn btn-primary px-10 py-4 text-base">
                {t.services.btnBookAppointment}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <Reveal>
            <div className="bg-white border-2 border-dashed border-neutral-200 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <Smartphone className="w-16 h-16 text-success-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-primary-950 mb-4">
                {language === 'fr' ? 'Assistance Directe par WhatsApp' : language === 'en' ? 'Special WhatsApp Assistance' : language === 'es' ? 'Atención Especial por WhatsApp' : 'Atendimento Especial por WhatsApp'}
              </h3>
              <p className="text-neutral-600 mb-8 text-lg">
                {language === 'fr' 
                  ? 'Pour votre confort, nous effectuons un tri préalable de vos documents à distance. Envoyez des photos lisibles et obtenez un diagnostic immédiat.'
                  : language === 'en'
                  ? 'For your convenience, we conduct digital document assessments. Send clear photos of your records to receive an immediate diagnosis.'
                  : language === 'es'
                  ? 'Para su comodidad, realizamos la evaluación documental por vía digital. Envíe fotos legibles de sus documentos para un diagnóstico inmediato.'
                  : 'Para sua comodidade, realizamos a triagem documental via digital. Envie fotos legíveis dos seus documentos e receba um diagnóstico imediato.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4 font-bold">
                <span className="bg-neutral-100 px-4 py-2 rounded-lg text-sm text-neutral-500">
                  {language === 'fr' ? 'RÉPONSE SOUS 24H' : language === 'en' ? 'RESPONSE WITHIN 24H' : language === 'es' ? 'RESPUESTA EN 24H' : 'RESPOSTA EM ATÉ 24H'}
                </span>
                <span className="bg-neutral-100 px-4 py-2 rounded-lg text-sm text-neutral-500">
                  {language === 'fr' ? 'DIAGNOSTIC GRATUIT' : language === 'en' ? 'FREE INITIAL ASSESSMENT' : language === 'es' ? 'DIAGNÓSTICO GRATUITO' : 'DIAGNÓSTICO GRATUITO'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
