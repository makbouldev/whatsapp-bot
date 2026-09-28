import React, { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, HelpCircle, ArrowRight, Globe } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter Bot',
    priceMonthly: 990,
    priceAnnual: 790,
    badge: 'Idéal Petites Entreprises',
    description: 'Automatisez vos réponses aux questions courantes et facilitez le premier contact client.',
    features: [
      'Jusqu\'à 1 500 conversations / mois',
      'Bot basé sur règles & mots clés',
      'Support IA Multilingue (Toutes Langues)',
      '1 Numéro WhatsApp connecté',
      'Menus interactifs à boutons',
      'Support par ticket & email (24h)'
    ],
    ctaText: 'Choisir Starter',
    popular: false
  },
  {
    id: 'pro',
    name: 'Business Pro IA',
    priceMonthly: 1990,
    priceAnnual: 1590,
    badge: 'Le Plus Populaire ⭐',
    description: 'Pour les entreprises voulant une IA ChatGPT connectée qui vend et qualifie en direct.',
    features: [
      'Jusqu\'à 6 000 conversations / mois',
      'IA ChatGPT-4o entraînée sur vos produits',
      'Catalogue E-Commerce & Prise de Commande',
      'Relance automatique des paniers',
      'Dashboard Multi-Agents (Human Takeover)',
      'Campagnes Marketing Bulk (1 000 envois/m)',
      'WhatsApp Cloud API Officielle (Badge Vert)',
      'Support WhatsApp prioritaire 7j/7'
    ],
    ctaText: 'Commencer Avec Pro IA',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Custom',
    priceMonthly: 'Sur Devis',
    priceAnnual: 'Sur Devis',
    badge: 'Grandes Marques & Agences',
    description: 'Infrastructure dédiée sur-mesure avec intégration CRM & API sur mesure.',
    features: [
      'Conversations & messages illimités',
      'Modèle IA fine-tuné sur-mesure',
      'Intégration CRM/ERP (Salesforce, SAP, Custom)',
      'Serveur & Base de données dédiés',
      'Manager de compte & Ingénieur dédié',
      'Garantie de service SLA 99.99%',
      'Formation de votre équipe sur site'
    ],
    ctaText: 'Demander Devis Custom',
    popular: false
  }
];

export const Pricing = ({ onOpenQuoteModal }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-wa-green text-xs font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
            Tarifs Transparents
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Des formules adaptées à votre croissance
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Sans engagement à long terme. Mettez à niveau ou résiliez à tout moment.
          </p>

          {/* Annual vs Monthly Switcher */}
          <div className="pt-6 flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Facturation Mensuelle
            </span>

            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-obsidian-card border border-wa-green/40 p-1 flex items-center transition-colors relative"
            >
              <div
                className={`w-6 h-6 rounded-full bg-wa-green shadow-glow-green transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              ></div>
            </button>

            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
                Facturation Annuelle
              </span>
              <span className="bg-wa-green/20 text-wa-green border border-wa-green/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                -20% Économie
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isCustom = typeof plan.priceMonthly === 'string';

            return (
              <div
                key={plan.id}
                className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 hover:scale-[1.02] ${
                  plan.popular
                    ? 'border-wa-green bg-gradient-to-b from-wa-teal/30 via-obsidian-card to-obsidian shadow-glow-green z-10'
                    : 'border-obsidian-border bg-obsidian-card'
                }`}
              >
                {/* Popular Ribbon */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-wa-green to-emerald-400 text-obsidian font-extrabold text-xs uppercase px-4 py-1 rounded-full shadow-lg">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-[10px] bg-white/5 border border-white/10 text-slate-300 font-semibold px-2.5 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 min-h-[36px]">{plan.description}</p>

                  {/* Price Display */}
                  <div className="my-6 py-4 border-y border-obsidian-border">
                    {isCustom ? (
                      <div className="text-3xl font-extrabold text-white">Sur Devis</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white">
                          {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                        </span>
                        <span className="text-lg font-bold text-wa-green">DH</span>
                        <span className="text-xs text-slate-400 font-medium ml-1">/ mois</span>
                      </div>
                    )}
                    {isAnnual && !isCustom && (
                      <p className="text-[11px] text-wa-green mt-1 font-semibold">
                        Facturé annuellement ({plan.priceAnnual * 12} DH/an)
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Ce qui est inclus :</p>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check className="w-4 h-4 text-wa-green shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onOpenQuoteModal}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-wa-green hover:bg-emerald-400 text-obsidian shadow-glow-green'
                      : 'bg-obsidian border border-slate-700 hover:border-wa-green text-white hover:text-wa-green'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-wa-green" />
            <span>Paiement 100% sécurisé</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-wa-green" />
            <span>Configuration active en 48h chrono</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-wa-green" />
            <span>Support client IA multilingue universel</span>
          </span>
        </div>

      </div>
    </section>
  );
};
