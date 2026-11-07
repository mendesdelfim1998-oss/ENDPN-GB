import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  Send, 
  Building2, 
  Video, 
  CalendarCheck
} from 'lucide-react';
import { 
  getLocalizedOfficialServices, 
  getLocalizedUniversalCountries, 
  OFFICIAL_EMAILS_MAILTO,
  saveAppointment, 
  Appointment
} from '../services/appointmentService';
import { ServiceFeeOverrides } from '../services/serviceFeeService';
import { 
  sendAppointmentConfirmationEmail, 
  createMailtoBackupLink 
} from '../services/emailService';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  initialServiceId?: string;
  feeOverrides?: ServiceFeeOverrides;
  onSuccess?: (appointment: Appointment) => void;
  onClose?: () => void;
}

export function AppointmentBookingModal({ initialServiceId, feeOverrides, onSuccess }: Props) {
  const { showToast, success, error } = useToast();
  const { t, language } = useLanguage();
  const apt = t.appointments;

  const servicesList = getLocalizedOfficialServices(t, feeOverrides);
  const universalCountries = getLocalizedUniversalCountries(language);

  const [step, setStep] = useState(1);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    initialServiceId && servicesList.some(service => service.id === initialServiceId)
      ? initialServiceId
      : servicesList[0].id
  ]);
  const [modality, setModality] = useState<'presencial' | 'online'>('presencial');
  
  // Tomorrow as min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(tomorrowStr);
  const [time, setTime] = useState('10:00');
  
  const [selectedCountryCode, setSelectedCountryCode] = useState('GW');
  const [customCountryName, setCustomCountryName] = useState('');
  const [preferredChannel, setPreferredChannel] = useState('WhatsApp');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentNumber: '',
    notes: ''
  });

  const [completedAppointment, setCompletedAppointment] = useState<Appointment | null>(null);
  const [emailNotificationSent, setEmailNotificationSent] = useState<boolean>(false);
  const [emailRecipientAddress, setEmailRecipientAddress] = useState<string>('');

  const matchedCountry = universalCountries.find(c => c.code === selectedCountryCode);

  const timeSlots = [
    '08:30', '09:30', '10:30', '11:30', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const country = universalCountries.find(c => c.code === code);
    if (country && country.code !== 'OUTRO') {
      if (!formData.phone.startsWith(country.dial)) {
        setFormData(prev => ({
          ...prev,
          phone: country.dial + ' '
        }));
      }
    }
  };

  const handleNext = async () => {
    if (step === 3) {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        error(apt.validationError);
        return;
      }

      const countryName = selectedCountryCode === 'OUTRO' 
        ? (customCountryName.trim() || 'Internacional') 
        : (matchedCountry?.name || 'Guiné-Bissau');

      const selectedServices = servicesList.filter(s => selectedServiceIds.includes(s.id));
      const serviceNames = selectedServices.map(s => s.name).join(', ');
      const officialFees = selectedServices.map(s => s.fee).join(', ');
      const serviceType = selectedServiceIds.join(',');

      try {
        const created = await saveAppointment({
        serviceType: serviceType,
        serviceName: serviceNames,
        officialFee: officialFees,
        modality,
        date,
        time,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        documentNumber: formData.documentNumber || 'A apresentar',
        countryOfResidence: countryName,
        countryCode: selectedCountryCode,
        preferredChannel,
        notes: formData.notes
        });

      setCompletedAppointment(created);
      success(`${apt.toastSuccess}${created.protocolNumber}`);
      if (onSuccess) onSuccess(created);

      // Automatic confirmation email delivery to applicant
      const targetEmail = created.email && created.email.includes('@') 
        ? created.email.trim() 
        : 'infor.ciesemdpngb@gmail.com';
      setEmailRecipientAddress(targetEmail);

      try {
        const emailRes = await sendAppointmentConfirmationEmail(created);
        setEmailNotificationSent(true);
        console.log('[ConfirmationEmail]', emailRes.message);
      } catch (e) {
        console.error('Error dispatching confirmation email', e);
      }

        setStep(4);
      } catch (e) {
        console.error('Could not create cloud appointment:', e);
        error(e instanceof Error ? e.message : 'Não foi possível guardar o agendamento. Tente novamente.');
      }
    } else {
      setStep(s => s + 1);
    }
  };

  const generateProofContent = () => {
    if (!completedAppointment) return '';
    return `
=============================================================
ESCRITÓRIO DE MOVIMENTAÇÃO DE DOCUMENTOS E PROCESSOS
DE NATURALIZAÇÃO NA GUINÉ-BISSAU (EMDPN-GB)
JUNTOS POR UM FUTURO MELHOR
=============================================================

COMPROVATIVO DO PEDIDO DE AGENDAMENTO

Nº DE PROTOCOLO: ${completedAppointment.protocolNumber}
DATA DE REGISTO: ${completedAppointment.createdAt}
ESTADO: ${completedAppointment.status.toUpperCase()}

--- DETALHES DO ATENDIMENTO ---
Serviço Agendado: ${completedAppointment.serviceName}
Taxa Oficial do Estado: ${completedAppointment.officialFee}
Modalidade: ${completedAppointment.modality === 'presencial' ? 'Presencial no Escritório Central' : 'Atendimento Remoto / Online (Diáspora e Internacional)'}
Canal de Atendimento: ${completedAppointment.preferredChannel || 'WhatsApp Oficial'}
Data Agendada: ${completedAppointment.date}
Horário: ${completedAppointment.time} horas (Fuso horário de Bissau GMT)

--- DADOS DO REQUERENTE ---
Nome Completo: ${completedAppointment.fullName}
País de Residência: ${completedAppointment.countryOfResidence}
Telefone / WhatsApp: ${completedAppointment.phone}
E-mail: ${completedAppointment.email || 'Não indicado'}
Documento de Identificação / Passaporte: ${completedAppointment.documentNumber}
Observações: ${completedAppointment.notes || 'Sem observações adicionais'}

--- E-MAIL OFICIAL PARA ENVIO DE DOCUMENTOS ---
E-mail Oficial: infor.ciesemdpngb@gmail.com

--- LOCALIZAÇÃO DA SEDE OFICIAL ---
Safim Centro / Reino, Setor de Safim, Guiné-Bissau
Contacto Telefónico / WhatsApp: +245 957000555

EMDPN-GB - Atuação estritamente dentro da Lei.
=============================================================
`;
  };

  const handleDownloadProof = () => {
    const content = generateProofContent();
    if (!content) return;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Comprovativo_Agendamento_${completedAppointment?.protocolNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSendWhatsApp = () => {
    if (!completedAppointment) return;
    const msg = `*OLÁ EMDPN-GB! NOVO AGENDAMENTO UNIVERSAL REALIZADO NO SITE*\n\n` +
      `*Protocolo:* ${completedAppointment.protocolNumber}\n` +
      `*Requerente:* ${completedAppointment.fullName}\n` +
      `*País:* ${completedAppointment.countryOfResidence}\n` +
      `*Serviço:* ${completedAppointment.serviceName}\n` +
      `*Taxa Oficial:* ${completedAppointment.officialFee}\n` +
      `*Modalidade:* ${completedAppointment.modality.toUpperCase()} (${completedAppointment.preferredChannel || 'WhatsApp'})\n` +
      `*Data & Hora:* ${completedAppointment.date} às ${completedAppointment.time} (GMT Bissau)\n` +
      `*Telefone:* ${completedAppointment.phone}\n` +
      `*E-mail:* ${completedAppointment.email || 'Não informado'}\n` +
      (completedAppointment.notes ? `*Notas:* ${completedAppointment.notes}\n` : '') +
      `\n_Encaminhado para o e-mail oficial: infor.ciesemdpngb@gmail.com_`;

    window.open(`https://wa.me/245957000555?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleResendConfirmation = async () => {
    if (!completedAppointment) return;
    try {
      const res = await sendAppointmentConfirmationEmail(completedAppointment);
      setEmailNotificationSent(true);
      success(res.message);
    } catch {
      error('Não foi possível reenviar o e-mail automaticamente.');
    }
  };

  const handleSendEmails = async () => {
    if (!completedAppointment) return;
    try {
      await sendAppointmentConfirmationEmail(completedAppointment);
      success('E-mail de confirmação reenviado para os canais oficiais!');
    } catch {}
    const mailto = createMailtoBackupLink(completedAppointment);
    window.location.href = mailto;
  };

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmado':
        return apt.statusConfirmed;
      case 'pendente':
        return apt.statusPending;
      case 'concluido':
        return apt.statusCompleted;
      case 'cancelado':
        return apt.statusCancelled;
      default:
        return String(status).toUpperCase();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-primary-800 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-400/40 flex items-center justify-center text-accent-400">
              <CalendarCheck size={26} />
            </div>
            <div>
              <span className="text-accent-400 text-xs font-bold uppercase tracking-wider block">
                {apt.wizardBadge}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {apt.wizardTitle}
              </h3>
            </div>
          </div>
          <div className="text-xs bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 font-mono">
            {apt.stepOf.replace('{current}', String(step)).replace('{total}', '4')}
          </div>
        </div>

        {/* Steps indicator */}
        <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
          {[
            { n: 1, label: apt.steps.service },
            { n: 2, label: apt.steps.modality },
            { n: 3, label: apt.steps.details },
            { n: 4, label: apt.steps.confirm }
          ].map(s => (
            <div 
              key={s.n}
              className={`p-2 rounded-lg text-center transition-all ${
                step === s.n 
                  ? 'bg-accent-500 text-neutral-950 font-bold shadow-md' 
                  : step > s.n 
                    ? 'bg-white/20 text-white' 
                    : 'bg-white/5 text-white/50'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Step Body */}
      <div className="p-6 sm:p-8">
        {step === 1 && (
          <div>
            <h4 className="text-lg font-bold text-primary-950 mb-2">{apt.step1Title}</h4>
            <p className="text-neutral-500 text-sm mb-6">{apt.step1Subtitle}</p>
            
            <div className="grid sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1">
              {servicesList.map(service => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedServiceIds(prev => prev.filter(id => id !== service.id));
                      } else {
                        setSelectedServiceIds(prev => [...prev, service.id]);
                      }
                    }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/70 shadow-md ring-2 ring-primary-500/20'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded uppercase tracking-wider">
                        {service.category}
                      </span>
                      <input type="checkbox" checked={isSelected} readOnly className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                    </div>
                    <h5 className="font-bold text-primary-950 text-sm mb-1">{service.name}</h5>
                    <p className="text-neutral-500 text-xs leading-relaxed">{service.desc}</p>
                    <div className="mt-2 text-[11px] text-neutral-400 font-medium flex items-center gap-1">
                      <Clock size={12} /> {service.timeEstimate}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4 className="text-lg font-bold text-primary-950 mb-2">{apt.step2Title}</h4>
            <p className="text-neutral-500 text-sm mb-6">{apt.step2Subtitle}</p>

            {/* Modality options */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div
                onClick={() => {
                  setModality('presencial');
                  setPreferredChannel(apt.presencialTitle);
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3.5 transition-all ${
                  modality === 'presencial'
                    ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-500/20'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                  modality === 'presencial' ? 'bg-primary-700 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <Building2 size={22} />
                </div>
                <div>
                  <h6 className="font-bold text-sm text-primary-950">{apt.presencialTitle}</h6>
                  <p className="text-neutral-500 text-xs">{apt.presencialDesc}</p>
                </div>
              </div>

              <div
                onClick={() => {
                  setModality('online');
                  setPreferredChannel('WhatsApp');
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-3.5 transition-all ${
                  modality === 'online'
                    ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-500/20'
                    : 'border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                  modality === 'online' ? 'bg-primary-700 text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  <Video size={22} />
                </div>
                <div>
                  <h6 className="font-bold text-sm text-primary-950">{apt.onlineTitle}</h6>
                  <p className="text-neutral-500 text-xs">{apt.onlineDesc}</p>
                </div>
              </div>
            </div>

            {/* Date and Time picker */}
            <div className="grid sm:grid-cols-2 gap-6 bg-neutral-50 p-5 rounded-xl border border-neutral-200">
              <div>
                <label className="block text-xs font-bold text-primary-950 uppercase mb-2 flex items-center gap-1.5">
                  <CalendarIcon size={14} className="text-primary-700" />
                  {apt.dateLabel}
                </label>
                <input 
                  type="date"
                  min={tomorrowStr}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-primary-600"
                />
                <span className="text-[11px] text-neutral-400 mt-1 block">{apt.dateNote}</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-primary-950 uppercase mb-2 flex items-center gap-1.5">
                  <Clock size={14} className="text-primary-700" />
                  {apt.timeLabel}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`py-2 text-xs font-bold rounded-md border transition-all ${
                        time === slot
                          ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-neutral-400 mt-1 block">{apt.timeNote}</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 className="text-lg font-bold text-primary-950 mb-2">{apt.step3Title}</h4>
            <p className="text-neutral-500 text-sm mb-6">
              {apt.step3Subtitle}
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Universal Country Selector */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1.5">
                  <Globe size={14} className="text-primary-700" /> {apt.countryLabel}
                </label>
                <select
                  value={selectedCountryCode}
                  onChange={e => handleCountryChange(e.target.value)}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-primary-600"
                >
                  {universalCountries.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.dial})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCountryCode === 'OUTRO' && (
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                    {apt.customCountryLabel}
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder={apt.customCountryPlaceholder}
                    value={customCountryName}
                    onChange={e => setCustomCountryName(e.target.value)}
                    className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1">
                  <User size={13} /> {apt.fullNameLabel}
                </label>
                <input 
                  type="text"
                  required
                  placeholder={apt.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1">
                  <Phone size={13} /> {apt.phoneLabel}
                </label>
                <input 
                  type="tel"
                  required
                  placeholder={matchedCountry?.dial ? `${matchedCountry.dial} ...` : apt.phonePlaceholder}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1">
                  <Mail size={13} /> {apt.emailLabel}
                </label>
                <input 
                  type="email"
                  placeholder={apt.emailPlaceholder}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1 flex items-center gap-1">
                  <FileText size={13} /> {apt.docLabel}
                </label>
                <input 
                  type="text"
                  placeholder={apt.docPlaceholder}
                  value={formData.documentNumber}
                  onChange={e => setFormData({ ...formData, documentNumber: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  {apt.channelLabel}
                </label>
                <select
                  value={preferredChannel}
                  onChange={e => setPreferredChannel(e.target.value)}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600"
                >
                  <option value="WhatsApp">{apt.channelOptions.whatsapp}</option>
                  <option value="Google Meet">{apt.channelOptions.meet}</option>
                  <option value="E-mail">{apt.channelOptions.email}</option>
                  <option value="Presencial em Safim">{apt.channelOptions.office}</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-1">
                  {apt.notesLabel}
                </label>
                <textarea 
                  rows={2}
                  placeholder={apt.notesPlaceholder}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-primary-600 resize-none"
                />
              </div>
            </div>

            {/* Official emails notification */}
            <div className="mt-5 p-4 bg-primary-50 rounded-xl border border-primary-200 text-xs text-primary-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold block text-primary-900">{apt.officialEmailTitle}</span>
                <span className="text-neutral-600 font-mono text-[11px]">
                  infor.ciesemdpngb@gmail.com
                </span>
              </div>
              <span className="bg-primary-700 text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                {apt.officialBadge}
              </span>
            </div>
          </div>
        )}

        {step === 4 && completedAppointment && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-success-100 text-success-700 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-success-50">
              <CheckCircle2 size={36} />
            </div>

            <h4 className="text-2xl font-serif font-bold text-primary-950 mb-1">{apt.successTitle}</h4>
            <p className="text-neutral-600 text-sm mb-4">
              {apt.successSubtitle}
            </p>

            {/* Automatic Email Confirmation Notice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-5 max-w-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    {language === 'fr'
                      ? 'E-mail automatique de réception de la demande envoyé'
                      : language === 'en'
                      ? 'Automatic request receipt email sent'
                      : language === 'es'
                      ? 'Correo automático de recepción de solicitud enviado'
                      : 'E-mail automático de receção do pedido enviado'}
                  </span>
                  <span className="text-[11px] text-emerald-700 block">
                    {emailRecipientAddress || completedAppointment.email 
                      ? `${apt.emailConfirmationSent?.replace('{email}', emailRecipientAddress || completedAppointment.email) || `Enviado para ${emailRecipientAddress || completedAppointment.email}`}`
                      : 'Cópia oficial arquivada e enviada aos serviços centrais do EMDPN-GB.'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleResendConfirmation}
                className="text-[11px] font-bold text-emerald-900 bg-white hover:bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg transition-colors whitespace-nowrap self-end sm:self-center shadow-xs"
              >
                {apt.btnResendEmail || 'Reenviar E-mail'}
              </button>
            </div>

            {/* Protocol card */}
            <div className="bg-primary-950 text-white rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-xl mb-6 relative overflow-hidden text-left border border-primary-900">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
                <div>
                  <span className="text-accent-400 text-[11px] font-bold uppercase tracking-wider block">{apt.protocolBadge}</span>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-wider">{completedAppointment.protocolNumber}</span>
                </div>
                <div className="text-right">
                  <span className="bg-success-500/20 text-success-300 text-xs px-2.5 py-1 rounded font-bold uppercase border border-success-400/30">
                    {getStatusLabel(completedAppointment.status)}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <span className="text-white/60 block">{apt.labelService}</span>
                  <span className="font-semibold text-white">{completedAppointment.serviceName}</span>
                </div>
                <div>
                  <span className="text-white/60 block">{apt.labelFee}</span>
                  <span className="font-semibold text-accent-300">{completedAppointment.officialFee}</span>
                </div>
                <div>
                  <span className="text-white/60 block">{apt.labelDateTime}</span>
                  <span className="font-semibold text-white">{completedAppointment.date} às {completedAppointment.time} (GMT Bissau)</span>
                </div>
                <div>
                  <span className="text-white/60 block">{apt.labelCountry}</span>
                  <span className="font-semibold text-white">{completedAppointment.countryOfResidence}</span>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-white/10 flex flex-wrap justify-between gap-1 text-[11px]">
                  <span>{apt.labelApplicant} <strong>{completedAppointment.fullName}</strong> ({completedAppointment.phone})</span>
                  <span>{apt.labelChannel} <strong>{completedAppointment.preferredChannel || 'WhatsApp'}</strong></span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-accent-300 flex items-center justify-between">
                <span>{apt.labelOfficialEmail}</span>
                <span className="font-mono text-white/80">infor.ciesemdpngb@gmail.com</span>
              </div>
            </div>

            {/* Actions: WhatsApp, Download and Email */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center max-w-xl mx-auto">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="btn btn-whatsapp flex-1 justify-center py-3.5 text-sm"
              >
                <Send size={18} /> {apt.btnSendWhatsApp}
              </button>
              
              <button
                type="button"
                onClick={handleSendEmails}
                className="btn btn-institutional flex-1 justify-center py-3.5 text-sm"
              >
                <Mail size={18} /> {apt.btnSendEmail}
              </button>

              <button
                type="button"
                onClick={handleDownloadProof}
                className="btn bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex-1 justify-center py-3.5 text-sm border border-neutral-300"
              >
                <Download size={18} /> {apt.btnDownload}
              </button>
            </div>
            
            <p className="text-xs text-neutral-500 mt-6 max-w-md mx-auto">
              {apt.protocolSaveNote.replace('{protocol}', completedAppointment.protocolNumber)}
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between border-t border-neutral-200 pt-6 mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 font-bold text-xs text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <ArrowLeft size={16} /> {apt.btnBack}
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary px-7 py-3 text-sm shadow-md"
            >
              {step === 3 ? apt.btnConfirm : apt.btnContinue} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
