import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  RefreshCw, 
  Image as ImageIcon, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Send, 
  FileText, 
  HardDrive, 
  Download, 
  Plus, 
  Eye, 
  X,
  Layers,
  ShieldCheck,
  Megaphone,
  Wrench
} from 'lucide-react';
import { 
  getCustomImages, 
  setCustomImage, 
  resetImageToDefault, 
  clearUnusedImages, 
  resetAllImages, 
  addGalleryPhoto, 
  removeGalleryPhoto,
  processImageFile, 
  DEFAULT_IMAGES,
  CustomImagesState 
} from '../services/imageService';
import { 
  getSentEmailLogs, 
  clearSentEmailLogs, 
  deleteEmailLog, 
  sendAppointmentConfirmationEmail, 
  SentEmailLog 
} from '../services/emailService';
import { getAppointments, Appointment } from '../services/appointmentService';
import { useToast } from '../context/ToastContext';

import { 
  getCustomArticles, 
  deleteArticle, 
  clearAllArticles, 
  ARTICLES_UPDATED_EVENT, 
  ArticleItem 
} from '../services/articleService';

export function DeveloperImageManager() {
  const { success, error } = useToast();
  const [customImages, setCustomImages] = useState<CustomImagesState>(getCustomImages());
  const [selectedTarget, setSelectedTarget] = useState<'heroBanner' | 'logo' | 'aboutOffice' | 'audienceShowcase' | 'gallery'>('audienceShowcase');
  
  // File upload state from computer
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Loading state for simulated or real cache clearing as requested
  const [loadingCache, setLoadingCache] = useState(false);
  const [cacheMessage, setCacheMessage] = useState('');

  // Email logs state
  const [emailLogs, setEmailLogs] = useState<SentEmailLog[]>(getSentEmailLogs());
  const [viewingEmail, setViewingEmail] = useState<SentEmailLog | null>(null);

  // Publications state
  const [articles, setArticles] = useState<ArticleItem[]>(getCustomArticles());

  // Storage info
  const [storageUsageKb, setStorageUsageKb] = useState<number>(0);

  const calculateStorage = () => {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += (localStorage[key].length * 2);
        }
      }
      setStorageUsageKb(Math.round(total / 1024));
    } catch {
      setStorageUsageKb(0);
    }
  };

  useEffect(() => {
    calculateStorage();
    const handleUpdate = () => {
      setCustomImages(getCustomImages());
      setEmailLogs(getSentEmailLogs());
      setArticles(getCustomArticles());
      calculateStorage();
    };
    window.addEventListener('emdpn_images_updated', handleUpdate);
    window.addEventListener('emdpn_email_sent', handleUpdate);
    window.addEventListener(ARTICLES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('emdpn_images_updated', handleUpdate);
      window.removeEventListener('emdpn_email_sent', handleUpdate);
      window.removeEventListener(ARTICLES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Requested admin feature: Clear user images cache with feedback
  const handleClearUserImagesCache = async () => {
    setLoadingCache(true);
    setCacheMessage('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const res = clearUnusedImages();
      setCacheMessage(res.message);
      success('Cache de imagens limpo com sucesso!');
      calculateStorage();
    } catch (err) {
      setCacheMessage('Erro ao limpar o cache. Tente novamente.');
      error('Erro ao limpar o cache.');
    } finally {
      setLoadingCache(false);
    }
  };

  const handleManagePosts = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle local file selection from computer
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      error('Por favor, selecione um ficheiro de imagem válido (JPG, PNG, WEBP).');
      return;
    }

    setSelectedFile(file);
    setIsProcessing(true);
    try {
      const maxWidth = selectedTarget === 'logo' ? 400 : 1280;
      const maxHeight = selectedTarget === 'logo' ? 400 : 960;
      const dataUrl = await processImageFile(file, maxWidth, maxHeight, 0.85);
      setPreviewDataUrl(dataUrl);
      success(`Imagem "${file.name}" carregada com sucesso do computador! Clique em "Aplicar no Portal" para confirmar.`);
    } catch (err: any) {
      error(err.message || 'Erro ao processar imagem.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyImage = () => {
    if (!previewDataUrl) {
      error('Nenhuma imagem selecionada. Escolha uma imagem do seu computador primeiro.');
      return;
    }

    try {
      if (selectedTarget === 'gallery') {
        addGalleryPhoto(previewDataUrl);
        success('Foto adicionada à galeria oficial do portal com sucesso!');
      } else {
        setCustomImage(selectedTarget, previewDataUrl);
        const labels: Record<string, string> = {
          heroBanner: 'Banner Principal da Página Inicial',
          audienceShowcase: 'Segunda Imagem da Página Inicial (A Quem se Destina / Atendimento Consular)',
          logo: 'Selo / Brasão da República da Guiné-Bissau',
          aboutOffice: 'Fotografia da Equipa / Escritório'
        };
        success(`Imagem aplicada com sucesso em: ${labels[selectedTarget]}!`);
      }
      setPreviewDataUrl(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      calculateStorage();
    } catch (err: any) {
      error(err.message || 'Erro ao salvar imagem.');
    }
  };

  const handleResetSingleImage = (key: 'heroBanner' | 'logo' | 'aboutOffice') => {
    resetImageToDefault(key);
    success('Imagem restaurada para o padrão oficial original.');
    calculateStorage();
  };

  const handleResetAll = () => {
    if (confirm('Tem a certeza que deseja restaurar todas as imagens do portal para os padrões de fábrica?')) {
      resetAllImages();
      success('Todas as imagens foram restauradas com sucesso.');
      calculateStorage();
    }
  };

  const handleDeleteArticle = (id?: string) => {
    if (!id) return;
    if (confirm('Deseja apagar esta publicação do portal?')) {
      deleteArticle(id);
      setArticles(getCustomArticles());
      success('Publicação apagada com sucesso do portal.');
      calculateStorage();
    }
  };

  const handleClearAllArticles = () => {
    if (confirm('Tem a certeza que deseja apagar todas as publicações personalizadas?')) {
      clearAllArticles();
      setArticles([]);
      success('Todas as publicações foram removidas.');
      calculateStorage();
    }
  };

  const handleSendTestEmail = async () => {
    const appointments = getAppointments();
    const targetApt: Appointment = appointments[0] || {
      id: 'apt-test',
      protocolNumber: 'EMDPN-2026-TESTE',
      serviceType: 'naturalizacao_residencia',
      serviceName: 'Aquisição de Nacionalidade por Naturalização',
      officialFee: '770.482 FCFA',
      modality: 'presencial',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      fullName: 'Cidadão de Teste EMDPN-GB',
      email: 'infor.ciesemdpngb@gmail.com',
      phone: '+245 957000555',
      documentNumber: 'P0000000',
      countryOfResidence: 'Guiné-Bissau',
      status: 'confirmado',
      createdAt: new Date().toISOString().substring(0, 16)
    };

    try {
      const res = await sendAppointmentConfirmationEmail(targetApt);
      success(res.message);
    } catch {
      error('Erro ao testar envio de e-mail.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Top Banner / System Health */}
      <div className="bg-primary-950 text-white rounded-2xl p-6 shadow-xl border border-primary-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-accent-400 text-xs font-bold uppercase tracking-wider block">Área do Desenvolvedor & Gestor de Ativos</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Seção do Desenvolvedor / Admin</h2>
          <p className="text-neutral-400 text-xs mt-1">
            Ferramentas de manutenção de sistema, infraestrutura e moderação de conteúdo (Protegido por Autenticação).
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-xl border border-white/15">
          <HardDrive size={18} className="text-accent-400" />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-neutral-300 block">Armazenamento Local</span>
            <span className="text-sm font-mono font-bold text-white">{storageUsageKb} KB utilizados</span>
          </div>
        </div>
      </div>

      {/* REQUESTED ADMIN DEVELOPER BLOCKS */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-neutral-100 pb-4 mb-2">
          <h3 className="text-lg font-serif font-bold text-primary-950 flex items-center gap-2">
            <Wrench className="text-amber-600" size={20} /> Manutenção Rápida & Moderação
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Funções administrativas essenciais para gerir o cache de utilizadores e posts públicos.
          </p>
        </div>

        <div className="space-y-6">
          {/* Bloco 1: Limpeza de Cache */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <div>
              <h4 className="text-sm font-bold text-primary-950">Cache de Imagens de Utilizadores</h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Remove ficheiros temporários e miniaturas armazenadas em cache para liberar espaço ou atualizar avatares antigos.
              </p>
            </div>
            <button
              onClick={handleClearUserImagesCache}
              disabled={loadingCache}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap shadow-sm"
            >
              {loadingCache ? 'Limpando...' : 'Limpar Cache de Imagens'}
            </button>
          </div>
          {cacheMessage && (
            <p className="text-xs font-bold text-emerald-700 px-1">{cacheMessage}</p>
          )}

          {/* Bloco 2: Gestão de Posts Públicos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <div>
              <h4 className="text-sm font-bold text-primary-950">Gerenciamento de Posts Públicos e Publicações</h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Acesse o painel de moderação para revisar, ocultar ou excluir publicações da comunidade e comunicados.
              </p>
            </div>
            <button
              onClick={handleManagePosts}
              className="px-4 py-2.5 bg-primary-800 hover:bg-primary-900 text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              Gerenciar Posts
            </button>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 leading-relaxed">
          🔒 <strong>Nota de Segurança:</strong> Certifique-se de proteger esta seção no seu painel de controle utilizando middlewares de autenticação e verificação de privilégios (isAdmin ou isDeveloper). A execução de ações de limpeza de cache e moderação de dados sensíveis nunca deve ficar exposta a usuários comuns.
        </div>
      </div>

      {/* SECTION 1: UPLOAD DE IMAGEM DO COMPUTADOR */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-500/20 text-accent-700 flex items-center justify-center font-bold">
              <Upload size={18} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-primary-950 text-base">Carregar Nova Imagem do Computador</h3>
              <p className="text-neutral-500 text-xs">Escolha um ficheiro de imagem e defina onde deseja exibi-lo no site.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const res = clearUnusedImages();
                success(res.message);
                calculateStorage();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-colors"
            >
              <RefreshCw size={14} /> Limpar Ativos Órfãos
            </button>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors"
            >
              <Trash2 size={14} /> Restaurar Padrões de Fábrica
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Onde pretende aplicar a imagem? *
              </label>
              <select
                value={selectedTarget}
                onChange={e => setSelectedTarget(e.target.value as any)}
                className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="audienceShowcase">📸 Segunda Imagem da Página Inicial (Secção: A Quem se Destina / Gabinete Notarial)</option>
                <option value="heroBanner">🖼️ Primeira Imagem / Banner Panorâmico (Página Inicial)</option>
                <option value="aboutOffice">🏛️ Fotografia da Equipa / Escritório em Safim (Página Sobre Nós)</option>
                <option value="gallery">📸 Adicionar Foto Nova à Galeria Oficial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                Ficheiro de Imagem do Computador *
              </label>
              <input 
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="developer-image-upload"
              />
              <label 
                htmlFor="developer-image-upload"
                className="border-2 border-dashed border-primary-200 hover:border-primary-500 hover:bg-primary-50/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center group"
              >
                <ImageIcon className="text-primary-600 mb-2 group-hover:scale-110 transition-transform" size={32} />
                <span className="font-bold text-primary-950 text-sm">
                  {selectedFile ? selectedFile.name : 'Clique para Escolher Imagem do Computador'}
                </span>
                <span className="text-xs text-neutral-400 mt-1">
                  Suporta ficheiros JPG, PNG ou WEBP (Otimização automática ativada)
                </span>
              </label>
            </div>

            {previewDataUrl && (
              <button
                onClick={handleApplyImage}
                disabled={isProcessing}
                className="btn btn-primary w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> Aplicar Imagem no Portal Agora
              </button>
            )}
          </div>

          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                Pré-visualização da Imagem
              </span>
              <div className="w-full h-[220px] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 flex items-center justify-center relative">
                {previewDataUrl ? (
                  <img src={previewDataUrl} alt="Pré-visualização" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6 text-neutral-500">
                    <ImageIcon className="mx-auto mb-2 opacity-40" size={36} />
                    <span className="text-xs">Nenhuma imagem carregada para pré-visualização.</span>
                  </div>
                )}
              </div>
            </div>

            {selectedFile && (
              <div className="mt-3 pt-3 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-600">
                <span>Ficheiro: <strong>{selectedFile.name}</strong></span>
                <span>Tamanho: {(selectedFile.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: GESTÃO & EXCLUSÃO DE PUBLICAÇÕES */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-sm space-y-4">
        <div className="pb-3 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Megaphone className="text-[#16845B]" size={20} />
            <div>
              <h3 className="font-serif font-bold text-primary-950 text-base">Publicações e Notícias Ativas ({articles.length})</h3>
              <p className="text-neutral-500 text-xs">Apague comunicados ou eventos que já não estejam em uso.</p>
            </div>
          </div>
          {articles.length > 0 && (
            <button
              onClick={handleClearAllArticles}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-colors inline-flex items-center gap-1"
            >
              <Trash2 size={13} /> Apagar Todas as Publicações
            </button>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border border-neutral-200">
            Nenhuma publicação personalizada no momento. Use o botão "Publicar Evento / Notícia" no topo para criar uma nova.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(art => (
              <div key={art.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#16845B] uppercase tracking-wider">{art.category}</span>
                    <span className="text-[10px] text-neutral-400">{art.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-primary-950 mb-1">{art.title}</h4>
                  <p className="text-neutral-600 text-xs line-clamp-2 mb-3">{art.excerpt}</p>
                  {art.imageUrl && (
                    <div className="w-full h-20 rounded-lg overflow-hidden mb-2 bg-neutral-200">
                      <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <span className="text-[10px] text-neutral-500">{art.author}</span>
                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1 p-1 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={13} /> Apagar Publicação
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: HISTÓRICO DE E-MAILS AUTOMÁTICOS DE CONFIRMAÇÃO */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-sm space-y-4">
        <div className="pb-3 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Mail className="text-primary-700" size={20} />
            <div>
              <h3 className="font-serif font-bold text-primary-950 text-base">Registo de E-mails Automáticos de Confirmação</h3>
              <p className="text-neutral-500 text-xs">Disparados automaticamente para os requerentes após o agendamento.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSendTestEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-900 text-xs font-bold transition-colors"
            >
              <Send size={13} /> Enviar E-mail de Teste
            </button>
            {emailLogs.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Deseja limpar todo o histórico de e-mails enviados?')) {
                    clearSentEmailLogs();
                    setEmailLogs([]);
                    success('Histórico de e-mails limpo.');
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-colors"
              >
                <Trash2 size={13} /> Limpar Histórico
              </button>
            )}
          </div>
        </div>

        {emailLogs.length === 0 ? (
          <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded-xl border border-neutral-200 text-xs">
            Nenhum e-mail de confirmação registado ainda. Quando um requerente fizer um agendamento, o e-mail será emitido e arquivado aqui automaticamente.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 uppercase font-bold text-[11px]">
                  <th className="py-2.5 px-3">Data & Hora</th>
                  <th className="py-2.5 px-3">Protocolo</th>
                  <th className="py-2.5 px-3">Destinatário</th>
                  <th className="py-2.5 px-3">Assunto</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {emailLogs.slice(0, 10).map(log => (
                  <tr key={log.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-2.5 px-3 text-neutral-500 whitespace-nowrap">{log.sentAt}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-primary-950 whitespace-nowrap">{log.protocolNumber}</td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-neutral-900">{log.recipientName}</div>
                      <div className="text-[11px] text-neutral-500 font-mono">{log.recipientEmail}</div>
                    </td>
                    <td className="py-2.5 px-3 max-w-[250px] truncate text-neutral-700">{log.subject}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setViewingEmail(log)}
                        className="p-1.5 text-primary-700 hover:bg-primary-50 rounded-md transition-colors"
                        title="Ver conteúdo do e-mail"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => {
                          deleteEmailLog(log.id);
                          setEmailLogs(getSentEmailLogs());
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Excluir registo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Email Viewer Modal */}
      {viewingEmail && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 animate-fade-in flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 shrink-0">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-700">Registo Oficial de E-mail</span>
                <h4 className="font-serif font-bold text-base text-primary-950">{viewingEmail.subject}</h4>
              </div>
              <button 
                onClick={() => setViewingEmail(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="py-3 text-xs text-neutral-600 border-b border-neutral-100 space-y-1 shrink-0">
              <div><strong>Para:</strong> {viewingEmail.recipientName} ({viewingEmail.recipientEmail})</div>
              <div><strong>CC Oficial:</strong> {viewingEmail.officialCc}</div>
              <div><strong>Enviado em:</strong> {viewingEmail.sentAt}</div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 bg-neutral-50 rounded-xl my-3 font-mono text-xs text-neutral-800 whitespace-pre-wrap">
              {viewingEmail.textBody}
            </div>

            <div className="flex justify-end pt-2 shrink-0">
              <button
                onClick={() => setViewingEmail(null)}
                className="px-5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
