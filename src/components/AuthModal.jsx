import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, UserPlus, Sparkles, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const AuthModal = ({ onNavigateDashboard }) => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, pendingBotOrder } = useAuth();
  const [mode, setMode] = useState(authModalMode || 'login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: name || (mode === 'login' ? 'Noureddine Agency' : 'Nouveau Client'),
      email: email || 'client@wabotix.ma',
      phone: phone || '+212 661 888 999'
    });
    if (onNavigateDashboard) {
      onNavigateDashboard();
    }
  };

  const handleDemoLogin = () => {
    login({
      name: 'Noureddine Business Agency',
      email: 'noureddine@agency.ma',
      phone: '+212 661 234 567'
    });
    if (onNavigateDashboard) {
      onNavigateDashboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-obsidian-surface border border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-border">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Tabs */}
        <div className="flex border-b border-obsidian-border">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-sm font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
              mode === 'login'
                ? 'border-wa-green text-wa-green'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Se Connecter</span>
          </button>

          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-3 text-sm font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
              mode === 'signup'
                ? 'border-wa-green text-wa-green'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Créer Un Compte</span>
          </button>
        </div>

        {/* Configured Bot Pending Order Banner */}
        {pendingBotOrder ? (
          <div className="p-3.5 rounded-2xl bg-wa-green/10 border border-wa-green/40 flex items-center justify-between gap-3 shadow-glow-green">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-wa-green/20 border border-wa-green/50 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-wa-green" />
              </div>
              <div>
                <p className="text-xs font-black text-white">
                  Configured Bot ({pendingBotOrder.planName})
                </p>
                <p className="text-[10px] font-bold text-wa-green">
                  ${pendingBotOrder.totalUsd}/month • {pendingBotOrder.sectorLabel}
                </p>
              </div>
            </div>

            <span className="text-[10px] bg-wa-green text-obsidian font-extrabold px-2.5 py-1 rounded-lg">
              Saved 🚀
            </span>
          </div>
        ) : (
          /* 1-Click Instant Demo Login Banner */
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-wa-teal/40 to-obsidian border border-wa-green/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-wa-green/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-wa-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Tester l'Espace Client immédiat</p>
                <p className="text-[10px] text-slate-300">Accédez au Dashboard sans inscription</p>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="px-3.5 py-2 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian text-xs font-extrabold shadow-glow-green transition-all whitespace-nowrap"
            >
              Connexion 1-Clic 🚀
            </button>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Nom Complet ou Entreprise
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Noureddine Agency"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Téléphone WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 661 000 000"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Adresse Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@votre-entreprise.ma"
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-wa-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-wa-green"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-wa-green to-wa-darkGreen hover:from-wa-green hover:to-wa-green text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Connexion Espace Client' : 'Créer Mon Compte'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-wa-green" />
          <span>Connexion sécurisée SSL Chiffrée</span>
        </div>

      </div>
    </div>
  );
};
