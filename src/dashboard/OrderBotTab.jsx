import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Bot, Sparkles, CheckCircle2, Phone, Send, ArrowRight } from 'lucide-react';

export const OrderBotTab = ({ onBotCreated }) => {
  const { addNewBot } = useAuth();
  
  const [botName, setBotName] = useState('');
  const [phone, setPhone] = useState('');
  const [botType, setBotType] = useState('E-Commerce Catalog');
  const [prompt, setPrompt] = useState('');
  const [welcomeMsg, setWelcomeMsg] = useState('Salam! Bienvenue chez nous. Comment puis-je vous aider ?');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewBot({
      name: botName || 'Nouveau Bot WhatsApp',
      phone: phone || '+212 600 111 222',
      type: botType,
      prompt: prompt || 'Assistant virtuel WhatsApp intelligent.',
      welcomeMessage: welcomeMsg
    });

    if (onBotCreated) {
      onBotCreated();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      <div>
        <span className="text-xs text-wa-green font-bold bg-wa-green/10 border border-wa-green/30 px-3 py-1 rounded-full">
          Ajouter Un Bot
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2">Commander / Créer un Bot WhatsApp</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Ajoutez un nouveau numéro ou une nouvelle branche d'activité à votre compte.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-obsidian-border space-y-6">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Nom du Bot
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Bot Ventes Marrakech"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Numéro WhatsApp Associé
            </label>
            <input
              type="text"
              required
              placeholder="+212 661 000 000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Type & Mission du Bot
            </label>
            <select
              value={botType}
              onChange={(e) => setBotType(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
            >
              <option value="E-Commerce Catalog & Checkout">E-Commerce & Catalogue Produits</option>
              <option value="AI Customer Support (ChatGPT)">Support Client IA 24/7</option>
              <option value="Appointment Booking">Réservation & Prise de RDV</option>
              <option value="Real Estate Lead Gen">Immobilier & Qualification Prospects</option>
              <option value="Custom Service API">Sur-Mesure / Webhooks</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Message d'Accueil Automatique
            </label>
            <input
              type="text"
              required
              value={welcomeMsg}
              onChange={(e) => setWelcomeMsg(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Directives & Consignes IA (Prompt)
            </label>
            <textarea
              rows={3}
              placeholder="Expliquez brièvement comment le bot doit se comporter..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-wa-green to-wa-darkGreen hover:from-wa-green hover:to-wa-green text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            <span>Ajouter Et Activer Le Bot Immédiatement</span>
          </button>

        </form>

      </div>

    </div>
  );
};
