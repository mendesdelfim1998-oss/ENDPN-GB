import { supabase } from '../lib/supabase';

const AUTH_KEY = 'emdpn_verified_admin';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export const authService = {
  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    localStorage.removeItem(AUTH_KEY);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error || !data.user) {
      return { success: false, error: 'E-mail ou palavra-passe incorretos.' };
    }

    if (data.user.app_metadata.role !== 'admin') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Esta conta não tem permissões de administrador. Contacte o responsável pelo Supabase.'
      };
    }

    const user: AdminUser = {
      email: data.user.email || email.trim(),
      name: data.user.user_metadata.name || 'Administrador EMDPN-GB',
      role: 'admin'
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return { success: true };
  },

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_KEY);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Could not sign out from Supabase:', error);
      throw new Error('Não foi possível terminar a sessão. Tente novamente.');
    }
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      const user: AdminUser | null = raw ? JSON.parse(raw) : null;
      return user?.role === 'admin' ? user : null;
    } catch (error) {
      console.error('Could not read administrator session:', error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};
