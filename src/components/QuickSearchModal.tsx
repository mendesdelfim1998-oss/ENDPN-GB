import React, { useState } from 'react';
import { Search, X, Calendar, User, Phone, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { getAppointments, Appointment } from '../services/appointmentService';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const dl = t.downloads;
  const qs = dl.quickSearch || {
    title: 'Pesquisa Rápida de Agendamento',
    placeholder: 'Digite o nº de protocolo (ex: EMDPN-2026-...) ou nome...',
    btnSearch: 'Procurar Agendamento',
    notFound: 'Nenhum agendamento encontrado com este número ou nome. Por favor, verifique o número de protocolo ou consulte a página de Agendamentos.',
    resultsTitle: 'Resultados da Pesquisa:',
    close: 'Fechar',
    viewTracker: 'Ir para Consulta Completa'
  };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Appointment[] | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const all = getAppointments();
    const q = query.toLowerCase().trim();
    const filtered = all.filter(item => 
      item.protocolNumber.toLowerCase().includes(q) ||
      item.fullName.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.documentNumber.toLowerCase().includes(q)
    );
    setResults(filtered);
    setSearched(true);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmado':
        return <span className="bg-success-50 text-success-800 border border-success-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Confirmado</span>;
      case 'pendente':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Pendente</span>;
      case 'concluido':
        return <span className="bg-primary-50 text-primary-800 border border-primary-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Concluído</span>;
      case 'cancelado':
        return <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-full text-xs font-bold uppercase">Cancelado</span>;
      default:
        return <span className="bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[300] bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-primary-950 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500 text-neutral-950 flex items-center justify-center shadow-md">
              <Search size={20} />
            </div>
            <div>
              <span className="text-[10px] font-bold text-accent-400 uppercase tracking-widest block">EMDPN-GB · Portal Oficial</span>
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">{qs.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label={qs.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-neutral-50/50">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="text"
                  required
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={qs.placeholder}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-neutral-300 rounded-xl text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary px-5 py-3.5 text-xs sm:text-sm font-bold shrink-0 shadow-md"
              >
                {qs.btnSearch}
              </button>
            </div>
          </form>

          {searched && results && (
            <div>
              {results.length > 0 ? (
                <div className="space-y-4">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                    {qs.resultsTitle} ({results.length})
                  </span>
                  {results.map((apt) => (
                    <div key={apt.id} className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                        <span className="font-mono font-black text-primary-950 text-sm bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-200">
                          {apt.protocolNumber}
                        </span>
                        {getStatusBadge(apt.status)}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                        <div>
                          <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Requerente</span>
                          <strong className="text-primary-950">{apt.fullName}</strong>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Serviço Solicitado</span>
                          <span className="text-neutral-800 font-medium">{apt.serviceName}</span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Data & Horário</span>
                          <span className="text-neutral-800 flex items-center gap-1 font-mono">
                            <Calendar size={13} className="text-primary-700" /> {apt.date} às {apt.time}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-400 block text-[11px] uppercase font-semibold">Contacto</span>
                          <span className="text-neutral-800 font-mono">{apt.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center text-amber-900 space-y-3">
                  <AlertCircle className="w-10 h-10 mx-auto text-amber-600" />
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    {qs.notFound}
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/agendamento?tab=consultar');
                    }}
                    className="btn btn-institutional text-xs py-2 px-4 inline-flex items-center gap-1.5 mt-2"
                  >
                    {qs.viewTracker}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-neutral-200 flex justify-between items-center shrink-0">
          <button
            onClick={() => {
              onClose();
              navigate('/agendamento?tab=consultar');
            }}
            className="text-xs font-bold text-primary-800 hover:underline"
          >
            {qs.viewTracker} →
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-colors"
          >
            {qs.close}
          </button>
        </div>

      </div>
    </div>
  );
};
