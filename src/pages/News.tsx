import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Calendar, User, ArrowRight, PlusCircle, Shield, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { authService } from '../services/authService';
import { useToast } from '../context/ToastContext';
import { 
  getCustomArticles, 
  saveArticle, 
  deleteArticle, 
  ARTICLES_UPDATED_EVENT, 
  ArticleItem 
} from '../services/articleService';
import { processImageFile } from '../services/imageService';

export function News() {
  const { t, language } = useLanguage();
  const isAuthenticated = authService.isAuthenticated();
  const { success, error } = useToast();

  const [customArticles, setCustomArticles] = useState<ArticleItem[]>(getCustomArticles());
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Institucional');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      setCustomArticles(getCustomArticles());
    };
    window.addEventListener(ARTICLES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(ARTICLES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) {
      error('Preencha o Título e o Conteúdo do Evento/Publicação.');
      return;
    }
    const article: ArticleItem = {
      title: newTitle.trim(),
      date: new Date().toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: 'Direção EMDPN-GB',
      excerpt: newExcerpt.trim(),
      category: newCategory.trim(),
      imageUrl: newImageUrl.trim() || undefined
    };
    saveArticle(article);
    setCustomArticles(getCustomArticles());
    success('Evento / Publicação publicado com sucesso no portal! Agora todos os utilizadores podem ver.');
    setNewTitle('');
    setNewExcerpt('');
    setNewImageUrl('');
    setShowPublishModal(false);
  };

  const handleDelete = async (id: string) => {
    if (!isAuthenticated) {
      error('Acesso negado: Somente o administrador autenticado pode apagar publicações.');
      return;
    }
    if (window.confirm('Tem certeza que pretende remover esta publicação?')) {
      try {
        await deleteArticle(id);
        setCustomArticles(getCustomArticles());
        success('Publicação removida com sucesso.');
      } catch (err: any) {
        error(err.message || 'Erro ao remover publicação.');
      }
    }
  };

  const baseArticles: ArticleItem[] = language === 'fr' ? [
    {
      title: "Nouvelles facilités pour la Diaspora",
      date: "15 Oct 2026",
      author: "Administration",
      excerpt: "Le gouvernement de Guinée-Bissau a annoncé des mesures pour accélérer la délivrance des actes pour les membres de la diaspora à l’étranger.",
      category: "Institutionnel"
    },
    {
      title: "L’EMDPN-GB célèbre son 1er anniversaire d’activité",
      date: "08 Avr 2026",
      author: "Équipe EMDPN",
      excerpt: "Nous célébrons notre première année avec plus de 50 dossiers finalisés avec succès et des familles rattachées à leurs racines ancestrales.",
      category: "Événement"
    },
    {
      title: "L’importance capitale de la traduction assermentée",
      date: "22 Mar 2026",
      author: "Pôle Juridique",
      excerpt: "Découvrez pourquoi il est impératif que vos documents émis à l’étranger soient traduits par des professionnels agréés.",
      category: "Conseils"
    }
  ] : language === 'en' ? [
    {
      title: "New Expedited Procedures for International Diaspora",
      date: "15 Oct 2026",
      author: "Admin",
      excerpt: "The Government of Guinea-Bissau has unveiled new statutory measures to streamline citizenship documentation for the global diaspora.",
      category: "Institutional"
    },
    {
      title: "EMDPN-GB Celebrates 1 Year of Service",
      date: "08 Apr 2026",
      author: "EMDPN Team",
      excerpt: "We mark our first anniversary having successfully completed over 50 official citizenship decrees and reuniting families with ancestral roots.",
      category: "Milestone"
    },
    {
      title: "The Critical Role of Certified Sworn Translations",
      date: "22 Mar 2026",
      author: "Legal Division",
      excerpt: "Understand why official ministries require foreign records to be certified by authorized Portuguese sworn translators.",
      category: "Legal Advice"
    }
  ] : language === 'es' ? [
    {
      title: "Nuevas facilidades para la Diáspora Internacional",
      date: "15 Oct 2026",
      author: "Administración",
      excerpt: "El gobierno de Guinea-Bissau anunció nuevas medidas para agilizar la documentación de miembros de la diáspora en el extranjero.",
      category: "Institucional"
    },
    {
      title: "EMDPN-GB celebra 1 año de actividad",
      date: "08 Abr 2026",
      author: "Equipo EMDPN",
      excerpt: "Cumplimos nuestro primer año de servicio con más de 50 expedientes concluidos favorablemente y familias reunidas con sus raíces.",
      category: "Evento"
    },
    {
      title: "La importancia de la traducción jurada oficial",
      date: "22 Mar 2026",
      author: "Área Jurídica",
      excerpt: "Conozca por qué es indispensable que sus documentos emitidos en el extranjero cuenten con traducción jurada al portugués.",
      category: "Consejos"
    }
  ] : [
    {
      title: "Novas facilidades para a Diáspora Internacional",
      date: "15 Oct 2026",
      author: "Admin",
      excerpt: "O governo da Guiné-Bissau anunciou novas medidas para agilizar a documentação de membros da diáspora residentes no estrangeiro.",
      category: "Institucional"
    },
    {
      title: "EMDPN-GB celebra 1 ano de atividade",
      date: "08 Abr 2026",
      author: "Equipa EMDPN",
      excerpt: "Completamos o nosso primeiro ano de serviço com mais de 50 processos concluídos com sucesso e famílias reunidas com as suas raízes.",
      category: "Evento"
    },
    {
      title: "A importância da tradução juramentada",
      date: "22 Mar 2026",
      author: "Jurídico",
      excerpt: "Saiba porque é fundamental que os seus documentos estrangeiros sejam traduzidos por profissionais credenciados.",
      category: "Dicas"
    }
  ];

  const allArticles: ArticleItem[] = [...customArticles, ...baseArticles];

  return (
    <div>
      <PageHeader 
        title={t.news.title} 
        subtitle={t.news.subtitle} 
      />
      
      <section className="py-20">
        <div className="max-w-[1160px] mx-auto px-7">
          
          {isAuthenticated && (
            <div className="mb-10 bg-primary-50 border border-primary-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center font-bold">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary-950 text-base">Dashboard de Administração e Eventos</h4>
                  <p className="text-neutral-600 text-xs">Painel restrito para publicação de comunicados, eventos e fotografias oficiais.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPublishModal(true)}
                className="btn btn-primary text-xs uppercase tracking-wider py-3 px-6 shrink-0 flex items-center gap-2"
              >
                <PlusCircle size={16} /> Publicar Novo Evento / Artigo
              </button>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allArticles.map((article, idx) => (
              <Reveal key={article.id || idx} delay={idx * 0.08}>
                <div className="card h-full flex flex-col group relative overflow-hidden">
                  {article.imageUrl && (
                    <div className="mb-4 -mx-7 -mt-7 overflow-hidden h-48 bg-neutral-100">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block text-[#16845B] font-bold text-[0.76rem] tracking-widest uppercase">
                      {article.category}
                    </span>
                    {isAuthenticated && article.id && (
                      <button 
                        onClick={() => handleDelete(article.id!)}
                        className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                        title="Eliminar Publicação"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-primary-700 transition-colors font-serif font-bold">{article.title}</h3>
                  <div className="flex items-center gap-4 text-neutral-400 text-xs mb-4">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
                    <span className="flex items-center gap-1.5"><User size={14} /> {article.author}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <button className="mt-auto flex items-center gap-2 text-primary-700 font-bold text-sm hover:gap-3 transition-all">
                    {t.news.btnReadMore} <ArrowRight size={16} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
          
          {showPublishModal && (
            <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-7 sm:p-8 shadow-2xl border border-neutral-200 animate-fade-in">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-neutral-100">
                  <h3 className="text-xl font-serif font-bold text-primary-950 flex items-center gap-2">
                    <PlusCircle className="text-[#16845B]" size={22} /> Publicar Evento / Notícia
                  </h3>
                  <button 
                    onClick={() => setShowPublishModal(false)}
                    className="text-neutral-400 hover:text-neutral-700 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handlePublish} className="space-y-4 text-left">
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
                        Foto do Computador
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
                              success('Imagem carregada do computador com sucesso!');
                            } catch {
                              error('Erro ao processar imagem.');
                            }
                          }
                        }}
                        className="w-full text-xs text-neutral-600 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                      />
                    </div>
                  </div>

                  {newImageUrl && (
                    <div className="relative w-full h-28 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
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
                      className="btn btn-primary text-xs uppercase py-2.5 px-6"
                    >
                      Publicar no Portal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-16 bg-primary-950 text-white p-10 rounded-xl relative overflow-hidden text-center">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #fff 0%, transparent 40%)' }}></div>
            <h3 className="text-2xl text-white mb-4 relative z-10">
              {language === 'fr' ? 'Abonnez-vous aux Actualités Officielles' : language === 'en' ? 'Subscribe to Official Announcements' : language === 'es' ? 'Suscríbase a los Comunicados Oficiales' : 'Subscreva os Comunicados Oficiais'}
            </h3>
            <p className="opacity-70 mb-8 max-w-lg mx-auto relative z-10 text-[0.94rem]">
              {language === 'fr'
                ? 'Recevez les décrets, changements législatifs et nouveaux services directement par e-mail.'
                : language === 'en'
                ? 'Receive statutory updates, legislative amendments, and new bureau services directly in your inbox.'
                : language === 'es'
                ? 'Reciba actualizaciones legislativas, decretos y nuevos servicios directamente en su correo.'
                : 'Receba atualizações sobre mudanças na lei e novos serviços diretamente no seu e-mail.'}
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <input 
                type="email" 
                placeholder={language === 'fr' ? 'Votre adresse e-mail' : language === 'en' ? 'Your email address' : language === 'es' ? 'Su correo electrónico' : 'O seu e-mail'} 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 px-4 py-3 rounded-xl outline-none"
                required 
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                {language === 'fr' ? 'S’abonner' : language === 'en' ? 'Subscribe' : language === 'es' ? 'Suscríbase' : 'Subscrever'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
