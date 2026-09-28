import React from 'react';
import { Cpu, Send, Users, Globe, ShieldCheck, Database, Workflow, Sparkles, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: "IA Générative 2.0 & Custom Prompts",
    description: "Alimenté par les derniers modèles ChatGPT-4o & Claude. Le bot apprend tout sur vos services et répond avec la personnalité exacte de votre entreprise.",
    color: "from-emerald-500 to-wa-green",
    badge: "IA Réelle"
  },
  {
    icon: Globe,
    title: "Support Multilingue Universel",
    description: "Le moteur conversationnel s'adapte instantanément à n'importe quelle langue parlée par vos clients (Français, Arabe, Anglais, Espagnol et parler courant).",
    color: "from-wa-accent to-blue-500",
    badge: "Toutes Langues"
  },
  {
    icon: Send,
    title: "Diffusion & Marketing de Masse",
    description: "Envoyez des promos ciblées, relances de paniers abandonnés ou nouveautés à des milliers de contacts en 1 clic sans risque de blocage.",
    color: "from-purple-500 to-indigo-500",
    badge: "99% Taux Ouverture"
  },
  {
    icon: Users,
    title: "Gestion Multi-Agents & Transfert Humain",
    description: "Votre équipe support peut prendre le relais instantanément dès qu'un client demande un humain. Dashboard unifié avec historique complet.",
    color: "from-amber-500 to-orange-500",
    badge: "Human Handover"
  },
  {
    icon: Database,
    title: "Synchronisation CRM & E-Commerce",
    description: "Connexion facile avec Shopify, WooCommerce, Google Sheets, Zapier ou vos propres Webhooks. Mise à jour des stocks et des commandes en direct.",
    color: "from-pink-500 to-rose-500",
    badge: "Auto-Sync"
  },
  {
    icon: ShieldCheck,
    title: "API Officielle Meta WhatsApp Cloud",
    description: "Intégration via l'infrastucture officielle Meta WhatsApp Business API. Garantit une stabilité 99.9%, un badge vert vérifié et zéro risque d'interruption.",
    color: "from-wa-green to-teal-400",
    badge: "Conforme Meta"
  }
];

export const Features = ({ onOpenQuoteModal }) => {
  return (
    <section id="features" className="py-24 bg-obsidian relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-wa-green/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wa-green/10 border border-wa-green/30 text-wa-green text-xs font-bold uppercase tracking-widest">
            <Workflow className="w-3.5 h-3.5" />
            <span>Capacités & Technologies</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Tout ce dont votre entreprise a besoin f-WhatsApp
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg">
            Des fonctionnalités puissantes conçues pour booster vos conversions, réduire les coûts de support et ravir vos clients dans n'importe quelle langue.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-obsidian-border glass-panel-hover group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.color} p-0.5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-obsidian rounded-[14px] flex items-center justify-center">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-wa-green transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-obsidian-border/50 flex items-center text-xs font-semibold text-wa-green">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Inclus dans les offres Business & Enterprise</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-8 border border-wa-green/30 bg-gradient-to-r from-wa-teal/30 via-obsidian-card to-obsidian flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-wa-green" />
              <span>Besoin d'une intégration sur-mesure ou d'une API spécifique ?</span>
            </h3>
            <p className="text-sm text-slate-300">
              Nos ingénieurs créent des workflows personnalisés sur-mesure connectés à votre CRM ou base de données.
            </p>
          </div>

          <button
            onClick={onOpenQuoteModal}
            className="px-6 py-3 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-sm shadow-glow-green transition-all whitespace-nowrap"
          >
            Demander Une Solution Custom
          </button>
        </div>

      </div>
    </section>
  );
};
