import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Send, ShoppingBag, Utensils, Building, Stethoscope, HelpCircle, Zap, ShieldCheck, DollarSign } from 'lucide-react';

const packsOptions = [
  {
    id: 'starter',
    name: 'Pack Starter',
    priceUsd: 10,
    priceDh: 100,
    badge: 'Débutant',
    description: 'Bot de base pour réponse automatique 24/7'
  },
  {
    id: 'pro',
    name: 'Pack Business Pro',
    priceUsd: 20,
    priceDh: 200,
    badge: '⭐ Populaire',
    popular: true,
    description: 'IA connectée avec catalogue & qualification'
  },
  {
    id: 'enterprise',
    name: 'Pack Enterprise VIP',
    priceUsd: 35,
    priceDh: 350,
    badge: 'Sur-Mesure',
    description: 'Haute performance & gestion multi-agents'
  }
];

const industryOptions = [
  { id: 'ecommerce', label: '🛍️ E-Commerce & Boutiques', type: 'products' },
  { id: 'services', label: '🛠️ Prestation de Services & RDV', type: 'services' },
  { id: 'realestate', label: '🏢 Immobilier & Agences', type: 'leads' },
  { id: 'custom', label: '🏨 Autre / Sur-Mesure', type: 'custom' },
];

const featureAddons = [
  {
    id: 'multilingual',
    title: '🌐 IA Multilingue (Répond dans toutes les langues selon le client)',
    priceUsd: 2,
    priceDh: 20,
    description: 'Arabe, الدارجة, Français, Anglais, Espagnol...'
  },
  {
    id: 'promo_bulk',
    title: '📢 Envois de Messages Promo Massifs (Bulk 1-Clic)',
    priceUsd: 2,
    priceDh: 20,
    description: 'Envoyez vos offres à tous vos clients en 1 clic'
  },
  {
    id: 'multi_agent_dashboard',
    title: '👨‍💻 Dashboard Multi-Agents & Historique des Messages',
    priceUsd: 4,
    priceDh: 40,
    description: 'Consultez et répondez à tous vos messages en direct'
  },
  {
    id: 'google_sheets_sync',
    title: '🔄 Connexion & Synchro Google Sheets / Shopify',
    priceUsd: 2,
    priceDh: 20,
    description: 'Export automatique des commandes & confirmations'
  },
  {
    id: 'catalog_checkout',
    title: '🛒 Catalogue Produits & Commande Directe WhatsApp',
    priceUsd: 3,
    priceDh: 30,
    description: 'Affiche vos articles et enregistre les commandes'
  }
];

