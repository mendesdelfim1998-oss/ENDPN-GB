import { supabase } from '../lib/supabase';
import { authService } from './authService';
import { createSiteBackup } from './siteBackupService';
import audienceShowcaseImage from '../assets/images/consular_citizenship_reception_1792939718416.jpg';

export interface CustomImagesState {
  heroBanner?: string;
  logo?: string;
  aboutOffice?: string;
  audienceShowcase?: string;
  galleryPhotos?: string[];
  updatedAt?: string;
}

type EditableImageKey = 'heroBanner' | 'logo' | 'aboutOffice' | 'audienceShowcase';
type SyncedImageKey = 'heroBanner' | 'aboutOffice' | 'audienceShowcase';
const STORAGE_KEY = 'emdpn_custom_images';
const EVENT_KEY = 'emdpn_images_updated';
const IMAGE_BUCKET = 'site-images';

export const DEFAULT_IMAGES = {
  heroBanner: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg',
  logo: '/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png',
  aboutOffice: '/assets/aistudio/WhatsApp_Image_2026-10-25_at_15.30.49_236398bc.jpeg',
  audienceShowcase: audienceShowcaseImage,
  galleryPhotos: [
    '/assets/aistudio/WhatsApp_Image_2026-10-25_at_08.54.54_565fca33.jpeg',
    '/assets/aistudio/WhatsApp_Image_2026-10-21_at_09.03.22_4befee8f.jpeg'
  ]
};

function updateImageCache(images: CustomImagesState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: images }));
}

function requireAdmin(): void {
  if (!authService.isAuthenticated()) {
    throw new Error('Inicie sessão como administrador para alterar as imagens.');
  }
}

function isSyncedImageKey(key: string): key is SyncedImageKey {
  return key === 'heroBanner' || key === 'aboutOffice' || key === 'audienceShowcase';
}

export async function uploadImageToStorage(dataUrl: string): Promise<string> {
  requireAdmin();
  if (!dataUrl.startsWith('data:image/')) {
    if (/^https?:\/\//i.test(dataUrl) || dataUrl.startsWith('/')) return dataUrl;
    throw new Error('A imagem selecionada não é válida.');
  }

  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const extension = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(path, blob, { contentType: blob.type, cacheControl: '3600', upsert: false });

  if (error) {
    console.error('Could not upload image to Supabase Storage:', error);
    throw new Error('Não foi possível carregar a imagem para o armazenamento partilhado.');
  }

  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

async function saveSetting(key: string, value: string): Promise<void> {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) {
    console.error('Could not save site setting to Supabase:', error);
    throw new Error('Não foi possível guardar a alteração no portal partilhado.');
  }
}

export function getCustomImages(): CustomImagesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    const images = parsed && typeof parsed === 'object' ? parsed as CustomImagesState : {};

    if (images.logo !== DEFAULT_IMAGES.logo) {
      if (images.logo?.startsWith('data:image/') && !images.audienceShowcase) {
        images.audienceShowcase = images.logo;
      }
      images.logo = DEFAULT_IMAGES.logo;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    }
    return images;
  } catch (err) {
    console.error('Error reading custom images from storage', err);
    return { logo: DEFAULT_IMAGES.logo };
  }
}

export async function syncImagesFromSupabase(strict = false): Promise<CustomImagesState> {
  const { data, error } = await supabase.from('site_settings').select('key, value');
  if (error) {
    console.error('Could not load shared images from Supabase:', error);
    if (strict) {
      throw new Error('Não foi possível atualizar as imagens restauradas do portal.');
    }
    return getCustomImages();
  }

  const images: CustomImagesState = {
    logo: DEFAULT_IMAGES.logo,
    galleryPhotos: DEFAULT_IMAGES.galleryPhotos
  };
  for (const row of data) {
    if (isSyncedImageKey(row.key)) {
      images[row.key] = row.value;
    } else if (row.key === 'galleryPhotos') {
      try {
        const photos: unknown = JSON.parse(row.value);
        if (Array.isArray(photos) && photos.every(photo => typeof photo === 'string')) {
          images.galleryPhotos = photos;
        }
      } catch (err) {
        console.error('Could not parse shared gallery photos:', err);
      }
    }
  }

  updateImageCache(images);
  return images;
}

export async function setCustomImage(key: EditableImageKey, dataUrl: string): Promise<void> {
  requireAdmin();
  const imageUrl = await uploadImageToStorage(dataUrl);
  await createSiteBackup(`Antes de alterar imagem: ${key}`);
  await saveSetting(key, imageUrl);
  const current = getCustomImages();
  current[key] = imageUrl;
  current.updatedAt = new Date().toISOString();
  updateImageCache(current);
}

export async function addGalleryPhoto(dataUrl: string): Promise<void> {
  requireAdmin();
  const imageUrl = await uploadImageToStorage(dataUrl);
  const current = getCustomImages();
  const photos = [imageUrl, ...(current.galleryPhotos || DEFAULT_IMAGES.galleryPhotos)];
  await createSiteBackup('Antes de adicionar foto à galeria');
  await saveSetting('galleryPhotos', JSON.stringify(photos));
  current.galleryPhotos = photos;
  current.updatedAt = new Date().toISOString();
  updateImageCache(current);
}

export async function removeGalleryPhoto(index: number): Promise<void> {
  requireAdmin();
  const current = getCustomImages();
  const photos = (current.galleryPhotos || DEFAULT_IMAGES.galleryPhotos).filter((_, i) => i !== index);
  await createSiteBackup('Antes de remover foto da galeria');
  await saveSetting('galleryPhotos', JSON.stringify(photos));
  current.galleryPhotos = photos;
  current.updatedAt = new Date().toISOString();
  updateImageCache(current);
}

export async function resetImageToDefault(key: EditableImageKey): Promise<void> {
  requireAdmin();
  await createSiteBackup(`Antes de restaurar imagem: ${key}`);
  const { error } = await supabase.from('site_settings').delete().eq('key', key);
  if (error) {
    console.error('Could not reset shared image in Supabase:', error);
    throw new Error('Não foi possível restaurar a imagem padrão no portal partilhado.');
  }

  const current = getCustomImages();
  delete current[key];
  current.updatedAt = new Date().toISOString();
  updateImageCache(current);
}

export function clearUnusedImages(): { clearedCount: number; message: string } {
  try {
    const current = getCustomImages();
    let count = 0;
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
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('emdpn_temp_image_') || key.startsWith('temp_img_')) {
        localStorage.removeItem(key);
        count++;
      }
    });
    updateImageCache(current);
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
  requireAdmin();
  await createSiteBackup('Antes de restaurar todas as imagens');
  const { error } = await supabase.from('site_settings').delete().neq('key', '');
  if (error) {
    console.error('Could not reset shared images in Supabase:', error);
    throw new Error('Não foi possível restaurar as imagens padrão do portal partilhado.');
  }
  updateImageCache({ logo: DEFAULT_IMAGES.logo, galleryPhotos: DEFAULT_IMAGES.galleryPhotos });
}

export function processImageFile(file: File, maxWidth: number = 1200, maxHeight: number = 900, quality: number = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('O ficheiro selecionado não é uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler ficheiro do computador.'));
    reader.onload = (event) => {
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
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('Não foi possível processar a imagem selecionada.'));
          return;
        }
        context.drawImage(img, 0, 0, width, height);
        const format = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        resolve(canvas.toDataURL(format, quality));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
