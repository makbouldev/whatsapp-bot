import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, CheckCheck, Smartphone, Sparkles, RefreshCw, ShoppingBag, Utensils, Home, UserCheck, MessageSquarePlus, ChevronRight } from 'lucide-react';

const scenarios = [
  {
    id: 'ecommerce',
    name: '🛍️ E-Commerce & Ventes',
    subtitle: 'Catalogue, Prix & Prise de Commande Directe',
    initialMessages: [
      { id: 1, sender: 'user', text: 'Bonjour! Je souhaite voir les produits en promotion 👟', time: '14:30' },
      {
        id: 2,
        sender: 'bot',
        text: 'Bonjour! 👋 Bienvenue chez FootLab. Voici nos paires en promotion ce mois-ci:',
        time: '14:30',
        media: {
          title: 'Air Max Pulse 2026 - Black Edition',
          price: '650 DH (au lieu de 950 DH)',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
          badge: 'Livraison Gratuite 🚚'
        },
        buttons: ['🛒 Commander en 1-clic', '📏 Consulter la grille des pointures', '📞 Parler à un conseiller']
      }
    ],
    quickReplies: [
      '🛒 Je souhaite commander Air Max pointure 42',
      '🚚 Quel est le délai de livraison ?',
      '💳 Le paiement se fait-il à la livraison ?'
    ]
  },
  {
    id: 'restaurant',
    name: '🍕 Restaurant & Menus',
    subtitle: 'Réservation de Table & Menu Interactif',
    initialMessages: [
      { id: 1, sender: 'user', text: 'Bonjour, je voudrais réserver une table pour ce soir 🍷', time: '19:15' },
      {
        id: 2,
        sender: 'bot',
        text: 'Bonjour ! 🍽️ Bienvenue au Gourmet Bistro. Pour combien de personnes souhaitez-vous réserver ?',
        time: '19:15',
        buttons: ['👥 2 Personnes (20h00)', '👨‍👩‍👧‍👦 4 Personnes (20h30)', '📜 Voir le Menu Digital']
      }
    ],
    quickReplies: [
      '👥 2 Personnes (20h00)',
      '📜 Voir le Menu Digital',
      '📍 Quel est votre emplacement exact?'
    ]
  },
  {
    id: 'realestate',
    name: '🏢 Immobilier & Prospect',
    subtitle: 'Qualification de Prospect & Envoi de Fiches',
    initialMessages: [
      { id: 1, sender: 'user', text: 'Bonjour, je cherche un appartement 2 chambres 🏢', time: '11:05' },
      {
        id: 2,
        sender: 'bot',
        text: 'Bonjour ! 👋 Agence ImmoElite à votre service. Quel est votre budget approximatif ?',
        time: '11:05',
        buttons: ['💰 600.000 - 900.000 DH', '💎 1.000.000 DH +', '📲 Parler à un agent immo']
      }
    ],
    quickReplies: [
      '💰 600.000 - 900.000 DH',
      '📲 Parler à un agent immo',
      '📍 Projets récents'
    ]
  },
  {
    id: 'ai_support',
    name: '🤖 IA ChatGPT Multilingue',
    subtitle: 'Support Client Intelligent en N\'importe quelle langue',
    initialMessages: [
      { id: 1, sender: 'user', text: 'Comment puis-je réinitialiser mon mot de passe sur le compte ?', time: '16:42' },
      {
        id: 2,
        sender: 'bot',
        text: 'Bonjour! 🤖 Pour changer votre mot de passe, c\'est très simple :\n\n1. Déconnectez-vous de l\'application.\n2. Cliquez sur "Mot de passe oublié".\n3. Entrez votre email et vous recevrez un lien de réinitialisation instantané !\n\nBesoin d\'aide supplémentaire ?',
        time: '16:42',
        buttons: ['👍 C\'est bon merci !', '📩 Envoyer un lien direct', '👨‍💻 Contacter le support humain']
      }
    ],
    quickReplies: [
      '👍 C\'est bon merci !',
      '📩 Envoyer un lien direct',
      '👨‍💻 Contacter le support humain'
    ]
  }
];

