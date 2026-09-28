import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShoppingCart, Calendar, Phone, Download, Search, Sparkles, Filter } from 'lucide-react';

export const initialConfirmations = [
  {
    id: 'conf-101',
    customerName: 'Othmane Berrada',
    phone: '+212 661 458 920',
    type: 'Commande E-Commerce',
    details: 'Air Max Pulse - Pointure 42 (Black Edition)',
    amount: '650 DH',
    status: '✅ Confirmé par IA',
    time: 'Aujourd\'hui 14:32',
    city: 'Casablanca'
  },
  {
    id: 'conf-102',
    customerName: 'Khadija Mansouri',
    phone: '+212 662 114 339',
    type: 'Réservation Table',
    details: 'Table pour 4 personnes (20h30)',
    amount: 'Gourmet Bistro',
    status: '✅ Confirmé par IA',
    time: 'Aujourd\'hui 13:15',
    city: 'Marrakech'
  },
  {
    id: 'conf-103',
    customerName: 'Mehdi Chraibi',
    phone: '+212 663 889 001',
    type: 'Prospect Immobilier',
    details: 'Appartement 2 chambres - Budget 850k DH',
    amount: 'Rdv Visite',
    status: '✅ RDV Planifié',
    time: 'Hier 18:40',
    city: 'Rabat'
  },
  {
    id: 'conf-104',
    customerName: 'Siham Alami',
    phone: '+212 668 554 210',
    type: 'RDV Médical',
    details: 'Consultation Dr. Benjelloun (Demain 10h)',
    amount: 'Cabinet Médical',
    status: '✅ Rappel Confirmé',
    time: 'Hier 16:05',
    city: 'Casablanca'
  }
];

export const ConfirmationsFeed = () => {
  const [search, setSearch] = useState('');
  const [liveConfirmations, setLiveConfirmations] = useState(initialConfirmations);

  const fetchLiveConfirmations = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/status');
      const data = await res.json();
      if (data.liveConfirmations && data.liveConfirmations.length > 0) {
        const combined = [...data.liveConfirmations, ...initialConfirmations];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setLiveConfirmations(unique);
      }
    } catch (err) {
      console.log('Backend sync:', err.message);
    }
  };

  useEffect(() => {
    fetchLiveConfirmations();
    const interval = setInterval(fetchLiveConfirmations, 2500);
    return () => clearInterval(interval);
  }, []);

  const filtered = liveConfirmations.filter(c =>
    (c.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.details || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').includes(search)
  );

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-obsidian-border space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Tableau des Confirmations & Commandes Capturées par l'IA</h3>
            <span className="text-[10px] font-extrabold bg-wa-green/20 text-wa-green border border-wa-green/30 px-2 py-0.5 rounded-full">
              LIVE EN TEMPS RÉEL
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Toutes les ventes, réservations et rendez-vous validés automatiquement par le Bot WhatsApp.
          </p>
        </div>

        {/* Search & Export */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Chercher client, téléphone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-obsidian-card border border-obsidian-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-wa-green w-48 sm:w-64"
            />
          </div>

          <button
            onClick={() => alert("Exportation Excel/CSV de vos confirmations téléchargée !")}
            className="px-3.5 py-1.5 rounded-xl bg-obsidian-card border border-slate-700 hover:border-wa-green text-xs font-bold text-white hover:text-wa-green transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exporter Excel</span>
          </button>
        </div>
      </div>

      {/* Confirmations Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-obsidian-card text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-obsidian-border">
            <tr>
              <th className="p-3">Client</th>
              <th className="p-3">Téléphone WhatsApp</th>
              <th className="p-3">Type</th>
              <th className="p-3">Détails de la Confirmation</th>
              <th className="p-3">Montant / Valeur</th>
              <th className="p-3">Statut IA</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-obsidian-border/60">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="p-3 font-bold text-white whitespace-nowrap">{item.customerName}</td>
                <td className="p-3 font-mono text-wa-green font-semibold whitespace-nowrap">{item.phone}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold text-[10px]">
                    {item.type}
                  </span>
                </td>
                <td className="p-3 font-medium text-slate-200">{item.details}</td>
                <td className="p-3 font-bold text-white whitespace-nowrap">{item.amount}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="bg-wa-green/20 text-wa-green border border-wa-green/30 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-slate-400 whitespace-nowrap text-[11px]">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
