import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

export const FloatingCta = ({ onNavigatePricing }) => {
  const handleDirectWhatsApp = () => {
    const defaultText = encodeURIComponent("Salam WaBotix ! 🤖 Bghit nstafed mn un devis gratuit l-Bot WhatsApp dyali.");
    window.open(`https://wa.me/212661234567?text=${defaultText}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      
      {/* Tooltip Badge */}
      <div
        onClick={onNavigatePricing}
        className="hidden sm:flex items-center gap-2 bg-obsidian-surface/90 border border-wa-green/40 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-2xl text-xs font-bold text-white cursor-pointer hover:scale-105 transition-all group"
      >
        <span className="w-2 h-2 rounded-full bg-wa-green animate-ping"></span>
        <span>Besoin d'un Bot WhatsApp ?</span>
        <span className="text-wa-green font-extrabold group-hover:translate-x-1 transition-transform">Devis Gratuit &rarr;</span>
      </div>

      {/* Pulsing Floating Button */}
      <button
        onClick={handleDirectWhatsApp}
        className="w-14 h-14 rounded-full bg-wa-green hover:bg-emerald-400 text-obsidian flex items-center justify-center shadow-glow-green hover:scale-110 transition-all duration-300 relative group animate-pulse-glow"
        title="Discuter directement sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-obsidian" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-obsidian"></span>
      </button>

    </div>
  );
};
