import React from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const AnalyticsTab = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Statistiques & Rapports</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Suivez le volume des messages, le taux d'engagement et les heures de pointe des demandes clients.
        </p>
      </div>

      {/* Visual Volume Distribution Bar Graph */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-obsidian-border space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Volume de Messages (Derniers 7 Jours)</h3>
            <p className="text-xs text-slate-400">Total : 4,820 messages traités automatiquement</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-wa-green"></span>
            <span className="text-xs text-slate-300 font-medium">Réponses IA WhatsApp</span>
          </div>
        </div>

        {/* Bar Visual representation */}
        <div className="grid grid-cols-7 gap-3 sm:gap-6 items-end h-56 pt-8 pb-2 border-b border-obsidian-border">
          {[
            { day: 'Lun', height: '60%', count: '620' },
            { day: 'Mar', height: '75%', count: '780' },
            { day: 'Mer', height: '90%', count: '940' },
            { day: 'Jeu', height: '65%', count: '680' },
            { day: 'Ven', height: '100%', count: '1,120' },
            { day: 'Sam', height: '85%', count: '890' },
            { day: 'Dim', height: '45%', count: '410' },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] text-wa-green font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.count}
              </span>
              <div
                style={{ height: bar.height }}
                className="w-full bg-gradient-to-t from-wa-darkGreen to-wa-green rounded-t-xl group-hover:scale-105 shadow-glow-green transition-all duration-300"
              ></div>
              <span className="text-xs font-semibold text-slate-400">{bar.day}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center pt-2">
          <div className="p-3 rounded-xl bg-obsidian-card border border-obsidian-border">
            <p className="text-[11px] text-slate-400">Heure de Pointe</p>
            <p className="text-base font-extrabold text-white">20h00 - 23h00</p>
          </div>
          <div className="p-3 rounded-xl bg-obsidian-card border border-obsidian-border">
            <p className="text-[11px] text-slate-400">Temps de Réponse Moyen</p>
            <p className="text-base font-extrabold text-wa-green">1.4 Seconde</p>
          </div>
          <div className="p-3 rounded-xl bg-obsidian-card border border-obsidian-border">
            <p className="text-[11px] text-slate-400">Satisfaction Client (CSAT)</p>
            <p className="text-base font-extrabold text-white">98.2% ★★★★★</p>
          </div>
        </div>

      </div>

    </div>
  );
};
