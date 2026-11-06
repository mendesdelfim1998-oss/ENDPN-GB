import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { Mail, Lock, LogIn, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { authService } from '../services/authService';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/admin'), 500);
      } else {
        setError(result.error || 'Credenciais inválidas.');
      }
    } catch (loginError) {
      console.error('Administrator sign-in failed:', loginError);
      setError('Não foi possível iniciar sessão. Verifique a ligação ao Supabase e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-[calc(100vh-330px)] pb-20">
      <PageHeader 
        title="Portal de Acesso e Gestão" 
        subtitle="Entrada restrita para gestão de agendamentos, processos e documentação oficial." 
      />
      
      <section className="py-14">
        <div className="max-w-[480px] mx-auto px-6">
          <Reveal>
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-neutral-200">
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-950 text-accent-400 flex items-center justify-center shadow-lg mb-4 ring-4 ring-primary-100">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl text-primary-950 font-bold m-0 font-serif">Área de Administração</h2>
                <p className="text-neutral-500 text-xs sm:text-sm mt-1.5">
                  Gestão interna de pedidos, agendamentos e emissão de documentos.
                </p>
              </div>

              {error && (
                <div className="p-3.5 mb-5 bg-error-50 border border-error-100 rounded-xl text-error-700 text-xs font-semibold text-center animate-fade-in">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3.5 mb-5 bg-success-50 border border-success-100 rounded-xl text-success-800 text-xs font-bold text-center flex items-center justify-center gap-2 animate-fade-in">
                  <CheckCircle2 size={16} /> Acesso autorizado! A redirecionar para o painel...
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-primary-950 text-xs font-bold uppercase tracking-wider mb-1.5">
                    E-mail do Administrador
                  </label>
                  <div className="flex items-center gap-2.5 border-2 border-neutral-200 rounded-xl bg-neutral-50 px-3.5 focus-within:border-primary-600 focus-within:bg-white transition-all">
                    <Mail size={18} className="text-neutral-400 shrink-0" />
                    <input 
                      type="email" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full py-3.5 outline-none bg-transparent text-sm font-medium"
                      placeholder="E-mail registado no sistema"
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-primary-950 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Palavra-passe
                  </label>
                  <div className="flex items-center gap-2.5 border-2 border-neutral-200 rounded-xl bg-neutral-50 px-3.5 focus-within:border-primary-600 focus-within:bg-white transition-all">
                    <Lock size={18} className="text-neutral-400 shrink-0" />
                    <input 
                      type="password" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full py-3.5 outline-none bg-transparent text-sm font-medium"
                      placeholder="••••••••"
                      required 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-institutional w-full justify-center py-3.5 text-sm rounded-xl shadow-md mt-2"
                >
                  <LogIn size={18} /> {isLoading ? 'A validar...' : 'Entrar no Painel de Agendamentos'}
                </button>
              </form>

              <div className="mt-8 pt-5 border-t border-neutral-200 text-xs text-neutral-500">
                Use uma conta criada no Supabase Auth com a função administrativa ativa.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
