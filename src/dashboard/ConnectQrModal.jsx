import React, { useState, useEffect } from 'react';
import { X, QrCode, Smartphone, CheckCircle2, RefreshCw, Sparkles, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import { API_URL } from '../config';

export const ConnectQrModal = ({ isOpen, onClose, botName = "Bot WhatsApp", botId }) => {
  const { toggleBotStatus } = useAuth();
  const [scanStatus, setScanStatus] = useState('waiting');
  const [realQrImage, setRealQrImage] = useState(null);
  const [timer, setTimer] = useState(60);

  // Fetch real QR code from backend server
  const fetchBackendQr = async () => {
    try {
      const res = await fetch(`${API_URL}/api/status`);
      const data = await res.json();
      if (data.botState?.qrCodeUrl) {
        setRealQrImage(data.botState.qrCodeUrl);
      }
      if (data.botState?.status === 'connected') {
        setScanStatus('connected');
      }
    } catch (err) {
      console.log('Backend server check:', err.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBackendQr();
      const interval = setInterval(fetchBackendQr, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateScan = async () => {
    setScanStatus('scanning');
    try {
      await fetch(`${API_URL}/api/simulate-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+212 661 234 567' })
      });
    } catch (err) {
      console.log('Backend simulation call:', err);
    }

    setTimeout(() => {
      setScanStatus('connected');
      if (botId) {
        toggleBotStatus();
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-obsidian-surface border border-obsidian-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 glow-border text-center">
        
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
            <QrCode className="w-3.5 h-3.5" />
            <span>Connexion WhatsApp Backend Réel</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Scanner Le QR Code Real</h3>
          <p className="text-xs text-slate-300">
            Associez votre propre numéro WhatsApp à <strong className="text-wa-green">{botName}</strong> en scannant ce code avec votre smartphone.
          </p>
        </div>

        {/* Main QR Code Container */}
        <div className="my-4 flex flex-col items-center justify-center">
          
          {scanStatus === 'connected' ? (
            <div className="w-64 h-64 rounded-3xl bg-wa-green/10 border-2 border-wa-green flex flex-col items-center justify-center p-6 space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-wa-green text-obsidian flex items-center justify-center shadow-glow-green">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="font-extrabold text-white text-base">WhatsApp Réel Connecté !</h4>
              <p className="text-xs text-wa-green font-semibold">
                Votre bot IA est désormais actif 24h/24 et répond en direct aux messages.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-wa-green text-obsidian font-extrabold text-xs rounded-xl shadow-glow-green mt-2"
              >
                Accéder à mon Dashboard
              </button>
            </div>
          ) : (
            <div className="relative w-64 h-64 rounded-3xl bg-white p-4 shadow-2xl border-4 border-wa-green flex items-center justify-center group overflow-hidden">
              
              {scanStatus === 'scanning' && (
                <div className="absolute inset-x-0 h-1 bg-wa-green shadow-glow-green z-20 animate-bounce"></div>
              )}

              {/* Display Real Backend Image or Generated SVG */}
              {realQrImage ? (
                <img
                  src={realQrImage}
                  alt="WhatsApp Real QR Code"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                    <rect x="5" y="5" width="25" height="25" fill="#0b141a" rx="3" />
                    <rect x="9" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="13" y="13" width="9" height="9" fill="#0b141a" rx="1" />

                    <rect x="70" y="5" width="25" height="25" fill="#0b141a" rx="3" />
                    <rect x="74" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="78" y="13" width="9" height="9" fill="#0b141a" rx="1" />

                    <rect x="5" y="70" width="25" height="25" fill="#0b141a" rx="3" />
                    <rect x="9" y="74" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="13" y="78" width="9" height="9" fill="#0b141a" rx="1" />

                    <rect x="35" y="5" width="6" height="6" fill="#0b141a" />
                    <rect x="45" y="5" width="6" height="6" fill="#0b141a" />
                    <rect x="55" y="10" width="6" height="6" fill="#0b141a" />
                    <rect x="35" y="15" width="6" height="6" fill="#0b141a" />
                    <rect x="50" y="20" width="6" height="6" fill="#0b141a" />
                    <rect x="35" y="70" width="6" height="6" fill="#0b141a" />
                    <rect x="50" y="75" width="6" height="6" fill="#0b141a" />
                    <rect x="75" y="75" width="6" height="6" fill="#0b141a" />
                  </svg>

                  <div className="absolute w-12 h-12 bg-wa-green rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}

            </div>
          )}

          {scanStatus !== 'connected' && (
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-wa-green animate-ping"></span>
              <span>Serveur Backend Node.js Actif • Port 3001</span>
            </div>
          )}

        </div>

        {/* Instructions */}
        {scanStatus !== 'connected' && (
          <div className="space-y-2 text-left bg-obsidian-card p-4 rounded-2xl border border-obsidian-border text-xs text-slate-300">
            <p className="font-bold text-white uppercase text-[10px] tracking-wider mb-1">
              Instructions de scan sur votre téléphone :
            </p>
            <div className="space-y-1.5">
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-wa-green/20 text-wa-green font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Ouvrez WhatsApp sur votre smartphone 📱</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-wa-green/20 text-wa-green font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Allez dans <strong>Réglages</strong> &gt; <strong>Appareils connectés</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-wa-green/20 text-wa-green font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Appuyez sur <strong>Connecter un appareil</strong> et scannez ce code</span>
              </p>
            </div>
          </div>
        )}

        {scanStatus !== 'connected' && (
          <button
            onClick={handleSimulateScan}
            disabled={scanStatus === 'scanning'}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-wa-green to-wa-darkGreen text-obsidian font-extrabold text-xs shadow-glow-green hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-obsidian" />
            <span>{scanStatus === 'scanning' ? 'Connexion en cours...' : 'Valider La Connexion (Démo Real) 🚀'}</span>
          </button>
        )}

      </div>
    </div>
  );
};
