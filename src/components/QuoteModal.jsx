import React, { useState } from 'react';
import { X, Sparkles, Check, Send, ShoppingBag, Utensils, Building, Stethoscope, HelpCircle } from 'lucide-react';

const industryOptions = [
  { id: 'ecommerce', label: 'E-Commerce & Boutiques', icon: ShoppingBag },
  { id: 'restaurant', label: 'Restaurant & Traiteur', icon: Utensils },
  { id: 'realestate', label: 'Immobilier & Agence', icon: Building },
  { id: 'medical', label: 'Clinique & Santé', icon: Stethoscope },
  { id: 'custom', label: 'Autre Service / Sur-Mesure', icon: HelpCircle },
];

const featureOptions = [
  '🤖 IA ChatGPT 4o Multilingue (Toutes Langues)',
  '🛒 Catalogue Produits & Commande Directe',
  '📢 Envois de Messages Promo Massifs (Bulk)',
  '👨‍💻 Dashboard Multi-Agents Humains',
  '🔄 Connexion Shopify / WooCommerce / Sheets'
];

export const QuoteModal = ({ isOpen, onClose }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('ecommerce');
  const [selectedFeatures, setSelectedFeatures] = useState([featureOptions[0], featureOptions[1]]);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleSendWhatsAppQuote = (e) => {
    e.preventDefault();
    
    const industryLabel = industryOptions.find(i => i.id === selectedIndustry)?.label || 'Sur-Mesure';
    const featureListStr = selectedFeatures.map(f => `• ${f}`).join('\n');

    const whatsappMessage = `Bonjour WaBotix ! 🤖 Je souhaite créer un Bot WhatsApp sur-mesure :\n\n🏢 *Entreprise* : ${companyName || 'Non spécifié'}\n📞 *Téléphone* : ${phone || 'Non spécifié'}\n🎯 *Secteur* : ${industryLabel}\n\n⚙️ *Fonctionnalités souhaitées* :\n${featureListStr}\n\n📝 *Notes* : ${notes || 'Aucune'}\n\nMerci de me contacter avec le devis et les détails de mise en ligne 🚀`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const targetPhoneNumber = "212661234567";
    const waUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedText}`;

    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-obsidian-surface border border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-border">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-obsidian-card border border-obsidian-border text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 border border-wa-green/30 text-wa-green text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devis Sur-Mesure Instantané</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Configurez Votre Bot WhatsApp</h3>
          <p className="text-xs text-slate-300">
            Sélectionnez vos besoins ci-dessous pour générer automatiquement votre demande de devis sur WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSendWhatsAppQuote} className="space-y-5">
          
          {/* Industry Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              1. Votre Secteur d'activité
            </label>
            <div className="grid grid-cols-2 gap-2">
              {industryOptions.map((ind) => {
                const Icon = ind.icon;
                const isSelected = selectedIndustry === ind.id;
                return (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-wa-green/10 border-wa-green text-wa-green shadow-glow-green font-bold'
                        : 'bg-obsidian-card border-obsidian-border text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-wa-green" />
                    <span className="truncate">{ind.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Features Checkbox Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
              2. Fonctionnalités souhaitées
            </label>
            <div className="space-y-2">
              {featureOptions.map((feat, idx) => {
                const checked = selectedFeatures.includes(feat);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                      checked
                        ? 'bg-obsidian-card border-wa-green/60 text-white'
                        : 'bg-obsidian-card/50 border-obsidian-border text-slate-400'
                    }`}
                  >
                    <span>{feat}</span>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                      checked ? 'bg-wa-green border-wa-green text-obsidian' : 'border-slate-600'
                    }`}>
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Details Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
                Nom d'entreprise / Marque
              </label>
              <input
                type="text"
                placeholder="Ex: FootLab Morocco"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-wa-green"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
                Votre WhatsApp
              </label>
              <input
                type="text"
                placeholder="+212 6..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-wa-green"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 mb-1 uppercase">
              Précisions particulières (Optionnel)
            </label>
            <textarea
              rows={2}
              placeholder="Ex: Je souhaite intégrer le bot avec ma boutique Shopify..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-wa-green"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wa-green to-wa-darkGreen hover:from-wa-green hover:to-wa-green text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 fill-obsidian" />
            <span>Envoyer Ma Demande Sur WhatsApp</span>
          </button>

        </form>

      </div>
    </div>
  );
};
