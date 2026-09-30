import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Check, Send, ShoppingBag, Utensils, Building, Stethoscope, HelpCircle, Zap, ShieldCheck, DollarSign, UserPlus, ArrowRight } from 'lucide-react';

const packsOptions = [
  {
    id: 'starter',
    name: 'Starter Plan',
    priceUsd: 10,
    badge: 'Starter',
    description: 'Essential automated bot for 24/7 client response'
  },
  {
    id: 'pro',
    name: 'Business Pro AI',
    priceUsd: 20,
    badge: '⭐ Recommended',
    popular: true,
    description: 'ChatGPT-4o AI with catalog & order booking'
  },
  {
    id: 'enterprise',
    name: 'Enterprise VIP',
    priceUsd: 35,
    badge: 'Custom VIP',
    description: 'High performance & multi-agent dashboard'
  }
];

const industryOptions = [
  { id: 'ecommerce', label: '🛍️ E-Commerce & Retail', type: 'products' },
  { id: 'services', label: '🛠️ Services & Appointments', type: 'services' },
  { id: 'realestate', label: '🏢 Real Estate & Agencies', type: 'leads' },
  { id: 'custom', label: '🏨 Custom / Other Sector', type: 'custom' },
];

const featureAddons = [
  {
    id: 'multilingual',
    title: '🌐 Multilingual AI (Responds in any language used by client)',
    priceUsd: 2,
    description: 'Automatic detection of English, French, Arabic, Spanish, etc.'
  },
  {
    id: 'promo_bulk',
    title: '📢 Mass Bulk Broadcasts (1-Click Promo Envoys)',
    priceUsd: 2,
    description: 'Send promotions & updates to all your contacts at once'
  },
  {
    id: 'multi_agent_dashboard',
    title: '👨‍💻 Multi-Agent Live Chat & Message History',
    priceUsd: 4,
    description: 'Human takeover dashboard to view & reply to live chats'
  },
  {
    id: 'google_sheets_sync',
    title: '🔄 Google Sheets & Shopify Live Sync',
    priceUsd: 2,
    description: 'Automatic export of leads, bookings & order confirmations'
  },
  {
    id: 'catalog_checkout',
    title: '🛒 Interactive Product Catalog & Instant Checkout',
    priceUsd: 3,
    description: 'Display product items & record order details in WhatsApp'
  }
];

export const QuoteModal = ({ isOpen, onClose, initialPack = 'pro' }) => {
  const { isLoggedIn, login, updateBotConfig } = useAuth();
  const navigate = useNavigate();

  const [selectedPack, setSelectedPack] = useState(initialPack);
  const [selectedIndustry, setSelectedIndustry] = useState('ecommerce');
  const [selectedAddons, setSelectedAddons] = useState(['multilingual', 'google_sheets_sync']);

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

  // Calculate total price in USD ($)
  const addonsTotalUsd = selectedAddons.reduce((acc, id) => {
    const addon = featureAddons.find(a => a.id === id);
    return acc + (addon ? addon.priceUsd : 0);
  }, 0);

  const totalUsd = currentPack.priceUsd + addonsTotalUsd;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const industryObj = industryOptions.find(i => i.id === selectedIndustry);
    const industryLabel = industryObj?.label || 'Custom Sector';

    const customPrompt = selectedIndustry === 'ecommerce' 
      ? 'You are an AI sales assistant for an E-Commerce store. Answer politely in customer language, present products, prices, and record orders.'
      : 'You are an AI virtual assistant for a Service business. Answer politely in customer language, present services, prices, and book appointments.';

    const botConfig = {
      name: companyName ? `Bot ${companyName}` : 'My WhatsApp Bot',
      phone: phone || '+212 600 000 000',
      type: `${currentPack.name} (${industryLabel})`,
      prompt: customPrompt,
      welcomeMessage: selectedIndustry === 'ecommerce' 
        ? 'Hello! 👋 Welcome to our store. Which product can I help you order today?'
        : 'Hello! 👋 Welcome. Which service or appointment would you like to book today?'
    };

    if (isLoggedIn) {
      updateBotConfig(botConfig);
      onClose();
      navigate('/dashboard');
    } else {
      login({
        name: companyName || 'New Business Account',
        phone: phone || '+212 600 000 000',
        email: `${(companyName || 'client').toLowerCase().replace(/[^a-z0-9]/g, '')}@wabotix.com`
      });
      updateBotConfig(botConfig);
      onClose();
      navigate('/dashboard');
    }
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
            <span>CUSTOM BOT CONFIGURATOR</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Configure Your WhatsApp AI Bot</h3>
          <p className="text-xs text-slate-300">
            Select your business sector and add-on features tailored to your workflow.
          </p>
        </div>

        {/* Selected Base Plan Header Banner Card */}
        <div className="p-4 rounded-2xl bg-wa-green/10 border border-wa-green/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-glow-green">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wa-green/20 border border-wa-green/50 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-wa-green" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Selected Plan:</span>
                <span className="text-xs font-extrabold text-wa-green bg-wa-green/20 px-2.5 py-0.5 rounded-full border border-wa-green/30">
                  {currentPack.name}
                </span>
              </div>
              <p className="text-sm font-extrabold text-white mt-0.5">
                ${currentPack.priceUsd} <span className="text-slate-400 font-semibold text-xs">/ month</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <span className="text-[10px] text-slate-400 font-semibold mr-1">Switch Plan:</span>
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
                {p.name.replace(' Plan', '').replace(' AI', '').replace(' VIP', '')} (${p.priceUsd})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          
          {/* STEP 1: Industry / Sector */}
          <div>
            <label className="block text-xs font-extrabold text-wa-green mb-2.5 uppercase tracking-wider">
              1. SELECT YOUR BUSINESS SECTOR
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
                2. ADD-ON FEATURES (SELECT AS NEEDED)
              </label>
              <span className="text-[10px] text-slate-400 font-bold">Monthly add-on pricing</span>
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
                      <span className="text-xs font-extrabold text-wa-green bg-wa-green/10 px-2.5 py-1 rounded-lg border border-wa-green/30 inline-block font-mono">
                        +${addon.priceUsd} <span className="text-[10px] font-normal text-slate-300">/mo</span>
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
              <span className="text-[10px] text-slate-300 uppercase tracking-wider font-extrabold block">ESTIMATED TOTAL MONTHLY PRICE</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">${totalUsd}</span>
                <span className="text-xs font-bold text-wa-green">/ month</span>
              </div>
              <p className="text-[10px] text-slate-400">
                {currentPack.name} (${currentPack.priceUsd}) + {selectedAddons.length} Add-on(s) (+${addonsTotalUsd})
              </p>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-bold text-wa-green bg-wa-green/10 border border-wa-green/30 px-3 py-1.5 rounded-xl block">
                ⚡ 24h Express Deployment
              </span>
            </div>
          </div>

          {/* Dynamic Action Button: Continue (if Logged In) vs Create Account & Continue (if Not Logged In) */}
          {isLoggedIn ? (
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-black text-sm shadow-glow-green transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>Continue to Dashboard (${totalUsd}/mo)</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-wa-green via-emerald-400 to-wa-green text-obsidian font-black text-sm shadow-glow-green transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account & Order (${totalUsd}/mo) 🚀</span>
            </button>
          )}

        </form>

      </div>
    </div>
  );
};
