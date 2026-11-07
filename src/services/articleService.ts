import { supabase } from '../lib/supabase';
import { authService } from './authService';
import { getImageStorageUsage, uploadImageToStorage } from './imageService';
import { createSiteBackup } from './siteBackupService';

export interface ArticleItem {
  id?: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  imageUrl?: string;
}

const ARTICLES_STORAGE_KEY = 'emdpn_custom_articles';
const ARTICLES_UPDATED_EVENT = 'emdpn_articles_updated';

const INITIAL_DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: 'art-official-001',
    title: 'Abertura Oficial dos Novos Serviços de Apoio Notarial e Naturalização em Safim',
    date: '04 Nov 2026',
    author: 'Direção EMDPN-GB',
    excerpt: 'O EMDPN-GB anuncia a ampliação do atendimento ao público e à diáspora internacional, com canais digitais de agendamento prioritário e validação célere perante os órgãos de soberania.',
    category: 'Institucional',
    imageUrl: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg'
  }
];

function updateArticleCache(articles: ArticleItem[]): void {
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new CustomEvent(ARTICLES_UPDATED_EVENT, { detail: articles }));
}

export function getCustomArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_ARTICLES));
      return INITIAL_DEFAULT_ARTICLES;
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as ArticleItem[] : INITIAL_DEFAULT_ARTICLES;
  } catch (err) {
    console.error('Error reading custom articles', err);
    return INITIAL_DEFAULT_ARTICLES;
  }
}

export async function syncArticlesFromSupabase(): Promise<ArticleItem[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, date, author, excerpt, category, image_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load articles from Supabase:', error);
    throw new Error('Não foi possível carregar as publicações. Verifique a configuração do Supabase.');
  }

  const articles: ArticleItem[] = data.map(row => ({
    id: row.id,
    title: row.title,
    date: row.date,
    author: row.author,
    excerpt: row.excerpt,
    category: row.category,
    imageUrl: row.image_url || undefined
  }));
  updateArticleCache(articles);
  return articles;
}

export async function saveArticle(article: Omit<ArticleItem, 'id'> & { id?: string }): Promise<ArticleItem> {
  if (!authService.isAdmin()) {
    throw new Error('Inicie sessão como administrador para publicar.');
  }

  const savedArticle: ArticleItem = {
    ...article,
    id: article.id || `article-${crypto.randomUUID()}`
  };
  const imageStorage = await getImageStorageUsage();
  if (imageStorage.remainingBytes <= 0) {
    throw new Error('O armazenamento de imagens está cheio. Remova conteúdo sem uso antes de publicar.');
  }
  if (savedArticle.imageUrl?.startsWith('data:image/')) {
    savedArticle.imageUrl = await uploadImageToStorage(savedArticle.imageUrl);
  }
  await createSiteBackup(`Antes de publicar: ${savedArticle.title}`);
  const { error } = await supabase.from('articles').upsert({
    id: savedArticle.id,
    title: savedArticle.title,
    date: savedArticle.date,
    author: savedArticle.author,
    excerpt: savedArticle.excerpt,
    category: savedArticle.category,
    image_url: savedArticle.imageUrl || null
  });

  if (error) {
    console.error('Could not save article to Supabase:', error);
    throw new Error('Não foi possível publicar. Verifique o acesso administrativo e a configuração do Supabase.');
  }

  const updated = [savedArticle, ...getCustomArticles().filter(item => item.id !== savedArticle.id)];
  updateArticleCache(updated);
  return savedArticle;
}

export async function deleteArticle(id: string): Promise<boolean> {
  if (!authService.isAdmin()) {
    throw new Error('Acesso negado: somente o administrador autenticado pode apagar publicações.');
  }

  await createSiteBackup(`Antes de apagar publicação: ${id}`);
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) {
    console.error('Could not delete article from Supabase:', error);
    throw new Error('Não foi possível remover a publicação. Verifique o acesso administrativo.');
  }

  updateArticleCache(getCustomArticles().filter(article => article.id !== id));
  return true;
}

export async function clearAllArticles(): Promise<boolean> {
  if (!authService.isAdmin()) {
    throw new Error('Acesso negado: somente o administrador autenticado pode limpar publicações.');
  }

  await createSiteBackup('Antes de apagar todas as publicações');
  const { error } = await supabase.from('articles').delete().neq('id', '');
  if (error) {
    console.error('Could not clear articles from Supabase:', error);
    throw new Error('Não foi possível remover as publicações. Verifique o acesso administrativo.');
  }

  updateArticleCache([]);
  return true;
}

export { ARTICLES_UPDATED_EVENT };
