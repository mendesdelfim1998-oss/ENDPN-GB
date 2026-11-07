import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { MapPin, Phone, Mail, Send, Check, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFICIAL_EMAILS, OFFICIAL_EMAILS_MAILTO } from '../services/appointmentService';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { t, language } = useLanguage();
  const { showToast, success, error } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: 'Processo de Naturalização e Agendamento',
    msg: ''
  });
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) {
      error(language === 'fr' ? 'Veuillez saisir votre nom et prénom.' : language === 'en' ? 'Please fill in your full name.' : language === 'es' ? 'Por favor ingrese su nombre y apellido completo.' : 'Por favor preencha o seu Nome e Apelido completo.');
      return;
    }
    const txt = `*NOVA MENSAGEM VIA SITE EMDPN-GB*\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Telefone:* ${formData.telefone || 'Não indicado'}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*Assunto:* ${formData.assunto}\n` +
      `*Mensagem:* ${formData.msg}\n\n` +
      `_Encaminhado para o e-mail oficial: infor.ciesemdpngb@gmail.com_`;
    
    window.open(`https://wa.me/245957000555?text=${encodeURIComponent(txt)}`, '_blank');
    setStatus('success');
    success(t.contact.sendSuccess);
  };

  const handleEmailToOfficial = () => {
    if (!formData.nome.trim() || !formData.email.trim()) {
      error(language === 'fr' ? 'Veuillez remplir au moins votre nom et votre adresse e-mail.' : language === 'en' ? 'Please fill in at least your name and email.' : language === 'es' ? 'Por favor complete al menos su nombre y correo.' : 'Por favor preencha pelo menos o seu Nome e E-mail.');
      return;
    }
    const subject = encodeURIComponent(`Contacto via site EMDPN-GB: ${formData.assunto} - ${formData.nome}`);
    const body = encodeURIComponent(
      `Mensagem enviada através do portal oficial EMDPN-GB:\n\n` +
      `Nome Completo: ${formData.nome}\n` +
      `Telefone/WhatsApp: ${formData.telefone || 'Não indicado'}\n` +
      `E-mail do Requerente: ${formData.email}\n` +
      `Assunto: ${formData.assunto}\n\n` +
      `Mensagem:\n${formData.msg || 'Sem mensagem adicional'}\n\n` +
      `-------------------------------------------------------------\n` +
      `Enviado para o e-mail oficial do EMDPN-GB:\n` +
      `infor.ciesemdpngb@gmail.com`
    );
    window.location.href = `mailto:${OFFICIAL_EMAILS_MAILTO}?subject=${subject}&body=${body}`;
    success('A preparar e-mail para infor.ciesemdpngb@gmail.com...');
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHeader 
        title={t.contact.title} 
        subtitle={t.contact.subtitle} 
      />
      
      <section className="py-16 sm:py-20">
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            
            {/* Form Column */}
            <Reveal>
              <div className="bg-white p-7 sm:p-9 rounded-2xl border border-neutral-200 shadow-sm">
                <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-1">
                  {language === 'fr' ? 'Assistance & Renseignements' : language === 'en' ? 'Inquiries & Consultation' : language === 'es' ? 'Atención y Consultas' : 'Atendimento & Esclarecimentos'}
                </span>
                <h2 className="text-2xl sm:text-3xl text-primary-950 font-serif font-bold mb-6">
                  {t.contact.formTitle}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider text-neutral-700">
                      {t.contact.labelName}
                    </label>
                    <input 
                      type="text" 
                      value={formData.nome}
                      onChange={e => setFormData({...formData, nome: e.target.value})}
                      placeholder={t.contact.placeholderName}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                      required 
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider text-neutral-700">
                        {t.contact.labelEmail}
                      </label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="nome@exemplo.com"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider text-neutral-700">
                        {t.contact.labelPhone}
                      </label>
                      <input 
                        type="tel" 
                        value={formData.telefone}
                        onChange={e => setFormData({...formData, telefone: e.target.value})}
                        placeholder="+245 / +1 / +351..."
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider text-neutral-700">
                      {t.contact.labelService}
                    </label>
                    <select
                      value={formData.assunto}
                      onChange={e => setFormData({...formData, assunto: e.target.value})}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm bg-white"
                    >
                      <option value="Processo de Naturalização">{language === 'fr' ? 'Naturalisation & Citoyenneté' : language === 'en' ? 'Naturalization & Citizenship' : language === 'es' ? 'Naturalización y Ciudadanía' : 'Processo de Naturalização (Nacionalidade)'}</option>
                      <option value="Aquisição por Casamento">{language === 'fr' ? 'Nationalité par Mariage' : language === 'en' ? 'Nationality by Marriage' : language === 'es' ? 'Nacionalidad por Matrimonio' : 'Aquisição de Nacionalidade por Casamento'}</option>
                      <option value="Diáspora e Década do Retorno">{language === 'fr' ? 'Diaspora & Retour aux Origines' : language === 'en' ? 'Diaspora & Return Movement' : language === 'es' ? 'Diáspora y Retorno Ancestral' : 'Diáspora Guineense e Década do Retorno'}</option>
                      <option value="Emissão de Passaporte e BI">{language === 'fr' ? 'Passeport Biométrique & Carte d’Identité' : language === 'en' ? 'Biometric Passport & ID Card' : language === 'es' ? 'Pasaporte Biométrico y Carnet' : 'Emissão de Passaporte Biométrico e BI'}</option>
                      <option value="Cédulas e Registo Criminal">{language === 'fr' ? 'Extrait d’Acte & Casier Judiciaire' : language === 'en' ? 'Birth Record & Criminal Record' : language === 'es' ? 'Cédula y Antecedentes Penales' : 'Cédula Pessoal e Registo Criminal'}</option>
                      <option value="Outro Assunto">{language === 'fr' ? 'Autre Demande' : language === 'en' ? 'Other Matter' : language === 'es' ? 'Otro Asunto' : 'Outro Assunto'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1.5 text-xs uppercase tracking-wider text-neutral-700">
                      {t.contact.labelMessage}
                    </label>
                    <textarea 
                      value={formData.msg}
                      onChange={e => setFormData({...formData, msg: e.target.value})}
                      placeholder={language === 'fr' ? 'Ex: Enfant de père ou mère guinéen(ne) né(e) à l’étranger...' : language === 'en' ? 'Ex: Child of Guinean father or mother born abroad...' : language === 'es' ? 'Ej: Hijo de padre o madre guineana nacido en el extranjero...' : 'Ex: Filho de mãe ou pai guineense nascido no estrangeiro. Descreva os detalhes do seu pedido, prazos de viagem e documentos disponíveis...'}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm min-h-[110px] resize-vertical"
                      required 
                    ></textarea>
                  </div>
                  
                  {/* Two submit action buttons: WhatsApp and Direct Email to the single official address */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" className="btn btn-whatsapp flex-1 justify-center py-3 text-xs uppercase tracking-wider font-bold">
                      <Send size={16} /> {language === 'fr' ? 'Envoyer par WhatsApp' : language === 'en' ? 'Send via WhatsApp' : language === 'es' ? 'Enviar por WhatsApp' : 'Enviar via WhatsApp'}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleEmailToOfficial} 
                      className="btn btn-institutional flex-1 justify-center py-3 text-xs uppercase tracking-wider font-bold"
                    >
                      <Mail size={16} /> {language === 'fr' ? 'Envoyer par E-mail' : language === 'en' ? 'Send via Official Email' : language === 'es' ? 'Enviar por Correo Oficial' : 'Enviar por E-mail Oficial'}
                    </button>
                  </div>

                  {status === 'success' && (
                    <div className="mt-4 p-4 bg-success-50 border border-success-200 rounded-lg text-success-800 text-xs font-bold flex items-center gap-2">
                      <Check size={18} className="text-success-600" /> 
                      {t.contact.sendSuccess}
                    </div>
                  )}
                </form>

                {/* Direct quick action to universal booking */}
                <div className="mt-8 p-5 bg-primary-50 rounded-xl border border-primary-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-primary-950 uppercase tracking-wider mb-0.5">
                      {language === 'fr' ? 'Préférez-vous réserver une date précise ?' : language === 'en' ? 'Prefer to book an exact date and time?' : language === 'es' ? '¿Prefiere reservar fecha y hora exacta?' : 'Prefere agendar data e hora exata?'}
                    </h4>
                    <p className="text-xs text-neutral-600">
                      {language === 'fr' ? 'La prise de rendez-vous en ligne génère un numéro de protocole officiel immédiat.' : language === 'en' ? 'Online booking generates an official receipt with a protocol number.' : language === 'es' ? 'La reserva en línea genera un comprobante oficial con número de protocolo.' : 'O agendamento online poupa tempo e gera de imediato o comprovativo oficial com número de protocolo.'}
                    </p>
                  </div>
                  <Link 
                    to="/agendamento" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary-700 hover:bg-primary-800 px-4 py-2.5 rounded-lg shrink-0 shadow-sm"
                  >
                    <Calendar size={14} /> {language === 'fr' ? 'Prendre RDV' : language === 'en' ? 'Book Online' : language === 'es' ? 'Agendar' : 'Agendar Online'} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
            
            {/* Information Column */}
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <span className="text-accent-600 text-xs font-black uppercase tracking-widest block mb-1">
                    {t.contact.chatTitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl text-primary-950 font-serif font-bold mb-4">
                    {language === 'fr' ? 'Informations de Contact' : language === 'en' ? 'Contact Details' : language === 'es' ? 'Datos de Contacto' : 'Informações de Contacto'}
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    {language === 'fr' 
                      ? 'Utilisez nos canaux officiels pour l’envoi de vos pièces, le suivi de votre dossier ou pour échanger avec notre équipe.'
                      : language === 'en'
                      ? 'Use our official channels to submit records, inquire about pending files, or schedule legal audiences.'
                      : language === 'es'
                      ? 'Utilice nuestros canales oficiales para enviar documentos, realizar consultas o agendar audiencias legales.'
                      : 'Utilize os nossos canais oficiais para envio de comprovativos, dúvidas ou marcação de audiências com a Direção.'}
                  </p>
                </div>

                <div className="grid gap-4">
                  {/* Single Official Email Card */}
                  <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider">
                          {t.contact.emailTitle}
                        </h3>
                        <span className="text-[11px] text-neutral-500">
                          {language === 'fr' ? 'Adresse unique pour la réception des actes et dossiers' : language === 'en' ? 'Single official inbox for all official records and applications' : language === 'es' ? 'Canal único para recepción de documentos y solicitudes' : 'Canal oficial para envio de documentos e processos'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <div className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                        <div>
                          <span className="text-[10px] font-bold text-accent-700 uppercase tracking-wider block">
                            {language === 'fr' ? 'Adresse Officielle :' : language === 'en' ? 'Official Address:' : language === 'es' ? 'Dirección Oficial:' : 'Endereço Oficial:'}
                          </span>
                          <a 
                            href="mailto:infor.ciesemdpngb@gmail.com" 
                            className="font-mono text-sm sm:text-base font-bold text-primary-700 hover:text-primary-950 hover:underline"
                          >
                            infor.ciesemdpngb@gmail.com
                          </a>
                        </div>
                        <a 
                          href="mailto:infor.ciesemdpngb@gmail.com"
                          className="text-xs bg-white border border-neutral-300 hover:border-primary-600 px-3.5 py-2 rounded-lg font-semibold text-neutral-700 shadow-xs"
                        >
                          {language === 'fr' ? 'Écrire' : language === 'en' ? 'Compose' : language === 'es' ? 'Escribir' : 'Escrever'}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone & WhatsApp Card */}
                  <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-success-100 text-success-800 flex items-center justify-center shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-0.5">
                        {language === 'fr' ? 'Ligne Téléphonique & WhatsApp Officiel' : language === 'en' ? 'Official Phone Line & WhatsApp' : language === 'es' ? 'Línea Telefónica y WhatsApp Oficial' : 'Linha Telefónica & WhatsApp Oficial'}
                      </h3>
                      <p className="text-neutral-500 text-xs mb-2">
                        {language === 'fr' ? 'Assistance immédiate pour toutes vos questions.' : language === 'en' ? 'Immediate assistance for statutory requirements and questions.' : language === 'es' ? 'Atención inmediata para resolver sus dudas.' : 'Atendimento imediato para esclarecimento de requisitos e dúvidas.'}
                      </p>
                      <a 
                        href="https://wa.me/245957000555" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-mono text-base font-bold text-success-700 hover:underline"
                      >
                        +245 957000555
                      </a>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-800 flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary-950 uppercase tracking-wider mb-0.5">
                        {t.contact.officeTitle}
                      </h3>
                      <p className="text-neutral-600 text-xs leading-relaxed">
                        {t.contact.officeAddress}
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="p-5 bg-accent-50 rounded-2xl border border-accent-200">
                    <h3 className="text-primary-950 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ShieldCheck size={16} className="text-accent-700" /> {t.contact.hoursTitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-y-1.5 text-xs text-neutral-700 font-medium">
                      <span>{language === 'fr' ? 'Lundi au Vendredi :' : language === 'en' ? 'Monday to Friday:' : language === 'es' ? 'Lunes a Viernes:' : 'Segunda a Sexta-feira:'}</span>
                      <span className="text-right font-bold text-primary-950">08:00 - 18:00 (GMT)</span>
                      <span>{language === 'fr' ? 'Samedis :' : language === 'en' ? 'Saturdays:' : language === 'es' ? 'Sábados:' : 'Sábados:'}</span>
                      <span className="text-right font-bold text-primary-950">09:00 - 13:00 (GMT)</span>
                      <span>{language === 'fr' ? 'Dimanches & Fériés :' : language === 'en' ? 'Sundays & Holidays:' : language === 'es' ? 'Domingos y Feriados:' : 'Domingos e Feriados:'}</span>
                      <span className="text-right text-flag-700 font-bold">{language === 'fr' ? 'Fermé' : language === 'en' ? 'Closed' : language === 'es' ? 'Cerrado' : 'Fechado'}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-2 border-t border-accent-200/60 pt-2">
                      * {language === 'fr' ? 'Assistance en ligne pour la diaspora adaptée aux fuseaux horaires internationaux.' : language === 'en' ? 'Online assistance for global diaspora accommodating international timezones.' : language === 'es' ? 'Atención en línea a la diáspora adaptada a diferentes husos horarios.' : 'Atendimento online à diáspora com adaptação a fusos horários internacionais.'}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
