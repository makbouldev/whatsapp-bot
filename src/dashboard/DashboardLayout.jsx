import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { OverviewTab } from './OverviewTab';
import { MyBotsTab } from './MyBotsTab';
import { BotStudioTab } from './BotStudioTab';
import { AnalyticsTab } from './AnalyticsTab';
import { OrderBotTab } from './OrderBotTab';
import {
  LayoutDashboard,
  Bot,
  Sliders,
  BarChart3,
  PlusCircle,
  LogOut,
  Globe,
  Bell,
  User,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

export const DashboardLayout = ({ onReturnToLanding }) => {
  const { user, logout, bots } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavigateTab = (tabName) => {
    setActiveTab(tabName);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-obsidian-surface border-b border-obsidian-border p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-wa-green" />
          <span className="font-extrabold text-white text-base">WaBotix Portal</span>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-obsidian-card border border-obsidian-border text-slate-300"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-wa-green" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Left Navigation Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-obsidian-surface border-r border-obsidian-border flex flex-col justify-between p-5 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          
          {/* Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-wa-darkGreen to-wa-green p-0.5 shadow-glow-green">
                <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-wa-green" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-white">WaBotix</span>
                <span className="text-[10px] text-wa-green font-bold uppercase tracking-wider">Espace Client</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => handleNavigateTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'overview'
                  ? 'bg-wa-green text-obsidian shadow-glow-green'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Vue d'ensemble</span>
            </button>

            <button
              onClick={() => handleNavigateTab('bots')}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'bots'
                  ? 'bg-wa-green text-obsidian shadow-glow-green'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4" />
                <span>Mes Bots WhatsApp</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeTab === 'bots' ? 'bg-obsidian text-wa-green' : 'bg-wa-green/20 text-wa-green'
              }`}>
                {bots.length}
              </span>
            </button>

            <button
              onClick={() => handleNavigateTab('studio')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'studio'
                  ? 'bg-wa-green text-obsidian shadow-glow-green'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Studio Personnalisation IA</span>
            </button>

            <button
              onClick={() => handleNavigateTab('analytics')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-wa-green text-obsidian shadow-glow-green'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Statistiques & Rapports</span>
            </button>

            <button
              onClick={() => handleNavigateTab('order')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all ${
                activeTab === 'order'
                  ? 'bg-wa-green text-obsidian shadow-glow-green'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ajouter un Bot</span>
            </button>
          </nav>

        </div>

        {/* Bottom User Info & Actions */}
        <div className="space-y-4 pt-6 border-t border-obsidian-border">
          
          <button
            onClick={onReturnToLanding}
            className="w-full py-2.5 px-3 rounded-xl bg-obsidian-card hover:bg-obsidian border border-slate-700 text-xs text-slate-300 hover:text-wa-green font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Retourner au Site Web</span>
          </button>

          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-obsidian-card border border-obsidian-border">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-wa-green shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-8">
        
        {/* Top Header Bar */}
        <div className="hidden md:flex items-center justify-between pb-6 border-b border-obsidian-border">
          <div>
            <h1 className="text-xl font-extrabold text-white">Tableau de bord Client</h1>
            <p className="text-xs text-slate-400">Compte : <span className="text-white font-semibold">{user?.company || user?.name}</span> • Offre <span className="text-wa-green font-bold">{user?.plan}</span></p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-wa-green bg-wa-green/10 border border-wa-green/30 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-wa-green animate-ping"></span>
              <span>WhatsApp Cloud API v20.0 Connecté</span>
            </div>
          </div>
        </div>

        {/* Tab Views Switcher */}
        {activeTab === 'overview' && (
          <OverviewTab
            onNavigateTab={handleNavigateTab}
            onOpenOrderWizard={() => handleNavigateTab('order')}
          />
        )}

        {activeTab === 'bots' && (
          <MyBotsTab
            onOpenStudio={() => handleNavigateTab('studio')}
          />
        )}

        {activeTab === 'studio' && (
          <BotStudioTab />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab />
        )}

        {activeTab === 'order' && (
          <OrderBotTab
            onBotCreated={() => handleNavigateTab('bots')}
          />
        )}

      </main>

    </div>
  );
};
