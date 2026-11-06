import React, { useState } from 'react';
import { Search, Calendar, Clock, MapPin, User, FileText, CheckCircle2, Clock3, AlertCircle, Phone } from 'lucide-react';
import { findAppointmentByProtocol, Appointment } from '../services/appointmentService';
import { useLanguage } from '../context/LanguageContext';

export function AppointmentTracker() {
  const { t } = useLanguage();
  const apt = t.appointments;

  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Appointment | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const found = findAppointmentByProtocol(query);
    setResult(found || null);
    setSearched(true);
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
    <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <span className="text-accent-600 font-bold text-xs uppercase tracking-wider block mb-1">{apt.trackerBadge}</span>
        <h3 className="text-2xl font-serif font-bold text-primary-950">{apt.trackerTitle}</h3>
        <p className="text-neutral-500 text-xs sm:text-sm mt-1">
          {apt.trackerSubtitle}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            required
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={apt.trackerPlaceholder}
            className="w-full pl-4 pr-10 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-primary-600 focus:bg-white transition-all uppercase"
          />
        </div>
        <button
          type="submit"
          className="btn btn-institutional px-6 py-3 text-sm shrink-0 shadow-sm"
        >
          <Search size={16} /> {apt.btnSearch}
        </button>
      </form>

      {searched && !result && (
        <div className="p-4 bg-error-50 border border-error-100 rounded-xl text-error-700 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <strong>{apt.trackerNotFoundTitle}</strong>
            <p className="mt-1 text-neutral-600">{apt.trackerNotFoundDesc}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="bg-primary-50/70 border-2 border-primary-200 rounded-xl p-5 sm:p-6 text-left animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primary-200/60 pb-3 mb-4">
            <div>
              <span className="text-[11px] text-primary-700 font-bold uppercase block">{apt.trackerConfirmedBadge}</span>
              <span className="text-lg font-mono font-bold text-primary-950">{result.protocolNumber}</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 ${
              result.status === 'confirmado' 
                ? 'bg-success-100 text-success-800 border border-success-200' 
                : result.status === 'pendente'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-neutral-100 text-neutral-800'
            }`}>
              {result.status === 'confirmado' ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
              {getStatusLabel(result.status)}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5 text-xs">
            <div>
              <span className="text-neutral-500 block">{apt.labelService}</span>
              <span className="font-bold text-primary-950">{result.serviceName}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">{apt.trackerFeeLabel}</span>
              <span className="font-bold text-accent-700">{result.officialFee}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">{apt.labelDateTime}</span>
              <span className="font-bold text-primary-950">{result.date} às {result.time} (GMT)</span>
            </div>
            <div>
              <span className="text-neutral-500 block">{apt.steps.modality}:</span>
              <span className="font-bold text-primary-950 capitalize">{result.modality === 'presencial' ? apt.presencialTitle : apt.onlineTitle}</span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-primary-200/40">
              <span className="text-neutral-500 block">{apt.labelApplicant}</span>
              <span className="font-semibold text-neutral-800">{result.fullName} • Doc: {result.documentNumber}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-primary-200/60 flex items-center justify-between text-xs">
            <span className="text-neutral-500">{apt.trackerQuestions}</span>
            <a 
              href={`https://wa.me/245957000555?text=Protocolo%20${result.protocolNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 font-bold hover:underline flex items-center gap-1"
            >
              <Phone size={13} /> {apt.trackerSpeakBtn}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
