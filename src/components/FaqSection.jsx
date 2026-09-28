import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Y-a-t-il un risque de bannissement de mon numéro WhatsApp ?",
    answer: "Absolument AUCUN risque ! Nous utilisons exclusivement l'infrastructure officielle Meta WhatsApp Cloud API. Votre numéro bénéficie d'une connexion officielle sécurisée conforme aux règles de confidentialité de WhatsApp."
  },
  {
    question: "Quelles sont les langues prises en charge par le bot IA ?",
    answer: "Le bot IA prend en charge 100% des langues (Français, Arabe, Anglais, Espagnol et parler courant). Il détecte et s'adapte automatiquement et instantanément à la langue parlée par chaque client."
  },
  {
    question: "Combien de temps prend la création et la mise en ligne du bot ?",
    answer: "La configuration complète (réponses, catalogue, intégration CRM et tests) prend entre 24h et 48h maximum. Notre équipe technique s'occupe de tout A à Z."
  },
  {
    question: "Puis-je reprendre la main manuellement sur une conversation ?",
    answer: "Oui à tout moment ! Dès qu'un client demande un conseiller humain ou un cas complexe, le bot se met en pause sur cette conversation et vous recevez une notification sur votre Dashboard Multi-Agents pour répondre directement."
  },
  {
    question: "Puis-je lier le bot avec Shopify, WooCommerce ou Google Sheets ?",
    answer: "Oui, nos bots se connectent facilement avec Shopify, WooCommerce, Zapier, Make et Google Sheets pour synchroniser les commandes et mettre à jour vos stocks automatiquement."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire nationale/internationale, virement bancaire, ou virement d'agence de transfert."
  }
];

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-24 bg-obsidian border-t border-obsidian-border relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-wa-green text-xs font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
            Foire Aux Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Des réponses claires à vos questions
          </h2>
          <p className="text-slate-300 text-base">
            Vous avez d'autres questions ? Notre équipe support est disponible sur WhatsApp 7j/7.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-obsidian-border overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-wa-green transition-colors"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-wa-green shrink-0" />
                  <span>{faq.question}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-wa-green' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 pt-0 text-slate-300 text-sm leading-relaxed border-t border-obsidian-border/50 animate-in fade-in duration-200">
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