export const QuoteModal = ({ isOpen, onClose, initialPack = 'pro' }) => {
  const [selectedPack, setSelectedPack] = useState(initialPack);
  const [selectedIndustry, setSelectedIndustry] = useState('ecommerce');
  const [selectedAddons, setSelectedAddons] = useState(['multilingual', 'google_sheets_sync']);
  
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialPack) {
      setSelectedPack(initialPack);
    }
  }, [initialPack, isOpen]);

  if (!isOpen) return null;

  const currentPack = packsOptions.find(p => p.id === selectedPack) || packsOptions[1];
  
  const toggleAddon = (addonId) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(id => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Calculate total price
  const addonsTotalUsd = selectedAddons.reduce((acc, id) => {
    const addon = featureAddons.find(a => a.id === id);
    return acc + (addon ? addon.priceUsd : 0);
  }, 0);

  const addonsTotalDh = selectedAddons.reduce((acc, id) => {
    const addon = featureAddons.find(a => a.id === id);
    return acc + (addon ? addon.priceDh : 0);
  }, 0);

  const totalUsd = currentPack.priceUsd + addonsTotalUsd;
  const totalDh = currentPack.priceDh + addonsTotalDh;

  const handleSendWhatsAppQuote = (e) => {
    e.preventDefault();
    
    const industryObj = industryOptions.find(i => i.id === selectedIndustry);
    const industryLabel = industryObj?.label || 'Sur-Mesure';

    const selectedAddonsList = selectedAddons.map(id => {
      const addon = featureAddons.find(a => a.id === id);
      return addon ? `• ${addon.title} (+$${addon.priceUsd}/m)` : null;
    }).filter(Boolean).join('\n');

    const whatsappMessage = `Bonjour WaBotix ! 🤖 Je souhaite configurer mon Bot WhatsApp sur-mesure :\n\n📦 *PACK DE BASE SÉLECTIONNÉ* :\n• ${currentPack.name} ($${currentPack.priceUsd}/mois - ${currentPack.priceDh} DH)\n\n🎯 *SECTEUR D'ACTIVITÉ* :\n• ${industryLabel}\n\n⚙️ *OPTIONS SECTEUR SÉLECTIONNÉES* :\n${selectedAddonsList || '• Aucune option supplémentaire'}\n\n💰 *PRIX TOTAL ESTIMÉ* :\n👉 *$${totalUsd}/mois* (${totalDh} DH/mois)\n\n🏢 *ENTREPRISE / MARQUE* : ${companyName || 'Non spécifié'}\n📞 *WHATSAPP* : ${phone || 'Non spécifié'}\n📝 *NOTES* : ${notes || 'Aucune'}\n\nMerci de me contacter pour la mise en service immédiate 🚀`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const targetPhoneNumber = "212661234567";
    const waUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedText}`;

    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-obsidian-surface border border-obsidian-border rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 glow-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 border border-wa-green/30 text-wa-green text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personnalisation De Votre Bot</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Sélectionnez Vos Options & Secteur</h3>
          <p className="text-xs text-slate-300">
            Personnalisez les fonctionnalités de votre Bot WhatsApp selon les besoins de votre activité.
          </p>
        </div>

        {/* Selected Base Pack Banner Card */}
        <div className="p-4 rounded-2xl bg-wa-green/10 border border-wa-green/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-glow-green">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wa-green/20 border border-wa-green/50 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-wa-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Pack Choisi :</span>
                <span className="text-xs font-extrabold text-wa-green bg-wa-green/20 px-2.5 py-0.5 rounded-full border border-wa-green/30">
                  {currentPack.name}
                </span>
              </div>
              <p className="text-xs font-extrabold text-white mt-0.5">
                ${currentPack.priceUsd} <span className="text-slate-400 font-semibold text-[11px]">/ mois</span> ({currentPack.priceDh} DH / mois)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <span className="text-[10px] text-slate-400 font-semibold mr-1">Changer :</span>
            {packsOptions.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPack(p.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border transition-all ${
                  selectedPack === p.id
                    ? 'bg-wa-green text-obsidian border-wa-green font-black shadow-sm'
                    : 'bg-obsidian-card border-obsidian-border text-slate-400 hover:text-white'
                }`}
              >
                {p.name.replace('Pack ', '')}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSendWhatsAppQuote} className="space-y-6">
          
          {/* STEP 1: Industry / Sector */}
          <div>
            <label className="block text-xs font-extrabold text-wa-green mb-2.5 uppercase tracking-wider">
              1. Votre Secteur D'activité
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {industryOptions.map((ind) => {
                const isSelected = selectedIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-wa-green/15 border-wa-green text-wa-green font-extrabold shadow-sm'
                        : 'bg-obsidian-card border-obsidian-border text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <span className="truncate">{ind.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-wa-green shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Add-on Features with exact prices ($2, $4, $2, $2, $3) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-extrabold text-wa-green uppercase tracking-wider">
                2. Options À La Carte (Sélectionnez selon vos besoins)
              </label>
              <span className="text-[10px] text-slate-400 font-bold">Prix ajouts par mois</span>
            </div>

            <div className="space-y-2">
              {featureAddons.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs transition-all flex items-center justify-between gap-3 ${
                      checked
                        ? 'bg-gradient-to-r from-wa-teal/25 via-obsidian-card to-obsidian-card border-wa-green text-white shadow-sm'
                        : 'bg-obsidian-card/60 border-obsidian-border text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                      <div className={`w-5 h-5 rounded-md border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                        checked ? 'bg-wa-green border-wa-green text-obsidian font-bold' : 'border-slate-600 bg-obsidian'
                      }`}>
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <span className="font-bold text-white block text-xs truncate">{addon.title}</span>
                        <span className="text-[10px] text-slate-400 block">{addon.description}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-wa-green bg-wa-green/10 px-2 py-1 rounded-lg border border-wa-green/30 inline-block">
                        +${addon.priceUsd} <span className="text-[10px] font-normal text-slate-300">({addon.priceDh} DH)</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC TOTAL PRICE DISPLAY CARD */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-wa-darkGreen/50 via-obsidian-card to-obsidian border border-wa-green/40 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-extrabold block">PRIX TOTAL MENSUEL ESTIMÉ</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">${totalUsd}</span>
                <span className="text-xs font-bold text-wa-green">/ mois</span>
                <span className="text-xs text-slate-300 ml-1 font-semibold">({totalDh} DH / mois)</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {currentPack.name} (${currentPack.priceUsd}) + {selectedAddons.length} option(s) (+${addonsTotalUsd})
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-bold text-wa-green bg-wa-green/10 border border-wa-green/30 px-3 py-1.5 rounded-xl block">
                ⚡ Mise en ligne sous 24h
              </span>
            </div>
          </div>

          {/* Contact Form Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
                Nom d'entreprise / Marque
              </label>
              <input
                type="text"
                required
                placeholder="Ex: FootLab Morocco"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
                Votre Numéro WhatsApp
              </label>
              <input
                type="text"
                required
                placeholder="+212 6..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-wa-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
              Précisions ou besoins spécifiques (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Je vends des chaussures et vêtements, je veux personnaliser les réponses en الدارجة..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          {/* Submit WhatsApp Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-black text-sm shadow-glow-green transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 fill-obsidian" />
            <span>Envoyer Ma Demande (${totalUsd}/mois) Sur WhatsApp 🚀</span>
          </button>

        </form>

      </div>
    </div>
  );
};
