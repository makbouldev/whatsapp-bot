import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage = ({ onOpenQuoteModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-wa-green text-xs font-bold uppercase tracking-widest bg-wa-green/10 border border-wa-green/30 px-3.5 py-1 rounded-full">
          Contact & Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Contactez Notre Équipe Sur-Mesure
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Besoin d'un devis gratuit, d'une assistance technique ou d'une démo personnalisée ? Nous sommes à votre écoute 7j/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-obsidian-border space-y-6">
          
          <h3 className="text-xl font-bold text-white border-b border-obsidian-border pb-4">
            Nos Coordonnées
          </h3>

          <div className="space-y-5 text-slate-300 text-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-wa-green/10 border border-wa-green/30 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-wa-green" />
              </div>
              <div>
                <p className="font-bold text-white">WhatsApp Direct (Support 24/7)</p>
                <p className="text-xs text-slate-400 mt-0.5">+212 661 234 567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="font-bold text-white">Email Commercial</p>
                <p className="text-xs text-slate-400 mt-0.5">contact@wabotix.ma</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-bold text-white">Siège Social</p>
                <p className="text-xs text-slate-400 mt-0.5">Boulevard d'Anfa, Casablanca, Maroc</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-obsidian-border">
            <button
              onClick={onOpenQuoteModal}
              className="w-full py-3.5 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-obsidian" />
              <span>Lancer le Générateur de Devis Instantané</span>
            </button>
          </div>

        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-obsidian-border space-y-6">
          
          <h3 className="text-xl font-bold text-white border-b border-obsidian-border pb-4">
            Envoyer un Message
          </h3>

          {submitted && (
            <div className="p-4 rounded-xl bg-wa-green/20 border border-wa-green/40 text-wa-green text-sm font-bold animate-in fade-in">
              ✅ Merci ! Votre message a été envoyé. Notre équipe vous recontactera sous 2h.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Nom Complet
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Youssef Benali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Téléphone WhatsApp
                </label>
                <input
                  type="text"
                  required
                  placeholder="+212 6..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Adresse Email
              </label>
              <input
                type="email"
                required
                placeholder="youssef@entreprise.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-wa-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Votre Message / Demande
              </label>
              <textarea
                rows={4}
                required
                placeholder="Décrivez votre projet ou posez vos questions..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-4 text-sm text-white focus:outline-none focus:border-wa-green"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wa-green to-wa-darkGreen hover:from-wa-green hover:to-wa-green text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 fill-obsidian" />
              <span>Envoyer Le Message</span>
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};
