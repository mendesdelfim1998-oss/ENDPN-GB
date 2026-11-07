import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { AppointmentBookingModal } from '../components/AppointmentBookingModal';
import { AppointmentTracker } from '../components/AppointmentTracker';
import { getLocalizedOfficialServices } from '../services/appointmentService';
import { Calendar, Search, ListFilter, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSearchParams, useLocation } from 'react-router-dom';

export function AppointmentPage() {
  const { t, language } = useLanguage();
  const apt = t.appointments;
  const servicesList = getLocalizedOfficialServices(t);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialTab = searchParams.get('tab') === 'consultar' || location.hash === '#consultar' 
    ? 'consultar' 
    : (searchParams.get('tab') === 'taxas' ? 'taxas' : 'novo');

  const [activeTab, setActiveTab] = useState<'novo' | 'consultar' | 'taxas'>(initialTab);
  const serviceParam = searchParams.get('service') || undefined;
  const [preselectedService, setPreselectedService] = useState<string | undefined>(serviceParam);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <PageHeader 
        title={apt.title} 
        subtitle={apt.subtitle} 
      />

      <div className="max-w-[1160px] mx-auto px-7 pt-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('novo')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'novo'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <Calendar size={18} /> {apt.tabNew}
          </button>
          <button
            onClick={() => setActiveTab('consultar')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'consultar'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <Search size={18} /> {apt.tabTrack}
          </button>
          <button
            onClick={() => setActiveTab('taxas')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'taxas'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <ListFilter size={18} /> {apt.tabRates}
          </button>
        </div>

        {/* Tab 1: New Booking */}
        {activeTab === 'novo' && (
          <div>
            <AppointmentBookingModal 
              initialServiceId={preselectedService}
              onSuccess={(createdApt) => {
                console.log('Agendamento registado:', createdApt.protocolNumber);
              }}
            />

            {/* Practical instructions */}
            <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-3">
                <MapPin className="text-primary-700 shrink-0 mt-1" size={22} />
                <div>
                  <h5 className="font-bold text-primary-950 text-sm">{apt.infoLocationTitle}</h5>
                  <p className="text-neutral-500 text-xs mt-1">{apt.infoLocationDesc}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-3">
                <Clock className="text-primary-700 shrink-0 mt-1" size={22} />
                <div>
                  <h5 className="font-bold text-primary-950 text-sm">{apt.infoHoursTitle}</h5>
                  <p className="text-neutral-500 text-xs mt-1">{apt.infoHoursDesc}</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-3">
                <ShieldCheck className="text-primary-700 shrink-0 mt-1" size={22} />
                <div>
                  <h5 className="font-bold text-primary-950 text-sm">{apt.infoSecurityTitle}</h5>
                  <p className="text-neutral-500 text-xs mt-1">{apt.infoSecurityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tracker */}
        {activeTab === 'consultar' && (
          <div className="py-6">
            <AppointmentTracker />
          </div>
        )}

        {/* Tab 3: Services & Fees */}
        {activeTab === 'taxas' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-bold text-primary-950">{apt.ratesTitle}</h3>
              <p className="text-neutral-500 text-sm mt-1">{apt.ratesSubtitle}</p>
            </div>

            <div className="grid gap-4">
              {servicesList.map(service => (
                <div key={service.id} className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-primary-300 transition-all">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-accent-700 bg-accent-50 px-2 py-0.5 rounded uppercase">
                        {service.category}
                      </span>
                      <h4 className="font-bold text-primary-950 text-base">{service.name}</h4>
                    </div>
                    <p className="text-neutral-500 text-xs leading-relaxed max-w-xl">{service.desc}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="font-extrabold text-sm text-primary-900 bg-primary-50 px-3 py-1.5 rounded-lg border border-primary-100 whitespace-nowrap">
                      {service.fee}
                    </span>
                    <button
                      onClick={() => {
                        setPreselectedService(service.id);
                        setActiveTab('novo');
                      }}
                      className="btn btn-institutional py-2 px-4 text-xs shrink-0"
                    >
                      {apt.btnBookService}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
