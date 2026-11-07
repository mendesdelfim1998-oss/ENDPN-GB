import { supabase } from '../lib/supabase';
import { authService } from './authService';

export interface Appointment {
  id: string;
  protocolNumber: string;
  serviceType: string;
  serviceName: string;
  officialFee: string;
  modality: 'presencial' | 'online';
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  documentNumber: string;
  countryOfResidence: string;
  countryCode?: string;
  preferredChannel?: string;
  notes?: string;
  status: 'confirmado' | 'pendente' | 'concluido' | 'cancelado';
  createdAt: string;
}

export const OFFICIAL_EMAILS = [
  'infor.ciesemdpngb@gmail.com'
];

export const OFFICIAL_EMAILS_MAILTO = 'infor.ciesemdpngb@gmail.com';

export const OFFICIAL_ORGANS = [
  {
    role: 'Diretor Gerente',
    name: 'Cláudio Hortiz Altip',
    description: 'Direção Geral e Relações Ministeriais'
  },
  {
    role: 'Auxiliar Administrativo',
    name: 'Valdano Amoná',
    description: 'Acompanhamento Processual e Gestão de Protocolos'
  },
  {
    role: 'Secretária-Geral',
    name: 'Isabel Sambé',
    description: 'Secretariado Geral, Atendimento e Agendamentos'
  }
];

export const UNIVERSAL_COUNTRIES = [
  { code: 'GW', name: 'Guiné-Bissau', dial: '+245' },
  { code: 'US', name: 'Estados Unidos (Diáspora Guineense)', dial: '+1' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'FR', name: 'França', dial: '+33' },
  { code: 'GB', name: 'Reino Unido (UK)', dial: '+44' },
  { code: 'CV', name: 'Cabo Verde', dial: '+238' },
  { code: 'SN', name: 'Senegal', dial: '+221' },
  { code: 'AO', name: 'Angola', dial: '+244' },
  { code: 'MZ', name: 'Moçambique', dial: '+258' },
  { code: 'BR', name: 'Brasil', dial: '+55' },
  { code: 'ES', name: 'Espanha', dial: '+34' },
  { code: 'CA', name: 'Canadá', dial: '+1' },
  { code: 'DE', name: 'Alemanha', dial: '+49' },
  { code: 'CH', name: 'Suíça', dial: '+41' },
  { code: 'BE', name: 'Bélgica', dial: '+32' },
  { code: 'NL', name: 'Países Baixos (Holanda)', dial: '+31' },
  { code: 'IT', name: 'Itália', dial: '+39' },
  { code: 'LU', name: 'Luxemburgo', dial: '+352' },
  { code: 'OUTRO', name: 'Outro País do Mundo (Atendimento Universal)', dial: '+' }
];

