import React, { useState } from 'react';
import { ShoppingCart, UtensilsCrossed, Building2, Stethoscope, Car, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';

const industries = [
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    name: 'E-Commerce & Boutiques',
    tagline: 'Multipliez vos ventes par 3 grâce aux relances automatiques',
    features: [
      'Catalogue de produits interactif avec photos & prix',
      'Relance automatique des paniers abandonnés sur WhatsApp',
      'Suivi de commande en direct (Livraison, Amana, Aramex)',
      'Prise d\'adresse et validation de commande en 1 minute'
    ],
    example: "🛒 'Salam, votre colis pour la commande #8492 est en cours de livraison ! Voulez-vous confirmer le créneau avec le livreur ?'"
  },
  {
    id: 'restaurants',
    icon: UtensilsCrossed,
    name: 'Restaurants & Traiteurs',
    tagline: 'Réservation de tables et commandes à emporter 24/7',
    features: [
      'Menu digital interactif envoyé automatiquement',
      'Réservation de table instantanée avec SMS/WhatsApp de confirmation',
      'Prise de commande livraison à domicile',
      'Collecte d\'avis Google Maps & feedback client après le repas'
    ],
    example: "🍕 'Table réservée pour 4 personnes ce soir à 20h30. Cliquez pour voir notre carte des desserts 🍰!'"
  },
  {
    id: 'realestate',
    icon: Building2,
    name: 'Agences Immobilières',
    tagline: 'Qualifiez les prospects et planifiez des visites sans effort',
    features: [
      'Filtrage automatique par budget, ville et nombre de pièces',
      'Envoi des fiches techniques et vidéos des biens',
      'Prise de rendez-vous de visite synchrone avec le calendrier des agents',
      'Collecte immédiate du numéro et des coordonnées des acquéreurs'
    ],
    example: "🏢 'Nous avons 2 appartements correspondant à votre budget à Maarif. Souhaitez-vous planifier une visite jeudi à 15h ?'"
  },
  {
    id: 'medical',
    icon: Stethoscope,
    name: 'Cliniques & Médecins',
    tagline: 'Rappel de rendez-vous et réduction des retards',
    features: [
      'Gestion automatique de l\'agenda de rendez-vous',
      'Rappel WhatsApp 24h avant la consultation avec bouton de confirmation',
      'Instructions pré-opératoires & pièces à ramener',
      'Réponses aux questions courantes (Tarifs, Horaires, Parking)'
    ],
    example: "🏥 'Bonjour Mr. Alami, votre RDV avec le Dr. Benjelloun est confirmé demain à 10h. En cas d\'empêchement, cliquez pour modifier.'"
  }
];

export const UseCases = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState('ecommerce');
  const selectedIndustry = industries.find(i => i.id === activeTab) || industries[0];
  const IconComponent = selectedIndustry.icon;

  return (
    <section id="usecases" className="py-24 bg-obsidian-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-wa-green text-xs font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
            Cas d'Usage & Secteurs
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Un Bot Sur-Mesure Adapté à Votre Métier
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Que vous vendiez des produits physiques, des services ou des réservations, nos bots s'adaptent exactement aux exigences de votre secteur.
          </p>
        </div>

        {/* Industry Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map(ind => {
            const Icon = ind.icon;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center gap-2.5 border ${
                  activeTab === ind.id
                    ? 'bg-gradient-to-r from-wa-green to-wa-darkGreen text-obsidian border-wa-green shadow-glow-green scale-105'
                    : 'bg-obsidian-card text-slate-300 border-obsidian-border hover:border-wa-green/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Focus Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-obsidian-border grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-wa-green/10 border border-wa-green/40 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-wa-green" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedIndustry.name}</h3>
                <p className="text-sm text-wa-green font-semibold">{selectedIndustry.tagline}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {selectedIndustry.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-wa-green shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm sm:text-base">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-sm shadow-glow-green transition-all"
              >
                <span>Créer un Bot pour mon secteur ({selectedIndustry.name})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right WhatsApp Message Preview */}
          <div className="lg:col-span-5">
            <div className="bg-wa-chatBg border border-slate-700/80 rounded-2xl p-5 shadow-2xl relative space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-wa-green">
                  <span className="w-2 h-2 rounded-full bg-wa-green animate-pulse"></span>
                  Exemple de message automatique
                </span>
                <span>En direct</span>
              </div>

              <div className="bg-wa-bubbleIn p-4 rounded-xl rounded-tl-none text-xs sm:text-sm text-slate-100 border border-slate-700/60 leading-relaxed font-sans">
                {selectedIndustry.example}
              </div>

              <div className="pt-2 flex justify-end">
                <span className="text-[10px] text-slate-500">Optimisé pour un taux de conversion maximal</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
