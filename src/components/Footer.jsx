import React from 'react';
import { Bot, Heart, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer = ({ onOpenQuoteModal, onOpenAuthModal }) => {
  return (
    <footer className="bg-obsidian-surface border-t border-obsidian-border pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-obsidian-border">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-wa-darkGreen to-wa-green p-0.5 shadow-glow-green">
                <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-wa-green" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                WaBot<span className="text-wa-green">ix</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              La plateforme de référence au Maroc pour la création de Bots WhatsApp intelligents alimentés par l'IA. Automatisez vos ventes et votre service client 24h/24.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-wa-green" />
                Casablanca, Maroc
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-wa-green" />
                contact@wabotix.ma
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-wa-green transition-colors">Fonctionnalités IA</a></li>
              <li><a href="#simulator" className="hover:text-wa-green transition-colors">Démo Interactive</a></li>
              <li><a href="#usecases" className="hover:text-wa-green transition-colors">Cas par Secteur</a></li>
              <li><a href="#pricing" className="hover:text-wa-green transition-colors">Grille Tarifaire</a></li>
              <li><a href="#faq" className="hover:text-wa-green transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Client Portal Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Espace Client</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenAuthModal('login')} className="hover:text-wa-green transition-colors text-left flex items-center gap-1">
                  <span>Connexion Gestionnaire</span>
                  <ArrowUpRight className="w-3 h-3 text-wa-green" />
                </button>
              </li>
              <li>
                <button onClick={() => onOpenAuthModal('signup')} className="hover:text-wa-green transition-colors text-left">
                  Créer un compte entreprise
                </button>
              </li>
              <li>
                <button onClick={onOpenQuoteModal} className="hover:text-wa-green transition-colors text-left">
                  Demande Devis WhatsApp
                </button>
              </li>
              <li><span className="text-slate-600">Meta WhatsApp Cloud API v20.0</span></li>
            </ul>
          </div>

          {/* Contact Box */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Support 7j/7</h4>
            <p className="text-xs text-slate-400">Discutez en direct avec nos ingénieurs sur WhatsApp.</p>
            <button
              onClick={onOpenQuoteModal}
              className="w-full py-2.5 px-4 rounded-xl bg-obsidian-card border border-wa-green/40 text-wa-green hover:bg-wa-green hover:text-obsidian font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+212 661 234 567</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 WaBotix Morocco. Tous droits réservés.</p>
          <div className="flex items-center gap-1">
            <span>Fait avec</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>pour les entreprises & agences du Maroc.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
