import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  LogOut, 
  Trash2, 
  Phone, 
  Mail, 
  FileText, 
  ShieldAlert, 
  Eye, 
  Building2, 
  CheckSquare2,
  XCircle,
  RefreshCw,
  PlusCircle,
  Megaphone,
  Wrench,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  getAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  getStatsMetrics, 
  Appointment 
} from '../services/appointmentService';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import { DeveloperImageManager } from '../components/DeveloperImageManager';
import { processImageFile } from '../services/imageService';

import { 
  getCustomArticles, 
  saveArticle, 
  deleteArticle, 
  syncArticlesFromSupabase,
  ARTICLES_UPDATED_EVENT, 
  ArticleItem 
} from '../services/articleService';

export function AdminPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { success, error } = useToast();
  
  const initialTab = searchParams.get('tab') === 'dev' ? 'desenvolvedor' : 'agendamentos';
  const [activeTab, setActiveTab] = useState<'agendamentos' | 'desenvolvedor'>(initialTab);
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(getStatsMetrics());

  // Custom articles management for admin
  const [customArticles, setCustomArticles] = useState<ArticleItem[]>(getCustomArticles());

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Institucional');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadData();
    syncArticlesFromSupabase().catch(err => {
      console.error('Could not sync admin publications from Supabase:', err);
      error(err.message || 'Não foi possível carregar as publicações.');
    });

    const handleArticlesUpdate = () => {
      setCustomArticles(getCustomArticles());
    };
    window.addEventListener(ARTICLES_UPDATED_EVENT, handleArticlesUpdate);
    window.addEventListener('storage', handleArticlesUpdate);
    return () => {
      window.removeEventListener(ARTICLES_UPDATED_EVENT, handleArticlesUpdate);
      window.removeEventListener('storage', handleArticlesUpdate);
    };
  }, [navigate]);

  const loadData = () => {
    setAppointments(getAppointments());
    setStats(getStatsMetrics());
    setCustomArticles(getCustomArticles());
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(id, newStatus);
    loadData();
  };

  const handleDeleteAppointment = (id: string, name: string) => {
    if (confirm(`Tem a certeza que deseja remover o agendamento de "${name}"?`)) {
      deleteAppointment(id);
      loadData();
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) {
      error('Preencha o Título e o Conteúdo do Evento/Publicação.');
      return;
    }
    setIsPublishing(true);
    const article: ArticleItem = {
      title: newTitle.trim(),
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Direção EMDPN-GB',
      excerpt: newExcerpt.trim(),
      category: newCategory.trim(),
      imageUrl: newImageUrl.trim() || undefined
    };
    try {
      await saveArticle(article);
      setCustomArticles(getCustomArticles());
      success('Publicação guardada no portal e disponível para todos.');
      setNewTitle('');
      setNewExcerpt('');
      setNewImageUrl('');
      setShowPublishModal(false);
    } catch (err) {
      console.error('Could not publish article from admin:', err);
      error(err instanceof Error ? err.message : 'Não foi possível publicar.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm('Tem certeza que pretende remover esta publicação do portal?')) {
      try {
        await deleteArticle(id);
        setCustomArticles(getCustomArticles());
        success('Publicação removida com sucesso.');
      } catch (err) {
        console.error('Could not delete admin article:', err);
        error(err instanceof Error ? err.message : 'Não foi possível remover a publicação.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Não foi possível terminar a sessão.');
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesStatus = filterStatus === 'todos' || apt.status === filterStatus;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      apt.fullName.toLowerCase().includes(term) ||
      apt.protocolNumber.toLowerCase().includes(term) ||
      apt.phone.includes(term) ||
      apt.serviceName.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  const handleExportCSV = () => {
    if (appointments.length === 0) return;
    const headers = ['Protocolo', 'Requerente', 'Telefone', 'E-mail', 'Serviço', 'Modalidade', 'Data', 'Hora', 'Estado', 'Criado_Em'];
    const rows = appointments.map(a => [
      a.protocolNumber,
      `"${a.fullName.replace(/"/g, '""')}"`,
      a.phone,
      a.email || '',
      `"${a.serviceName.replace(/"/g, '""')}"`,
      a.modality,
      a.date,
      a.time,
      a.status,
      a.createdAt
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relatorio_Agendamentos_EMDPN_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-neutral-100 min-h-screen pb-24">
      {/* Admin Topbar */}
      <header className="bg-primary-950 text-white border-b border-primary-900 sticky top-0 z-30 shadow-lg">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500 text-neutral-950 flex items-center justify-center font-bold">
              GB
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-serif leading-none">Painel de Gestão e Publicações</h1>
              <span className="text-xs text-neutral-400">EMDPN-GB • Escritório Central</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowPublishModal(true)}
              className="inline-flex items-center gap-1.5 bg-[#16845B] hover:bg-[#126b48] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <PlusCircle size={15} /> Publicar Evento / Notícia
            </button>
            <span className="hidden sm:inline-block text-xs bg-white/10 px-3 py-1.5 rounded-lg text-neutral-300">
              Sessão: <strong className="text-white">Administrador</strong>
            </span>
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 bg-accent-500 hover:bg-accent-400 text-neutral-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              title="Exportar dados para Excel/CSV"
            >
              <Download size={14} /> Exportar CSV
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-flag-700 hover:bg-flag-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 pt-6">
        {/* Navigation Tabs between Appointments & Developer Area */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-200 pb-3">
          <button
            onClick={() => {
              setActiveTab('agendamentos');
              setSearchParams({});
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'agendamentos'
                ? 'bg-primary-950 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
            }`}
          >
            <Calendar size={16} /> 📋 Agendamentos & Processos ({appointments.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('desenvolvedor');
              setSearchParams({ tab: 'dev' });
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs ${
              activeTab === 'desenvolvedor'
                ? 'bg-[#16845B] text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
            }`}
          >
            <Wrench size={16} /> 🛠️ Área do Desenvolvedor & Gestor de Imagens
          </button>
        </div>

        {/* Tab 2: Developer & Image Manager */}
        {activeTab === 'desenvolvedor' && (
          <div className="mb-12">
            <DeveloperImageManager />
          </div>
        )}

        {/* Tab 1: Appointments Management */}
        {activeTab === 'agendamentos' && (
          <>
            {/* KPI stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Total de Agendamentos</span>
                <div className="text-2xl font-black text-primary-950">{appointments.length}</div>
                <span className="text-[11px] text-primary-600 font-semibold mt-1 block">Registo em sistema</span>
              </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Confirmados</span>
            <div className="text-2xl font-black text-success-700">
              {appointments.filter(a => a.status === 'confirmado').length}
            </div>
            <span className="text-[11px] text-success-600 font-semibold mt-1 block">Prontos para atendimento</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Beneficiários do Site</span>
            <div className="text-2xl font-black text-accent-700">{stats.beneficiaries}</div>
            <span className="text-[11px] text-accent-600 font-semibold mt-1 block">Processos concluídos</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-sm">
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Visitantes Registados</span>
            <div className="text-2xl font-black text-neutral-800">{stats.visitors}</div>
            <span className="text-[11px] text-neutral-400 font-semibold mt-1 block">Visualizações de página</span>
          </div>
        </div>

        {/* Published announcements management section if any */}
        {customArticles.length > 0 && (
          <div className="mb-8 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Megaphone className="text-[#16845B]" size={20} />
                <h3 className="font-serif font-bold text-primary-950 text-base">Publicações Ativas no Portal ({customArticles.length})</h3>
              </div>
              <span className="text-xs text-neutral-500">Visíveis na página de Notícias & Eventos</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customArticles.map(art => (
                <div key={art.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#16845B] uppercase tracking-wider">{art.category}</span>
                      <span className="text-[10px] text-neutral-400">{art.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-primary-950 mb-1">{art.title}</h4>
                    <p className="text-neutral-600 text-xs line-clamp-2 mb-3">{art.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60">
                    <span className="text-[10px] text-neutral-500">{art.author}</span>
                    <button
                      onClick={() => handleDeleteArticle(art.id!)}
                      className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 p-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} /> Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <Search size={18} className="text-neutral-400 shrink-0" />
            <input 
              type="text"
              placeholder="Pesquisar por nome, nº de protocolo, telefone ou serviço..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-neutral-500" />
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-neutral-700 focus:outline-none"
            >
              <option value="todos">Todos os Estados</option>
              <option value="confirmado">Apenas Confirmados</option>
              <option value="pendente">Apenas Pendentes</option>
              <option value="concluido">Apenas Concluídos</option>
              <option value="cancelado">Cancelados</option>
            </select>
            <button
              onClick={loadData}
              className="p-2 text-neutral-500 hover:text-primary-700 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Recarregar"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        {/* Table of appointments */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 uppercase font-black tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Protocolo</th>
                  <th className="py-3.5 px-4">Requerente</th>
                  <th className="py-3.5 px-4">Serviço Solicitado</th>
                  <th className="py-3.5 px-4">Data & Horário</th>
                  <th className="py-3.5 px-4">Modalidade</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400 font-medium">
                      Nenhum agendamento encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map(apt => (
                    <tr key={apt.id} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-primary-950 whitespace-nowrap">
                        {apt.protocolNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{apt.fullName}</div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                          <a href={`tel:${apt.phone}`} className="hover:text-primary-700 hover:underline">{apt.phone}</a>
                          {apt.countryOfResidence && <span>• {apt.countryOfResidence}</span>}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-[220px]">
                        <div className="font-semibold text-neutral-800 truncate" title={apt.serviceName}>
                          {apt.serviceName}
                        </div>
                        <span className="text-[10px] font-bold text-accent-700">{apt.officialFee}</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-neutral-900">{apt.date}</div>
                        <div className="text-[11px] text-neutral-500">{apt.time} (Bissau)</div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          apt.modality === 'presencial'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-primary-50 text-primary-700 border border-primary-200'
                        }`}>
                          {apt.modality}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={apt.status}
                          onChange={e => handleStatusChange(apt.id, e.target.value as Appointment['status'])}
                          className={`text-[11px] font-extrabold uppercase rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                            apt.status === 'confirmado'
                              ? 'bg-success-50 text-success-700 border-success-200'
                              : apt.status === 'concluido'
                                ? 'bg-primary-50 text-primary-700 border-primary-200'
                                : apt.status === 'pendente'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                          }`}
                        >
                          <option value="confirmado">Confirmado</option>
                          <option value="pendente">Pendente</option>
                          <option value="concluido">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${apt.phone.replace(/\D/g, '')}?text=Ol%C3%A1%20${encodeURIComponent(apt.fullName)}%2C%20contacto%20do%20EMDPN-GB%20sobre%20o%20seu%20agendamento%20protocolo%20${apt.protocolNumber}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-success-700 hover:bg-success-50 rounded-md transition-colors"
                            title="Conversar no WhatsApp"
                          >
                            <Phone size={15} />
                          </a>
                          <button
                            onClick={() => handleDeleteAppointment(apt.id, apt.fullName)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Remover agendamento"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}

        {/* Publish Modal */}
        {showPublishModal && (
          <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-7 sm:p-8 shadow-2xl border border-neutral-200 animate-fade-in text-left">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
                <h3 className="text-xl font-serif font-bold text-primary-950 flex items-center gap-2">
                  <PlusCircle className="text-[#16845B]" size={22} /> Publicar Evento / Notícia Oficial
                </h3>
                <button 
                  onClick={() => setShowPublishModal(false)}
                  className="text-neutral-400 hover:text-neutral-700 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handlePublish} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Título do Evento / Publicação *
                  </label>
                  <input 
                    type="text"
                    required
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Ex: Cerimónia de Entrega de Passaportes em Bissau"
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-primary-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Categoria
                    </label>
                    <select
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-primary-600"
                    >
                      <option value="Institucional">Institucional</option>
                      <option value="Evento">Evento</option>
                      <option value="Comunicado">Comunicado Oficial</option>
                      <option value="Dicas">Dicas & Requisitos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Imagem do Computador
                    </label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const dataUrl = await processImageFile(file, 800, 600, 0.85);
                            setNewImageUrl(dataUrl);
                            success('Foto carregada do computador com sucesso!');
                          } catch {
                            error('Erro ao ler imagem do computador.');
                          }
                        }
                      }}
                      className="w-full text-xs text-neutral-600 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                    />
                  </div>
                </div>

                {newImageUrl && (
                  <div className="relative w-full h-24 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
                    <img src={newImageUrl} alt="Pré-visualização" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewImageUrl('')}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black/80"
                      title="Remover imagem"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Conteúdo / Resumo da Publicação *
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={newExcerpt}
                    onChange={e => setNewExcerpt(e.target.value)}
                    placeholder="Descreva os detalhes da publicação ou evento oficial..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 text-sm focus:outline-none focus:border-primary-600 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button 
                    type="button"
                    onClick={() => setShowPublishModal(false)}
                    className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl font-bold text-xs uppercase"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    disabled={isPublishing}
                    className="btn btn-primary text-xs uppercase py-2.5 px-6 bg-[#16845B] hover:bg-[#126b48] text-white disabled:opacity-50"
                  >
                    {isPublishing ? 'A guardar...' : 'Publicar no Portal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-neutral-400">
          Escritório de Movimentação de Documentos e Processos de Naturalização — Safim Centro / Bissau
        </div>
      </main>
    </div>
  );
}
