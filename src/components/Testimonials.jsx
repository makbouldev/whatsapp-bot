import React from 'react';
import { Star, Quote, TrendingUp, Users, Clock } from 'lucide-react';

const reviews = [
  {
    name: "Youssef El Amrani",
    role: "Fondateur & CEO",
    company: "CasablancaSneakers.ma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "+45% de Ventes",
    text: "Le bot WhatsApp a changé notre business ! Avant, on perdait des dizaines de commandes le soir. Maintenant le bot répond automatiquement dans la langue du client, envoie les photos des modèles et prend l'adresse de livraison. Top !"
  },
  {
    name: "Sara Benmoussa",
    role: "Directrice Marketing",
    company: "Le Jardin Gourmand",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "85% Gain de Temps",
    text: "Plus de 200 messages par jour pour réserver des tables ou demander le menu. Le bot gère tout 24h/24 sans erreur dans n'importe quelle langue. L'équipe technique de WaBotix est ultra réactive !"
  },
  {
    name: "Dr. Karim Tazi",
    role: "Médecin Chef",
    company: "Centre Médical Anfa",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "-70% de Retards RDV",
    text: "Les rappels automatiques WhatsApp 24h avant les consultations ont pratiquement supprimé les rendez-vous manqués. Nos patients adorent la simplicité."
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-obsidian-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-wa-green text-xs font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
            Témoignages Clients
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ils ont automatisé leur WhatsApp avec succès
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Découvrez comment nos bots aident plus de 250 entreprises à faire décoller leur chiffre d'affaires.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-obsidian-border hover:border-wa-green/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-wa-green bg-wa-green/10 border border-wa-green/30 px-2.5 py-1 rounded-full">
                    {rev.metric}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-wa-green/30" />

                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-obsidian-border flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-wa-green"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                  <p className="text-xs text-slate-400">{rev.role} • <span className="text-wa-green font-semibold">{rev.company}</span></p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-16 pt-8 border-t border-obsidian-border/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">250+</p>
            <p className="text-xs text-slate-400 font-medium">Bots WhatsApp Actifs</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-wa-green">1.8M+</p>
            <p className="text-xs text-slate-400 font-medium">Messages Automatisés / Mois</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-white">99.8%</p>
            <p className="text-xs text-slate-400 font-medium">Uptime Serveur Garanti</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-wa-green">&lt; 2s</p>
            <p className="text-xs text-slate-400 font-medium">Temps de Réponse Moyen</p>
          </div>
        </div>

      </div>
    </section>
  );
};
