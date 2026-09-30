import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Bot, Play, Zap, ShieldCheck, CheckCircle2, TrendingUp, ArrowRight, Globe, CheckCheck, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Hero = ({ onNavigatePricing, onNavigateSimulator }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handlePrimaryCta = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      onNavigatePricing();
    }
  };

  return (
    <section className="relative h-screen h-[100vh] max-h-screen w-full flex items-center justify-center pt-20 pb-6 bg-grid-pattern overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wa-green/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-wa-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex items-center">
        
        {/* 2-Column Grid: Left Text (liser) | Right Transparent PNG Visual (limen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Column - Text, Headline & CTAs */}
          <div className="lg:col-span-7 text-left space-y-5">
            
            {/* Announcement Badge */}
            <div 
              onClick={handlePrimaryCta}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-wa-green/40 shadow-glow-green text-[11px] sm:text-xs font-semibold text-slate-200 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-wa-green"></span>
              </span>
              <span className="text-wa-green font-bold">Nouveau IA 2026:</span>
              <span>Bot WhatsApp IA Multilingue 24/7 (Toutes Langues)</span>
              <ArrowRight className="w-3 h-3 text-wa-green ml-0.5" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Transformez votre WhatsApp en <br />
              <span className="text-gradient">Machine de Vente 24/7</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-normal leading-relaxed">
              Un bot WhatsApp IA sur-mesure qui répond à vos clients dans n'importe quelle langue, présente vos produits et enregistre vos commandes automatiquement.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-slate-300 text-xs font-medium pt-1">
              <div className="flex items-center gap-1.5 bg-obsidian-card/70 border border-obsidian-border px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-wa-green" />
                <span>Ouverture 99%</span>
              </div>
              <div className="flex items-center gap-1.5 bg-obsidian-card/70 border border-obsidian-border px-3.5 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5 text-wa-green" />
                <span>Réponse &lt; 2s</span>
              </div>
              <div className="flex items-center gap-1.5 bg-obsidian-card/70 border border-obsidian-border px-3.5 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 text-wa-green" />
                <span>+300% Ventes</span>
              </div>
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={handlePrimaryCta}
                className="w-full sm:w-auto relative group overflow-hidden rounded-xl p-px font-extrabold shadow-glow-green"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-wa-green via-emerald-400 to-wa-accent animate-shimmer"></span>
                <span className="relative inline-flex items-center justify-center w-full px-7 py-3 rounded-[11px] bg-obsidian group-hover:bg-opacity-90 text-wa-green font-extrabold text-xs sm:text-sm transition-all gap-2">
                  {isLoggedIn ? (
                    <>
                      <LayoutDashboard className="w-4 h-4 text-wa-green" />
                      <span>Go to Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5 text-wa-green group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-wa-green group-hover:rotate-12 transition-transform" />
                      <span>Create My Bot WhatsApp</span>
                      <ArrowRight className="w-3.5 h-3.5 text-wa-green group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              <button
                onClick={onNavigateSimulator}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-panel hover:bg-white/10 border border-slate-700 text-white font-bold text-xs sm:text-sm transition-all hover:scale-105"
              >
                <div className="w-5 h-5 rounded-full bg-wa-green/20 flex items-center justify-center border border-wa-green/40">
                  <Play className="w-2.5 h-2.5 text-wa-green fill-wa-green ml-0.5" />
                </div>
                <span>Tester La Démo</span>
              </button>
            </div>

            {/* Bottom Tech Badges Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl">
              <div className="glass-panel py-2 px-3 rounded-lg border border-obsidian-border flex items-center justify-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-wa-green" />
                <span className="text-[11px] font-semibold text-slate-300">ChatGPT-4o</span>
              </div>
              <div className="glass-panel py-2 px-3 rounded-lg border border-obsidian-border flex items-center justify-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-wa-accent" />
                <span className="text-[11px] font-semibold text-slate-300">Multilingue 100%</span>
              </div>
              <div className="glass-panel py-2 px-3 rounded-lg border border-obsidian-border flex items-center justify-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-semibold text-slate-300">Bulk Broadcast</span>
              </div>
              <div className="glass-panel py-2 px-3 rounded-lg border border-obsidian-border flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] font-semibold text-slate-300">Meta API Sûre</span>
              </div>
            </div>

          </div>

          {/* Right Column - Clean Transparent PNG Visual of WhatsApp AI Replying */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative bg-transparent">
            
            <div className="relative w-full max-w-[390px] space-y-4 animate-float">
              
              {/* Floating Header Tag */}
              <div className="flex items-center gap-2 bg-obsidian-surface/90 border border-wa-green/40 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg w-fit mx-auto">
                <span className="w-2 h-2 rounded-full bg-wa-green animate-ping"></span>
                <span className="text-xs font-extrabold text-white">Bot WhatsApp IA Multilingue (Toutes Langues)</span>
              </div>

              {/* Client Message */}
              <div className="flex justify-end">
                <div className="bg-wa-bubbleOut text-white text-xs px-4 py-3 rounded-2xl rounded-tr-none shadow-xl max-w-[85%] space-y-1">
                  <p className="font-medium text-slate-100">Bonjour! Quel est le tarif pour créer un bot WhatsApp 🤖?</p>
                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-300">
                    <span>14:32</span>
                    <CheckCheck className="w-3 h-3 text-wa-accent" />
                  </div>
                </div>
              </div>

              {/* WhatsApp AI Auto Response */}
              <div className="flex justify-start">
                <div className="bg-wa-bubbleIn text-white text-xs px-4 py-3.5 rounded-2xl rounded-tl-none border border-slate-700/80 shadow-2xl max-w-[90%] space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-slate-700/60 pb-1.5">
                    <div className="w-5 h-5 rounded-full bg-wa-green/20 flex items-center justify-center border border-wa-green">
                      <Bot className="w-3 h-3 text-wa-green" />
                    </div>
                    <span className="text-[10px] font-bold text-wa-green uppercase tracking-wider">Réponse IA Multilingue (2s)</span>
                  </div>

                  <p className="text-slate-100 leading-relaxed font-sans">
                    Bonjour! 👋 Nos formules commencent à partir de <strong className="text-wa-green">990 DH/mois</strong>. Notre IA s'adapte automatiquement à n'importe quelle langue parlée par vos clients !
                  </p>

                  {/* Interactive Quick Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      onClick={handlePrimaryCta}
                      className="w-full text-center py-2 px-3 bg-wa-teal/40 hover:bg-wa-green hover:text-obsidian border border-wa-green/50 text-wa-green font-bold text-[11px] rounded-xl transition-all"
                    >
                      {isLoggedIn ? '🚀 Go to My Dashboard' : '🚀 Get Started Now'}
                    </button>
                    <button
                      onClick={onNavigateSimulator}
                      className="w-full text-center py-2 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-[11px] rounded-xl transition-all"
                    >
                      📱 Tester la démo interactive
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1">
                    <span>Instantané • 14:32</span>
                    <span className="text-wa-green font-semibold">Toutes Langues 100%</span>
                  </div>
                </div>
              </div>

              {/* Simple Bottom Floating Indicator */}
              <div className="flex items-center justify-center gap-2 bg-obsidian-card/80 border border-obsidian-border px-4 py-2 rounded-full shadow-lg w-fit mx-auto text-xs text-slate-300">
                <Globe className="w-3.5 h-3.5 text-wa-green" />
                <span>Support universel : <strong className="text-white">N'importe quelle langue</strong></span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
