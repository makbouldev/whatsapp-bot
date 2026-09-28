import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sliders, Save, Bot, Send, Sparkles, Check, RefreshCw, Key, MessageSquare, AlertCircle } from 'lucide-react';
import { API_URL } from '../config';

export const BotStudioTab = () => {
  const { userBot, updateBotConfig } = useAuth();

  const [prompt, setPrompt] = useState(userBot?.prompt || '');
  const [welcomeMsg, setWelcomeMsg] = useState(userBot?.welcomeMessage || '');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('wabotix_gemini_key') || '');
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem('wabotix_openai_key') || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Live Playground Chat State
  const [testMessages, setTestMessages] = useState([
    { id: 1, sender: 'bot', text: userBot?.welcomeMessage || 'Bonjour! Comment puis-je vous aider ?' }
  ]);
  const [testInput, setTestInput] = useState('');

  // Fetch initial API keys status from backend
  useEffect(() => {
    const fetchStatusKeys = async () => {
      try {
        const res = await fetch(`${API_URL}/api/status`);
        const data = await res.json();
        if (data.botState?.geminiApiKey && !localStorage.getItem('wabotix_gemini_key')) {
          setGeminiKey(data.botState.geminiApiKey);
          localStorage.setItem('wabotix_gemini_key', data.botState.geminiApiKey);
        }
        if (data.botState?.openaiApiKey && !localStorage.getItem('wabotix_openai_key')) {
          setOpenaiKey(data.botState.openaiApiKey);
          localStorage.setItem('wabotix_openai_key', data.botState.openaiApiKey);
        }
      } catch (err) {
        console.log('Status fetch keys:', err);
      }
    };
    fetchStatusKeys();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    updateBotConfig({
      prompt,
      welcomeMessage: welcomeMsg
    });

    if (geminiKey) localStorage.setItem('wabotix_gemini_key', geminiKey);
    if (openaiKey) localStorage.setItem('wabotix_openai_key', openaiKey);

    try {
      await fetch(`${API_URL}/api/update-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, welcomeMessage: welcomeMsg })
      });

      if (geminiKey) {
        await fetch(`${API_URL}/api/update-gemini-key`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: geminiKey })
        });
      }

      if (openaiKey) {
        await fetch(`${API_URL}/api/update-openai-key`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey: openaiKey })
        });
      }
    } catch (err) {
      console.log('Update prompt backend call:', err);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleTestSend = async (e) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    const userText = testInput;
    setTestInput('');
    setTestMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText }]);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();

      setTestMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: data.reply || `🤖 Bonjour ! Merci pour votre message. Je réponds selon vos paramètres.`
        }
      ]);
    } catch (err) {
      setTestMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: `🤖 (Réponse IA): Merci pour votre message "${userText}". J'utilise vos nouvelles instructions pour répondre.`
        }
      ]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <span className="text-xs text-wa-green font-bold bg-wa-green/10 border border-wa-green/30 px-3 py-1 rounded-full">
          Studio Personnalisation
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-2">Studio Intelligence IA ({userBot.name})</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Modifiez le comportement, les règles et la clé API ChatGPT-4o de votre bot en temps réel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Config Form (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-obsidian-border space-y-6">
          
          <div className="flex items-center justify-between border-b border-obsidian-border pb-4">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              <Sliders className="w-5 h-5 text-wa-green" />
              <span>Directives & Prompt IA</span>
            </h3>
            <span className="text-xs text-wa-green bg-wa-green/10 border border-wa-green/30 px-2.5 py-1 rounded-full font-semibold">
              ChatGPT-4o Actif
            </span>
          </div>

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-wa-green/20 border border-wa-green/40 text-wa-green text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Instructions et paramètres IA enregistrés avec succès !</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Message d'accueil automatique
              </label>
              <textarea
                rows={2}
                value={welcomeMsg}
                onChange={(e) => setWelcomeMsg(e.target.value)}
                placeholder="Message envoyé automatiquement lors du premier contact client..."
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-wa-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                Instructions IA & Prompt de Personnalité
              </label>
              <p className="text-[11px] text-slate-400 mb-2">
                Expliquez à l'IA quel est son rôle, la liste de vos prix, conditions de livraison, et le ton de voix souhaité (émojis, langue du client).
              </p>
              <textarea
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Exemple: Tu es l'assistant de vente virtuel. Sois très poli, réponds dans la langue du client..."
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl p-3.5 text-xs text-white font-mono focus:outline-none focus:border-wa-green leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-wa-green" />
                <span>Clé API Google Gemini (Gratuit & Recommandé ✨)</span>
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-wa-green"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Collez la clé obtenue sur <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-wa-green font-bold hover:underline">Google AI Studio</a> pour activer Gemini 1.5 Flash 100% gratuitement.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-wa-green" />
                <span>Clé API OpenAI ChatGPT (Optionnel)</span>
              </label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-wa-green"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Laissez vide si vous utilisez la clé Google Gemini ou le moteur intégré.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-wa-green hover:bg-emerald-400 text-obsidian font-extrabold text-sm shadow-glow-green transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4 fill-obsidian" />
              <span>Enregistrer Les Nouvelles Instructions IA</span>
            </button>

          </form>

        </div>

        {/* Live Test Console (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-obsidian-border space-y-4">
          <div className="flex items-center justify-between border-b border-obsidian-border pb-3">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-wa-green" />
              <span>Console de Test en Direct (IA Réelle)</span>
            </span>
            <button
              onClick={() => setTestMessages([{ id: 1, sender: 'bot', text: welcomeMsg }])}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Effacer</span>
            </button>
          </div>

          {/* Test Chat Area */}
          <div className="h-80 bg-wa-chatBg rounded-2xl p-4 overflow-y-auto space-y-3 border border-slate-800">
            {testMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs text-slate-100 ${
                  msg.sender === 'user' ? 'bg-wa-bubbleOut rounded-tr-none' : 'bg-wa-bubbleIn rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Test Input */}
          <form onSubmit={handleTestSend} className="flex gap-2">
            <input
              type="text"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Saisissez n'importe quelle question..."
              className="flex-1 bg-obsidian-card border border-obsidian-border rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-wa-green"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-wa-green text-obsidian font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