export function getLocalizedUniversalCountries(lang: string = 'pt') {
  if (lang === 'fr') {
    return [
      { code: 'GW', name: 'Guinée-Bissau', dial: '+245' },
      { code: 'FR', name: 'France (Diaspora)', dial: '+33' },
      { code: 'US', name: 'États-Unis (Diaspora Guinéenne)', dial: '+1' },
      { code: 'PT', name: 'Portugal', dial: '+351' },
      { code: 'GB', name: 'Royaume-Uni (UK)', dial: '+44' },
      { code: 'SN', name: 'Sénégal', dial: '+221' },
      { code: 'CV', name: 'Cap-Vert', dial: '+238' },
      { code: 'BE', name: 'Belgique', dial: '+32' },
      { code: 'CH', name: 'Suisse', dial: '+41' },
      { code: 'CA', name: 'Canada', dial: '+1' },
      { code: 'ES', name: 'Espagne', dial: '+34' },
      { code: 'DE', name: 'Allemagne', dial: '+49' },
      { code: 'AO', name: 'Angola', dial: '+244' },
      { code: 'MZ', name: 'Mozambique', dial: '+258' },
      { code: 'BR', name: 'Brésil', dial: '+55' },
      { code: 'NL', name: 'Pays-Bas', dial: '+31' },
      { code: 'IT', name: 'Italie', dial: '+39' },
      { code: 'LU', name: 'Luxembourg', dial: '+352' },
      { code: 'OUTRO', name: 'Autre Pays (Accueil Universel)', dial: '+' }
    ];
  }
  if (lang === 'en') {
    return [
      { code: 'GW', name: 'Guinea-Bissau', dial: '+245' },
      { code: 'US', name: 'United States (Guinean Diaspora)', dial: '+1' },
      { code: 'GB', name: 'United Kingdom (UK)', dial: '+44' },
      { code: 'PT', name: 'Portugal', dial: '+351' },
      { code: 'FR', name: 'France', dial: '+33' },
      { code: 'CA', name: 'Canada', dial: '+1' },
      { code: 'ES', name: 'Spain', dial: '+34' },
      { code: 'DE', name: 'Germany', dial: '+49' },
      { code: 'CH', name: 'Switzerland', dial: '+41' },
      { code: 'BE', name: 'Belgium', dial: '+32' },
      { code: 'NL', name: 'Netherlands', dial: '+31' },
      { code: 'IT', name: 'Italy', dial: '+39' },
      { code: 'CV', name: 'Cape Verde', dial: '+238' },
      { code: 'SN', name: 'Senegal', dial: '+221' },
      { code: 'AO', name: 'Angola', dial: '+244' },
      { code: 'MZ', name: 'Mozambique', dial: '+258' },
      { code: 'BR', name: 'Brazil', dial: '+55' },
      { code: 'LU', name: 'Luxembourg', dial: '+352' },
      { code: 'OUTRO', name: 'Other Country (Universal Service)', dial: '+' }
    ];
  }
  if (lang === 'es') {
    return [
      { code: 'GW', name: 'Guinea-Bissau', dial: '+245' },
      { code: 'ES', name: 'España', dial: '+34' },
      { code: 'US', name: 'Estados Unidos (Diáspora)', dial: '+1' },
      { code: 'PT', name: 'Portugal', dial: '+351' },
      { code: 'FR', name: 'Francia', dial: '+33' },
      { code: 'GB', name: 'Reino Unido (UK)', dial: '+44' },
      { code: 'BR', name: 'Brasil', dial: '+55' },
      { code: 'CV', name: 'Cabo Verde', dial: '+238' },
      { code: 'SN', name: 'Senegal', dial: '+221' },
      { code: 'AO', name: 'Angola', dial: '+244' },
      { code: 'MZ', name: 'Mozambique', dial: '+258' },
      { code: 'CA', name: 'Canadá', dial: '+1' },
      { code: 'DE', name: 'Alemania', dial: '+49' },
      { code: 'CH', name: 'Suiza', dial: '+41' },
      { code: 'BE', name: 'Bélgica', dial: '+32' },
      { code: 'NL', name: 'Países Bajos', dial: '+31' },
      { code: 'IT', name: 'Italia', dial: '+39' },
      { code: 'LU', name: 'Luxemburgo', dial: '+352' },
      { code: 'OUTRO', name: 'Otro País (Atención Universal)', dial: '+' }
    ];
  }
  return UNIVERSAL_COUNTRIES;
}

export function getLocalizedOfficialServices(t?: any) {
  if (!t || !t.appointments || !t.appointments.services) {
    return OFFICIAL_SERVICES;
  }
  const s = t.appointments.services;
  return [
    {
      id: 'naturalizacao_residencia',
      name: s.naturalization.name,
      fee: s.naturalization.fee,
      desc: s.naturalization.desc,
      timeEstimate: s.naturalization.estimate,
      category: s.naturalization.category
    },
    {
      id: 'nacionalidade_casamento',
      name: s.marriage.name,
      fee: s.marriage.fee,
      desc: s.marriage.desc,
      timeEstimate: s.marriage.estimate,
      category: s.marriage.category
    },
    {
      id: 'nacionalidade_descendencia',
      name: s.descent.name,
      fee: s.descent.fee,
      desc: s.descent.desc,
      timeEstimate: s.descent.estimate,
      category: s.descent.category
    },
    {
      id: 'alteracao_ratificacao_nome',
      name: s.nameRectification.name,
      fee: s.nameRectification.fee,
      desc: s.nameRectification.desc,
      timeEstimate: s.nameRectification.estimate,
      category: s.nameRectification.category
    },
    {
      id: 'passaporte_biometrico',
      name: s.passport.name,
      fee: s.passport.fee,
      desc: s.passport.desc,
      timeEstimate: s.passport.estimate,
      category: s.passport.category
    },
    {
      id: 'bilhete_identidade',
      name: s.identityCard.name,
      fee: s.identityCard.fee,
      desc: s.identityCard.desc,
      timeEstimate: s.identityCard.estimate,
      category: s.identityCard.category
    },
    {
      id: 'registo_criminal',
      name: s.criminalRecord.name,
      fee: s.criminalRecord.fee,
      desc: s.criminalRecord.desc,
      timeEstimate: s.criminalRecord.estimate,
      category: s.criminalRecord.category
    },
    {
      id: 'cedula_nascimento',
      name: s.birthCertificate.name,
      fee: s.birthCertificate.fee,
      desc: s.birthCertificate.desc,
      timeEstimate: s.birthCertificate.estimate,
      category: s.birthCertificate.category
    }
  ];
}

const STORAGE_KEY = 'emdpn_appointments';
const VISITOR_ID_KEY = 'emdpn_visitor_id';
const VISITOR_COUNT_KEY = 'emdpn_visitor_count';

