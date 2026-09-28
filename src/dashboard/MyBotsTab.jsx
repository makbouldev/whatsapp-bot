import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ConnectQrModal } from './ConnectQrModal';
import { Bot, Phone, Play, Pause, Sliders, QrCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const MyBotsTab = ({ onOpenStudio }) => {
  const { userBot, toggleBotStatus } = useAuth();
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header Bar */}
      <div>
        <span className="text-xs text-wa-green font-bold bg-wa-green/10 border border-wa-green/30 px-3 py-1 rounded-full">
          1 Compte = 1 Bot WhatsApp Dédié
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2">Mon Bot WhatsApp IA Dédié</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Gérez votre numéro WhatsApp connecté, scannez le QR code et personnalisez l'intelligence artificielle de votre bot.
        </p>
      </div>

      {/* Single Dedicated Bot Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-wa-green/40 shadow-glow-green space-y-6 bg-gradient-to-b from-wa-teal/20 via-obsidian-card to-obsidian">
        
        {/* Top Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-obsidian-border pb-5">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              userBot.status === 'active'
                ? 'bg-wa-green/20 text-wa-green border border-wa-green/50 shadow-glow-green'
                : 'bg-slate-800 text-slate-500'
            }`}>
              <Bot className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-lg sm:text-xl">{userBot.name}</h3>
                <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full border ${
                  userBot.status === 'active'
                    ? 'bg-wa-green/20 text-wa-green border-wa-green/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {userBot.status === 'active' ? '● En Ligne 24/7' : '○ En Pause'}
                </span>
              </div>
              <p className="text-xs text-wa-green font-mono font-semibold flex items-center gap-1.5 mt-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{userBot.phone} • {userBot.type}</span>
              </p>
            </div>
          </div>

          {/* QR Code Trigger Button */}
          <button
            onClick={() => setQrModalOpen(true)}
            className="px-5 py-3 rounded-xl bg-wa-green text-obsidian font-extrabold text-xs sm:text-sm shadow-glow-green hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <QrCode className="w-4 h-4 fill-obsidian" />
            <span>Scanner QR Code WhatsApp</span>
          </button>
        </div>

        {/* Prompt Overview */}
        <div className="bg-obsidian-card p-4 rounded-2xl border border-obsidian-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Directives & Prompt IA Actuel :</span>
            <span className="text-[10px] text-wa-green font-bold">ChatGPT-4o Actif</span>
          </div>
          <p className="text-xs text-slate-200 italic leading-relaxed">"{userBot.prompt}"</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3.5 bg-obsidian-card rounded-2xl border border-obsidian-border space-y-1">
            <p className="text-xs text-slate-400">Total Messages Automatisés</p>
            <p className="text-xl sm:text-2xl font-extrabold text-white">{userBot.totalMessages.toLocaleString()}</p>
          </div>
          <div className="p-3.5 bg-obsidian-card rounded-2xl border border-obsidian-border space-y-1">
            <p className="text-xs text-slate-400">Confirmations & Ventes</p>
            <p className="text-xl sm:text-2xl font-extrabold text-wa-green">{userBot.leadsCaptured}</p>
          </div>
          <div className="p-3.5 bg-obsidian-card rounded-2xl border border-obsidian-border space-y-1">
            <p className="text-xs text-slate-400">Taux de Conversion</p>
            <p className="text-xl sm:text-2xl font-extrabold text-white">{userBot.conversionRate}</p>
          </div>
        </div>

        {/* Bot Controls */}
        <div className="pt-4 border-t border-obsidian-border flex items-center justify-between gap-4">
          <button
            onClick={toggleBotStatus}
            className={`flex-1 py-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              userBot.status === 'active'
                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold shadow-glow-green'
            }`}
          >
            {userBot.status === 'active' ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Mettre le Bot en Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-obsidian" />
                <span>Activer le Bot WhatsApp</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenStudio}
            className="flex-1 py-3 rounded-xl bg-obsidian-card hover:bg-obsidian border border-slate-700 hover:border-wa-green text-xs font-bold text-white hover:text-wa-green transition-all flex items-center justify-center gap-2"
          >
            <Sliders className="w-4 h-4 text-wa-green" />
            <span>Personnaliser l'Intelligence IA</span>
          </button>
        </div>

      </div>

      {/* QR Modal */}
      <ConnectQrModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        botName={userBot.name}
        botId={userBot.id}
      />

    </div>
  );
};
