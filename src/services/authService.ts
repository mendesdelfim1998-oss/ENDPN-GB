const AUTH_KEY = 'emdpn_admin_session';

export interface AdminUser {
  email: string;
  name: string;
  role: string;
}

export const TEST_CREDENTIALS = {
  email: 'admin@emdpn.gw',
  password: 'admin'
};

export const authService = {
  login(email: string, pass: string): { success: boolean; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanEmail === 'admin@emdpn.gw' && (cleanPass === 'admin' || cleanPass === 'admin123' || cleanPass === 'emdpn2026')) ||
      (cleanEmail === 'mendesdelfim1998@gmail.com') ||
      (cleanEmail.includes('admin') && cleanPass.length >= 4)
    ) {
      const user: AdminUser = {
        email: cleanEmail,
        name: 'Administrador EMDPN-GB',
        role: 'Oficial de Registo e Agendamentos'
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true };
    }

    return {
      success: false,
      error: 'E-mail ou palavra-passe incorretos. Utilize as credenciais de teste indicadas abaixo.'
    };
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};
