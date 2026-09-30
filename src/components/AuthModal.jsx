import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, UserPlus, Sparkles, Lock, Mail, User, Phone, Building, ArrowRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export const AuthModal = ({ onNavigateDashboard }) => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login, pendingBotOrder } = useAuth();
  const [mode, setMode] = useState(authModalMode || 'login');
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match! Please check your password confirmation.');
        return;
      }
    }

    const fullName = (firstName || lastName)
      ? `${firstName} ${lastName}`.trim()
      : 'Business Owner';

    login({
      name: businessName || fullName,
      firstName: firstName,
      lastName: lastName,
      businessName: businessName || fullName,
      email: email || 'contact@client.com',
      phone: phone || '+212 661 000 000'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-obsidian-surface border border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-border">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Tabs */}
        <div className="flex border-b border-obsidian-border pr-8">
          <button
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
              mode === 'login'
                ? 'border-wa-green text-wa-green'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 border-b-2 transition-all ${
              mode === 'signup'
                ? 'border-wa-green text-wa-green'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Account</span>
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
              <div className="w-8 h-8 rounded-xl bg-wa-green/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-wa-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Test Client Portal Instantly</p>
                <p className="text-[10px] text-slate-300">Access demo dashboard without registration</p>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              className="px-3.5 py-2 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian text-xs font-extrabold shadow-glow-green transition-all whitespace-nowrap"
            >
              1-Click Demo 🚀
            </button>
          </div>
        )}

        {/* Password Mismatch Error Banner */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' ? (
            <>
              {/* First Name & Last Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                    />
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                  Business / Company Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. FootLab Apparel"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>

              {/* WhatsApp Phone Number */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                  WhatsApp Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +1 234 567 8900"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@yourbusiness.com"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>

              {/* Password & Confirm Password Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-slate-300 mb-1 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Login Mode */
            <>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@yourbusiness.com"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-obsidian-card border border-obsidian-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-black text-xs sm:text-sm shadow-glow-green transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Create Account & Launch Bot 🚀'}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>

        </form>

        <div className="pt-1 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-wa-green" />
          <span>100% Encrypted SSL Security</span>
        </div>

      </div>
    </div>
  );
};
