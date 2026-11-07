import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

const AUTH_KEY = 'emdpn_verified_admin';

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin' | 'secretaria';
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

    const role = data.user.app_metadata.role;
    if (role !== 'admin' && role !== 'secretaria') {
      await supabase.auth.signOut();
      return {
        success: false,
        error: 'Esta conta não tem permissões de acesso ao painel. Contacte um administrador.'
      };
    }

    const user: AdminUser = {
      email: data.user.email || email.trim(),
      name: data.user.user_metadata.name || 'Administrador EMDPN-GB',
      role
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
    if (!this.isAdmin()) {
      throw new Error('Inicie sessão como administrador para criar contas.');
    }

    const { error } = await supabase.functions.invoke('clever-function', {
      body: { email: email.trim(), password, role: 'admin' }
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

  async createStaffAccount(
    email: string,
    password: string,
    role: AdminUser['role']
  ): Promise<void> {
    if (!this.isAdmin()) {
      throw new Error('Inicie sessão como administrador para criar contas.');
    }

    const { error } = await supabase.functions.invoke('clever-function', {
      body: { email: email.trim(), password, role }
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
      console.error('Could not create staff account:', error);
      throw new Error(message || 'Não foi possível criar a conta.');
    }
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      const user: AdminUser | null = raw ? JSON.parse(raw) : null;
      return user && (user.role === 'admin' || user.role === 'secretaria') ? user : null;
    } catch (error) {
      console.error('Could not read administrator session:', error);
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  },

  async getVerifiedCurrentUser(): Promise<AdminUser | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      localStorage.removeItem(AUTH_KEY);
      console.error('Could not verify staff session:', error);
      throw new Error('Não foi possível confirmar a sessão. Inicie sessão novamente.');
    }

    const role = data.user?.app_metadata.role;
    if (!data.user || (role !== 'admin' && role !== 'secretaria')) {
      localStorage.removeItem(AUTH_KEY);
      return null;
    }

    const user: AdminUser = {
      email: data.user.email || '',
      name: data.user.user_metadata.name || (role === 'admin' ? 'Administrador EMDPN-GB' : 'Secretaria EMDPN-GB'),
      role
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
};
