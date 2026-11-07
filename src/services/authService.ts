import { FunctionsHttpError } from '@supabase/supabase-js';
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

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = this.getCurrentUser();
    if (!user) {
      throw new Error('Inicie sessão como administrador para alterar a palavra-passe.');
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword
    });
    if (signInError) {
      throw new Error('A palavra-passe atual está incorreta.');
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.error('Could not update administrator password:', error);
      throw new Error('Não foi possível alterar a palavra-passe.');
    }
  },

  async createAdminAccount(email: string, password: string): Promise<void> {
    if (!this.isAuthenticated()) {
      throw new Error('Inicie sessão como administrador para criar contas.');
    }

    const { error } = await supabase.functions.invoke('admin-users', {
      body: { email: email.trim(), password }
    });
    if (error) {
      let message = error.message;
      if (error instanceof FunctionsHttpError && error.context instanceof Response) {
        const responseBody: unknown = await error.context.clone().json().catch(() => null);
        if (
          responseBody &&
          typeof responseBody === 'object' &&
          'error' in responseBody &&
          typeof responseBody.error === 'string'
        ) {
          message = responseBody.error;
        }
      }
      console.error('Could not create administrator account:', error);
      throw new Error(message || 'Não foi possível criar a conta de administrador.');
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
