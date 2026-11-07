import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Users, 
  Globe, 
  Briefcase, 
  Eye, 
  Calendar, 
  Search, 
  CheckCircle2, 
  Clock, 
  Building,
  UserCheck,
  ChevronRight,
  Award,
  ArrowRight,
  Heart
} from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Gallery } from '../components/Gallery';
import { getStatsMetrics, recordSiteVisitor } from '../services/appointmentService';
import { useLanguage } from '../context/LanguageContext';
import { getCustomImages, DEFAULT_IMAGES, syncImagesFromSupabase } from '../services/imageService';
import { authService } from '../services/authService';

export function Home() {
  const [stats, setStats] = useState(getStatsMetrics());
  const [customImages, setCustomImages] = useState(getCustomImages());
  const { t, language } = useLanguage();
  const isAuthenticated = authService.isAdmin();

  useEffect(() => {
    setStats(getStatsMetrics());
    recordSiteVisitor()
      .then(visitors => setStats(current => ({ ...current, visitors })))
      .catch(err => console.error('Could not update global visitor count:', err));
    syncImagesFromSupabase().then(imgs => setCustomImages(imgs));

    const handleImagesUpdate = () => {
      setCustomImages(getCustomImages());
    };
    window.addEventListener('emdpn_images_updated', handleImagesUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleImagesUpdate);
  }, []);

  const targetAudience = [
    {
      title: t.audience.card1Title,
      desc: t.audience.card1Desc,
      icon: <FileText size={24} className="text-primary-700" />
    },
    {
      title: t.audience.card2Title,
      desc: t.audience.card2Desc,
      icon: <Globe size={24} className="text-primary-700" />
    },
    {
      title: t.audience.card3Title,
      desc: t.audience.card3Desc,
      icon: <Users size={24} className="text-primary-700" />
    },
    {
      title: t.audience.card4Title,
      desc: t.audience.card4Desc,
      icon: <Briefcase size={24} className="text-primary-700" />
    }
  ];

  const institutionalPartners = [
    {
      name: t.partners.partner1,
      role: t.partners.partner1Role
    },
    {
      name: t.partners.partner2,
      role: t.partners.partner2Role
    },
    {
      name: t.partners.partner3,
      role: t.partners.partner3Role
    },
    {
      name: t.partners.partner4,
      role: t.partners.partner4Role
    },
    {
      name: t.partners.partner5,
      role: t.partners.partner5Role
    }
  ];

  // User's authentic office photo in Bissau as the single default banner image
  const officeImageSrc = "/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg";

  return (
    <div className="flex flex-col bg-neutral-50">
      
      {/* Hero Section with Official Insignia, 3 Prominent High-Contrast Cards and Full-Width Banner */}
      <section className="bg-primary-950 relative text-white pt-10 pb-20 lg:pt-14 lg:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #fff 0%, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          
          {/* Top Intro Header */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            
            <Reveal delay={0.1}>
              <div className="flex flex-col items-center justify-center gap-4 mb-6">
                
                {/* Horizontal Lockup: República da [Emblema sem fundo] Guiné-Bissau */}
                <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap my-2">
                  <span className="font-serif italic font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-md">
                    {t.hero.republicPrefix}
                  </span>
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center bg-transparent shrink-0 drop-shadow-2xl">
                    <img 
                      src={DEFAULT_IMAGES.logo} 
                      alt="Emblema Nacional da República da Guiné-Bissau" 
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                  <span className="font-serif italic font-bold text-2xl sm:text-4xl md:text-5xl text-accent-400 tracking-tight drop-shadow-md">
                    {t.hero.republicSuffix}
                  </span>
                </div>

                {/* Subtitle pill badge */}
                <div className="text-center mt-2">
                  <span className="inline-block text-[11px] sm:text-xs md:text-sm uppercase tracking-widest text-accent-300 font-bold border border-accent-400/30 px-5 sm:px-7 py-2 rounded-full bg-black/30 shadow-md backdrop-blur-md">
                    {t.hero.officialBadge}
                  </span>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.15}>
              <h1 className="text-white text-4xl sm:text-6xl lg:text-[4rem] mb-6 tracking-tight leading-[1.1] font-serif font-bold text-balance">
                {t.hero.titleLine1} <span className="text-accent-400">{t.hero.titleLine2}</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="max-w-3xl mx-auto text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {t.hero.description}
              </p>
            </Reveal>
          </div>

          {/* New Grid of Quick-Action Tiles */}
          {/* New Grid of Quick-Action Tiles */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
            {[
              { 
                title: language === 'fr' ? 'Prendre RDV' : language === 'en' ? 'Book Appointment' : language === 'es' ? 'Agendar Cita' : 'Agendar Atendimento', 
                path: '/agendamento', 
                icon: Calendar 
              },
              { 
                title: language === 'fr' ? 'Voir Conditions' : language === 'en' ? 'View Requirements' : language === 'es' ? 'Ver Requisitos' : 'Ver Requisitos', 
                path: '/requisitos', 
                icon: FileText 
              },
              { 
                title: language === 'fr' ? 'Démarrer Demande' : language === 'en' ? 'Start Application' : language === 'es' ? 'Iniciar Solicitud' : 'Iniciar Pedido', 
                path: '/agendamento?iniciar=true', 
                icon: ShieldCheck 
              }
            ].map((tile, i) => (
              <Link key={i} to={tile.path} className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-l-4 border-accent-500">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center">
                  <tile.icon size={24} />
                </div>
                <span className="font-bold text-primary-950 text-base">{tile.title}</span>
              </Link>
            ))}
          </div>

          {/* 3 Prominent Action Cards with High-Contrast Legible Text */}
          <Reveal delay={0.25}>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8">
              
              {/* Card 1: AGENDAR ATENDIMENTO / PEDIDO */}
              <Link 
                to="/agendamento" 
                className="group bg-primary-900 hover:bg-primary-950 text-white p-6 sm:p-7 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <Calendar size={26} />
                  </div>
                  <h3 className="font-black text-base sm:text-lg tracking-wide uppercase leading-tight mb-2 text-white">
                    {t.hero.ctaBook}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-semibold leading-snug">
                    {language === 'fr'
                      ? 'Planifiez votre consultation en présentiel à Safim/Bissau ou par visioconférence.'
                      : language === 'en'
                      ? 'Schedule your consultation in person in Safim/Bissau or via remote video call.'
                      : language === 'es'
                      ? 'Reserve su consulta presencial en Safim/Bissau o atención digital por videoconferencia.'
                      : 'Marque a sua consulta presencial em Safim/Bissau ou atendimento digital por videoconferência.'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent-400 mt-5 pt-3 border-t border-white/20">
                  <span>{language === 'fr' ? 'Démarrer la Prise de RDV' : language === 'en' ? 'Start Booking' : language === 'es' ? 'Iniciar Cita' : 'Iniciar Agendamento'}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* Card 2: ATENDIMENTO VIA WHATSAPP */}
              <a 
                href="https://wa.me/245957000555?text=Ol%C3%A1%21%20Gostaria%20de%20informa%C3%A7%C3%B5es%20e%20agendamento%20sobre%20o%20processo%20de%20naturaliza%C3%A7%C3%A3o." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-accent-500 hover:bg-accent-600 text-white p-6 sm:p-7 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-white">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M17.6 6.32A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.82 7.82 0 0 0 1.06 3.95L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.93 7.9 7.9 0 0 0-2.4-5.65z'/%3E%3C/svg%3E" 
                      alt="WhatsApp" 
                      className="w-7 h-7" 
                    />
                  </div>
                  <h3 className="font-black text-base sm:text-lg tracking-wide uppercase leading-tight mb-2 text-white">
                    {t.hero.ctaWhatsapp}
                  </h3>
                  <p className="text-xs sm:text-sm text-white font-semibold leading-snug">
                    {language === 'fr'
                      ? 'Échangez en direct avec nos conseillers juridiques à Bissau (+245 957000555).'
                      : language === 'en'
                      ? 'Chat in real time with the legal advisory bureau in Bissau (+245 957000555).'
                      : language === 'es'
                      ? 'Comuníquese en tiempo real con el consultor legal en Bissau (+245 957000555).'
                      : 'Fale em tempo real com o consultor jurídico oficial em Bissau (+245 957000555).'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white mt-5 pt-3 border-t border-white/30">
                  <span>{language === 'fr' ? 'Ouvrir Conversation' : language === 'en' ? 'Open WhatsApp Chat' : language === 'es' ? 'Abrir Conversación' : 'Abrir Conversa Direta'}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Card 3: CONHECER O PROCESSO */}
              <Link 
                to="/processo" 
                className="group bg-primary-800 hover:bg-primary-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                    <FileText size={26} />
                  </div>
                  <h3 className="font-black text-base sm:text-lg tracking-wide uppercase leading-tight mb-2 text-white">
                    {t.hero.ctaProcess}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/95 font-semibold leading-snug">
                    {language === 'fr'
                      ? 'Découvrez les 4 étapes officielles, les délais de 1 à 12 mois et la chaîne documentaire.'
                      : language === 'en'
                      ? 'Understand the 4 official steps, 1 to 12 months timeline, and legal document sequence.'
                      : language === 'es'
                      ? 'Conozca las 4 etapas oficiales, los plazos de 1 a 12 meses y la secuencia documental.'
                      : 'Compreenda as 4 etapas oficiais, os prazos de 1 a 12 meses e a organização documental.'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-accent-300 mt-5 pt-3 border-t border-white/25">
                  <span>{language === 'fr' ? 'Voir Étapes & Actes' : language === 'en' ? 'View Steps & Docs' : language === 'es' ? 'Ver Fases y Documentos' : 'Ver Fases & Documentos'}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

            </div>
          </Reveal>

          {/* Panoramic Office Banner Without Distortion (Single Authentic Image Displayed) */}
          <Reveal delay={0.35}>
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-950 group">
              <img 
                src={customImages.heroBanner || DEFAULT_IMAGES.heroBanner} 
                alt="Gabinete Jurídico de Apoio Documental e Cidadania em Bissau, Guiné-Bissau" 
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] object-cover object-center group-hover:scale-101 transition-transform duration-700" 
              />
              
              {/* Subtle scrim overlay with authentic Guinea-Bissau caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/35 to-transparent flex flex-col justify-end p-5 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 border border-accent-400/40 text-accent-300 text-[11px] font-bold uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-accent-400"></span>
                      <span>Gabinete Jurídico Oficial · Bissau / Safim</span>
                    </div>
                    <h3 className="text-white text-lg sm:text-2xl font-serif font-bold leading-tight max-w-xl">
                      Consultoria e Tramitação Notarial para Cidadania & Documentos Guineenses
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-lg font-light">
                      {t.hero.photoCaption}
                    </p>
                  </div>

                  {isAuthenticated && (
                    <Link
                      to="/admin?tab=dev"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-md text-xs font-bold border border-white/30 transition-all self-start sm:self-auto"
                      title="Mudar imagens no Gestor do Desenvolvedor"
                    >
                      <span>⚙️ Mudar Imagem / Área Desenvolvedor</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* Official Indicators with 1 to 12 Months Process Timeline */}
      <section className="bg-white border-b border-neutral-200 py-6 sm:py-8 relative -mt-6 z-20 max-w-[1140px] mx-auto rounded-2xl shadow-xl w-[92%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 text-center divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          
          {/* Visitors */}
          <div className="pt-2 md:pt-0">
            <div className="flex items-center justify-center text-primary-600 mb-1">
              <Eye size={22} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-950 font-mono">
              {stats.visitors.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mt-0.5">
              Nº de Visitantes
            </span>
          </div>

          {/* Wait Time: 1 to 12 months with link to delay justification */}
          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center text-flag-700 mb-1">
              <Clock size={22} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-flag-700 font-mono">
              {t.metrics.timelineValue}
            </div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mt-0.5">
              {t.metrics.timelineTitle}
            </span>
            <Link 
              to="/processo/justificativa" 
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary-700 hover:text-primary-900 hover:underline mt-1 transition-colors"
            >
              <span>{t.metrics.timelineLink}</span>
              <ChevronRight size={13} />
            </Link>
          </div>

          {/* Beneficiaries */}
          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center text-success-600 mb-1">
              <UserCheck size={22} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-success-700 font-mono">
              {stats.beneficiaries}+
            </div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mt-0.5">
              {t.metrics.completedTitle}
            </span>
          </div>

          {/* Legal Compliance */}
          <div className="pt-4 md:pt-0">
            <div className="flex items-center justify-center text-primary-700 mb-1">
              <ShieldCheck size={22} />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-900 font-mono">
              100%
            </div>
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mt-0.5">
              {language === 'fr' ? 'Conformité Légale' : language === 'en' ? 'Legal Compliance' : language === 'es' ? 'Conformidad Legal' : 'Conformidade Legal'}
            </span>
          </div>
        </div>
      </section>

      {/* Streamlined Portal Gateway on Home (replaces heavy inline form modal) */}
      <section className="py-16 sm:py-20 px-6 max-w-[1160px] mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-2">
            {language === 'fr' ? 'Centre d’Accueil Officiel' : language === 'en' ? 'Official Service Center' : language === 'es' ? 'Centro de Atención Oficial' : 'Central de Atendimento Oficial'}
          </span>
          <h2 className="text-3xl sm:text-4xl text-primary-950 font-serif font-bold">
            {t.appointments.title}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base max-w-xl mx-auto mt-2">
            {language === 'fr'
              ? 'Toutes vos démarches et consultations sont centralisées sur notre portail dédié pour garantir rapidité, confidentialité et transparence.'
              : language === 'en'
              ? 'All appointments and inquiries are centralized on our dedicated portal ensuring speed, privacy, and full transparency.'
              : language === 'es'
              ? 'Centralizamos todas las citas y consultas en nuestro portal para garantizar rapidez, privacidad y transparencia.'
              : 'Centralizamos todas as marcações e consultas no nosso portal dedicado para garantir rapidez, privacidade e transparência.'}
          </p>
        </div>

        {/* 2 Clean Gateway Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Pathway A: Novo Agendamento */}
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-neutral-200 shadow-md hover:border-primary-400 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-800 flex items-center justify-center mb-5">
                <Calendar size={26} />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary-950 mb-2">
                {t.appointments.tabNew}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                {language === 'fr'
                  ? 'Sélectionnez la démarche souhaitée, l’accueil sur place à Bissau ou en visioconférence, et précisez l’objet de votre dossier.'
                  : language === 'en'
                  ? 'Select the desired service, in-person meeting in Bissau or remote video call, and provide details of your application.'
                  : language === 'es'
                  ? 'Elija el servicio deseado, la modalidad presencial en Bissau o videoconferencia, e indique los detalles de su expediente.'
                  : 'Escolha o serviço desejado, a modalidade presencial em Bissau ou videoconferência, e indique o motivo do seu pedido de nacionalidade.'}
              </p>
              
              <div className="space-y-2.5 mb-6 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-700 shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Rendez-vous en personne ou consultation par visioconférence'
                      : language === 'en'
                      ? 'Appointments in person or by video consultation'
                      : language === 'es'
                      ? 'Atención presencial o consulta por videoconferencia'
                      : 'Atendimento presencial ou consulta por videoconferência'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary-700 shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Choix de la date et du créneau horaire officiel'
                      : language === 'en'
                      ? 'Selection of official appointment date and time slot'
                      : language === 'es'
                      ? 'Elección de fecha y horario oficial de atención'
                      : 'Escolha de data e horário oficial de atendimento'}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/agendamento"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-primary-950 hover:bg-primary-900 text-white rounded-xl font-bold text-sm shadow-md transition-all uppercase tracking-wide"
            >
              <Calendar size={18} />
              <span>
                {language === 'fr'
                  ? 'Accéder au Formulaire de Rendez-vous'
                  : language === 'en'
                  ? 'Open Appointment Booking Form'
                  : language === 'es'
                  ? 'Acceder al Formulario de Cita'
                  : 'Aceder ao Formulário de Agendamento'}
              </span>
            </Link>
          </div>

          {/* Pathway B: Consultar por Protocolo */}
          <div className="bg-white p-7 sm:p-8 rounded-2xl border border-neutral-200 shadow-md hover:border-accent-500 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent-50 text-accent-700 flex items-center justify-center mb-5">
                <Search size={26} />
              </div>
              <h3 className="text-xl font-serif font-bold text-primary-950 mb-2">
                {t.appointments.trackerTitle}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                {language === 'fr'
                  ? 'Vous avez déjà un rendez-vous ou dossier en cours ? Suivez l’avancement de vos pièces d’identité, casier judiciaire ou décret avec votre numéro de protocole.'
                  : language === 'en'
                  ? 'Already have an appointment or ongoing application? Track the status of your certificates, clearances, or ministerial decree with your protocol number.'
                  : language === 'es'
                  ? '¿Ya tiene una cita o expediente en curso? Consulte el estado de sus actas, antecedentes penales o dictamen con su número de protocolo.'
                  : 'Já possui um agendamento ou pedido em curso? Consulte a fase da sua certidão, registo criminal ou parecer ministerial pelo protocolo.'}
              </p>

              <div className="space-y-2 mb-6 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-600 shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Suivi en direct sans besoin de déplacement physique'
                      : language === 'en'
                      ? 'Instant online tracking without in-person travel'
                      : language === 'es'
                      ? 'Rastreo inmediato sin desplazamientos'
                      : 'Rastreio imediato sem necessidade de deslocação'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-accent-600 shrink-0" />
                  <span>
                    {language === 'fr'
                      ? 'Mises à jour des décrets et retrait des documents'
                      : language === 'en'
                      ? 'Updates on ministerial decrees and document collection'
                      : language === 'es'
                      ? 'Actualizaciones de dictámenes y recogida de documentos'
                      : 'Atualizações de despacho e levantamento de documentos'}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/agendamento?tab=consultar"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-accent-500 hover:bg-accent-400 text-neutral-950 rounded-xl font-bold text-sm shadow-md transition-all uppercase tracking-wide"
            >
              <Search size={18} />
              <span>
                {language === 'fr'
                  ? 'Consulter le Statut / Protocole'
                  : language === 'en'
                  ? 'Track Appointment / File'
                  : language === 'es'
                  ? 'Rastrear Cita / Expediente'
                  : 'Rastrear Agendamento / Processo'}
              </span>
            </Link>
          </div>

        </div>

      </section>

      {/* Target Audience ("Destinamo-nos a") */}
      <section className="py-20 bg-white border-y border-neutral-200">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-2">
              EMDPN-GB · República da Guiné-Bissau
            </span>
            <h2 className="text-3xl sm:text-4xl text-primary-950 font-serif font-bold">
              {t.audience.sectionTitle}
            </h2>
            <p className="text-neutral-500 max-w-xl mx-auto text-sm mt-2">
              {t.audience.sectionSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual showcase card: Consular Identity Bureau in Bissau (Segunda Imagem) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-lg h-full flex flex-col justify-between bg-neutral-900 group">
                <img 
                  src={customImages.audienceShowcase || DEFAULT_IMAGES.audienceShowcase} 
                  alt="Atendimento consular e identificação civil em Bissau" 
                  referrerPolicy="no-referrer"
                  className="w-full h-[260px] sm:h-[300px] lg:h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-accent-400 text-xs font-bold uppercase tracking-wider">
                      Gabinete Notarial & Consular
                    </span>
                    {isAuthenticated && (
                      <Link 
                        to="/admin?tab=dev" 
                        className="text-[10px] bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded font-bold backdrop-blur-xs"
                      >
                        ⚙️ Alterar Imagem
                      </Link>
                    )}
                  </div>
                  <h4 className="text-white text-base font-bold font-serif leading-snug">
                    Atendimento humanizado para cidadãos residentes, diáspora e retornados
                  </h4>
                  <p className="text-neutral-300 text-xs mt-1.5 font-light">
                    Tramitação transparente e direta com a Direção de Identificação Civil e Registos da Guiné-Bissau.
                  </p>
                </div>
              </div>
            </div>

            {/* The 4 Audience Cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
              {targetAudience.map((item, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="h-full p-6 rounded-2xl border border-neutral-200 bg-neutral-50/70 hover:bg-white hover:border-primary-300 hover:shadow-lg transition-all flex flex-col justify-start">
                    <div className="w-11 h-11 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-xs shrink-0 mb-3 text-primary-700">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-primary-950 text-sm sm:text-base mb-1.5">{item.title}</h3>
                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>

          {/* Legal commitment quote requested by Claudio */}
          <div className="mt-12 bg-primary-950 text-white p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider block mb-2">
                Compromisso Ético & Jurídico
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                "O nosso compromisso é não burlar o Estado Guineense nem o nosso cliente."
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-light">
                Todos os processos são tratados com estrita legalidade, cobrando apenas as taxas oficiais do Estado e os nossos honorários de serviço, com um atendimento especial, digno e humanizado.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-accent-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> Parceria com Ministérios Oficiais</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> Taxas Transparentes do Cofre da Justiça</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={16} /> Sem Intermediários Ilegais</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Partnerships: Parceiro de Estado */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1160px] mx-auto px-6 text-center">
          <span className="text-accent-600 text-xs font-bold uppercase tracking-wider block mb-2">
            {language === 'fr' ? 'Relations Gouvernementales' : language === 'en' ? 'Governmental Relations' : language === 'es' ? 'Relaciones Gubernamentales' : 'Relações Governamentais'}
          </span>
          <h2 className="text-2xl sm:text-3xl text-primary-950 font-serif font-bold mb-3">
            {t.partners.title}
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm max-w-xl mx-auto mb-10">
            {t.partners.subtitle}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {institutionalPartners.map((partner, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-sm text-center flex flex-col items-center hover:shadow-md transition-shadow justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center mb-3 mx-auto">
                    <Building size={24} />
                  </div>
                  <h4 className="font-bold text-primary-950 text-xs uppercase mb-1 leading-snug">{partner.name}</h4>
                </div>
                <p className="text-neutral-500 text-[11px] leading-relaxed mt-2">{partner.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-primary-950 font-serif font-bold mb-2">Como Funciona o Agendamento</h2>
            <p className="text-neutral-500 text-sm">Quatro passos simples até à conclusão do seu dossiê</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '1', title: 'Agendamento Online', desc: 'Escolhe o serviço, modalidade presencial ou remota, data e hora conveniente.' },
              { n: '2', title: 'Triagem e Tradução', desc: 'Verificamos certidões, antecedentes e traduzimos oficialmente para Português.' },
              { n: '3', title: 'Submissão Oficial', desc: 'Entregamos o dossiê formal junto do Ministério da Justiça e Interior.' },
              { n: '4', title: 'Emissão e Entrega', desc: 'Acompanhamos o despacho, registo civil, BI e Passaporte concedidos.' },
            ].map((step, idx) => (
              <div key={idx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 relative group hover:border-primary-400 transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary-900 text-white font-bold flex items-center justify-center mb-4 text-sm font-mono">
                  {step.n}
                </div>
                <h3 className="font-bold text-primary-950 text-base mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery showing official logo & requirements paper */}
      <Gallery />

      {/* CTA final */}
      <section className="cta-gradient text-white py-16 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
            Pronto para Dar Início ao Seu Processo?
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mb-8 font-light">
            Faça hoje o seu agendamento ou entre em contacto direto com a nossa equipa em Bissau.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/agendamento" className="btn btn-primary px-8 py-3.5 text-sm uppercase tracking-wide">
              Fazer Agendamento Online
            </Link>
            <a 
              href="https://wa.me/245957000555" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp px-8 py-3.5 text-sm uppercase tracking-wide"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
