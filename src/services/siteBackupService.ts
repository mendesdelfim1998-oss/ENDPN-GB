import { supabase } from '../lib/supabase';
import { authService } from './authService';

export interface SiteBackup {
  id: string;
  label: string;
  created_at: string;
  created_by: string | null;
}

function requireAdmin(): void {
  if (!authService.isAuthenticated()) {
    throw new Error('Inicie sessão como administrador para gerir os pontos de restauro.');
  }
}

export async function createSiteBackup(label: string): Promise<void> {
  requireAdmin();
  const { error } = await supabase.rpc('create_site_backup', { p_label: label });
  if (error) {
    console.error('Could not create site content backup:', error);
    throw new Error('Não foi possível criar o ponto de restauro. A alteração não foi guardada.');
  }
}

export async function listSiteBackups(): Promise<SiteBackup[]> {
  requireAdmin();
  const { data, error } = await supabase
    .from('site_backups')
    .select('id, label, created_at, created_by')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Could not load site content backups:', error);
    throw new Error('Não foi possível carregar os pontos de restauro.');
  }
  return data;
}

export async function restoreSiteBackup(id: string): Promise<void> {
  requireAdmin();
  const { error } = await supabase.rpc('restore_site_backup', { p_backup_id: id });
  if (error) {
    console.error('Could not restore site content backup:', error);
    throw new Error('Não foi possível restaurar este ponto de restauro.');
  }
}
