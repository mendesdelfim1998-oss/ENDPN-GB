// Image management service supporting Supabase `site_settings` table,
// local computer image uploads, real-time sync, and fallback caching.
import { supabase } from '../lib/supabase';

export interface CustomImagesState {
  heroBanner?: string;
  logo?: string;
  aboutOffice?: string;
  audienceShowcase?: string; // Second image on Homepage (Destinamo-nos a / A Quem se Destina)
  galleryPhotos?: string[];
  updatedAt?: string;
}

const STORAGE_KEY = 'emdpn_custom_images';
const EVENT_KEY = 'emdpn_images_updated';

// Default static images used in the app
export const DEFAULT_IMAGES = {
  heroBanner: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg',
  logo: '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png',
  aboutOffice: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg',
  audienceShowcase: '/src/assets/images/consular_citizenship_reception_1792939718416.jpg',
  galleryPhotos: [
    '/assets/aistudio/WhatsApp_Image_2026-10-21_at_09.03.22_4befee8f.jpeg',
    '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg'
  ]
};

export function getCustomImages(): CustomImagesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    
    // The national emblem between "República da" and "Guiné-Bissau" must ALWAYS be
    // the official transparent coat of arms (/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png)
    // Never allow photographic uploads or old test assets to replace the national coat of arms.
    if (!parsed.logo || parsed.logo !== DEFAULT_IMAGES.logo) {
      // If the user inadvertently uploaded a photo intended for the second image (audienceShowcase),
      // migrate it to audienceShowcase so the user's uploaded photo is applied to the 2nd image as intended:
      if (parsed.logo && parsed.logo.startsWith('data:image/') && !parsed.audienceShowcase) {
        parsed.audienceShowcase = parsed.logo;
      }
      parsed.logo = DEFAULT_IMAGES.logo;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (err) {
    console.error('Error reading custom images from storage', err);
    return { logo: DEFAULT_IMAGES.logo };
  }
}

// Fetch settings from Supabase `site_settings` and update local cache
export async function syncImagesFromSupabase(): Promise<CustomImagesState> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (!error && data && data.length > 0) {
      const current = getCustomImages();
      let changed = false;
      data.forEach((row: { key: string; value: string }) => {
        if (row.key in DEFAULT_IMAGES || row.key === 'audienceShowcase' || row.key === 'logo') {
          if ((current as any)[row.key] !== row.value) {
            (current as any)[row.key] = row.value;
            changed = true;
          }
        }
      });
      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));
      }
      return current;
    }
  } catch (err) {
    // If Supabase table isn't created yet or network offline, gracefully fallback to local
    console.log('[ImageService] Supabase sync fallback to local cache:', err);
  }
  return getCustomImages();
}

export async function setCustomImage(
  key: keyof Omit<CustomImagesState, 'galleryPhotos' | 'updatedAt'>, 
  dataUrl: string
): Promise<void> {
  try {
    const current = getCustomImages();
    current[key] = dataUrl;
    current.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));

    // Persist to Supabase `site_settings` table asynchronously
    try {
      await supabase
        .from('site_settings')
        .upsert({ key, value: dataUrl, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    } catch (e) {
      console.warn('[ImageService] Could not persist to Supabase site_settings, cached locally:', e);
    }
  } catch (err) {
    console.error('Error saving custom image', err);
    throw new Error('Não foi possível salvar a imagem. O ficheiro pode ser muito grande para o armazenamento local.');
  }
}

export function addGalleryPhoto(dataUrl: string): void {
  try {
    const current = getCustomImages();
    const existing = current.galleryPhotos || [];
    current.galleryPhotos = [dataUrl, ...existing];
    current.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));
  } catch (err) {
    console.error('Error adding gallery photo', err);
    throw err;
  }
}

export function removeGalleryPhoto(index: number): void {
  try {
    const current = getCustomImages();
    if (current.galleryPhotos) {
      current.galleryPhotos = current.galleryPhotos.filter((_, i) => i !== index);
      current.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));
    }
  } catch (err) {
    console.error('Error removing gallery photo', err);
  }
}

export async function resetImageToDefault(key: keyof Omit<CustomImagesState, 'galleryPhotos' | 'updatedAt'>): Promise<void> {
  try {
    const current = getCustomImages();
    delete current[key];
    current.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));

    try {
      await supabase.from('site_settings').delete().eq('key', key);
    } catch {}
  } catch (err) {
    console.error('Error resetting image', err);
  }
}

export function clearUnusedImages(): { clearedCount: number; message: string } {
  try {
    const current = getCustomImages();
    let count = 0;
    
    // Check keys
    if (current.heroBanner === DEFAULT_IMAGES.heroBanner) {
      delete current.heroBanner;
      count++;
    }
    if (current.logo === DEFAULT_IMAGES.logo) {
      delete current.logo;
      count++;
    }
    if (current.aboutOffice === DEFAULT_IMAGES.aboutOffice) {
      delete current.aboutOffice;
      count++;
    }
    if (current.audienceShowcase === DEFAULT_IMAGES.audienceShowcase) {
      delete current.audienceShowcase;
      count++;
    }
    
    // Clean old temporary keys from previous sessions if any
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(k => {
      if (k.startsWith('emdpn_temp_image_') || k.startsWith('temp_img_')) {
        localStorage.removeItem(k);
        count++;
      }
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: current }));
    return {
      clearedCount: count,
      message: `Limpeza concluída! Foram removidos ${count} ficheiros/referências em desuso e o armazenamento foi otimizado.`
    };
  } catch (err) {
    console.error('Error clearing unused images', err);
    return { clearedCount: 0, message: 'Ocorreu um erro durante a limpeza.' };
  }
}

export async function resetAllImages(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: {} }));
    try {
      await supabase.from('site_settings').delete().neq('key', '');
    } catch {}
  } catch (err) {
    console.error('Error resetting all images', err);
  }
}

// Convert a file from the user's computer into an optimized Base64 Data URL
export function processImageFile(file: File, maxWidth: number = 1200, maxHeight: number = 900, quality: number = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('O ficheiro selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler ficheiro do computador.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Erro ao carregar a imagem selecionada.'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Use PNG for logos, JPEG for photographic banners
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(format, quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
