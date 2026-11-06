import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { 
  Users, 
  Building, 
  FileText, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShieldCheck,
  Heart,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { getCustomImages, DEFAULT_IMAGES } from '../services/imageService';

export function About() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'estatuto' | 'orgaos' | 'parcerias' | 'principios'>('estatuto');
  const [customImages, setCustomImages] = useState(getCustomImages());
  const { error, success } = useToast();

  React.useEffect(() => {
    const handleUpdate = () => setCustomImages(getCustomImages());
    window.addEventListener('emdpn_images_updated', handleUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleUpdate);
  }, []);

  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    phone: '',
    supportType: 'advice',
    amount: '10000',
    customAmount: '',
    officeSupplies: '',
    feedback: ''
  });

  const supportTypeOptions = [
    {
      value: 'advice',
      label: language === 'fr' 
        ? '1. Conseils et recommandations' 
        : language === 'en' 
        ? '1. Advisory advice and comments' 
        : language === 'es' 
        ? '1. Consejos y recomendaciones' 
        : '1. Comentários de conselhos'
    },
    {
      value: 'suggestions',
      label: language === 'fr' 
        ? '2. Suggestions et avis sur le fonctionnement institutionnel' 
        : language === 'en' 
        ? '2. Suggestions & constructive institutional feedback' 
        : language === 'es' 
        ? '2. Sugerencias y críticas sobre el funcionamiento institucional' 
        : '2. Sugestão e críticas ligadas ao funcionamento Institucional'
    },
    {
      value: 'supplies',
      label: language === 'fr' 
        ? '3. Don de matériel de bureau' 
        : language === 'en' 
        ? '3. Office supplies contribution' 
        : language === 'es' 
        ? '3. Aporte de material de oficina' 
        : '3. Apoio de material de escritório'
    },
    {
      value: 'financial',
      label: language === 'fr' 
        ? '4. Soutien financier volontaire aux services du cabinet' 
        : language === 'en' 
        ? '4. Voluntary financial contribution for bureau services' 
        : language === 'es' 
        ? '4. Apoyo financiero voluntario a la institución por sus servicios' 
        : '4. Apoio Financeiro à instituição pelos seus serviços'
    }
  ];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.name.trim() || !supportForm.email.trim()) {
      error(
        language === 'fr' 
          ? 'Veuillez renseigner au moins votre Nom et votre E-mail.' 
          : language === 'en' 
          ? 'Please enter at least your Name and Email address.' 
          : language === 'es' 
          ? 'Por favor complete al menos su Nombre y Correo Electrónico.' 
          : 'Por favor preencha pelo menos o seu Nome e E-mail.'
      );
      return;
    }

    if (supportForm.supportType === 'financial') {
      const finalAmount = supportForm.amount === 'custom' ? `${supportForm.customAmount}` : `${supportForm.amount} FCFA`;
      success(
        language === 'fr'
          ? `Merci pour votre précieux soutien financier (${finalAmount}) ! Enregistré avec confidentialité et gratitude institutionnelle.`
          : language === 'en'
          ? `Thank you for your generous financial contribution (${finalAmount})! Recorded with strict confidentiality and institutional gratitude.`
          : language === 'es'
          ? `¡Gracias por su valioso apoyo financiero (${finalAmount})! Registrado con confidencialidad y gratitud institucional.`
          : `Obrigado pelo seu valioso apoio financeiro (${finalAmount})! Registado com confidencialidade e gratidão institucional.`
      );
    } else if (supportForm.supportType === 'supplies') {
      success(
        language === 'fr'
          ? 'Merci pour votre noble offre de don de matériel de bureau ! Notre direction prendra contact avec vous.'
          : language === 'en'
          ? 'Thank you for your generous offer of office supplies! Our team will get in touch to coordinate reception.'
          : language === 'es'
          ? '¡Gracias por su generoso aporte de material de oficina! Nos comunicaremos para coordinar la entrega.'
          : 'Obrigado pela sua nobre oferta de apoio em material de escritório! Entraremos em contacto para coordenar a receção.'
      );
    } else {
      success(
        language === 'fr'
          ? 'Merci pour votre message et précieuse contribution ! La Direction de l’EMDPN-GB vous remercie sincèrement.'
          : language === 'en'
          ? 'Thank you for your valuable feedback and comments! The EMDPN-GB Directorate appreciates your participation.'
          : language === 'es'
          ? '¡Gracias por sus comentarios y valiosa participación! La Dirección de EMDPN-GB agradece su mensaje.'
          : 'Obrigado pelo seu comentário e valiosa contribuição! A Direção do EMDPN-GB agradece a sua participação.'
      );
    }

    setSupportForm({
      name: '',
      email: '',
      phone: '',
      supportType: 'advice',
      amount: '10000',
      customAmount: '',
      officeSupplies: '',
      feedback: ''
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHeader 
        title={t.about.title} 
        subtitle={t.about.subtitle} 
      />
      
      {/* Presentation section with official team image */}
      <section className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-accent-500 to-primary-700 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-white p-3 rounded-2xl border border-neutral-200 shadow-xl overflow-hidden">
                    <img 
                      src={customImages.aboutOffice || DEFAULT_IMAGES.aboutOffice} 
                      alt={t.about.photoAlt} 
                      className="w-full h-auto rounded-xl object-contain max-h-[440px] mx-auto"
                    />
                    <div className="mt-3 p-3 bg-neutral-50 rounded-lg text-center border border-neutral-100">
                      <span className="text-xs font-bold text-primary-950 block">{t.about.sealTitle}</span>
                      <span className="text-[11px] text-neutral-500">{t.about.sealLocation}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7">
              <Reveal delay={0.15}>
                <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-2">
                  {t.about.introBadge}
                </span>
                <h2 className="text-3xl sm:text-4xl text-primary-950 font-serif font-bold mb-2 leading-tight">
                  {t.about.introTitle}
                </h2>
                <p className="text-accent-700 font-serif font-bold text-lg sm:text-xl mb-4 italic">
                  {t.about.introMotto}
                </p>
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-4">
                  {t.about.introDesc}
                </p>
                
                <div className="p-4 rounded-xl bg-primary-50/60 border border-primary-200/60 mb-4">
                  <h4 className="font-bold text-primary-950 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-primary-800" /> {t.about.ourMissionTitle}
                  </h4>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    {t.about.ourMissionDesc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 mb-6">
                  <h4 className="font-bold text-primary-950 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Users size={16} className="text-primary-800" /> {t.about.scopeTitle}
                  </h4>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {t.about.scopeDesc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/agendamento" className="btn btn-primary text-xs uppercase tracking-wider py-3.5 px-6">
                    <Calendar size={16} /> {t.about.btnBookOnline}
                  </Link>
                  <Link to="/contactos" className="btn btn-outline text-xs uppercase tracking-wider py-3.5 px-6">
                    <Mail size={16} /> {t.about.btnContactDirector}
                  </Link>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 7 Procedimentos de Apoio e Regularização */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-2">
              {t.about.procBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary-950 mb-3">
              {t.about.procTitle}
            </h2>
            <p className="text-neutral-600 text-sm">
              {t.about.procSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {t.about.procedures.map((proc, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-start gap-3.5 hover:shadow-md transition-shadow ${proc.fullWidth ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg bg-accent-50 text-accent-700 flex items-center justify-center font-bold text-sm shrink-0 border border-accent-200">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-primary-950 text-sm leading-snug mb-1">{proc.title}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">{proc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Bridge & Operating Principles */}
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="p-7 sm:p-8 rounded-2xl bg-primary-950 text-white flex flex-col justify-between">
              <div>
                <span className="text-accent-400 text-xs font-bold uppercase tracking-wider block mb-2">{t.about.bridgeBadge}</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3">
                  {t.about.bridgeTitle}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
                  {t.about.bridgeDesc}
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-accent-300 font-semibold">
                <CheckCircle2 size={16} /> {t.about.bridgeHighlight}
              </div>
            </div>

            <div className="p-7 sm:p-8 rounded-2xl bg-white border border-neutral-200 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-accent-600 text-xs font-bold uppercase tracking-wider block mb-2">{t.about.principlesBadge}</span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary-950 mb-3">
                  {t.about.principlesTitle}
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {t.about.principlesDesc}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-accent-50/70 border border-accent-200/80">
                <p className="font-serif italic text-primary-950 text-xs sm:text-sm leading-relaxed text-center font-medium">
                  {t.about.principlesQuote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Statutes and Team Tabs */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-2">
              {t.about.statuteBadge}
            </span>
            <h2 className="text-3xl sm:text-4xl text-primary-950 font-serif font-bold">
              {t.about.statuteTitle}
            </h2>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'estatuto', label: t.about.tabStatus },
              { id: 'orgaos', label: t.about.tabOrgans },
              { id: 'parcerias', label: t.about.tabPartnership },
              { id: 'principios', label: t.about.tabPrinciples },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xs ${
                  activeTab === tab.id
                    ? 'bg-primary-950 text-white shadow-md'
                    : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Estatuto */}
          {activeTab === 'estatuto' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {t.about.statuteChapters.map((cap, idx) => (
                <div key={idx} className="bg-white p-7 sm:p-9 rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-100">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-900 font-mono font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent-700 uppercase tracking-widest">{cap.numero}</span>
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-primary-950">{cap.titulo}</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {cap.artigos.map((art, i) => (
                      <li key={i} className="text-neutral-700 text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-accent-500">
                        {art}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Orgaos */}
          {activeTab === 'orgaos' && (
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {t.about.organs.map((org, idx) => (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-neutral-200 shadow-sm text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary-900 text-white flex items-center justify-center mb-4 text-xl font-serif font-bold shadow-md">
                    {org.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-accent-700 uppercase tracking-wider mb-1">{org.role}</span>
                  <h4 className="font-bold text-primary-950 text-base mb-2">{org.name}</h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">{org.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Parcerias */}
          {activeTab === 'parcerias' && (
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm max-w-4xl mx-auto space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary-950">{t.about.partnershipsTitle}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {t.about.partnershipsDesc}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.about.partnershipsList.map((partner, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                    <h5 className="font-bold text-primary-950 text-sm mb-1">{partner.name}</h5>
                    <p className="text-neutral-500 text-xs">{partner.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Principios */}
          {activeTab === 'principios' && (
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-sm max-w-4xl mx-auto space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary-950">{t.about.principlesCommitmentTitle}</h3>
              <blockquote className="text-lg font-serif italic text-primary-900 border-l-4 border-accent-500 pl-4 py-2 bg-accent-50/50 rounded-r-xl">
                {t.about.principlesCommitmentQuote}
              </blockquote>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {t.about.principlesCommitmentDesc}
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Support, Solidarity and Voluntary Feedback */}
      <section className="py-20 bg-white border-t border-neutral-200">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 text-white p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-accent-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Heart size={14} className="text-accent-400" />
                <span>{t.about.supportSectionTitle}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
                {t.about.supportFormTitle}
              </h2>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                {t.about.supportFormDesc}
              </p>
            </div>

            <form onSubmit={handleSupportSubmit} className="relative z-10 space-y-5 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/15 backdrop-blur-md">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                    {t.about.fieldName} *
                  </label>
                  <input 
                    type="text"
                    required
                    value={supportForm.name}
                    onChange={e => setSupportForm({...supportForm, name: e.target.value})}
                    placeholder={language === 'fr' ? 'Nom et prénom complets' : language === 'en' ? 'Full legal name' : language === 'es' ? 'Nombre y apellidos completos' : 'Nome e Apelido completo'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-accent-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                    {t.about.fieldEmail} *
                  </label>
                  <input 
                    type="email"
                    required
                    value={supportForm.email}
                    onChange={e => setSupportForm({...supportForm, email: e.target.value})}
                    placeholder={language === 'en' ? 'example@email.com' : 'exemplo@email.com'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-accent-400"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className={supportForm.supportType === 'financial' ? '' : 'sm:col-span-2'}>
                  <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                    {t.about.fieldSupportType}
                  </label>
                  <select
                    value={supportForm.supportType}
                    onChange={e => setSupportForm({...supportForm, supportType: e.target.value})}
                    className="w-full px-4 py-3 bg-neutral-900 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-accent-400"
                  >
                    {supportTypeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {supportForm.supportType === 'financial' && (
                  <div>
                    <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                      {t.about.fieldAmount}
                    </label>
                    <select
                      value={supportForm.amount}
                      onChange={e => setSupportForm({...supportForm, amount: e.target.value})}
                      className="w-full px-4 py-3 bg-neutral-900 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-accent-400"
                    >
                      <option value="5000">5.000 FCFA</option>
                      <option value="10000">10.000 FCFA</option>
                      <option value="25000">25.000 FCFA</option>
                      <option value="50000">50.000 FCFA</option>
                      <option value="custom">
                        {language === 'fr' 
                          ? 'Autre Montant Personnalisé' 
                          : language === 'en' 
                          ? 'Custom / Other Amount' 
                          : language === 'es' 
                          ? 'Otro Monto Personalizado' 
                          : 'Outro Valor / Personalizado'}
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {supportForm.supportType === 'financial' && supportForm.amount === 'custom' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                    {t.about.fieldCustomAmount}
                  </label>
                  <input 
                    type="text"
                    value={supportForm.customAmount}
                    onChange={e => setSupportForm({...supportForm, customAmount: e.target.value})}
                    placeholder={language === 'en' ? 'e.g. 50 USD / 50 EUR / 15,000 FCFA' : language === 'fr' ? 'Ex : 15.000 FCFA / 50 EUR / 50 USD' : language === 'es' ? 'Ej: 15.000 FCFA / 50 USD / 50 EUR' : 'Ex: 15.000 FCFA / 50 USD / 50 EUR'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-accent-400"
                  />
                </div>
              )}

              {supportForm.supportType === 'supplies' && (
                <div>
                  <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                    {t.about.fieldOfficeSupplies}
                  </label>
                  <input 
                    type="text"
                    value={supportForm.officeSupplies}
                    onChange={e => setSupportForm({...supportForm, officeSupplies: e.target.value})}
                    placeholder={language === 'fr' ? 'Ex : Rames de papier A4, toners d’impression, classeurs d’archives...' : language === 'en' ? 'e.g. A4 paper, printer toner cartridges, archive binders...' : language === 'es' ? 'Ej: Papel A4, tóneres de impresión, carpetas de archivo...' : 'Ex: Papel A4, toners de impressão, pastas de arquivo...'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-accent-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-neutral-200 uppercase tracking-wider mb-1.5">
                  {t.about.fieldFeedback}
                </label>
                <textarea 
                  rows={3}
                  value={supportForm.feedback}
                  onChange={e => setSupportForm({...supportForm, feedback: e.target.value})}
                  placeholder={t.about.placeholderFeedback}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-400 text-sm focus:outline-none focus:border-accent-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full py-4 bg-accent-500 hover:bg-accent-400 text-neutral-950 rounded-xl font-bold text-sm uppercase tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={18} /> {t.about.btnSubmitSupport}
                </button>
                <span className="block text-center text-[11px] text-neutral-400 mt-2.5">
                  🔒 {t.about.securityAssurance}
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Headquarter and Official Contacts */}
      <section className="py-16 bg-neutral-100 border-t border-neutral-200">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <span className="text-accent-600 text-xs font-bold uppercase tracking-wider block mb-1">
                {t.about.locationBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-950 mb-4">
                {t.about.locationTitle}
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-neutral-600 mb-6">
                <div className="flex gap-3 items-start">
                  <MapPin size={18} className="text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary-950 block">{t.about.locationAddressTitle}</strong>
                    {t.about.locationAddressValue}
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Phone size={18} className="text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary-950 block">{t.about.locationPhoneTitle}</strong>
                    <a href="https://wa.me/245957000555" className="text-primary-700 hover:underline font-mono">+245 957000555</a>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <Mail size={18} className="text-primary-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary-950 block">{t.about.locationEmailTitle}</strong>
                    <a href="mailto:infor.ciesemdpngb@gmail.com" className="text-primary-700 hover:underline block font-mono">infor.ciesemdpngb@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link to="/agendamento" className="btn btn-primary text-xs uppercase tracking-wider py-3 px-5">
                  <Calendar size={15} /> {t.about.btnLocationSchedule}
                </Link>
                <Link to="/contactos" className="btn btn-outline text-xs uppercase tracking-wider py-3 px-5">
                  {t.about.btnLocationContacts}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.305602052163!2d-15.654763!3d11.916053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMTHDvxP3Q6HwJv3A!5e0!3m2!1spt-PT!2sgw!4v1700000000000!5m2!1spt-PT!2sgw" 
                  className="w-full h-[360px] border-0 rounded-xl" 
                  allowFullScreen 
                  loading="lazy" 
                  title={language === 'fr' ? 'Siège EMDPN-GB à Safim' : language === 'en' ? 'EMDPN-GB Headquarters in Safim' : language === 'es' ? 'Sede de EMDPN-GB en Safim' : 'Sede EMDPN-GB em Safim'}
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