export const OFFICIAL_SERVICES = [
  {
    id: 'naturalizacao_residencia',
    name: 'Aquisição de Nacionalidade por Naturalização',
    fee: '770.482 FCFA',
    desc: 'Para estrangeiros residentes há mais de 5 anos no território guineense.',
    timeEstimate: '45 min de atendimento inicial',
    category: 'Naturalização'
  },
  {
    id: 'nacionalidade_casamento',
    name: 'Aquisição de Nacionalidade por Casamento',
    fee: '155.097 FCFA',
    desc: 'Para cônjuges casados há mais de 3 anos com cidadãos guineenses.',
    timeEstimate: '30 min de atendimento inicial',
    category: 'Naturalização'
  },
  {
    id: 'nacionalidade_descendencia',
    name: 'Nacionalidade por Descendência (Membros da Diáspora)',
    fee: 'Taxa Notarial + Despacho',
    desc: 'Para membros da diáspora guineense e comunidade internacional de retorno.',
    timeEstimate: '40 min de atendimento',
    category: 'Nacionalidade'
  },
  {
    id: 'alteracao_ratificacao_nome',
    name: 'Processos de Alteração e Ratificação de Nome',
    fee: 'Taxa Notarial dos Registos Centrais',
    desc: 'Retificação judicial e administrativa de certidões, alteração de prenome ou apelido e correção de erros materiais.',
    timeEstimate: '35 min de consulta',
    category: 'Documentos'
  },
  {
    id: 'passaporte_biometrico',
    name: 'Emissão e Renovação de Passaporte Guineense',
    fee: 'Taxa Oficial da DIC',
    desc: 'Agendamento para recolha biométrica e acompanhamento do pedido.',
    timeEstimate: '30 min de atendimento',
    category: 'Identificação'
  },
  {
    id: 'bilhete_identidade',
    name: 'Emissão de Bilhete de Identidade (BI)',
    fee: 'Taxa Oficial de Identificação Civil',
    desc: 'Emissão 1ª via ou renovação de BI para cidadãos residentes e no estrangeiro.',
    timeEstimate: '25 min de atendimento',
    category: 'Identificação'
  },
  {
    id: 'registo_criminal',
    name: 'Certificado de Registo Criminal',
    fee: 'Taxa Oficial da Justiça',
    desc: 'Emissão célere do registo criminal guineense para fins de estudo, trabalho e vistos.',
    timeEstimate: '20 min de atendimento',
    category: 'Documentos'
  },
  {
    id: 'cedula_nascimento',
    name: 'Cédula Pessoal / Assento de Nascimento',
    fee: 'Taxa da Conservatória',
    desc: 'Busca, transcrição e emissão de certidões de nascimento nos Registos Centrais.',
    timeEstimate: '30 min de atendimento',
    category: 'Documentos'
  },
  {
    id: 'triagem_documental',
    name: 'Triagem Jurídica e Autenticação de Dossiê',
    fee: 'Gratuito (Consulta Inicial)',
    desc: 'Análise detalhada de viabilidade de documentos e tradução oficial.',
    timeEstimate: '30 min de consulta',
    category: 'Consultoria'
  }
];

const INITIAL_SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    protocolNumber: 'EMDPN-2026-1042',
    serviceType: 'naturalizacao_residencia',
    serviceName: 'Aquisição de Nacionalidade por Naturalização',
    officialFee: '770.482 FCFA',
    modality: 'presencial',
    date: '2026-10-27',
    time: '10:00',
    fullName: 'Mamadou Aliu Baldé',
    email: 'm.balde@email.com',
    phone: '+245 955123456',
    documentNumber: 'P0192834',
    countryOfResidence: 'Guiné-Bissau',
    preferredChannel: 'Presencial (Safim)',
    notes: 'Residente há 8 anos em Bissau. Dossiê pronto para verificação.',
    status: 'confirmado',
    createdAt: '2026-10-20 14:30'
  },
  {
    id: 'apt-002',
    protocolNumber: 'EMDPN-2026-1043',
    serviceType: 'nacionalidade_casamento',
    serviceName: 'Aquisição de Nacionalidade por Casamento',
    officialFee: '155.097 FCFA',
    modality: 'presencial',
    date: '2026-10-28',
    time: '11:30',
    fullName: 'Claire Denise Dupont',
    email: 'claire.dupont@orange.fr',
    phone: '+33 612345678',
    documentNumber: 'FR982341A',
    countryOfResidence: 'França',
    preferredChannel: 'Presencial em Bissau',
    notes: 'Casada há 4 anos com cidadão guineense em Bissau.',
    status: 'confirmado',
    createdAt: '2026-10-21 09:15'
  },
  {
    id: 'apt-003',
    protocolNumber: 'EMDPN-2026-1044',
    serviceType: 'nacionalidade_descendencia',
    serviceName: 'Nacionalidade por Descendência (Membros da Diáspora)',
    officialFee: 'Taxa Notarial + Despacho',
    modality: 'online',
    date: '2026-10-29',
    time: '15:00',
    fullName: 'Marcus Anthony Washington',
    email: 'marcus.washington@gmail.com',
    phone: '+1 404 555 0192',
    documentNumber: 'US4492019',
    countryOfResidence: 'Estados Unidos (Diáspora Guineense)',
    preferredChannel: 'WhatsApp / Videochamada',
    notes: 'Processo de nacionalidade para membro da diáspora com ancestralidade guineense.',
    status: 'confirmado',
    createdAt: '2026-10-22 16:40'
  },
  {
    id: 'apt-004',
    protocolNumber: 'EMDPN-2026-1045',
    serviceType: 'passaporte_biometrico',
    serviceName: 'Emissão e Renovação de Passaporte Guineense',
    officialFee: 'Taxa Oficial da DIC',
    modality: 'presencial',
    date: '2026-10-30',
    time: '09:00',
    fullName: 'Aissato Djaló',
    email: 'aissato.djalo@gmail.com',
    phone: '+245 966778899',
    documentNumber: 'BI-GB-129033',
    countryOfResidence: 'Guiné-Bissau',
    preferredChannel: 'Presencial',
    notes: 'Aguardar verificação da documentação.',
    status: 'pendente',
    createdAt: '2026-10-24 11:00'
  }
];

