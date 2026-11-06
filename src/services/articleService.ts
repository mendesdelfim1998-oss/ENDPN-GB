// Centralized Service for Managing Official Articles, Events, and Public Announcements
// Persists publications in Supabase 'articles' table with localStorage cache,
// synchronizes across all users, and enforces authentication for deletions.
import { supabase } from '../lib/supabase';
import { authService } from './authService';

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

// Initial pre-loaded seed article from Claudio / EMDPN Directorate
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

export function getCustomArticles(): ArticleItem[] {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(INITIAL_DEFAULT_ARTICLES));
      return INITIAL_DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length === 0) {
      return [];
    }
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading custom articles', err);
    return INITIAL_DEFAULT_ARTICLES;
  }
}

// Fetch articles from Supabase table and sync with local cache
export async function syncArticlesFromSupabase(): Promise<ArticleItem[]> {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped: ArticleItem[] = data.map((row: any) => ({
        id: row.id,
        title: row.title,
        date: row.date,
        author: row.author,
        excerpt: row.excerpt,
        category: row.category,
        imageUrl: row.image_url || undefined
      }));
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(mapped));
      window.dispatchEvent(new CustomEvent(ARTICLES_UPDATED_EVENT, { detail: mapped }));
      return mapped;
    }
  } catch (err) {
    console.log('[ArticleService] Supabase fallback to local cache:', err);
  }
  return getCustomArticles();
}

export async function saveArticle(article: Omit<ArticleItem, 'id'> & { id?: string }): Promise<ArticleItem> {
  try {
    const current = getCustomArticles();
    const newArticle: ArticleItem = {
      ...article,
      id: article.id || `custom-${Date.now()}`
    };
    const updated = [newArticle, ...current.filter(a => a.id !== newArticle.id)];
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(ARTICLES_UPDATED_EVENT, { detail: updated }));

    // Persist to Supabase 'articles' table
    try {
      await supabase.from('articles').upsert({
        id: newArticle.id,
        title: newArticle.title,
        date: newArticle.date,
        author: newArticle.author,
        excerpt: newArticle.excerpt,
        category: newArticle.category,
        image_url: newArticle.imageUrl || null
      });
    } catch (e) {
      console.warn('[ArticleService] Could not persist article to Supabase, cached locally:', e);
    }

    return newArticle;
  } catch (err) {
    console.error('Error saving article', err);
    throw new Error('Não foi possível salvar a publicação.');
  }
}

// Strict requirement: ONLY authenticated admin can delete a publication!
export async function deleteArticle(id: string): Promise<boolean> {
  if (!authService.isAuthenticated()) {
    console.error('Acesso negado: Somente administrador autenticado pode apagar publicações.');
    throw new Error('Acesso negado: Somente o administrador autenticado pode apagar publicações.');
  }

  try {
    const current = getCustomArticles();
    const updated = current.filter(a => a.id !== id);
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(ARTICLES_UPDATED_EVENT, { detail: updated }));

    // Delete from Supabase 'articles' table
    try {
      await supabase.from('articles').delete().eq('id', id);
    } catch (e) {
      console.warn('[ArticleService] Could not delete article from Supabase:', e);
    }
    return true;
  } catch (err) {
    console.error('Error deleting article', err);
    return false;
  }
}

export async function clearAllArticles(): Promise<boolean> {
  if (!authService.isAuthenticated()) {
    throw new Error('Acesso negado: Somente o administrador autenticado pode limpar publicações.');
  }

  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent(ARTICLES_UPDATED_EVENT, { detail: [] }));

    try {
      await supabase.from('articles').delete().neq('id', '');
    } catch {}
    return true;
  } catch (err) {
    console.error('Error clearing all articles', err);
    return false;
  }
}

export { ARTICLES_UPDATED_EVENT };
