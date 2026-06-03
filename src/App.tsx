/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, Calendar, BarChart3, Bell, CheckCircle2, ChevronRight, 
  Smartphone, Droplets, Wallet, Users, ArrowRight, Menu, X, Clock, Settings,
  Camera, Database, Crown, TrendingUp, Mail, Briefcase, ArrowLeft, LogOut,
  User, MessageCircle, Check, ArrowUpRight, Instagram, Linkedin, Facebook, Twitter, Lock, ExternalLink, Zap
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('vipcar_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('vipcar_user');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('vipcar_token');
    localStorage.removeItem('vipcar_user');
    setUser(null);
  };

  const apiUrl = import.meta.env.VITE_API_URL || 'https://vip-car-api.vercel.app';

  const handleSubscribe = async (plan: 'basic' | 'pro') => {
    if (!user) {
      setIsLoginOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem('vipcar_token');
      const response = await fetch(`${apiUrl}/subscriptions/checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao iniciar checkout.');
      }

      if (data.url) {
        if (data.url.startsWith('https://checkout.stripe.com/')) {
          window.open(data.url, '_blank');
        } else {
          throw new Error('URL de pagamento inválida ou não segura.');
        }
      }
    } catch (err: any) {
      alert(err.message || 'Erro ao conectar com o gateway de pagamento.');
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    try {
      const token = localStorage.getItem('vipcar_token');
      const response = await fetch(`${apiUrl}/subscriptions/portal`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha ao carregar portal de gerenciamento.');
      }

      if (data.url) {
        if (data.url.startsWith('https://billing.stripe.com/')) {
          window.open(data.url, '_blank');
        } else {
          throw new Error('URL do portal de cobrança inválida ou não segura.');
        }
      }
    } catch (err: any) {
      alert(err.message || 'Erro ao conectar com o portal de gerenciamento.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-white bg-[#020617] text-white relative">
      {/* Ambient Mesh Gradients */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-[20%] right-[10%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#020617]/50 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img src="/full_logo.png" alt="VIP Car Logo" className="h-8 sm:h-9 w-auto object-contain" />
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors tracking-wide">Vantagens</a>
              <a href="#preview" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors tracking-wide">App na Prática</a>
              <a href="#pricing" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors tracking-wide">Planos</a>
              {user ? (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsProfileOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-slate-200">{user.name.split(' ')[0]}</span>
                  </button>
                  <button 
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                    title="Sair"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsLoginOpen(true)}
                    className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-sm font-medium text-white shadow-xl"
                  >
                    Login
                  </button>
                  <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-cyan-500/30">
                    Criar Conta Grátis
                  </button>
                </div>
              )}
            </div>
            
            <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-4">
                <a href="#features" className="text-base font-semibold text-white px-4 py-2 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Vantagens</a>
                <a href="#preview" className="text-base font-semibold text-white px-4 py-2 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>App na Prática</a>
                <a href="#pricing" className="text-base font-semibold text-white px-4 py-2 rounded-lg hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Planos</a>
                <div className="h-px bg-white/10 my-2"></div>
                {user ? (
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-white">{user.name}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{user.tenant?.name || 'Vip Car'}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-center py-3 bg-red-500/10 border border-red-500/20 rounded-xl font-bold text-red-400"
                    >
                      Sair da Conta
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsLoginOpen(true);
                      }}
                      className="w-full text-center py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-white"
                    >
                      Login
                    </button>
                    <button className="w-full text-center py-3 bg-cyan-500 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/20">
                      Criar Conta Grátis
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-16">
        <HeroSection />
        <FeaturesSection />
        <InteractiveSection />
        <BenefitsSection />
        <PricingSection user={user} onSubscribe={handleSubscribe} onManageSubscription={handleManageSubscription} />
        <BottomCTA />
      </main>

      <Footer />

      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal 
            onClose={() => setIsLoginOpen(false)} 
            onLoginSuccess={(userData) => {
              setUser(userData);
              setIsLoginOpen(false);
            }}
          />
        )}
        {isProfileOpen && user && (
          <ProfileModal 
            user={user} 
            onClose={() => setIsProfileOpen(false)} 
            onLogout={() => {
              logout();
              setIsProfileOpen(false);
            }} 
            onManageSubscription={handleManageSubscription}
            onSubscribe={handleSubscribe}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileModal({ 
  user, 
  onClose, 
  onLogout,
  onManageSubscription,
  onSubscribe
}: { 
  user: any; 
  onClose: () => void; 
  onLogout: () => void;
  onManageSubscription: () => void;
  onSubscribe: (plan: 'basic' | 'pro') => void;
}) {
  const [showPlans, setShowPlans] = useState(false);
  const tenantPlan = user.tenant?.plan;
  const tenantVariant = user.tenant?.variantId;
  
  let planName = 'Plano Básico';
  let planColor = 'from-cyan-500 to-blue-600';
  let crownColor = 'text-cyan-400';

  if (tenantVariant === 'pro' || tenantPlan === 'advanced' || tenantVariant === 'advanced') {
    planName = 'Plano Pro';
    planColor = 'from-amber-500 to-orange-600';
    crownColor = 'text-amber-400';
  } else if (tenantPlan === 'trial') {
    planName = 'Período de Teste';
    planColor = 'from-slate-500 to-slate-700';
    crownColor = 'text-slate-400';
  }
  
  const isTrial = tenantPlan === 'trial';
  const isCourtesy = !isTrial && !user.tenant?.externalSubscriptionId && !user.tenant?.externalCustomerId;
  
  const expirationDate = isTrial 
    ? user.tenant?.trialEndsAt 
    : user.tenant?.currentPeriodEnd;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Ambient background light */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none`} />
        
        <div className="relative z-10 p-8 sm:p-10">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {showPlans ? (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button 
                  onClick={() => setShowPlans(false)}
                  className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer border border-white/5"
                >
                  <ArrowLeft size={16} />
                </button>
                <h2 className="text-xl font-display font-bold text-white tracking-tight">Escolha seu plano</h2>
              </div>

              <div className="space-y-4 mb-6">
                {/* Basic Option */}
                <button 
                  onClick={() => onSubscribe('basic')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-5 text-left flex items-center justify-between transition-all group cursor-pointer"
                >
                  <div>
                    <h4 className="font-bold text-white mb-1">Plano Básico</h4>
                    <p className="text-slate-400 text-xs">1 usuário e veículos ilimitados</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-cyan-400 block">R$ 49,90</span>
                    <span className="text-[10px] text-slate-500">/mês</span>
                  </div>
                </button>

                {/* Pro Option */}
                <button 
                  onClick={() => onSubscribe('pro')}
                  className="w-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-3xl p-5 text-left flex items-center justify-between transition-all group cursor-pointer relative"
                >
                  <div className="absolute top-0 right-12 -translate-y-1/2 bg-indigo-500 text-white px-2 py-0.5 rounded-full text-[8px] font-extrabold uppercase tracking-wider">
                    Mais Escolhido
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 flex items-center gap-1.5">
                      Plano Pro <Zap size={12} className="text-amber-400 fill-amber-400" />
                    </h4>
                    <p className="text-slate-400 text-xs">Até 5 usuários e relatórios financeiros</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-indigo-400 block">R$ 89,90</span>
                    <span className="text-[10px] text-slate-500">/mês</span>
                  </div>
                </button>
              </div>

              <button 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-2xl font-bold text-xs transition-all border border-white/10 text-center cursor-pointer flex items-center justify-center gap-2 group"
              >
                Visualizar informações dos planos <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${planColor} rounded-3xl items-center justify-center shadow-xl text-white mb-6 transform -rotate-3`}>
                  <User size={40} strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-1 tracking-tight">{user.name}</h2>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>

              <div className="space-y-4 mb-10">
                {/* Plan Info Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${planColor} opacity-5 blur-[40px] pointer-events-none`} />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status da Assinatura</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white tracking-tight">{planName}</span>
                        <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Ativo</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                      <Crown size={20} className={crownColor} />
                    </div>
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-slate-500" />
                      <span className="text-slate-300">Expira em: <strong className="text-white font-semibold">{formatDate(expirationDate)}</strong></span>
                    </div>
                    {isTrial ? (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-slate-400" />
                        <span className="text-slate-300">Período de testes ativo</span>
                      </div>
                    ) : isCourtesy ? (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-amber-400" />
                        <span className="text-slate-300">Plano de cortesia ativo</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-slate-300">Renovação automática activa</span>
                      </div>
                    )}
                  </div>
                </div>

                {tenantPlan === 'monthly' && (
                  <button 
                    onClick={onManageSubscription}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-indigo-600/30 group cursor-pointer"
                  >
                    Gerenciar Plano / Upgrade <ExternalLink size={18} className="text-indigo-200 group-hover:text-white transition-colors" />
                  </button>
                )}
                
                {tenantPlan === 'trial' && (
                  <button 
                    onClick={() => setShowPlans(true)}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-500/30 group cursor-pointer"
                  >
                    Assinar Plano VIP <ExternalLink size={18} className="text-cyan-100 group-hover:text-white transition-colors" />
                  </button>
                )}

                <a 
                  href="https://vip-car-app.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border border-white/10 group cursor-pointer"
                >
                  Acessar App / Dashboard <ExternalLink size={18} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </a>
              </div>

              <button 
                onClick={onLogout}
                className="w-full py-4 text-slate-500 hover:text-red-400 font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={18} /> Sair da conta
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LoginModal({ onClose, onLoginSuccess }: { onClose: () => void, onLoginSuccess: (userData: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://vip-car-api.vercel.app';
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwordRaw: password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas');
      }

      localStorage.setItem('vipcar_token', data.token);
      localStorage.setItem('vipcar_user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || "Erro de conexão com o servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        {/* Ambient background light */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 p-8 sm:p-10">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          <div className="mb-10 text-center">
            <div className="inline-flex w-32 h-32 rounded-full bg-slate-950/20 items-center justify-center shadow-2xl shadow-cyan-500/5 mb-6 border border-white/5 overflow-hidden">
              <img src="/logo.png" alt="VIP Car Emblem" className="w-full h-full object-contain p-2" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">Bem-vindo de volta</h2>
            <p className="text-slate-400 text-sm">Acesse sua conta para gerenciar seu pátio</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">E-mail</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a href="#" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">Esqueceu a senha?</a>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Entrando...
                </>
              ) : "Entrar"}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-x-0 h-px bg-white/5"></div>
              <span className="relative px-4 bg-[#0c1226] text-xs font-bold text-slate-500 uppercase tracking-widest">ou entre com</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all text-sm font-semibold text-white">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05 1.79-3.32 1.79-1.25 0-1.66-.78-3.14-.78-1.47 0-1.93.76-3.14.76-1.28 0-2.33-.84-3.31-1.78-2-1.89-3.53-5.32-3.53-8.5 0-5.15 3.34-7.88 6.51-7.88 1.66 0 3.03.62 3.99.62.95 0 2.51-.76 4.41-.56 1.83.18 3.23.95 4.09 2.17-3.79 2.21-3.18 7.23.63 8.8-.76 1.95-1.73 3.86-3.23 5.3zm-3.11-17.72c.86-1.04 1.44-2.48 1.44-3.92-1.24.05-2.73.83-3.63 1.87-.81.93-1.51 2.42-1.51 3.83 1.39.11 2.8-.73 3.7-1.78z"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta? <a href="#" className="font-bold text-white hover:text-cyan-400 transition-colors">Crie grátis agora</a>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

{/* --- PHONE MOCKUP SHELL --- */}
function PhoneMockup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative mx-auto rounded-[3rem] bg-slate-900 border-[10px] border-slate-900 shadow-2xl overflow-hidden aspect-[9/19.5] max-h-[700px] w-full max-w-[320px] ring-1 ring-white/10 ${className}`}>
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-30 rounded-b-2xl mx-auto w-32 flex justify-center items-center gap-2">
        <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
      </div>
      
      {/* Screen */}
      <div className="relative h-full w-full flex flex-col overflow-hidden rounded-[2.25rem] bg-[#f4f5f7]" style={{ isolation: 'isolate', transform: 'translateZ(0)' }}>
        {children}
      </div>
    </div>
  );
}

const MOCK_SERVICES = [
  { 
    model: "AUDI A3 SEDAN", 
    plate: "AUD1A30", 
    name: "JULIA LIMA", 
    price: "85,00", 
    time: "08:00", 
    order: "#1", 
    action: "Aviso Enviado",
    actionSub: "WhatsApp",
    icon: MessageCircle,
    iconColor: "from-green-400 to-[#25D366]",
    iconBg: "shadow-green-500/30",
    completeTitle: "Serviço Concluído",
    completeSub: "Lavagem Completa"
  },
  { 
    model: "HONDA CIVIC G10", 
    plate: "CIV1C10", 
    name: "ANA OLIVEIRA", 
    price: "60,00", 
    time: "08:50", 
    order: "#2", 
    action: "Na Fila",
    actionSub: "Aguardando Vaga",
    icon: Clock,
    iconColor: "from-amber-400 to-amber-500",
    iconBg: "shadow-amber-500/30",
    completeTitle: "Aguardando",
    completeSub: "Lavagem Simples"
  },
  { 
    model: "BMW X5 (PRETO)", 
    plate: "BMW0X50", 
    name: "CARLOS SILVA", 
    price: "120,00", 
    time: "09:40", 
    order: "#3",
    action: "Em Progresso",
    actionSub: "Box 2",
    icon: Car,
    iconColor: "from-blue-400 to-blue-500",
    iconBg: "shadow-blue-500/30",
    completeTitle: "Em Andamento",
    completeSub: "Polimento"
  },
  { 
    model: "VOLVO XC60", 
    plate: "VOL1X60", 
    name: "MARCOS SOUZA", 
    price: "90,00", 
    time: "10:15", 
    order: "#4",
    action: "Aviso Enviado",
    actionSub: "Veículo Pronto",
    icon: MessageCircle,
    iconColor: "from-green-400 to-[#25D366]",
    iconBg: "shadow-green-500/30",
    completeTitle: "Serviço Concluído",
    completeSub: "Higienização"
  }
];

{/* --- HERO SECTION --- */}
function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_SERVICES.length);
    }, 7000); // 7 seconds interval for calm scrolling
    return () => clearInterval(timer);
  }, []);

  const activeService = MOCK_SERVICES[currentIndex];
  const activeIcon = activeService.icon;

  return (
    <section className="relative overflow-hidden z-10 pt-12 pb-24 lg:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          <div className="mb-16 lg:mb-0 max-w-2xl perspective-[1000px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                Mais prático, mais rápido
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Acelere a gestão <br/> da sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Lavagem</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-xl">
                Fim da bagunça no pátio e agendas de papel. Administre a fila de veículos, avise o cliente pelo WhatsApp com 1 clique e fature mais.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30">
                  Criar Conta Grátis <ArrowRight size={18} />
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2 transition-all shadow-sm">
                  <Smartphone size={18} /> Baixar App (Android)
                </button>
              </div>
              
              <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#020617] overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=1e293b`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Junte-se a <strong className="text-white">vários hubs</strong> automotivos de sucesso</p>
              </div>
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-none lg:w-[400px] select-none pointer-events-none">
            {/* Decorative background blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-400/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex justify-center pb-10">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PhoneMockup className="border-slate-900 ring-white/10 shadow-[0_20px_60px_-15px_rgba(56,189,248,0.3)]">
                    <HeroAppAnimation currentIndex={currentIndex} />
                  </PhoneMockup>

                  {/* Floating Element 1: Dynamic notification */}
                  <AnimatePresence mode="popLayout">
                    <motion.div 
                      key={"action-" + activeService.plate}
                      className="absolute -right-6 sm:-right-24 top-[18%] bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3 z-50 min-w-[200px]"
                      initial={{ opacity: 0, y: 30, x: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20, x: 10 }}
                      transition={{ type: "spring", bounce: 0.6, duration: 1 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${activeService.iconColor} text-white flex items-center justify-center shadow-lg ${activeService.iconBg}`}
                      >
                        {React.createElement(activeIcon, { size: 22, className: "fill-current" })}
                      </motion.div>
                      <div className="pr-3">
                        <p className="text-sm font-black text-slate-800 tracking-tight">{activeService.action}</p>
                        <p className="text-[11px] text-slate-500 font-semibold tracking-wide">{activeService.actionSub}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Floating Element 2: Completed Service */}
                  <AnimatePresence mode="popLayout">
                  <motion.div 
                    key={"complete-" + activeService.plate}
                    className="absolute -left-10 sm:-left-32 bottom-[28%] bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] p-3.5 rounded-2xl flex items-center gap-3.5 z-50 min-w-[200px]"
                    initial={{ opacity: 0, y: 30, x: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20, x: -10 }}
                    transition={{ type: "spring", bounce: 0.6, duration: 1, delay: 0.15 }}
                  >
                    <motion.div
                      animate={{ rotate: [-8, 8, -8] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-[#1875D3] flex items-center justify-center border border-blue-200 shadow-inner"
                    >
                       <Car size={24} />
                    </motion.div>
                    <div className="pr-3">
                       <p className="text-[10px] uppercase font-black text-[#1875D3] tracking-widest mb-0.5">{activeService.completeTitle}</p>
                       <p className="text-[13px] font-bold text-slate-800 leading-tight">{activeService.completeSub}</p>
                       <p className="text-[11px] font-medium text-slate-500">Valor: R$ {activeService.price}</p>
                    </div>
                  </motion.div>
                  </AnimatePresence>

                </motion.div>
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

{/* --- ANIMATED HERO APP CONTENT --- */}
function HeroAppAnimation({ currentIndex }: { currentIndex: number }) {
  // Generate the window of 4 visible items with backwards rotation so items appear to scroll DOWN
  const l = MOCK_SERVICES.length;
  // If currentIndex goes up 0, 1, 2... we want the new item to appear at the top.
  // So the top item is currentIndex, the next is currentIndex-1, then currentIndex-2.
  const visibleItems = [
    MOCK_SERVICES[currentIndex % l],
    MOCK_SERVICES[(currentIndex - 1 + l) % l],
    MOCK_SERVICES[(currentIndex - 2 + l) % l],
    MOCK_SERVICES[(currentIndex - 3 + l) % l]
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#1875D3] overflow-hidden text-slate-800">
      {/* Header Blue */}
      <div className="bg-[#1875D3] pt-10 pb-8 px-5 relative z-0">
        <div className="flex items-center gap-4 text-white">
          <ArrowLeft size={24} />
          <h2 className="text-xl font-medium tracking-wide">Fila de Serviços</h2>
        </div>
      </div>

      {/* Main Content Area - overlaps header */}
      <div className="flex-1 bg-[#f4f5f7] rounded-t-3xl rounded-b-[2.25rem] -mt-5 p-4 overflow-hidden relative z-10 flex flex-col gap-4 w-full">
        
        {/* Tabs */}
        <div className="flex gap-2 mb-1 px-1 justify-center z-20 relative">
          <div className="w-[140px] py-1.5 text-center rounded-lg border border-blue-200 bg-blue-50/20 shadow-sm flex items-center justify-center">
            <span className="text-[#1875D3] font-bold text-xs tracking-wide">Pendentes</span>
          </div>
          <div className="w-[140px] py-1.5 text-center rounded-lg border border-slate-200 bg-white shadow-sm flex items-center justify-center">
            <span className="text-slate-500 font-medium text-xs tracking-wide">Concluídos</span>
          </div>
        </div>

        {/* List Items Container with Mask for smooth fade at bottom */}
        <div className="relative flex-1 -mx-4 px-4 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}>
          <div className="flex flex-col gap-4 relative w-full pt-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, i) => {
              const isActive = i === 0;
              return (
                <motion.div 
                  key={item.plate}
                  layout="position"
                  initial={{ opacity: 0, y: -40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: isActive ? 1.02 : 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  transition={{ duration: 1.2, type: "spring", bounce: 0.2 }}
                  className={`bg-white rounded-[1.25rem] p-4 shadow-[0_2px_15px_rgba(0,0,0,0.06)] border relative z-10 flex flex-col gap-4 transition-colors origin-top
                    ${isActive ? 'border-blue-300 ring-2 ring-blue-500/10 shadow-lg' : 'border-slate-100'} 
                    ${i > 2 ? 'opacity-40 blur-[1px]' : ''}`}
                  style={{ zIndex: 10 - i }}
                >
                  {/* Top Row: Car, Plate, Order */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Car size={16} className={isActive ? 'text-blue-500' : 'text-[#1875D3]'} />
                      <span className="font-extrabold text-slate-900 text-[13px] tracking-tight">{item.model}</span>
                      <span className={`${isActive ? 'bg-blue-100 border-blue-200' : 'bg-blue-50 border-blue-100'} text-[#1875D3] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider border flex-shrink-0`}>
                        {item.plate}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
                      {item.order}
                    </span>
                  </div>

                  {/* Middle Row: User, WhatsApp Button */}
                  <div className="flex justify-between items-center pl-1">
                    <div className="flex items-center gap-2">
                      <div className="text-slate-400">
                        <User size={14} />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{item.name}</span>
                    </div>
                    <button className={`${isActive ? 'bg-[#25D366] text-white hover:bg-green-500 shadow-md shadow-green-500/20' : 'border border-[#25D366]/40 text-[#25D366] bg-transparent hover:bg-[#25D366]/5'} flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors`}>
                      <MessageCircle size={12} className={isActive ? 'fill-current' : ''} />
                      <span className="text-[10px] font-bold">Avisar</span>
                    </button>
                  </div>

                  {/* Bottom Row: Time, Price, Check Button */}
                  <div className="flex justify-between items-center mt-1 pl-1">
                    <div className="flex items-center gap-1 bg-green-50/80 text-green-600 px-2 py-0.5 rounded-full border border-green-100">
                      <Clock size={12} />
                      <span className="text-[11px] font-bold">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xl font-black text-slate-900 tracking-[-0.02em] whitespace-nowrap">R$ {item.price}</span>
                      <button className={`w-10 h-10 aspect-square flex-shrink-0 ${isActive ? 'bg-[#22c55e] hover:bg-[#16a34a] shadow-[0_4px_12px_rgba(34,197,94,0.35)]' : 'bg-slate-200 hover:bg-slate-300'} rounded-full flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95`}>
                        <Check size={20} strokeWidth={3} className={isActive ? '' : 'text-slate-400'} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          </div>
        </div>
        
      </div>
    </div>
  );
}

{/* --- FEATURES GRID --- */}
{/* --- BENTO FEATURES SECTION --- */}
function FeaturesSection() {
  return (
    <section id="features" className="relative z-10 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            Recursos Completos
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Tudo o que o seu negócio precisa
          </h2>
          <p className="text-lg text-slate-400">
            Chega de planilhas complexas ou aplicativos que travam. Um sistema fluido, focado na agilidade do seu dia a dia.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-5xl mx-auto">
          
          {/* Main feature - Large */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="flex flex-col h-full z-10 relative">
              <div className="bg-cyan-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Car size={28} />
              </div>
              
              {/* Decorative Mock UI */}
              <div className="flex-1 w-full flex flex-col justify-center min-h-[240px] mb-8 pointer-events-none hidden sm:flex">
                 <div className="w-full flex flex-col gap-3">
                   <div className="bg-slate-800/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4 w-[85%] transform -rotate-2 group-hover:-rotate-1 transition-transform duration-500">
                     <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400"><Clock size={18} /></div>
                     <div className="flex-1">
                       <div className="h-2.5 w-16 bg-white/40 rounded-full mb-2" />
                       <div className="h-2 w-24 bg-white/20 rounded-full" />
                     </div>
                     <div className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[9px] uppercase font-bold rounded-lg tracking-widest">Pátio</div>
                   </div>

                   <div className="bg-slate-800/80 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-4 w-[95%] ml-auto shadow-[0_0_15px_rgba(6,182,212,0.15)] transform translate-x-2 group-hover:translate-x-0 transition-transform duration-500 delay-75">
                     <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400"><Droplets size={18} /></div>
                     <div className="flex-1">
                       <div className="h-2.5 w-20 bg-cyan-400 rounded-full mb-2" />
                       <div className="h-2 w-32 bg-cyan-500/30 rounded-full" />
                     </div>
                     <div className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] uppercase font-bold rounded-lg tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.2)]">Lavando</div>
                   </div>

                   <div className="bg-slate-800/80 border border-white/5 rounded-2xl p-4 flex items-center gap-4 w-[90%] transform rotate-1 group-hover:rotate-0 transition-transform duration-500 delay-150">
                     <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400"><CheckCircle2 size={18} /></div>
                     <div className="flex-1">
                       <div className="h-2.5 w-24 bg-white/40 rounded-full mb-2" />
                       <div className="h-2 w-20 bg-white/20 rounded-full" />
                     </div>
                     <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] uppercase font-bold rounded-lg tracking-widest">Pronto</div>
                   </div>
                 </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Controle de Fila Impecável</h3>
                <p className="text-slate-400 leading-relaxed text-base">
                  Veja em tempo real quais veículos estão no pátio, aguardando, lavando ou prontos. Altere os status com um simples arrastar de dedos. Tudo sincronizado.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all flex items-center justify-between gap-6 group overflow-hidden relative"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="flex items-center gap-6 relative z-10 w-full">
              <div className="bg-pink-500/10 min-w-[3.5rem] w-14 h-14 rounded-2xl flex items-center justify-center border border-pink-500/20 text-pink-400 shrink-0">
                <Camera size={26} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Câmera com IA</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Tire foto da placa ou da ficha de papel e deixe a nossa inteligência preencher os dados pra você ir direto ao ponto.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute -left-10 top-10 w-32 h-32 bg-purple-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 text-purple-400 shrink-0">
                <Database size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">Modo Offline</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Sem Wi-Fi? O app continua voando e salva tudo automático.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-slate-800/50 transition-all group overflow-hidden relative"
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-orange-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="bg-orange-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/20 text-orange-400 shrink-0 relative z-10">
                <Users size={24} />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight relative z-10">Clientes Vips</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                  Reconheça donos frequentes e fidelize quem traz mais lucro.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

{/* --- INTERACTIVE PREVIEW SECTION --- */}
type TabType = 'patio' | 'caixa' | 'agenda';

function InteractiveSection() {
  const [activeTab, setActiveTab] = useState<TabType>('patio');

  return (
    <section id="preview" className="py-32 text-white overflow-hidden relative z-10 border-t border-white/5">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-4">
            Sistema na Prática
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Veja como funciona
          </h2>
          <p className="text-lg text-slate-400">
            Experimente algumas das ferramentas que farão você ganhar mais tempo no dia a dia.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 mb-12 lg:mb-0 space-y-4">
            <TabButton 
              active={activeTab === 'patio'} 
              onClick={() => setActiveTab('patio')}
              title="Fila de Serviços"
              desc="Acompanhe sem complicação quais veículos ainda estão aguardando e os que já estão liberados."
              icon={<Car size={20} />}
              color="cyan"
            />
            <TabButton 
              active={activeTab === 'caixa'} 
              onClick={() => setActiveTab('caixa')}
              title="Analisador de Folhas"
              desc="Pare de digitar! Tire uma foto da sua folha de serviços antiga e a IA converte tudo para o sistema."
              icon={<Camera size={20} />}
              color="pink"
            />
            <TabButton 
              active={activeTab === 'agenda'} 
              onClick={() => setActiveTab('agenda')}
              title="Dashboard Financeiro"
              desc="Tenha uma visualização completa das fichas de clientes, faturamento, e saúde do seu negócio."
              icon={<BarChart3 size={20} />}
              color="indigo"
            />
          </div>

          <div className="lg:col-span-7 flex justify-center relative">
            <div className="absolute w-full h-[120%] bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 blur-[100px] -z-10 rounded-full" />
            <PhoneMockup className="max-w-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  {activeTab === 'patio' && <PatioMockup />}
                  {activeTab === 'caixa' && <AnalisadorMockup />}
                  {activeTab === 'agenda' && <DashboardMockup />}
                </motion.div>
              </AnimatePresence>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({ active, title, desc, icon, onClick, color }: { active: boolean, title: string, desc: string, icon: React.ReactNode, onClick: () => void, color: 'cyan' | 'pink' | 'indigo' }) {
  const colorMap = {
    cyan: { activeBg: 'bg-cyan-500', activeShadow: 'shadow-cyan-500/20', text: 'text-cyan-400', activeText: 'text-white' },
    pink: { activeBg: 'bg-pink-500', activeShadow: 'shadow-pink-500/20', text: 'text-pink-400', activeText: 'text-white' },
    indigo: { activeBg: 'bg-indigo-500', activeShadow: 'shadow-indigo-500/20', text: 'text-indigo-400', activeText: 'text-white' }
  };
  const theme = colorMap[color];

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left p-6 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden relative group ${
        active 
          ? 'bg-slate-800/80 border border-white/10 shadow-2xl backdrop-blur-xl' 
          : 'bg-transparent border border-transparent hover:bg-slate-800/40 hover:border-white/5 opacity-60 hover:opacity-100'
      }`}
    >
      {active && (
        <div className={`absolute top-0 right-0 w-32 h-32 ${theme.activeBg}/10 blur-[40px] rounded-full pointer-events-none`} />
      )}
      <div className="flex items-start gap-5 relative z-10">
        <div className={`p-4 rounded-2xl flex-shrink-0 transition-all duration-300 ${active ? `${theme.activeBg} ${theme.activeText} shadow-lg ${theme.activeShadow}` : `bg-white/5 ${theme.text} border border-white/10 group-hover:bg-white/10`}`}>
          {icon}
        </div>
        <div className="pt-1">
          <h3 className={`text-xl font-bold mb-2 tracking-tight transition-colors duration-300 ${active ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </button>
  );
}

{/* --- MOCKUP INTERNALS --- */}

function PatioMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_SERVICES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return <HeroAppAnimation currentIndex={currentIndex} />;
}

function AnalisadorMockup() {
  return (
    <div className="flex flex-col h-full w-full bg-[#1875D3] overflow-hidden text-slate-800 rounded-b-[2.25rem]">
      {/* Header Blue */}
      <div className="bg-[#1875D3] pt-10 pb-8 px-5 relative z-0">
        <div className="flex items-center gap-4 text-white">
          <ArrowLeft size={24} />
          <h2 className="text-xl font-medium tracking-wide">Analisar Folha</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#f4f5f7] rounded-t-3xl -mt-5 p-4 overflow-y-auto scrollbar-hide relative z-10 flex flex-col items-center pt-6 pb-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5 shrink-0"
        >
          <h2 className="text-xl font-extrabold text-[#1e293b] mb-2 leading-tight">
            De onde vem a tabela?
          </h2>
          <p className="text-[#64748b] text-xs leading-relaxed px-4">
            Escolha uma opção para enviar a folha de serviços para a IA.
          </p>
        </motion.div>

        <motion.div className="w-full flex flex-col gap-3 px-1 shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <button className="bg-white rounded-[1.25rem] p-4 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:scale-[1.02] transition-transform active:scale-95 group shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#f0f9ff] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Camera size={22} className="text-[#0ea5e9]" />
            </div>
            <h3 className="text-base font-bold text-[#1e293b] mb-1">Câmera</h3>
            <p className="text-[#64748b] text-[11px] hidden sm:block">Tirar uma foto física na hora.</p>
            <p className="text-[#64748b] text-[11px] sm:hidden">Tirar foto física na hora.</p>
          </button>

          <button className="bg-white rounded-[1.25rem] p-4 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:scale-[1.02] transition-transform active:scale-95 group shrink-0">
            <div className="w-12 h-12 rounded-full bg-[#fff1f2] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#e11d48]"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle scroll="no" cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <h3 className="text-base font-bold text-[#1e293b] mb-1">Galeria</h3>
            <p className="text-[#64748b] text-[11px] hidden sm:block">Procurar nos arquivos do aparelho.</p>
            <p className="text-[#64748b] text-[11px] sm:hidden">Arquivos do aparelho.</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current && !isDragging.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        
        if (scrollHeight > clientHeight) {
          if (scrollTop + clientHeight >= scrollHeight - 1) {
            scrollRef.current.scrollTop = 0;
          } else {
            scrollRef.current.scrollTop += 1;
          }
        }
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.pageY - scrollRef.current!.offsetTop;
    scrollTop.current = scrollRef.current!.scrollTop;
    // ensure cursor changes
    if (scrollRef.current) {
       scrollRef.current.style.cursor = 'grabbing';
       scrollRef.current.style.userSelect = 'none';
    }
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = '';
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const y = e.pageY - scrollRef.current!.offsetTop;
    const walk = (y - startY.current) * 1.5; 
    scrollRef.current!.scrollTop = scrollTop.current - walk;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#1875D3] overflow-hidden text-slate-800 rounded-b-[2.25rem]">
      {/* Header Blue */}
      <div className="bg-[#1875D3] pt-10 pb-6 px-5 relative z-0 shrink-0">
        <div className="flex items-center gap-4 text-white">
          <ArrowLeft size={24} />
          <h2 className="text-xl font-medium tracking-wide">Dashboard</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex-1 bg-[#f4f5f7] rounded-t-3xl p-4 overflow-y-auto scrollbar-hide relative z-10 pt-6 pb-12 space-y-5 cursor-grab"
      >
        
        {/* Tabs and document icon */}
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="flex gap-1 bg-[#e2e8f0]/60 p-1 rounded-xl">
            <div className="px-5 py-1.5 text-center rounded-lg bg-white shadow-sm flex items-center justify-center pointer-events-none">
              <span className="text-[#1875D3] font-bold text-sm tracking-wide">Diário</span>
            </div>
            <div className="px-5 py-1.5 text-center rounded-lg flex items-center justify-center pointer-events-none">
              <span className="text-slate-500 font-medium text-sm tracking-wide">Mensal</span>
            </div>
          </div>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-slate-600 border border-slate-100 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-white rounded-[1.25rem] p-3 shadow-sm border border-slate-100 flex items-center justify-between shrink-0 pointer-events-none">
          <button className="w-8 h-8 flex items-center justify-center text-slate-800"><ChevronRight size={20} className="rotate-180" /></button>
          <span className="font-bold text-slate-900 text-[15px]">Ter., 28 De Abril</span>
          <button className="w-8 h-8 flex items-center justify-center text-slate-800"><ChevronRight size={20} /></button>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
          className="bg-[#1e7bbe] rounded-[1.5rem] p-5 text-white shadow-lg relative overflow-hidden shrink-0 pointer-events-none"
        >
          <p className="text-blue-100 font-bold text-[11px] tracking-wider mb-1 uppercase opacity-90">Faturamento Líquido</p>
          <h2 className="text-4xl font-black tracking-tight mb-4 flex items-baseline gap-1">
            <span className="text-2xl">R$</span> 261,29
          </h2>
          
          <div className="bg-[#1e6ca8] rounded-xl px-3 py-1.5 inline-block text-blue-100 text-xs font-semibold mb-4">
            -R$ 3,71 (Taxas de Cartão)
          </div>
          
          <div className="flex gap-2 text-xs font-semibold">
            <div className="bg-[#489dd8] rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white shadow-sm">
              <Car size={12} /> 3 serviços
            </div>
            <div className="bg-[#489dd8] rounded-full px-3 py-1.5 text-white shadow-sm">
              Bruto: R$ 265,00
            </div>
          </div>
        </motion.div>

        {/* Formas de Pagamento */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="shrink-0 pointer-events-none">
          <h3 className="font-bold text-slate-900 text-[15px] mb-3 ml-1">Formas de Pagamento</h3>
          <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100">
            
            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full flex gap-1 overflow-hidden mb-6">
              <motion.div initial={{ width: 0 }} animate={{ width: '23%' }} transition={{ delay: 0.4, duration: 0.8, type: "spring" }} className="h-full bg-[#10b981] rounded-full"></motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: '33%' }} transition={{ delay: 0.5, duration: 0.8, type: "spring" }} className="h-full bg-[#22c55e] rounded-full"></motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: '44%' }} transition={{ delay: 0.6, duration: 0.8, type: "spring" }} className="h-full bg-[#d97706] rounded-full"></motion.div>
            </div>
            
            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center justify-between p-2 -mx-2 rounded-lg transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#10b981]/10 flex items-center justify-center">
                     <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                   </div>
                   <span className="text-slate-700 font-medium text-sm">Pix</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-slate-900 text-sm">R$ 60,00</span>
                   <span className="text-slate-400 font-medium text-xs w-8 text-right">23%</span>
                 </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-between p-2 -mx-2 rounded-lg transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
                   </div>
                   <span className="text-slate-700 font-medium text-sm">Dinheiro</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-slate-900 text-sm">R$ 85,00</span>
                   <span className="text-slate-400 font-medium text-xs w-8 text-right">33%</span>
                 </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="flex items-center justify-between p-2 -mx-2 rounded-lg transition-colors">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-[#d97706]/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#d97706]"></div>
                   </div>
                   <span className="text-slate-700 font-medium text-sm">Cartão</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <span className="font-bold text-slate-900 text-sm">R$ 120,00</span>
                   <span className="text-slate-400 font-medium text-xs w-8 text-right">46%</span>
                 </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Clientes Atendidos */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="shrink-0 flex gap-4 pointer-events-none pb-6">
          <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex-1">
            <div className="flex gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                <Users size={16} />
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Novos</p>
            <p className="text-slate-900 font-bold text-lg">2 Clientes</p>
          </div>
          <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex-1">
            <div className="flex gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <ArrowUpRight size={16} />
              </div>
            </div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Ticket Médio</p>
            <p className="text-slate-900 font-bold text-lg">R$ 88,33</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

{/* --- BENTO BENEFITS SECTION --- */}
function BenefitsSection() {
  return (
    <section className="relative z-10 py-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6 tracking-tight">
            Por que usar a VIP Car?
          </h2>
          <p className="text-slate-400 text-lg">
            Esqueça a papelada e os cadernos amassados. Transformamos a gestão da sua estética automotiva em uma experiência digital, rápida e profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-8 lg:p-12 overflow-hidden relative group hover:border-cyan-500/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                <Clock className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Adeus Transtornos e Atrasos</h3>
              <p className="text-slate-400 text-base leading-relaxed max-w-md">
                Pular do papel para o digital significa achar o carro do cliente em segundos, saber quem foi o lavador e qual pacote foi vendido. Sem letras ilegíveis, sem perder tempo.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-900/40 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-8 lg:p-10 relative group hover:border-indigo-500/30 transition-colors"
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                <TrendingUp className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Mais Lucro, Zero Fugas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Com o fechamento de caixa integrado, você sabe exatamente quanto dinheiro e pix entrou no dia, evitando esquecimentos e cobranças perdidas.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-900/40 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-8 lg:p-10 relative group hover:border-emerald-500/30 transition-colors"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 blur-[60px] rounded-full group-hover:bg-emerald-500/20 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <MessageCircle className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">1 Clique pro WhatsApp</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Carro finalizado? Aperte um botão e envie uma mensagem profissional confirmando que o carro está pronto e seguro aguardando o dono no pátio.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-[2rem] p-8 lg:p-12 overflow-hidden relative group hover:border-pink-500/30 transition-colors"
          >
            <div className="absolute bottom-0 left-10 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full group-hover:bg-pink-500/20 transition-colors" />
            <div className="relative z-10 w-full h-full flex flex-col justify-center">
              <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 border border-pink-500/20">
                <Crown className="text-pink-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Aparência de Franquia</h3>
              <p className="text-slate-400 text-base leading-relaxed max-w-md">
                Passe mais profissionalismo. Quando o cliente vê que o seu negócio usa tecnologia em vez de pranchetas antigas, ele se sente mais seguro em deixar carros de alto valor na sua estética.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

{/* --- PRICING SECTION --- */}
function PricingSection({ 
  user, 
  onSubscribe, 
  onManageSubscription 
}: { 
  user: any; 
  onSubscribe: (plan: 'basic' | 'pro') => void; 
  onManageSubscription: () => void;
}) {
  const tenantPlan = user?.tenant?.plan;
  const tenantVariant = user?.tenant?.variantId;
  const hasActiveSub = tenantPlan === 'monthly' && user?.tenant?.subscriptionStatus === 'active';

  const renderBasicButton = () => {
    if (!user) {
      return (
        <button 
          onClick={() => onSubscribe('basic')}
          className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
        >
          Assinar Básico
        </button>
      );
    }
    
    if (hasActiveSub) {
      if (tenantVariant === 'basic' || !tenantVariant) {
        return (
          <button 
            disabled
            className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-4 rounded-2xl font-bold mt-auto tracking-wide cursor-not-allowed"
          >
            Seu Plano Atual
          </button>
        );
      }
      return (
        <button 
          onClick={onManageSubscription}
          className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
        >
          Gerenciar Plano
        </button>
      );
    }

    return (
      <button 
        onClick={() => onSubscribe('basic')}
        className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide cursor-pointer"
      >
        Assinar Básico
      </button>
    );
  };

  const renderProButton = () => {
    if (!user) {
      return (
        <button 
          onClick={() => onSubscribe('pro')}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          Assinar Pro
        </button>
      );
    }

    if (hasActiveSub) {
      if (tenantVariant === 'pro') {
        return (
          <button 
            disabled
            className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-6 py-4 rounded-2xl font-bold mt-auto tracking-wide cursor-not-allowed"
          >
            Seu Plano Atual
          </button>
        );
      }
      return (
        <button 
          onClick={onManageSubscription}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          Fazer Upgrade para Pro
        </button>
      );
    }

    return (
      <button 
        onClick={() => onSubscribe('pro')}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 text-white px-6 py-4 rounded-2xl font-bold transition-all mt-auto tracking-wide border border-indigo-500 shadow-lg shadow-indigo-500/20 cursor-pointer"
      >
        Assinar Pro
      </button>
    );
  };

  return (
    <section id="pricing" className="py-32 text-white relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
            Planos
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
            Planos sob medida para o seu negócio
          </h2>
          <p className="text-lg text-slate-400">
            Comece grátis criando a sua conta. Você terá até 30 atendimentos gratuitos por mês para testar o sistema sem colocar cartão de crédito.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Basic Plan */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col hover:bg-slate-800/50 transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-3 tracking-tight">Básico</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">Ideal para começar a se organizar saindo do papel.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white tracking-tight">R$ 49,90</span>
                <span className="text-slate-400 font-medium">/mês</span>
              </div>
              
              <ul className="flex flex-col gap-5 mb-10 flex-1">
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> 1 usuário (o dono)
                </li>
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> Clientes e veículos ilimitados
                </li>
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> Controle de fila no pátio
                </li>
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> Registro e histórico de serviços
                </li>
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> Avisos automáticos no WhatsApp
                </li>
                <li className="flex items-start gap-4 text-slate-300 text-sm md:text-base">
                  <div className="mt-1 bg-cyan-500/10 p-1 rounded-full border border-cyan-500/20"><Check size={14} className="text-cyan-400" /></div> Fechamento de caixa otimizado
                </li>
              </ul>

              {renderBasicButton()}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-10 flex flex-col relative transform lg:-translate-y-4 shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-500" />
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-3xl font-bold tracking-tight">Pro</h3>
                <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Mais Escolhido
                </span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">Para estéticas automotivas em crescimento rápido.</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 tracking-tight">R$ 89,90</span>
                <span className="text-slate-400 font-medium">/mês</span>
              </div>
              
              <ul className="flex flex-col gap-5 mb-10 flex-1">
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Até 5 usuários (atendentes)
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Clientes e veículos ilimitados
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Fila em tempo real e WhatsApp
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Relatórios financeiros detalhados
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> OCR inteligente (importação de folhas)
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Gestão e controle de despesas
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Exportação em PDF e Backup
                </li>
                <li className="flex items-start gap-4 text-white text-sm md:text-base">
                  <div className="mt-1 bg-indigo-500/20 p-1 rounded-full border border-indigo-500/30"><Check size={14} className="text-indigo-400" /></div> Suporte prioritário via WhatsApp
                </li>
              </ul>

              {renderProButton()}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

{/* --- CTA BOTTOM --- */}
function BottomCTA() {
  return (
    <section className="py-24 relative z-10 px-4 mb-16">
      <div className="max-w-6xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl group">
        <div className="absolute top-[-50%] left-[-10%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/30 transition-colors duration-700"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-500/30 transition-colors duration-700"></div>
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight relative z-10">
          Revolucione o seu negócio hoje mesmo
        </h2>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed tracking-wide">
          Deixe a papelada e a desorganização no passado. Crie sua conta e sinta a diferença que a tecnologia pode trazer para você.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group/btn">
            Criar Conta Grátis <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
          <button className="bg-slate-800/80 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-700/80 transition-all flex items-center justify-center gap-3">
            <Smartphone size={20} className="text-slate-400" /> Baixar App (Android)
          </button>
        </div>
      </div>
    </section>
  );
}

{/* --- FOOTER --- */}
function Footer() {
  return (
    <footer className="relative z-10 text-slate-400 py-16 border-t border-white/5 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img src="/full_logo.png" alt="VIP Car Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
              Sistema completo para gestão de lava rápidos e estéticas automotivas. Diga adeus ao papel e tenha controle total do seu negócio na palma da mão.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">Produto</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-2">App Mobile <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[9px] uppercase font-bold tracking-wider">Novo</span></a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Integração WhatsApp</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Atualizações</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">Soluções</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Para Lava Rápidos</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Para Estéticas Automotivas</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Para Frotistas</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Seja um Parceiro</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-[11px] tracking-[0.2em]">Recursos</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Tutoriais em Vídeo</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Falar com Suporte</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p className="text-slate-500">&copy; {new Date().getFullYear()} VIP Car Tecnologia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6 text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