export function getAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_APPOINTMENTS));
      return INITIAL_SEED_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading appointments from localStorage', e);
    return INITIAL_SEED_APPOINTMENTS;
  }
}

export function saveAppointment(
  data: Omit<Appointment, 'id' | 'protocolNumber' | 'createdAt' | 'status'>
): Appointment {
  const appointments = getAppointments();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const protocolNumber = `EMDPN-2026-${randomSuffix}`;
  
  const newAppointment: Appointment = {
    ...data,
    id: `apt-${Date.now()}`,
    protocolNumber,
    status: 'confirmado',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  const updated = [newAppointment, ...appointments];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newAppointment;
}

export function findAppointmentByProtocol(query: string): Appointment | undefined {
  const clean = query.trim().toUpperCase();
  const phoneClean = query.replace(/\D/g, '');
  const appointments = getAppointments();

  return appointments.find(a => 
    a.protocolNumber.toUpperCase() === clean ||
    (phoneClean.length >= 6 && a.phone.replace(/\D/g, '').includes(phoneClean)) ||
    a.documentNumber.toUpperCase() === clean
  );
}

export function updateAppointmentStatus(id: string, status: Appointment['status']): void {
  const appointments = getAppointments();
  const updated = appointments.map(a => (a.id === id ? { ...a, status } : a));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteAppointment(id: string): void {
  const appointments = getAppointments();
  const updated = appointments.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getStatsMetrics() {
  let visitors = 0;
  try {
    visitors = Number(localStorage.getItem(VISITOR_COUNT_KEY)) || 0;
  } catch (err) {
    console.error('Could not read cached visitor count:', err);
  }

  const appointments = getAppointments();
  const totalBeneficiaries = 520 + appointments.filter(a => a.status === 'concluido').length;
  const totalInterested = 1350 + appointments.length;

  return {
    visitors,
    beneficiaries: totalBeneficiaries,
    interested: totalInterested,
    totalAppointments: appointments.length
  };
}

function getOrCreateVisitorId(): string {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }
  return visitorId;
}

export async function recordSiteVisitor(): Promise<number> {
  const { data, error } = await supabase.rpc('record_site_visit', {
    p_visitor_id: getOrCreateVisitorId()
  });
  if (error) {
    console.error('Could not register site visitor:', error);
    throw new Error('Não foi possível carregar o contador global de visitantes.');
  }
  const count = Number(data);
  localStorage.setItem(VISITOR_COUNT_KEY, String(count));
  return count;
}

export async function getSiteVisitorCount(): Promise<number> {
  const { data, error } = await supabase.rpc('get_site_visitor_count');
  if (error) {
    console.error('Could not read global visitor count:', error);
    throw new Error('Não foi possível carregar o contador global de visitantes.');
  }
  const count = Number(data);
  localStorage.setItem(VISITOR_COUNT_KEY, String(count));
  return count;
}

export async function resetSiteVisitorCount(): Promise<number> {
  if (!authService.isAuthenticated()) {
    throw new Error('Inicie sessão como administrador para reiniciar o contador.');
  }
  const { data, error } = await supabase.rpc('reset_site_visitors');
  if (error) {
    console.error('Could not reset global visitor count:', error);
    throw new Error('Não foi possível reiniciar o contador. Confirme as permissões administrativas.');
  }
  const count = Number(data);
  localStorage.setItem(VISITOR_COUNT_KEY, String(count));
  return count;
}
