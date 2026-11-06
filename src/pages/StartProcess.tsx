import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { NationalityForm } from '../components/NationalityForm';
import { Users, Heart, Home as HomeIcon, ChevronRight, Scale } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export function StartProcess() {
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState<'naturalizacao' | 'casamento' | 'descendencia' | null>(null);

  const isFr = language === 'fr';
  const isEn = language === 'en';
  const isEs = language === 'es';

  const options = [
    {
      id: 'naturalizacao',
      icon: <HomeIcon className="w-8 h-8" />,
      title: isFr 
        ? 'Naturalisation par Résidence' 
        : isEn 
        ? 'Naturalization by Residence' 
        : isEs 
        ? 'Naturalización por Residencia' 
        : 'Naturalização por Residência',
      desc: isFr
        ? 'Pour les ressortissants étrangers résidant régulièrement en Guinée-Bissau depuis plus de 5 ans.'
        : isEn
        ? 'For foreign nationals who have resided legally in Guinea-Bissau for more than 5 years.'
        : isEs
        ? 'Para ciudadanos extranjeros que residen legalmente en Guinea-Bissau desde hace más de 5 años.'
        : 'Para cidadãos estrangeiros que residem legalmente na Guiné-Bissau há mais de 5 anos.',
      color: 'border-primary-600',
      label: isFr ? 'Voie Résidence' : isEn ? 'Residence Route' : isEs ? 'Vía Residencia' : 'Via Residência'
    },
    {
      id: 'casamento',
      icon: <Heart className="w-8 h-8" />,
      title: isFr
        ? 'Nationalité par Mariage'
        : isEn
        ? 'Nationality by Marriage'
        : isEs
        ? 'Nacionalidad por Matrimonio'
        : 'Nacionalidade por Casamento',
      desc: isFr
        ? 'Pour les conjoints de citoyens bissaoguinéens, selon une procédure d’acquisition simplifiée.'
        : isEn
        ? 'For spouses of Guinea-Bissau citizens, with a streamlined acquisition process.'
        : isEs
        ? 'Para cónyuges de ciudadanos guineanos, con trámites simplificados de adquisición.'
        : 'Para cônjuges de cidadãos guineenses, com processos simplificados de aquisição.',
      color: 'border-success-700',
      label: isFr ? 'Voie Matrimoniale' : isEn ? 'Marriage Route' : isEs ? 'Vía Matrimonial' : 'Via Matrimonial'
    },
    {
      id: 'descendencia',
      icon: <Users className="w-8 h-8" />,
      title: isFr
        ? 'Nationalité par Descendance'
        : isEn
        ? 'Nationality by Descent'
        : isEs
        ? 'Nacionalidad por Descendencia'
        : 'Nacionalidade por Descendência',
      desc: isFr
        ? 'Pour les enfants ou petits-enfants de citoyens guinéens nés à l’étranger (Diaspora).'
        : isEn
        ? 'For children or grandchildren of Guinea-Bissau citizens born abroad (Diaspora).'
        : isEs
        ? 'Para hijos o nietos de ciudadanos guineanos nacidos en el extranjero (Diáspora).'
        : 'Para filhos ou netos de cidadãos guineenses nascidos no estrangeiro (Diáspora).',
      color: 'border-accent-500',
      label: isFr ? 'Voie Filiation' : isEn ? 'Bloodline Route' : isEs ? 'Vía Sanguínea' : 'Via Sanguínea'
    }
  ];

  if (selectedType) {
    return (
      <div className="bg-neutral-50 min-h-screen pb-20">
        <PageHeader 
          title={isFr ? 'Formulaire Préalable' : isEn ? 'Intake Form' : isEs ? 'Formulario de Intención' : 'Formulário de Intenção'} 
          subtitle={isFr ? 'Renseignez les données essentielles pour l’examen initial de votre dossier.' : isEn ? 'Complete basic details for the initial triage of your file.' : isEs ? 'Complete los datos básicos para el triaje inicial de su caso.' : 'Preencha os dados básicos para a triagem inicial do seu processo.'} 
        />
        <div className="mt-12 px-7">
          <NationalityForm type={selectedType} onBack={() => setSelectedType(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <PageHeader 
        title={isFr ? 'Initier une Demande de Nationalité' : isEn ? 'Start Nationality Application' : isEs ? 'Iniciar Solicitud de Nacionalidad' : 'Iniciar Pedido de Nacionalidade'} 
        subtitle={isFr ? 'Sélectionnez la voie légale correspondant à votre profil.' : isEn ? 'Select the legal route corresponding to your applicant profile.' : isEs ? 'Seleccione la modalidad legal correspondiente a su perfil.' : 'Selecione a modalidade legal correspondente ao seu perfil.'} 
      />
      
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          <Reveal className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-50 px-4 py-2 rounded-full text-primary-700 text-xs font-black uppercase tracking-widest mb-6">
              <Scale size={16} /> {isFr ? 'Tri Juridique Préalable' : isEn ? 'Mandatory Legal Triage' : isEs ? 'Triaje Legal Obligatorio' : 'Triagem Legal Obrigatória'}
            </div>
            <h2 className="text-3xl md:text-4xl text-primary-950 mb-6 font-serif font-bold">
              {isFr ? 'Comment souhaitez-vous procéder ?' : isEn ? 'How would you like to proceed?' : isEs ? '¿Cómo desea proceder?' : 'Como deseja proceder?'}
            </h2>
            <p className="text-neutral-500 text-lg leading-relaxed">
              {isFr
                ? 'L’EMDPN-GB procède à une analyse rigoureuse conforme au Code de la Nationalité de la Guinée-Bissau. Choisissez la voie adaptée à votre situation.'
                : isEn
                ? 'EMDPN-GB conducts strict legal screening grounded in the Nationality Law of Guinea-Bissau. Choose the option best suited for your case.'
                : isEs
                ? 'El EMDPN-GB realiza un triaje riguroso basado en la Ley de Nacionalidad de Guinea-Bissau. Elija la vía que mejor se adapte a su caso.'
                : 'O EMDPN-GB realiza uma triagem rigorosa baseada na Lei da Nacionalidade. Escolha a via que melhor se aplica ao seu caso para iniciar o preenchimento.'}
            </p>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-3">
            {options.map((opt, idx) => (
              <Reveal key={opt.id} delay={idx * 0.1}>
                <div className={`bg-white h-full flex flex-col p-10 border-t-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${opt.color}`}>
                  <div className="w-16 h-16 rounded-2xl bg-neutral-50 text-primary-700 flex items-center justify-center mb-8 shadow-inner">
                    {opt.icon}
                  </div>
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-2">{opt.label}</span>
                  <h3 className="text-2xl font-bold text-primary-950 mb-4">{opt.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-10 flex-grow">{opt.desc}</p>
                  
                  <button 
                    onClick={() => setSelectedType(opt.id as any)}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all group shadow-lg"
                  >
                    {isFr ? 'DÉMARRER LA DÉMARCHE' : isEn ? 'START APPLICATION' : isEs ? 'INICIAR VÍA LEGAL' : 'INICIAR VIA LEGAL'} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 bg-accent-50 border border-accent-300 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif font-bold text-primary-950 text-xl mb-1">
                {isFr ? 'Vous préférez planifier un rendez-vous personnalisé ?' : isEn ? 'Prefer to schedule a personalized consultation?' : isEs ? '¿Prefiere agendar una atención personalizada?' : 'Prefere Agendar um Atendimento Personalizado?'}
              </h4>
              <p className="text-neutral-600 text-xs sm:text-sm">
                {isFr 
                  ? 'Réservez un créneau au cabinet à Safim/Bissau ou pour une visioconférence WhatsApp.' 
                  : isEn 
                  ? 'Book a date and time to visit our office in Safim or for an online WhatsApp video consultation.' 
                  : isEs 
                  ? 'Reserve fecha y hora para acudir a la sede en Safim o para una consulta en línea por WhatsApp.' 
                  : 'Marque uma data e hora para vir ao escritório em Safim ou para uma consulta online via WhatsApp.'}
              </p>
            </div>
            <Link 
              to="/agendamento" 
              className="btn btn-primary px-6 py-3.5 text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-md"
            >
              {isFr ? 'Prendre Rendez-vous en Ligne' : isEn ? 'Book Online Appointment' : isEs ? 'Agendar Cita en Línea' : 'Agendar Atendimento Online'}
            </Link>
          </div>

          <Reveal delay={0.4} className="mt-10 text-center">
            <p className="text-neutral-400 text-xs italic">
              {isFr
                ? '* En poursuivant, vous reconnaissez que l’EMDPN-GB agit en tant que cabinet de facilitation juridique et documentaire.'
                : isEn
                ? '* By continuing, you acknowledge that EMDPN-GB operates as an official technical and documentary advisory bureau.'
                : isEs
                ? '* Al continuar, usted declara tener conocimiento de que EMDPN-GB es un despacho de apoyo documental y asesoría técnica.'
                : '* Ao prosseguir, declara estar ciente de que o EMDPN-GB é um escritório de apoio documental e assessoria técnica.'}
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