export const BotSimulator = ({ onOpenQuoteModal }) => {
  const [activeScenarioId, setActiveScenarioId] = useState('ecommerce');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const chatEndRef = useRef(null);

  const currentScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  useEffect(() => {
    setMessages(currentScenario.initialMessages);
  }, [activeScenarioId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setCustomInput('');
    setIsTyping(true);

    try {
      // Fetch dynamic, unique AI response from backend
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();

      setIsTyping(false);

      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        text: data.reply || `Merci pour votre message ! 🤖 L'IA WhatsApp a bien analysé "${textToSend}".`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        buttons: ['✨ Automatiser mon entreprise', '📞 Demander un devis']
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.log('Backend chat call error:', err);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Bonjour ! 🤖 Merci pour votre message "${textToSend}". Je réponds en direct dans n'importe quelle langue selon vos paramètres !`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const handleReset = () => {
    setMessages(currentScenario.initialMessages);
  };

  return (
    <section id="simulator" className="py-20 bg-obsidian-surface border-y border-obsidian-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-wa-green/10 border border-wa-green/30 text-wa-green text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Démo Interactive En Direct (IA Réelle)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Testez l'expérience client <span className="text-gradient-wa">WhatsApp Bot</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Saisissez n'importe quelle question ci-dessous (prix, commande, horaires...) et observez la réponse unique générée par l'IA en temps réel.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {scenarios.map(sc => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border ${
                activeScenarioId === sc.id
                  ? 'bg-wa-green text-obsidian border-wa-green shadow-glow-green font-bold scale-105'
                  : 'bg-obsidian-card text-slate-300 border-obsidian-border hover:border-wa-green/40'
              }`}
            >
              <span>{sc.name}</span>
            </button>
          ))}
        </div>

        {/* Smartphone Simulator & Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Info & Quick Actions Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            
            <div className="glass-panel p-6 rounded-2xl border border-obsidian-border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-lg">{currentScenario.name}</h3>
                <span className="text-xs text-wa-green bg-wa-green/10 px-2.5 py-1 rounded-full border border-wa-green/30 font-semibold">
                  IA Réelle Active 24/7
                </span>
              </div>
              <p className="text-sm text-slate-300">{currentScenario.subtitle}</p>

              <div className="pt-2 border-t border-obsidian-border/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Messages Rapides à tester:
                </p>
                <div className="space-y-2">
                  {currentScenario.quickReplies.map((reply, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(reply)}
                      className="w-full text-left p-3 rounded-xl bg-obsidian-card hover:bg-wa-green/10 border border-obsidian-border hover:border-wa-green/40 text-xs sm:text-sm text-slate-200 hover:text-wa-green transition-all flex items-center justify-between group"
                    >
                      <span className="truncate">{reply}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-wa-green group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Réinitialiser le chat</span>
                </button>

                <span className="text-xs text-slate-500 font-mono">API WhatsApp Cloud v20.0</span>
              </div>

            </div>

            {/* CTA Box */}
            <div className="glass-panel p-6 rounded-2xl border border-wa-green/30 bg-gradient-to-br from-wa-teal/20 to-obsidian space-y-3">
              <h4 className="font-bold text-white text-base">Vous voulez un bot comme celui-ci ?</h4>
              <p className="text-xs text-slate-300">
                Nous créons et configurons votre propre bot WhatsApp personnalisé en moins de 48 heures.
              </p>
              <button
                onClick={onOpenQuoteModal}
                className="w-full bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold py-2.5 rounded-xl shadow-glow-green text-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Demander Mon Bot WhatsApp</span>
              </button>
            </div>

          </div>

          {/* Right Virtual Smartphone Screen (7 cols) */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            
            {/* Phone Outer Shell */}
            <div className="w-full max-w-[380px] h-[640px] bg-slate-900 rounded-[45px] p-3 shadow-2xl border-4 border-slate-700/80 relative flex flex-col glow-border">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                <div className="w-2 h-2 rounded-full bg-slate-900"></div>
              </div>

              {/* Screen Inner Frame */}
              <div className="w-full h-full bg-wa-chatBg rounded-[35px] overflow-hidden flex flex-col relative pt-7">
                
                {/* WhatsApp Chat Header */}
                <div className="bg-wa-teal px-4 py-3 flex items-center gap-3 text-white shadow-md z-20">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-wa-green overflow-hidden">
                      <Bot className="w-6 h-6 text-wa-green" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-wa-green rounded-full ring-2 ring-wa-teal"></span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm truncate">WaBotix Assistant</h4>
                      <span className="bg-wa-green text-obsidian text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                        OFFICIEL
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-200">En ligne 24h/24 • Réponse IA Réelle</p>
                  </div>
                </div>

                {/* WhatsApp Chat Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#1f2d42_1px,transparent_1px)] [background-size:16px_16px]">
                  
                  <div className="text-center my-2">
                    <span className="bg-obsidian-card/80 text-[10px] text-slate-400 px-3 py-1 rounded-full border border-obsidian-border">
                      🔒 Les messages sont chiffrés de bout en bout
                    </span>
                  </div>

                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5 animate-in fade-in duration-300`}
                    >
                      {/* Chat Bubble */}
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs text-slate-100 shadow-md ${
                          msg.sender === 'user'
                            ? 'bg-wa-bubbleOut rounded-tr-none text-right'
                            : 'bg-wa-bubbleIn rounded-tl-none border border-slate-700/50'
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                        {/* Optional Media Card inside Bot message */}
                        {msg.media && (
                          <div className="mt-2.5 bg-slate-900/90 rounded-xl overflow-hidden border border-slate-700 p-2 text-left">
                            <img
                              src={msg.media.image}
                              alt={msg.media.title}
                              className="w-full h-28 object-cover rounded-lg mb-2"
                            />
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs">{msg.media.title}</span>
                              <span className="text-[10px] bg-wa-green/20 text-wa-green font-bold px-1.5 py-0.5 rounded">
                                {msg.media.badge}
                              </span>
                            </div>
                            <p className="text-wa-green font-extrabold text-xs mt-0.5">{msg.media.price}</p>
                          </div>
                        )}

                        {/* Interactive Buttons */}
                        {msg.buttons && (
                          <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-700/50">
                            {msg.buttons.map((btnText, bIdx) => (
                              <button
                                key={bIdx}
                                onClick={() => handleSendMessage(btnText)}
                                className="w-full text-center py-1.5 px-2 bg-wa-teal/40 hover:bg-wa-green hover:text-obsidian border border-wa-green/40 text-wa-green font-semibold rounded-lg text-[11px] transition-all"
                              >
                                {btnText}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 mt-1">
                          <span>{msg.time}</span>
                          {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-wa-accent" />}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-center space-x-1.5 bg-wa-bubbleIn px-4 py-2.5 rounded-2xl rounded-tl-none w-20 shadow-md">
                      <span className="w-2 h-2 bg-wa-green rounded-full animate-typing-bounce"></span>
                      <span className="w-2 h-2 bg-wa-green rounded-full animate-typing-bounce [animation-delay:0.2s]"></span>
                      <span className="w-2 h-2 bg-wa-green rounded-full animate-typing-bounce [animation-delay:0.4s]"></span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* WhatsApp Chat Input Footer */}
                <div className="p-2.5 bg-wa-teal/30 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(customInput)}
                    placeholder="Posez n'importe quelle question..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-wa-green"
                  />
                  <button
                    onClick={() => handleSendMessage(customInput)}
                    className="w-9 h-9 rounded-full bg-wa-green hover:bg-emerald-400 text-obsidian flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
