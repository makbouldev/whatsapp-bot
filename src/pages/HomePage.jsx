import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Bot, Sparkles, MessageSquare, Play, ShieldCheck, Zap, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export const HomePage = ({ onOpenQuoteModal }) => {
  return (
    <div className="space-y-16 pb-16 animate-in fade-in duration-300">
      
      {/* Sleek Hero */}
      <Hero
        onOpenQuoteModal={onOpenQuoteModal}
        onNavigateSimulator={() => window.location.href = '/simulator'}
      />

      {/* Clean Value Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-wa-green font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
            Pourquoi WaBotix ?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            L'excellence de l'automatisation WhatsApp
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Une technologie conçue pour convertir chaque prospect en client sans aucune lourdeur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-obsidian-border hover:border-wa-green/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-wa-green/10 border border-wa-green/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-wa-green" />
            </div>
            <h3 className="text-xl font-bold text-white">IA Multilingue 100% (Toutes Langues)</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Le bot comprend et répond instantanément dans n'importe quelle langue (Français, Arabe, Anglais, Espagnol et dialectes) avec le ton exact de votre marque.
            </p>
            <Link to="/features" className="inline-flex items-center gap-1.5 text-xs font-bold text-wa-green hover:underline pt-2">
              <span>Découvrir l'IA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-obsidian-border hover:border-wa-green/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Démo Live Interactive</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Simulez la prise de commande, la réservation de table et la qualification de prospects en direct.
            </p>
            <Link to="/simulator" className="inline-flex items-center gap-1.5 text-xs font-bold text-wa-green hover:underline pt-2">
              <span>Tester le Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-obsidian-border hover:border-wa-green/40 transition-all group space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white">API Cloud Meta 100% Sûre</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Intégration officielle garantie sans aucun risque de blocage ou d'interruption de votre numéro.
            </p>
            <Link to="/pricing" className="inline-flex items-center gap-1.5 text-xs font-bold text-wa-green hover:underline pt-2">
              <span>Voir les formules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* Clean Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-wa-green/30 bg-gradient-to-r from-wa-teal/30 via-obsidian-card to-obsidian flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Prêt à automatiser vos ventes WhatsApp ?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl">
              Obtenez votre bot WhatsApp configuré et opérationnel en moins de 48h.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="px-8 py-4 rounded-2xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-base shadow-glow-green transition-all whitespace-nowrap"
          >
            Demander Mon Bot Gratuitement
          </button>
        </div>
      </section>

    </div>
  );
};
