import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ConfirmationsFeed } from './ConfirmationsFeed';
import { ConnectQrModal } from './ConnectQrModal';
import { Bot, MessageSquare, Users, TrendingUp, Zap, Clock, ArrowUpRight, Play, Pause, Plus, QrCode } from 'lucide-react';

export const OverviewTab = ({ onNavigateTab, onOpenOrderWizard }) => {
  const { user, bots, toggleBotStatus } = useAuth();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedBotForQr, setSelectedBotForQr] = useState(null);

  const activeBotsCount = bots.filter(b => b.status === 'active').length;
  const totalMessages = bots.reduce((acc, b) => acc + b.totalMessages, 0);
  const totalLeads = bots.reduce((acc, b) => acc + b.leadsCaptured, 0);

  const handleOpenQrModal = (bot) => {
    setSelectedBotForQr(bot);
    setQrModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-wa-green/30 bg-gradient-to-r from-wa-teal/30 via-obsidian-card to-obsidian flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs text-wa-green font-bold bg-wa-green/10 border border-wa-green/30 px-3 py-1 rounded-full">
            Espace Client Gestionnaire
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Bienvenue, {user?.name || 'Cher Client'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Scannez le QR Code pour connecter votre téléphone, l'IA répond automatiquement 24h/24 et enregistre vos confirmations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenQrModal(bots[0])}
            className="px-4 py-3 rounded-xl bg-wa-green/10 hover:bg-wa-green/20 border border-wa-green/40 text-wa-green font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4 text-wa-green" />
            <span>Connecter par QR Code</span>
          </button>

          <button
            onClick={onOpenOrderWizard}
            className="px-4 py-3 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-xs sm:text-sm shadow-glow-green transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Bot</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-panel p-5 rounded-2xl border border-obsidian-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Bots WhatsApp Connectés</span>
            <div className="w-8 h-8 rounded-xl bg-wa-green/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-wa-green" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{activeBotsCount} / {bots.length}</span>
            <span className="text-xs text-wa-green font-semibold">● En Ligne 24/7</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-obsidian-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Messages Automatisés</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">{totalMessages.toLocaleString()}</span>
            <span className="text-xs text-wa-green font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +24% ce mois
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-obsidian-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmations & Ventes</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-wa-green">{totalLeads.toLocaleString()}</span>
            <span className="text-xs text-wa-green font-semibold">Taux conversion 24%</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-obsidian-border space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Temps Économisé</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white">142 heures</span>
            <span className="text-xs text-purple-400 font-semibold">~3.5 agents</span>
          </div>
        </div>

      </div>

      {/* Live Confirmations Feed Component (Tableau des ventes & confirmations capturées) */}
      <ConfirmationsFeed />

      {/* Active Bots Table Overview */}
      <div className="glass-panel rounded-3xl p-6 border border-obsidian-border space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Mes Numéros & Bots WhatsApp</h3>
            <p className="text-xs text-slate-400">Statut des appareils connectés et configuration de l'IA.</p>
          </div>

          <button
            onClick={() => onNavigateTab('bots')}
            className="text-xs font-semibold text-wa-green hover:underline flex items-center gap-1"
          >
            <span>Voir tous mes bots</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="p-4 rounded-2xl bg-obsidian-card border border-obsidian-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-600 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  bot.status === 'active' ? 'bg-wa-green/10 text-wa-green border border-wa-green/30' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Bot className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">{bot.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      bot.status === 'active'
                        ? 'bg-wa-green/20 text-wa-green border border-wa-green/30'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {bot.status === 'active' ? '● WhatsApp Connecté 24/7' : '○ En Pause'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{bot.phone} • {bot.type}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-300">
                
                <button
                  onClick={() => handleOpenQrModal(bot)}
                  className="px-3 py-1.5 rounded-xl bg-wa-green/10 border border-wa-green/30 text-wa-green font-bold text-xs hover:bg-wa-green/20 transition-all flex items-center gap-1"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scanner QR</span>
                </button>

                <button
                  onClick={() => toggleBotStatus(bot.id)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                    bot.status === 'active'
                      ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                      : 'bg-wa-green/10 text-wa-green hover:bg-wa-green/20'
                  }`}
                >
                  {bot.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onNavigateTab('studio')}
                  className="px-3 py-2 rounded-xl bg-obsidian border border-slate-700 hover:border-wa-green text-xs font-bold text-white hover:text-wa-green transition-all"
                >
                  Éditer IA
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      <ConnectQrModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        botName={selectedBotForQr?.name}
        botId={selectedBotForQr?.id}
      />

    </div>
  );
};
